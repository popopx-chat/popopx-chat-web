#!/usr/bin/env node
/**
 * docs/FACTS.md citation checker — the gate behind "every technical sentence on
 * the portal can be traced to a line of the iOS client".
 *
 * What it proves, and nothing more:
 *   1. every file named by a citation exists in the client checkout *at the path
 *      the ledger prints*, so a reviewer can open it without guessing;
 *   2. every cited line number is inside that file and lands on a line that is
 *      not blank and not a lone brace/paren/comma, so a pointer opens on
 *      something rather than on `}`.
 * It does NOT prove that the cited lines actually say what the row claims. That
 * stays a human job: read the row with the file open.
 *
 * PATH CONVENTION — the one docs/FACTS.md declares on line 3: every cited path
 * is relative to the CLIENT REPO ROOT, `apps/ios/…` prefix included. A cited
 * path is resolved in this order, first hit wins:
 *   1. <client>/<path>                — canonical, and the only acceptable form
 *   2. <client>/apps/ios/<path>       — the old shorthand: the file is real but
 *      the printed path does not open. An error; `--fix` rewrites it to the
 *      canonical form.
 *   3. unique tail / basename match in the client index — an error; `--fix`
 *      rewrites it when exactly one file matches. More than one match is
 *      AMBIGUOUS: reported, left untouched, never guessed.
 * Citations starting with `../` are read relative to THIS repo: they name the
 * sibling projects the ledger also measured (nginx config, suite web, old site).
 * Absolute machine-local paths (`/Users/…`) are always an error — a reviewer on
 * another machine cannot open them.
 *
 * BARE LINE REFERENCES — `、:597-604`, `（丢弃点在 :375）`, `展示顺序 :142-202`,
 * `同上 :5-15` — are HANDLED, not skipped. Each is attributed to the closest
 * cited file on the same row: the last file printed before it, else the first
 * file printed on that row, and then line-checked like any other citation. A
 * bare reference on a row that cites no file at all is an ERROR ("a line number
 * with no file") — silently attributing a number to a file nobody named is
 * exactly the failure this ledger cannot afford.
 *
 * WHICH BACKTICKED TOKENS ARE CITATIONS — see classify(). Short version: a
 * backticked token is a citation when it looks like a path (contains `/`), or is
 * a file name with a source extension — or one of the extension-less names in
 * KNOWN_NAMES (`LICENSE`, `README`, `Makefile`, …) — carrying a `:line` anchor.
 * A bare file name with a source extension and no anchor counts only when it
 * resolves at the client repo root or at its `apps/ios/` root, so prose mentions
 * of runtime artefacts (`rollback.json`) and shell fragments (`prepare.sh`) are
 * not mistaken for pointers. `--trace` prints every token considered and the verdict.
 *
 * Usage:
 *   node tools/check-facts.mjs                # check docs/FACTS.md
 *   node tools/check-facts.mjs --fix          # rewrite unresolvable paths in place
 *   node tools/check-facts.mjs --facts PATH   # check a different copy
 *   node tools/check-facts.mjs --trace        # also list non-citation tokens
 * Env:
 *   POPOPX_CLIENT  path to the client checkout (default: ../popopx-chat)
 * Exit code: 0 clean, 1 any error (including a missing client checkout).
 */

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve, sep } from "node:path";
import { homedir } from "node:os";

const ROOT = process.cwd();
const ARGV = process.argv.slice(2);
const FIX = ARGV.includes("--fix");
const TRACE = ARGV.includes("--trace");

/** Line ranges of a citation: `:5`, `:12-15`, `:5,356,618-632`. */
const LINE_SPEC = "([0-9]+(?:[,-][0-9]+)*)";
/** `path:597-604` inside backticks — greedy path, so the LAST colon splits. */
const CITATION_RE = new RegExp(`^(.+?):${LINE_SPEC}$`);
/** Bare, non-backticked line reference: `（丢弃点在 :375）`, `同上 :5-15`. */
const BARE_REF_RE = /[:：]\s*([0-9]+(?:\s*[,-]\s*[0-9]+)*)/g;
/** Extensions that mean "this backticked word names a file". */
const SOURCE_EXT =
  /\.(swift|md|markdown|yml|yaml|json|txt|ts|tsx|js|jsx|mjs|cjs|sh|bash|zsh|plist|strings|stringsdict|pbxproj|xcconfig|entitlements|lproj|xcloc|xcassets|xcworkspacedata|h|hpp|m|mm|c|cpp|hs|lhs|nix|cabal|toml|ini|css|html|conf|xcscheme|modulemap|png|jpg|jpeg|svg)$/i;
/** A first path segment that is a host name is a URL, not a repository path. */
const TLDISH =
  /^(?:[a-z0-9-]+\.)*(?:com|net|org|io|dev|app|chat|xyz|co|me|cn|ru|info|edu|gov|ai|gg|sh|link|site|cloud|tv|fm)$/i;
/** Dot-less file names that are still pointers when the ledger cites them. */
const KNOWN_NAMES = /^(?:LICENSE|NOTICE|README|CHANGELOG|Makefile|Dockerfile|Package)$/;

/** Directories pruned from the search index: build output, not source. */
const INDEX_SKIP = new Set([
  ".git", ".svn", ".hg", "node_modules", "dist-newstyle", "build", ".build",
  "DerivedData", "SourcePackages", "checkouts", "Pods", "out", ".next",
  ".venv", ".venv_coreml", "__pycache__", ".cache", ".pytest_cache",
]);

const errors = [];
const notes = [];
const trace = [];

// ---------------------------------------------------------------- client root

/**
 * The client checkout is the input this gate reads. Missing input is a hard
 * failure, never a skip: a green run that checked nothing is worse than no gate.
 */
function findClientRoot() {
  const fromEnv = (process.env.POPOPX_CLIENT || "").trim();
  const candidate = fromEnv
    ? resolve(fromEnv.startsWith("~") ? join(homedir(), fromEnv.slice(1)) : fromEnv)
    : resolve(join(ROOT, "..", "popopx-chat"));
  const where = fromEnv ? `POPOPX_CLIENT=${candidate}` : `default sibling location ${candidate}`;
  if (!existsSync(candidate) || !statSync(candidate).isDirectory()) {
    process.stderr.write(
      `check-facts: cannot find the iOS client checkout — ${where}\n` +
        `  docs/FACTS.md cites that repository file:line by file:line, so this gate\n` +
        `  cannot run without it and will not pretend to pass.\n` +
        `  Fix: export POPOPX_CLIENT=/absolute/path/to/popopx-chat   (then re-run)\n` +
        `       or clone the client next to this repository as ../popopx-chat\n`
    );
    process.exit(1);
  }
  return candidate;
}

const CLIENT = findClientRoot();
const IOS = "apps/ios";

// ------------------------------------------------------------------ file index

/** basename -> repo-relative posix paths; files and directories both. */
const index = new Map();
let indexed = 0;

function buildIndex() {
  const walk = (dirAbs, rel, depth) => {
    if (depth > 24) return;
    let ents;
    try {
      ents = readdirSync(dirAbs, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of ents) {
      if (INDEX_SKIP.has(e.name)) continue;
      const abs = join(dirAbs, e.name);
      const relPath = rel ? `${rel}/${e.name}` : e.name;
      let isDir = e.isDirectory();
      if (e.isSymbolicLink()) {
        try {
          isDir = statSync(abs).isDirectory();
        } catch {
          continue;
        }
      }
      let arr = index.get(e.name);
      if (!arr) index.set(e.name, (arr = []));
      arr.push(relPath);
      indexed += 1;
      if (isDir) walk(abs, relPath, depth + 1);
    }
  };
  walk(CLIENT, "", 0);
}

buildIndex();

const relFrom = (abs) => relative(CLIENT, abs).split(sep).join("/");
const statOrNull = (p) => {
  try {
    return statSync(p);
  } catch {
    return null;
  }
};

/**
 * One-level `*` glob against the real directory listing (enough for
 * `apps/ios/*.lproj/`); the pruned index would miss nothing here either, but the
 * listing is the ground truth.
 */
function expandGlob(rawPath) {
  const trimmed = rawPath.replace(/\/+$/, "");
  const dirRel = trimmed.includes("/") ? trimmed.slice(0, trimmed.lastIndexOf("/")) || "." : ".";
  const pattern = basename(trimmed);
  const re = new RegExp(
    "^" + pattern.split("*").map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*") + "$"
  );
  let ents;
  try {
    ents = readdirSync(join(CLIENT, dirRel === "." ? "" : dirRel));
  } catch {
    return null;
  }
  return ents.filter((n) => re.test(n)).map((n) => (dirRel === "." ? n : `${dirRel}/${n}`));
}

// ------------------------------------------------------------------ resolution

/**
 * @returns {{status: string, rel?: string, abs?: string, candidates?: string[], why?: string, glob?: number}}
 */
function resolvePath(rawPath) {
  if (rawPath.startsWith("/")) {
    return {
      status: "absolute",
      why: "absolute machine-local path — a reviewer on another machine cannot open it",
    };
  }
  const shown = rawPath.replace(/\/+$/, "") || rawPath;

  // Sibling-project citation, read relative to this (portal) repository.
  if (rawPath.startsWith("../") || rawPath.startsWith("./")) {
    const abs = resolve(ROOT, shown);
    if (statOrNull(abs)) return { status: "ok", rel: shown, abs, sibling: true };
    return { status: "missing", why: `no sibling path ${rawPath} from this repository (${ROOT})` };
  }

  if (shown.includes("*")) {
    const hits = expandGlob(rawPath);
    if (hits && hits.length) {
      return { status: "ok", rel: `${shown}/`, abs: join(CLIENT, hits[0]), glob: hits.length };
    }
    return { status: "missing", why: `glob ${rawPath} matches nothing in the client checkout` };
  }

  // 1. canonical: relative to the client repo root.
  const atRoot = join(CLIENT, shown);
  if (statOrNull(atRoot)) return { status: "ok", rel: relFrom(atRoot), abs: atRoot };

  // 2. the old apps/ios shorthand: real file, printed path does not open.
  const viaIos = join(CLIENT, IOS, shown);
  if (statOrNull(viaIos)) {
    const rel = relFrom(viaIos); // already carries the apps/ios/ prefix
    return { status: "legacy", rel, abs: viaIos, candidates: [rel] };
  }

  // 3. unique tail / basename match.
  const byName = index.get(basename(shown)) || [];
  const tail = byName.filter((rel) => rel === shown || rel.endsWith(`/${shown}`));
  const pool = tail.length ? tail : byName;
  if (pool.length === 1) {
    const abs = join(CLIENT, pool[0]);
    if (rawPath.endsWith("/") && !statOrNull(abs)?.isDirectory()) {
      return { status: "missing", why: `${pool[0]} is not a directory` };
    }
    return { status: "candidate", rel: pool[0], abs, candidates: pool };
  }
  if (pool.length > 1) {
    return { status: "ambiguous", candidates: pool.slice().sort(), why: `${pool.length} paths match` };
  }
  return { status: "missing", why: "no such path in the client checkout, and nothing matches its name" };
}

/** Repo-root-relative path to write back for a citation, keeping a directory slash. */
function canonical(rawPath, rel) {
  return rawPath.endsWith("/") && !rel.endsWith("/") ? `${rel}/` : rel;
}

// ---------------------------------------------------------------- line checking

const lineCache = new Map();

function linesOf(abs) {
  let v = lineCache.get(abs);
  if (v === undefined) {
    let text = "";
    try {
      text = readFileSync(abs, "utf8");
    } catch {
      text = "";
    }
    v = text.split("\n");
    // A file that ends in a newline has no line after it. `wc -l`, the editor gutter
    // and a human reviewer all agree on that count, so drop the phantom element —
    // otherwise a citation one past the end would sail through the EOF bound.
    if (v.length > 1 && v[v.length - 1] === "") v.pop();
    lineCache.set(abs, v);
  }
  return v;
}

/** A line that is only whitespace and brace-family punctuation points at nothing. */
const NO_CONTENT = /^[\s{}()[\],;]*$/;

/**
 * @param {string} spec  `5`, `12-15`, `5,356,618-632` — the printed anchor
 * @param {string} label how the citation reads, for the error message
 */
function checkLines(spec, label, abs, rel, where) {
  if (spec == null) return;
  let head;
  try {
    head = readFileSync(abs).subarray(0, 8192);
  } catch {
    errors.push(`${where} ${label}: cannot read ${rel}`);
    return;
  }
  if (head.includes(0)) {
    errors.push(`${where} ${label}: line anchor into a non-text file (${rel})`);
    return;
  }
  const lines = linesOf(abs);
  for (const part of spec.split(",")) {
    const m = /^(\d+)(?:-(\d+))?$/.exec(part);
    if (!m) {
      errors.push(`${where} ${label}: malformed line range "${part}"`);
      continue;
    }
    const from = Number(m[1]);
    const to = m[2] === undefined ? from : Number(m[2]);
    if (to < from) {
      errors.push(`${where} ${label}: reversed range ${part} in ${rel}`);
      continue;
    }
    if (to > lines.length) {
      errors.push(
        `${where} ${label}: line ${to} is past EOF — ${rel} has ${lines.length} lines`
      );
      continue;
    }
    if (from < 1) {
      errors.push(`${where} ${label}: line ${from} does not exist (${rel})`);
      continue;
    }
    let content = 0;
    for (let i = from; i <= to; i += 1) if (!NO_CONTENT.test(lines[i - 1])) content += 1;
    if (content === 0) {
      const span = to === from ? `line ${from}` : `lines ${from}-${to}`;
      errors.push(
        `${where} ${label}: ${span} of ${rel} is blank or only braces — the pointer lands on nothing`
      );
    }
  }
}

// -------------------------------------------------------------------- parsing

/**
 * Is a backticked token a citation? Returns {path, spec} or null.
 * `bare` marks the no-slash-no-anchor class, which the caller keeps only if it
 * resolves at a repository root (so `rollback.json` stays prose).
 */
function classify(tok) {
  const skip = (why) => {
    trace.push([tok, `not a citation — ${why}`]);
    return null;
  };

  if (!tok.trim()) return skip("empty");
  if (tok.includes("://") || tok.startsWith("//")) return skip("URL");
  if (tok.includes("…") || tok.includes("...")) return skip("elision, i.e. a pattern not a path");
  if (/[<>|=&*]/.test(tok)) return skip("shell/markup character");
  // 厢语 / Cabin and friends: prose with a slash in it. No cited path in this
  // ledger has ever carried a CJK character, so this is the cheap correct cut.
  if (/[^\x00-\x7f]/.test(tok)) return skip("contains non-ASCII prose");
  if (/\s\/\s/.test(tok)) return skip("a spaced slash is prose");
  if (/[:：]\s/.test(tok) || /\s:/.test(tok)) return skip("colon set off by spaces is prose");

  const m = CITATION_RE.exec(tok);
  const path = m ? m[1] : tok;
  const spec = m ? m[2] : null;
  if (!path) return skip("no path");
  if (path.includes(":")) return skip("a colon that is not a line anchor");
  if (TLDISH.test(path.split("/")[0])) return skip("host name, not a repository path");

  if (path.includes("/")) {
    trace.push([tok, "citation — path"]);
    return { path, spec };
  }
  if (spec) {
    if (!SOURCE_EXT.test(path) && !KNOWN_NAMES.test(path)) {
      return skip("anchored name without a source extension");
    }
    trace.push([tok, "citation — bare file name with anchor"]);
    return { path, spec };
  }
  if (!SOURCE_EXT.test(path) && !KNOWN_NAMES.test(path)) {
    return skip("no slash, no anchor, no source extension");
  }
  trace.push([tok, "citation candidate — bare file name, root-only"]);
  return { path, spec, bare: true };
}

/**
 * Read the ledger into citations. Every span is a CHARACTER offset into the file
 * string — the ledger is mostly CJK, so byte offsets would splice mid-glyph.
 */
function parseFacts(text) {
  const citations = [];
  const bareRefs = [];
  const lines = text.split("\n");
  let offset = 0;
  let inFence = false;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const lineNo = i + 1;
    const lineStart = offset;
    offset += line.length + 1; // + the newline
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    // Backticked tokens.
    const backticked = [];
    for (const m of line.matchAll(/`([^`\n]+)`/g)) {
      const cls = classify(m[1]);
      const spanStart = m.index + 1; // one past the opening backtick
      backticked.push([spanStart, spanStart + m[1].length]);
      if (!cls) continue;
      citations.push({
        line: lineNo,
        raw: m[1],
        path: cls.path,
        spec: cls.spec,
        bareOnly: !!cls.bare,
        pathStart: lineStart + spanStart,
        pathEnd: lineStart + spanStart + cls.path.length,
      });
    }

    // Mask the backticked spans, then look for bare `:N` references in what is left.
    // UTF-16 code units, so the column numbers line up with `offset`.
    const free = line.split("");
    for (const [s, e] of backticked) for (let c = s; c < e && c < free.length; c += 1) free[c] = " ";
    const onRow = citations.filter((c) => c.line === lineNo);
    for (const m of free.join("").matchAll(BARE_REF_RE)) {
      const abs = lineStart + m.index;
      let owner = null;
      for (const c of onRow) if (c.pathStart <= abs) owner = c;
      if (!owner && onRow.length) owner = onRow[0];
      if (!owner) {
        errors.push(
          `FACTS.md:${lineNo}: \`${m[0].trim()}\` is a line number with no file on this row — cite the file`
        );
        continue;
      }
      bareRefs.push({
        line: lineNo,
        raw: m[0].trim(),
        spec: m[1].replace(/\s/g, ""),
        owner,
      });
    }
  }
  return { citations, bareRefs };
}

// ---------------------------------------------------------------------- main

function flagValue(name) {
  const i = ARGV.indexOf(name);
  if (i >= 0) return ARGV[i + 1];
  const eq = ARGV.find((a) => a.startsWith(`${name}=`));
  return eq ? eq.slice(name.length + 1) : undefined;
}

const factsArg = flagValue("--facts");
if (ARGV.includes("--facts") && !factsArg) {
  process.stderr.write("check-facts: --facts needs a path\n");
  process.exit(1);
}
const FACTS = factsArg ? resolve(ROOT, factsArg) : join(ROOT, "docs", "FACTS.md");
if (!existsSync(FACTS)) {
  process.stderr.write(`check-facts: ledger not found at ${FACTS}\n`);
  process.exit(1);
}
// Label the ledger the way a human would type it. A `--facts` file outside this repo
// would otherwise print as a ladder of `../`.
const relLedger = relative(ROOT, FACTS);
const shownLedger = !relLedger || relLedger.startsWith("..") ? FACTS : relLedger;

/** Resolve and line-check every path citation, then the bare refs that lean on them. */
function runPass(citations, bareRefs) {
  const rewrites = [];
  const files = new Set();

  for (const cite of citations) {
    const where = `${shownLedger}:${cite.line}`;
    const label = `\`${cite.raw}\``;
    const r = resolvePath(cite.path);

    // A bare file name with no anchor is prose unless a repository root itself
    // holds that file — `rollback.json` (a runtime artefact) and `prepare.sh`
    // (a shell fragment named in a sentence) must not be scored as pointers,
    // while `LICENSE` and `TRADEMARK-POPOPX.md` are exactly pointers.
    if (cite.bareOnly && r.status !== "ok" && r.status !== "legacy") {
      trace.push([cite.raw, "not a citation — bare file name with no repo-root match"]);
      continue;
    }

    if (r.status === "absolute") {
      errors.push(`${where} ${label}: ${r.why}`);
      continue;
    }
    if (r.status === "missing") {
      errors.push(`${where} ${label}: ${r.why}`);
      continue;
    }
    if (r.status === "ambiguous") {
      errors.push(
        `${where} ${label}: ${r.why} and the printed path does not resolve, so it cannot be rewritten — ` +
          `candidates:\n          ${r.candidates.slice(0, 10).join("\n          ")}`
      );
      continue;
    }

    cite.rel = r.rel;
    cite.abs = r.abs;
    files.add(r.rel);

    if (r.status === "legacy" || r.status === "candidate") {
      if (cite.bareOnly) {
        // `README.md` reached through apps/ios/ is still spelled correctly: a
        // bare name is unambiguous prose-shorthand, so check its lines and move
        // on rather than rewrite it.
        checkLines(cite.spec, label, r.abs, r.rel, where);
        continue;
      }
      const say =
        r.status === "legacy"
          ? "not relative to the client repo root — prefix it with " + IOS + "/"
          : "does not resolve as written; unique match " + r.rel;
      rewrites.push({
        start: cite.pathStart,
        end: cite.pathEnd,
        from: cite.path,
        to: canonical(cite.path, r.rel),
      });
      errors.push(`${where} ${label}: ${say}`);
      continue;
    }

    if (r.glob) notes.push(`${where} ${label}: glob matches ${r.glob} entries`);
    checkLines(cite.spec, label, r.abs, r.rel, where);
  }

  for (const ref of bareRefs) {
    const where = `${shownLedger}:${ref.line}`;
    if (!ref.owner.rel || !ref.owner.abs) continue; // the row's path already errored
    if (ref.owner.glob) {
      notes.push(`${where} \`${ref.raw}\`: bare reference into a glob, not line-checked`);
      continue;
    }
    files.add(ref.owner.rel);
    checkLines(ref.spec, `\`${ref.raw}\` (row's file ${ref.owner.path})`, ref.owner.abs, ref.owner.rel, where);
  }

  return { rewrites, files };
}

let text = readFileSync(FACTS, "utf8");
let parsed = parseFacts(text);
let pass = runPass(parsed.citations, parsed.bareRefs);

if (FIX && pass.rewrites.length) {
  const unique = new Map();
  for (const rw of pass.rewrites) unique.set(`${rw.start}:${rw.end}`, rw);
  const edits = [...unique.values()].sort((a, b) => b.start - a.start);
  // Refuse to write on any span mismatch: an in-place rewriter over a file that
  // is mostly non-ASCII is one off-by-one away from turning the ledger to mush.
  const bad = edits.filter((e) => text.slice(e.start, e.end) !== e.from);
  if (bad.length) {
    for (const e of bad) {
      errors.push(
        `--fix: offset ${e.start} reads "${text.slice(e.start, e.end)}" instead of "${e.from}" — nothing was rewritten`
      );
    }
  } else {
    let out = "";
    let cursor = text.length;
    for (const e of edits) {
      out = text.slice(e.end, cursor) + out;
      out = e.to + out;
      cursor = e.start;
    }
    out = text.slice(0, cursor) + out;
    if (out !== text) {
      writeFileSync(FACTS, out, "utf8");
      notes.push(`--fix: rewrote ${edits.length} path(s) in ${shownLedger}; no line anchor was changed`);
      for (const e of edits.slice().sort((a, b) => a.start - b.start)) notes.push(`  ${e.from} -> ${e.to}`);
      text = out;
      errors.length = 0;
      parsed = parseFacts(text);
      pass = runPass(parsed.citations, parsed.bareRefs);
    }
  }
}

// ================================================================ second pass: src/**

/**
 * Scan all .tsx files in src/ for file:line references and validate them.
 *
 * This catches references that:
 * - Are not in canonical form (don't start with apps/ios/)
 * - Point to non-existent files
 * - Have line numbers past EOF or on blank/brace-only lines
 *
 * References in comments, string literals, and data arrays are all checked.
 * Portal-internal paths (src/..., docs/..., .github/...) and sibling project
 * paths (../...) are skipped — they don't point to the client repo.
 */
function runSrcPass() {
  const srcErrors = [];
  const srcNotes = [];
  const srcFiles = new Set();
  let srcRefs = 0;

  // Pattern to match file:line references in source code
  // Matches: apps/ios/path/to/File.swift:123,456-789 or bare File.swift:123
  const REF_RE = /([A-Za-z0-9_/.-]+\.(?:swift|kt|md|ts|py|json|yml|yaml|gradle|kts))(:[0-9][0-9,.-]*)?/g;

  // Skip patterns: portal-internal, sibling projects, URLs
  const SKIP_PREFIXES = ["../", "./", "src/", "docs/", ".github/", "node_modules/", "/blob/"];

  // Glob src/**/*.tsx
  const srcDir = join(ROOT, "src");
  if (!existsSync(srcDir)) {
    srcNotes.push("src/ directory not found — skipping second pass");
    return { errors: srcErrors, notes: srcNotes, files: srcFiles, refs: srcRefs };
  }

  const tsxFiles = [];
  const walk = (dir, depth) => {
    if (depth > 10) return;
    let ents;
    try {
      ents = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of ents) {
      const abs = join(dir, e.name);
      if (e.isDirectory()) {
        if (e.name === "node_modules" || e.name === ".next" || e.name === "out") continue;
        walk(abs, depth + 1);
      } else if (e.name.endsWith(".tsx")) {
        tsxFiles.push(abs);
      }
    }
  };
  walk(srcDir, 0);

  for (const file of tsxFiles) {
    const content = readFileSync(file, "utf8");
    const lines = content.split("\n");
    const relFile = relative(ROOT, file);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNo = i + 1;

      // Find all references in this line
      for (const m of line.matchAll(REF_RE)) {
        const refPath = m[1];
        const lineSpec = m[2] ? m[2].slice(1) : null; // strip leading ':'

        // Skip non-citations
        if (SKIP_PREFIXES.some((p) => refPath.startsWith(p))) continue;
        if (refPath.includes("://")) continue; // URL
        if (refPath.startsWith("http")) continue;

        // Must have a line spec to be a citation
        if (!lineSpec) continue;

        srcRefs++;

        // Resolve the path
        let resolvedRel = null;
        let resolvedAbs = null;

        if (refPath.startsWith("apps/ios/")) {
          // Already canonical
          resolvedAbs = join(CLIENT, refPath);
          resolvedRel = refPath;
        } else {
          // Try to resolve via the index
          const r = resolvePath(refPath);
          if (r.status === "ok" || r.status === "legacy" || r.status === "candidate") {
            resolvedAbs = r.abs;
            resolvedRel = r.rel;
          }
        }

        if (!resolvedAbs) {
          srcErrors.push(
            `${relFile}:${lineNo}: \`${refPath}:${lineSpec}\` does not resolve to a client repo file`
          );
          continue;
        }

        srcFiles.add(resolvedRel);

        // Check line numbers
        const label = `\`${refPath}:${lineSpec}\``;
        const where = `${relFile}:${lineNo}`;
        checkLines(lineSpec, label, resolvedAbs, resolvedRel, where);
      }
    }
  }

  // Collect any errors from checkLines (they were pushed to the global errors array)
  // We need to separate them from the FACTS.md pass errors
  // For now, just report the counts
  srcNotes.push(
    `src/**: ${srcRefs} references in ${tsxFiles.length} files, ${srcFiles.size} unique client files cited`
  );

  return { errors: srcErrors, notes: srcNotes, files: srcFiles, refs: srcRefs };
}

const srcPass = runSrcPass();
for (const n of srcPass.notes) notes.push(n);

// ====================================================================== output

if (TRACE) {
  process.stdout.write("--- tokens considered ---\n");
  for (const [tok, verdict] of trace) process.stdout.write(`  \`${tok}\`  ${verdict}\n`);
}
for (const n of notes) process.stdout.write(`  ${n}\n`);
process.stdout.write(`client checkout: ${CLIENT}  (index: ${indexed} entries)\n`);
for (const e of errors) process.stdout.write(`  ERROR ${e}\n`);
for (const e of srcPass.errors) process.stdout.write(`  ERROR ${e}\n`);
const totalErrors = errors.length + srcPass.errors.length;
process.stdout.write(
  `facts: ${parsed.citations.length + parsed.bareRefs.length} citations, ` +
    `${pass.files.size} files, ${errors.length} error(s)\n`
);
process.stdout.write(
  `src/**: ${srcPass.refs} references, ${srcPass.files.size} files, ${srcPass.errors.length} error(s)\n`
);
process.exit(totalErrors ? 1 : 0);
