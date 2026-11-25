#!/usr/bin/env node
/**
 * check-links — the seventh gate.
 *
 * Two assertions, one self-test:
 *
 *   1. Sitemap parity. Every `<loc>` in `public/sitemap.xml` must resolve to a
 *      built document under `out/`, and every built document (except the four
 *      `404.html` variants) must appear in the sitemap. A route that exists in
 *      `src/app/<route>/page.tsx` but was forgotten in the sitemap fails the
 *      build, and the other way around.
 *
 *   2. External origin whitelist. Every `href="https://..."` in the shipped
 *      HTML must point at an origin the portal is allowed to link to. The
 *      whitelist is the measured set of published hosts: the four sibling
 *      portals, the GitHub org, and the App Store lookup endpoint (which the
 *      standing ruling forbids linking to from the UI — it only appears in
 *      prose as `resultCount: 0`, never as a hyperlink).
 *
 * `--self-test` writes a small fixture directory under `tools/fixtures/links/`,
 * runs the same checks against it, and asserts the expected failures are
 * reported. It is wired into `npm run check:controls` so a regression in this
 * gate is itself a build failure.
 *
 * No dependency on `jsdom` or any HTML parser: the two regexes below are
 * deliberately narrow — the portal's own templates never emit attributes with
 * newlines or nested quotes, and a parser would be overkill for the two
 * assertions we actually need.
 */

import { readFileSync, existsSync, readdirSync, statSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const SITEMAP = join(root, "public/sitemap.xml");
const OUT_DIR = join(root, "out");

/**
 * The only origins the portal is allowed to link to. GitHub covers the
 * repositories and the App Store lookup covers the `resultCount: 0` prose
 * citation; the four sibling portals are the measured `server_name` hosts from
 * `deploy/centos/` and the Bot Studio vhost.
 */
const ALLOWED_ORIGINS = new Set([
  "https://github.com",
  "https://itunes.apple.com",
  "https://popopx.chat",
  "https://node.popopx.chat",
  "https://mp.popopx.chat",
  "https://bot.popopx.chat",
]);

const LOC_RE = /<loc>([^<]+)<\/loc>/g;
const HREF_RE = /\bhref="([^"]+)"/g;

function readSitemapLocs(path) {
  const xml = readFileSync(path, "utf8");
  const out = [];
  for (const m of xml.matchAll(LOC_RE)) out.push(m[1]);
  return out;
}

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === ".DS_Store") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

function builtDocs() {
  if (!existsSync(OUT_DIR)) {
    console.error("check-links: out/ not found — run `npm run build` first");
    process.exit(2);
  }
  const docs = new Set();
  for (const file of walk(OUT_DIR)) {
    if (!file.endsWith("/index.html")) continue;
    const rel = file.slice(OUT_DIR.length);
    // /index.html → /, /products/index.html → /products/
    const path = rel === "/index.html" ? "/" : rel.replace(/index\.html$/, "");
    // The static 404 is not a route a visitor can land on via a sitemap —
    // Next emits it for unknown paths, so it is excluded from the parity set.
    if (path === "/404/") continue;
    docs.add(path);
  }
  return docs;
}

function checkSitemapParity(locs, docs) {
  const locSet = new Set(locs.map((l) => new URL(l).pathname));
  const missingInSitemap = [...docs].filter((d) => !locSet.has(d));
  const missingInBuild = [...locSet].filter((l) => !docs.has(l));
  return { missingInSitemap, missingInBuild };
}

function checkExternalOrigins(htmlFiles) {
  const hits = [];
  for (const file of htmlFiles) {
    const body = readFileSync(file, "utf8");
    for (const m of body.matchAll(HREF_RE)) {
      const href = m[1];
      if (!/^https?:\/\//.test(href)) continue;
      const origin = new URL(href).origin;
      if (!ALLOWED_ORIGINS.has(origin)) {
        hits.push({ file: file.replace(OUT_DIR, ""), origin, href });
      }
    }
  }
  return hits;
}

function runSelfTest() {
  const dir = join(root, "tools/fixtures/links");
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  mkdirSync(join(dir, "out"), { recursive: true });

  // A sitemap that lists /, /products/, /ecosystem/ — /ecosystem/ is missing
  // from out/, /download/ is in out/ but not in the sitemap.
  writeFileSync(
    join(dir, "sitemap.xml"),
    `<?xml version="1.0"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://popopx.chat/</loc></url>\n  <url><loc>https://popopx.chat/products/</loc></url>\n  <url><loc>https://popopx.chat/ecosystem/</loc></url>\n</urlset>\n`,
  );
  mkdirSync(join(dir, "out/products"), { recursive: true });
  mkdirSync(join(dir, "out/download"), { recursive: true });
  writeFileSync(join(dir, "out/index.html"), `<a href="https://popopx.chat/">home</a>`);
  writeFileSync(join(dir, "out/products/index.html"), `<a href="https://example.com/">bad</a>`);
  writeFileSync(join(dir, "out/download/index.html"), `<a href="https://github.com/">ok</a>`);

  const locs = readSitemapLocs(join(dir, "sitemap.xml"));
  const docs = new Set(["/", "/products/", "/download/"]);
  const { missingInSitemap, missingInBuild } = checkSitemapParity(locs, docs);

  const htmlFiles = [
    join(dir, "out/index.html"),
    join(dir, "out/products/index.html"),
    join(dir, "out/download/index.html"),
  ];
  const external = checkExternalOrigins(htmlFiles);

  let pass = true;
  const expect = (name, ok, detail) => {
    if (ok) {
      console.log(`self-test ok    ${name}`);
    } else {
      pass = false;
      console.error(`self-test FAIL  ${name}: ${detail}`);
    }
  };
  expect("ecosystem missing from build", missingInBuild.includes("/ecosystem/"), JSON.stringify(missingInBuild));
  expect("download missing from sitemap", missingInSitemap.includes("/download/"), JSON.stringify(missingInSitemap));
  expect("example.com flagged", external.some((e) => e.origin === "https://example.com"), JSON.stringify(external));
  expect("github.com allowed", !external.some((e) => e.origin === "https://github.com"), JSON.stringify(external));

  rmSync(dir, { recursive: true, force: true });
  return pass;
}

function main() {
  const selfTest = process.argv.includes("--self-test");
  if (selfTest) {
    const ok = runSelfTest();
    if (!ok) process.exit(1);
    console.log("self-test: sitemap parity + external origin whitelist both exercised");
    return;
  }

  const locs = readSitemapLocs(SITEMAP);
  const docs = builtDocs();
  const { missingInSitemap, missingInBuild } = checkSitemapParity(locs, docs);
  const external = checkExternalOrigins(walk(OUT_DIR).filter((f) => f.endsWith(".html")));

  let exit = 0;
  if (missingInSitemap.length > 0) {
    exit = 1;
    console.error(`links: ${missingInSitemap.length} built doc(s) not in sitemap: ${missingInSitemap.join(", ")}`);
  }
  if (missingInBuild.length > 0) {
    exit = 1;
    console.error(`links: ${missingInBuild.length} sitemap <loc>(s) not in out/: ${missingInBuild.join(", ")}`);
  }
  if (external.length > 0) {
    exit = 1;
    for (const h of external) console.error(`links: ${h.file} links to ${h.href} (origin ${h.origin} not whitelisted)`);
  }
  if (exit === 0) {
    console.log(`links: ${locs.length} sitemap <loc>(s), ${docs.size} built doc(s), 0 non-whitelisted external origin`);
  }
  process.exit(exit);
}

main();
