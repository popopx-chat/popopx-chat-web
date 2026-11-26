#!/usr/bin/env node
/**
 * Build-output compliance scanner — the oracle behind the four hard "0" claims
 * of the POPOPX main portal. Each one is checked against the *shipped
 * artefacts* in `out/`, not against the source, because the source is not what
 * a visitor downloads:
 *
 *   1. 0 third-party analytics / tracking code
 *   2. 0 external CDN or remote-asset references (script/style/img/font/media)
 *   3. 0 leaked local development paths
 *   4. 0 forbidden words (the legacy upstream project name and the four
 *      restricted category terms the brand brief bans)
 *   5. 0 duplicate element ids per document
 *
 * A navigation `<a href="https://github.com/…">` is not a loaded resource and
 * is therefore allowed; what must not exist is anything the browser would fetch
 * from another origin.
 *
 * Claim 5 is checked separately and only on `.html`, because the other four are
 * substring rules over every shipped file. Two elements sharing an id make the
 * document invalid and leave `#fragment` resolution to document order, which is
 * silent: the homepage briefly rendered both `FeaturesGrid` and a
 * `SectionPointers` row as `id="features"`, every gate stayed green, and only a
 * per-document census could see it.
 *
 * Positive controls: `--self-test` feeds a known-dirty fixture through the same
 * rules, so a green 0 can be told apart from a scanner that matches nothing.
 *
 * Usage:
 *   npm run check:out                 # scan ./out
 *   node tools/scan-compliance.mjs dist
 *   node tools/scan-compliance.mjs --self-test
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, extname } from "node:path";

const ROOT = process.cwd();
const ARGS = process.argv.slice(2);
const SELF_TEST = ARGS.includes("--self-test");
const TARGET = ARGS.find((a) => !a.startsWith("--")) ?? "out";
const DIR = join(ROOT, TARGET);

/** Substrings that would mean a visitor's browser phones home. */
const TRACKING = [
  "googletagmanager", "google-analytics", "gtag(", "dataLayer", "_gaq",
  "fbq(", "facebook.com/tr", "hotjar", "clarity.ms", "plausible.io",
  "useplausible", "umami", "matomo", "piwik", "mixpanel", "amplitude",
  "segment.io", "analytics.js", "posthog", "yandex.ru/metrika", "mc.yandex",
];

/** Origins that would mean an external asset is *loaded*. */
const REMOTE_ASSET_HOSTS = [
  "fonts.googleapis.com", "fonts.gstatic.com", "use.typekit.net",
  "cdn.jsdelivr.net", "unpkg.com", "cdnjs.cloudflare.com",
  "esm.sh", "pagecdn.io", "bootstrapcdn.com", "recaptcha.net",
  "googleapis.com", "gravatar.com", "doubleclick.net",
];

/**
 * Attributes/constructs that actually load something. `scope: "tag"` extends the
 * tested window from the match to the end of the element, and `"call"` to the
 * closing parenthesis — the patterns themselves only capture the start of the
 * attribute, so without that window neither the `rel` allowlist nor the
 * self-origin exemption below can ever see the URL they are meant to judge.
 */
const RESOURCE_PATTERNS = [
  { re: /<script[^>]+\bsrc\s*=\s*["']?(https?:)?\/\//gi, why: "remote <script src>", scope: "tag" },
  { re: /<link[^>]+\bhref\s*=\s*["']?(https?:)?\/\//gi, why: "remote <link href>", scope: "tag", allowlist: /rel\s*=\s*["']?(canonical|alternate|prefetch|dns-prefetch|preconnect|author|me|publisher)/i },
  { re: /<img[^>]+\bsrc\s*=\s*["']?(https?:)?\/\//gi, why: "remote <img src>", scope: "tag" },
  { re: /<(?:video|audio|source|iframe)[^>]+\bsrc\s*=\s*["']?(https?:)?\/\//gi, why: "remote media/iframe", scope: "tag" },
  { re: /@import\s+(?:url\()?\s*["']?(https?:)?\/\//gi, why: "CSS @import of a remote sheet", scope: "call" },
  // `(?<!new\s)` keeps a JavaScript `new URL("https://…")` out of a *CSS* rule:
  // core-js in Next's polyfill chunk runs feature tests written exactly that way.
  { re: /(?<!\bnew\s)url\(\s*["']?(https?:)?\/\//gi, why: "CSS url() pointing off-origin", scope: "call" },
  { re: /\bfetch\(\s*["'](https?:)?\/\//gi, why: "fetch() to an absolute URL", scope: "call" },
  { re: /<img[^>]+\bsrcSet\s*=\s*["']?(https?:)?\/\//gi, why: "remote srcset", scope: "tag" },
];

/** The text a rule is actually allowed to judge: match start → end of tag/call. */
function windowOf(text, start, scope) {
  if (scope === "call") {
    const close = text.indexOf(")", start);
    return text.slice(start, close === -1 ? Math.min(text.length, start + 200) : close + 1);
  }
  const gt = text.indexOf(">", start);
  return text.slice(start, gt === -1 ? Math.min(text.length, start + 400) : gt + 1);
}

const LOCAL_PATH_PATTERNS = [
  /\/Users\/[^\s"'<>]*/,
  /\/home\/[a-z][^\s"'<>]*/,
  /\/private\/var\/folders\//,
  /C:\\Users\\/i,
];

/**
 * This site's own origin — `SITE_HOST` / `SITE_ORIGIN` in `src/lib/site.ts`.
 * An absolute URL pointing back here fetches nothing from a third party, and
 * the canonical link, the Open Graph URL and the sitemap legitimately spell the
 * host out in full. The lookahead is what makes the exemption safe: without it
 * `popopx.chat.example.com` would be treated as this origin, and `//popopx.chat`
 * never matches the two sibling portals anyway, so `node.popopx.chat` /
 * `mp.popopx.chat` stay navigation-only.
 */
const SELF_ORIGIN = /\/\/popopx\.chat(?![\w.-])/i;

/**
 * The three official POPOPX portals (this one plus the two siblings the navbar
 * links). A `rel="canonical|alternate|preconnect|…"` reference is only exempt
 * when it points at one of these hosts: `rel` describes the relationship, it
 * does not license a declaration about somebody else's site, and without this
 * bound `popopx.chat.example.com` would slip through the allowlist.
 */
const PORTAL_HOSTS = /\/\/(?:popopx\.chat|node\.popopx\.chat|mp\.popopx\.chat)(?![\w.-])/i;

const BANNED_WORDS = [
  { word: "SimpleX", re: /simplex/i, note: "legacy upstream project name" },
  { word: "VPN", re: /\bVPN\b/, note: "restricted category term" },
  { word: "代理", re: /代理/, note: "proxy wording" },
  { word: "专网", re: /专网/, note: "private-network wording" },
  { word: "军工", re: /军工/, note: "military-industrial wording" },
];

const SCANNABLE = new Set([".html", ".js", ".css", ".json", ".txt", ".xml", ".svg", ".webmanifest"]);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === ".DS_Store") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, out);
    } else if (SCANNABLE.has(extname(entry).toLowerCase())) {
      out.push(full);
    }
    // Anything else is a binary asset (png/ico/woff); it carries no code.
  }
  return out;
}

function scanText(text) {
  const hits = [];

  for (const needle of TRACKING) {
    if (text.includes(needle)) hits.push({ kind: "tracking", evidence: needle });
  }

  for (const host of REMOTE_ASSET_HOSTS) {
    if (text.includes(host)) hits.push({ kind: "remote-asset-host", evidence: host });
  }

  for (const { re, why, scope, allowlist } of RESOURCE_PATTERNS) {
    for (const match of text.matchAll(re)) {
      const window = windowOf(text, match.index, scope);
      if (SELF_ORIGIN.test(window)) continue;
      if (allowlist && PORTAL_HOSTS.test(window) && allowlist.test(window)) continue;
      hits.push({ kind: "external-reference", evidence: `${why}: ${window.trim()}` });
    }
  }

  for (const re of LOCAL_PATH_PATTERNS) {
    const match = text.match(re);
    if (match) hits.push({ kind: "local-path-leak", evidence: match[0] });
  }

  for (const { word, re } of BANNED_WORDS) {
    const match = text.match(re);
    if (match) hits.push({ kind: "banned-word", evidence: `${word} (${match[0]})` });
  }

  return hits;
}

/* ------------------------------------------------------------------ */
/* Claim 5: id uniqueness inside one document.                         */
/* ------------------------------------------------------------------ */

/**
 * Only the plain attribute form counts. Next also streams the rendered markup
 * into `<script>self.__next_f.push(…)` as escaped JSON, where the same attribute
 * reads `id=\"features\"`; the backslash before the quote means those
 * occurrences are not matched twice, so a real duplicate is reported once per
 * document body rather than once per copy.
 */
const ID_ATTR = /\bid="([^"]+)"/g;

function duplicateIds(text) {
  const seen = new Map();
  for (const [, value] of text.matchAll(ID_ATTR)) {
    seen.set(value, (seen.get(value) ?? 0) + 1);
  }
  return [...seen].filter(([, n]) => n > 1).map(([value, n]) => `${value} x${n}`);
}

/** Everything the scanner judges about one piece of shipped text. */
function checkAll(text) {
  return [
    ...scanText(text),
    ...duplicateIds(text).map((evidence) => ({ kind: "duplicate-id", evidence })),
  ];
}

/* ------------------------------------------------------------------ */
/* Positive controls: the scanner must fail on a known-dirty fixture. */
/* ------------------------------------------------------------------ */
if (SELF_TEST) {
  const fixtures = [
    { name: "tracking", text: '<script>window.dataLayer = window.dataLayer || [];</script>' },
    { name: "remote-script", text: '<script src="https://cdn.jsdelivr.net/npm/x.js"></script>' },
    { name: "remote-font", text: '<link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet">' },
    { name: "remote-img", text: '<img src="https://gravatar.com/avatar/abc">' },
    { name: "css-url", text: 'body{background:url(https://example.com/a.png)}' },
    { name: "local-path", text: 'const p = "/Users/dev/popopx-chat/out/index.html";' },
    { name: "banned-simplex", text: '<p>simplex legacy name</p>' },
    { name: "banned-vpn", text: '<p>最快的 VPN 节点</p>' },
    { name: "banned-daili", text: '<p>内置代理</p>' },
    // The two rules below are the ones the self-origin/allowlist exemptions
    // could silently break: an off-origin link that merely *looks* like ours.
    { name: "lookalike-host", text: '<link rel="canonical" href="https://popopx.chat.example.com/">' },
    { name: "remote-preload", text: '<link rel="modulepreload" href="https://unpkg.com/thing.js">' },
    { name: "duplicate-id", text: '<main id="hero"><section id="hero"><h1 id="hero-title">x</h1></section></main>' },
  ];
  let missed = 0;
  for (const f of fixtures) {
    const found = checkAll(f.text);
    if (found.length === 0) {
      console.log(`CONTROL FAIL  ${f.name}: scanner found nothing in ${f.text.slice(0, 60)}`);
      missed += 1;
    } else {
      console.log(`control ok    ${f.name} -> ${found[0].kind}`);
    }
  }
  // And the must-be-clean controls, so the rules are not simply "match all".
  const clean = [
    '<link href="https://popopx.chat/" rel="canonical">',
    '<link rel="canonical" href="https://popopx.chat/">',
    '<link rel="alternate" hreflang="zh-Hans" href="https://popopx.chat/">',
    '<link rel="alternate" hreflang="x-default" href="https://node.popopx.chat/">',
    '<a href="https://github.com/popopx-chat/popopx-chat">GitHub</a>',
    '<a href="https://node.popopx.chat/">Mac Node</a>',
    '<a href="https://mp.popopx.chat/">Service Suite</a>',
    '<img src="/logo-popopx.png" alt="POPOPX">',
    'new URL("https://example.com/feature-test")',
    // Unique ids that merely share a prefix — the census counts exact values.
    '<section id="hero"><h1 id="hero-title">x</h1><aside id="hero-card">y</aside></section>',
  ];
  let falsePositives = 0;
  for (const text of clean) {
    const found = checkAll(text);
    if (found.length > 0) {
      console.log(`CONTROL FAIL (false positive) ${text.slice(0, 60)} -> ${found[0].kind}: ${found[0].evidence}`);
      falsePositives += 1;
    }
  }
  console.log(
    `self-test: ${fixtures.length - missed}/${fixtures.length} dirty fixtures caught, ` +
      `${clean.length - falsePositives}/${clean.length} clean samples passed through`,
  );
  process.exit(missed + falsePositives > 0 ? 1 : 0);
}

/* ------------------------------------------------------------------ */
/* The real scan.                                                     */
/* ------------------------------------------------------------------ */
if (!existsSync(DIR)) {
  console.error(`scan: ${TARGET}/ does not exist — run 'npm run build' first`);
  process.exit(1);
}

const files = walk(DIR);
const findings = [];

function push(kind, file, evidence) {
  findings.push({ kind, file: relative(ROOT, file), evidence: String(evidence).slice(0, 160) });
}

for (const file of files) {
  const text = readFileSync(file, "utf8");
  for (const hit of scanText(text)) {
    push(hit.kind, file, hit.evidence);
  }
  if (extname(file).toLowerCase() === ".html") {
    for (const dup of duplicateIds(text)) push("duplicate-id", file, dup);
  }
}

const byKind = {};
for (const f of findings) {
  byKind[f.kind] = (byKind[f.kind] ?? 0) + 1;
}

console.log(`scan: ${files.length} shipped files under ${TARGET}/`);
for (const f of findings) {
  console.log(`FAIL [${f.kind}] ${f.file} — ${f.evidence}`);
}
console.log(
  `scan: tracking=${byKind.tracking ?? 0} external-cdn=${(byKind["remote-asset-host"] ?? 0) + (byKind["external-reference"] ?? 0)} ` +
    `local-path=${byKind["local-path-leak"] ?? 0} banned-word=${byKind["banned-word"] ?? 0} duplicate-id=${byKind["duplicate-id"] ?? 0}`,
);

if (findings.length > 0) {
  console.error("scan: compliance gate FAILED");
  process.exit(1);
}
console.log(
  "scan: 0 external trackers · 0 external CDN links · 0 local path leakage · 0 banned words · 0 duplicate ids",
);
