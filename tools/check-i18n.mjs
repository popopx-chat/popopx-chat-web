#!/usr/bin/env node
/**
 * i18n completeness checker — the oracle behind "the portal speaks the same 18
 * languages as the POPOPX iOS client".
 *
 * TypeScript already proves a `Localized<T>` object lists all 18 locales (it is
 * a total `Record`), so `npm run typecheck` catches a missing key. This script
 * catches the things the compiler cannot see:
 *
 *  1. a copy object that mixes locale tags with *stale* ones (`zh-CN`, `zh-TW`)
 *     or omits keys while still compiling because it is typed loosely;
 *  2. a locale slot that is not actually translated — i.e. the English (or
 *     Chinese) string pasted into every language, which compiles fine and reads
 *     like a broken site;
 *  3. simplified/traditional Chinese leakage inside the *same* slot, which the
 *     type system cannot see at all (a `zh-Hans` value written in traditional
 *     characters is a perfectly valid string);
 *  4. the three ways an 18-language claim is *faked* rather than made: a
 *     function returning a derived `Localized<…>` map, an `as
 *     Localized<string>` cast over an untyped map, and a copy object built by
 *     spreading another map. All three type-check while most languages silently
 *     render as whoever they were cloned from;
 *  5. a file that does not parse at all, which would otherwise contribute zero
 *     findings and read as a clean pass.
 *
 * It parses the real AST with the `typescript` devDependency, so it does not
 * depend on formatting.
 *
 * Usage:
 *   node tools/check-i18n.mjs              # report; exit 1 on a hard error
 *   node tools/check-i18n.mjs --quiet      # only print the summary lines
 *   node tools/check-i18n.mjs --self-test  # prove every defect class above is
 *                                          # still detected, over tools/fixtures
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");

/**
 * The 18 tags from `CFBundleLocalizations` in
 * `apps/ios/POPOPX--iOS--Info.plist` of the client repository, same order.
 */
const LOCALES = [
  "en", "ru", "de", "fr", "it", "nl", "cs", "zh-Hans", "zh-Hant", "es",
  "pl", "ja", "th", "fi", "uk", "bg", "tr", "hu",
];

/** Tags that must never appear in copy objects (the old tri-lingual scheme). */
const STALE = ["zh-CN", "zh-TW"];

const LOCALE_SET = new Set(LOCALES);
const QUIET = process.argv.includes("--quiet");

/**
 * A value is "technical" — and therefore legitimately identical in every
 * language — when it carries no translatable words: brand, protocol and API
 * tokens, commands, URLs, numbers, code-ish strings.
 */
function isTechnical(text) {
  if (text.length <= 3) return true;
  if (/^[A-Z0-9 .*:/#%&()+,;=_/\\[\]{}<>-]+$/.test(text)) return true; // ASCII caps/digits
  if (/^(https?:|ws?:|popopx:\/\/|\/|\.\/)/.test(text)) return true;
  if (/[${}<>|`]/.test(text)) return true;
  if (
    /^(POPOPX|ppxlz|AGPL|SPDX|ISO|X25519|XEd25519|ChaCha|Ed25519|HMAC|LZFSE|AES|SMP|BLE|GATT|EXIF|GPS|ID|iOS|iPhone|macOS|Swift|Xcode|ImageIO|AVFoundation|Compression|Face ID|FaceID|Popopx|Media|Server|Panic|Nginx|CentOS|Ubuntu|Docker|App Store|TestFlight|HTML|H5|JSON|URL|API|DMG|Universal)/.test(text)
  ) return true;
  if (/^[0-9.,:%\-–—\s]+$/.test(text)) return true;
  return false;
}

function hasNonLatinScript(text) {
  // Cyrillic / Greek / CJK / Thai / Japanese kana / Arabic / Hebrew ranges.
  return /[\u0301-\u0308\u0370-\u03FF\u0400-\u04FF\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\u0E00-\u0E7F\u0600-\u06FF\u0590-\u05FF\uAC00-\uD7AF]/.test(text);
}

/**
 * Locales written in a non-Latin script. A Latin word inside one of these slots
 * is either a protocol/brand token or untranslated residue, so it is worth a
 * look — which is exactly what the two probes below provide.
 */
const NON_LATIN_LOCALES = new Set(["ru", "uk", "bg", "zh-Hans", "zh-Hant", "ja", "th"]);

/**
 * Latin tokens that legitimately stay Latin in every language: brands, product
 * names, protocol and algorithm identifiers, file extensions, file and type
 * names quoted from the source. Anything outside this list that also appears in
 * the English slot of the same copy object is reported as residue.
 */
const PROPER_TOKENS = new Set(
  (
    "popopx popopxmq bluetooth keychain safari corebluetooth gatt noise epoch apple store github " +
    "xcode swift url uri json yaml http https html css api qr png svg jpeg heic gif apng ios ipad " +
    "iphone macos watchos aessos aes sha gcm chacha poly chachapoly poly1305 ed25519 x25519 hmac " +
    "pbkdf2 lzfse ppxlz smp xftp stun turn ble cpu dns cdn ui id dmg mp4 exif gps utf md5 tls ssl " +
    "lan app apps peer agent node user data team chat mail sms imessage faceid touchid sim push " +
    "bundle bundleid testflight webhook token server client kernel proxy relay sock5 v2ray shadowsocks " +
    "arm64 universal dark mode toggle beta release candidate build commit branch repo fork merge pull " +
    "main master origin upstream copyright license agpl spdx readme notice"
  ).split(/\s+/),
);

/**
 * Latin words that the residue probe reported and a reviewer then checked
 * against the sentence containing them, finding quoted source text rather than
 * an untranslated word: a shell command (`xcodebuild -version`), an endpoint
 * (`iTunes lookup`), a Swift parameter (`metadata = []`, the compression
 * dictionary), an enum raw value the sentence itself names (`standard`,
 * `receipt`, `security`, `create`, `update`), a wipe-step function
 * (`terminate`), a file-format field (`magic`, `framework`), a top-level path in
 * the engine repository (`studio`, i.e. `studio/` in `README、studio、docs`, ledger
 * §15), or a term the target language borrows as-is (`cookie`, `inline`,
 * `digest`, `payload`, `scheme`, `manifest`, `thumbnail`).
 *
 * Growing this list is the maintenance path for the probe, and the rule behind
 * every entry is the same one: a word that names something in the source stays
 * Latin, a word that is ordinary prose gets translated — or written in the
 * target language's own technical vocabulary (`откат`, `回滚快照`, `ロールバック`,
 * `สแนปช็อต`) — and the justification is the sentence, not the word.
 */
const QUOTED_CODE_TOKENS = new Set(
  (
    "xcodebuild lookup metadata thumbnail dictionary magic framework standard receipt security " +
    "studio create update terminate cookie inline manifest scheme payload digest"
  ).split(/\s+/),
);

const CYRILLIC = /[\u0400-\u04FF]/;
const LATIN_RUN = /[A-Za-z]/;
const THAI = /[\u0E00-\u0E7F]/;

/**
 * A single word that mixes Cyrillic (or Thai) letters with Latin letters is a
 * typing accident — `Дworolowa` is not a Ukrainian word and `ระดับglobal` is not
 * Thai. Punctuation is a separator on purpose: `QR-код`, `iOS-клієнт` and
 * `Ed25519-ключом` are the ordinary Cyrillic way of hanging a Latin
 * abbreviation on a native noun, so a dash must not make them look like defects.
 */
function mixedScriptTokens(text) {
  const bad = [];
  for (const token of text.split(/[^\p{L}\p{N}]+/u)) {
    if (!token) continue;
    const hasCyr = CYRILLIC.test(token);
    const hasLat = LATIN_RUN.test(token);
    const hasThai = THAI.test(token);
    if ((hasCyr && hasLat) || (hasThai && hasLat)) bad.push(token);
  }
  return bad;
}

/**
 * Ordinary, whitespace-delimited English words: all-lowercase ASCII letters of
 * five or more, with the trailing sentence punctuation of any script stripped.
 *
 * Leading punctuation is deliberately left alone. `"/products"`, `target="_blank"`
 * and `-quiet` are route, attribute and flag literals; opening the front of the
 * chunk too would surface 137 further tokens in this tree and turn a review list
 * back into the noise machine these whitelists exist to prevent.
 *
 * Everything this deliberately drops is a token that legitimately stays Latin
 * inside translated copy — `xcodebuild -version`, `swift-tools-version: 6.0`,
 * `.iOS(.v15)`, `PopopxSecurePayload.swift`, `AVAssetWriter`, `AGPL-3.0`,
 * `SERVER_CFG_ACK`. A hyphen, a digit, a dot or an internal capital marks a
 * command, an identifier or a file name, and quoting those verbatim is correct
 * translation, not residue. Sentence-initial capitals are dropped with them;
 * that is the price of keeping the review list short enough to be read.
 */
function plainEnglishWords(text) {
  const out = [];
  for (const chunk of text.split(/\s+/)) {
    if (!chunk) continue;
    // Script-wide, not ASCII-only: an ASCII list left `occurrences。` intact, the
    // chunk failed `/^[a-z]+$/` below, and the slot yielded no tokens at all.
    const core = chunk.replace(/[\p{P}\p{S}]+$/u, "");
    if (core.length < 5) continue;
    if (!/^[a-z]+$/.test(core)) continue;
    out.push(core);
  }
  return out;
}

/**
 * An ordinary English word that survives inside a non-Latin-script slot, having
 * been copied straight out of the English text of the *same* copy object, is
 * untranslated residue (`佇列 portal`, `キュー ペイロード payload`). The
 * English-slot intersection, `plainEnglishWords` and the two token lists are
 * what keep this a review list rather than a noise machine.
 */
function englishResidue(text, enText) {
  if (!enText) return [];
  const enWords = new Set(plainEnglishWords(enText));
  const out = [];
  for (const word of plainEnglishWords(text)) {
    if (PROPER_TOKENS.has(word) || QUOTED_CODE_TOKENS.has(word)) continue;
    if (enWords.has(word)) out.push(word);
  }
  return out;
}

/**
 * Characters that occur only in Traditional Chinese, so a `zh-Hans` slot
 * carrying one is simplified/traditional leakage. Characters shared by both
 * scripts (著 接 控 表 理 先 象 后 得 …) are deliberately absent: this list is a
 * residue probe, not a dictionary, and a false positive here would force wrong
 * copy through the gate.
 */
const TRADITIONAL_ONLY =
  /[們東車馬鳥龍門問開間聽鄉語說請謝鑰號獵讓遠適選發總備蓋談調識護譽讀變豐與為專業從會這個國對時來裏複觸圖]/;

/**
 * The simplified counterparts of the same words, i.e. what must not appear in a
 * `zh-Hant` slot. Again only unambiguous singletons.
 */
const SIMPLIFIED_ONLY =
  /[们为产关动势头对当应庆录寻导语说讯请书习乡乱乐东车贝资页顶选级统纪觉让发变诉读闭问间队阴国个时来这从业图会备盖谈调试识护誉远适猎]/;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, out);
    } else if (/\.tsx?$/.test(full)) {
      out.push(full);
    }
  }
  return out;
}

/** Read every copy object under `dir` and report what the type system cannot see. */
function scan(dir) {
  const files = walk(dir);
  const errors = [];
  const warnings = [];
  const stats = { objects: 0, slots: 0, perLocale: Object.fromEntries(LOCALES.map((l) => [l, 0])) };

  for (const file of files) {
    const text = readFileSync(file, "utf8");
    const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
    const rel = relative(ROOT, file);

    // A file that does not parse yields no copy objects at all, so an unquoted
    // `zh-Hans:` key or a stray brace would otherwise report a clean pass while
    // every locale check silently stopped running on it. `tsc` catches this too,
    // but only for the files it is asked to compile — this oracle reads all of
    // `src`, plus the fixtures under `--self-test`.
    for (const diagnostic of source.parseDiagnostics ?? []) {
      const pos = source.getLineAndCharacterOfPosition(diagnostic.start ?? 0);
      errors.push(
        `${rel}:${pos.line + 1}: cannot parse this file (${ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")}) — no copy object in it can be verified`,
      );
    }

    // `type L = Localized<string>` hides the pattern from a plain text match, so
    // collect the aliases a file declares and resolve a cast through them.
    const mapAliases = new Set();
    const collectAliases = (node) => {
      if (ts.isTypeAliasDeclaration(node)) {
        const body = node.type ? node.type.getText() : "";
        if ((body.includes("Localized<") || body.includes("Record<Locale")) && !body.includes("Partial<")) {
          mapAliases.add(node.name.getText());
        }
      }
      ts.forEachChild(node, collectAliases);
    };
    ts.forEachChild(source, collectAliases);

    const at = (node) => `:${source.getLineAndCharacterOfPosition(node.getStart()).line + 1}`;

    const visit = (node) => {
      // A function returning a `Localized` map can only build it by *deriving*
      // slots, which is exactly how an 18-language claim is faked: the helper takes
      // three authored strings, fills the other fifteen from English, and TypeScript
      // still sees a total map. Copy must live in literal objects so this file can
      // read every language slot. `pick`/`useCopy` are exempt — they return `T`.
      if (
        (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node)) &&
        node.type &&
        node.type.getText().includes("Localized<")
      ) {
        const name = ts.isFunctionDeclaration(node) && node.name ? ` ${node.name.getText()}` : "";
        errors.push(
          `${rel}${at(node)}: function${name} returns Localized<…> — a derived map hides unauthored languages from this oracle and from tsc. Author literal 18-key objects instead.`,
        );
      }

      // `x as Localized<string>` — or `as L` for such an alias — over a
      // `Record<string, string>` is the second way to fake the total map: the cast
      // erases the key check, so fifteen languages can be missing at runtime while
      // tsc stays quiet. `satisfies` is deliberately NOT flagged: it validates every
      // key, which is the point of the total map. A cast to
      // `Partial<Record<Locale, …>>` is exempt too — it claims nothing is present,
      // which is what `pick` needs in order to fall back honestly.
      if (ts.isAsExpression(node) && node.type) {
        const t = node.type.getText();
        const isMapType = t.includes("Localized<") || t.includes("Record<Locale") || mapAliases.has(t);
        if (isMapType && !t.includes("Partial<")) {
          errors.push(
            `${rel}${at(node)}: as ${t} casts an untyped map into the total locale type — 18 languages are not proven here; write the literal (or use \`satisfies\`, which checks)`,
          );
        }
      }

      if (ts.isObjectLiteralExpression(node)) {
        const keys = [];
        for (const prop of node.properties) {
          if (!prop.name) continue;
          const name = ts.isStringLiteral(prop.name) || ts.isIdentifier(prop.name) ? prop.name.text : null;
          if (name) keys.push({ name, prop });
        }
        const localeKeys = keys.filter((k) => LOCALE_SET.has(k.name));
        const staleKeys = keys.filter((k) => STALE.includes(k.name));

        if (staleKeys.length > 0) {
          errors.push(`${rel}${at(node)}: stale locale tag(s) ${staleKeys.map((k) => k.name).join(", ")} — use zh-Hans / zh-Hant`);
        }

        // A spread inside anything carrying a locale tag re-imports the blind spot
        // the derived-map rule above closes: `{...enMap, fr: "…"}` type-checks while
        // fifteen languages silently render as whoever they were cloned from. This
        // runs before the two-key threshold below, because that one-literal-key form
        // is exactly the shape the rule exists for.
        const spreads = node.properties.filter((prop) => ts.isSpreadAssignment(prop));
        if (spreads.length > 0 && localeKeys.length + staleKeys.length >= 1) {
          errors.push(
            `${rel}${at(node)}: copy object spreads ${spreads.length} map(s) — every one of the 18 slots must be written literally or the oracle cannot see a missing language`,
          );
        }

        // A copy object is any literal carrying two or more locale-ish tags,
        // stale or not: an object written with `zh-CN` / `zh-TW` / `en` is exactly
        // the work the 18-language pass has to finish, so counting it only once
        // its keys were renamed would hide the backlog behind the rename errors.
        if (localeKeys.length + staleKeys.length >= 2) {
          stats.objects += 1;
          const present = new Set(localeKeys.map((k) => k.name));
          const missing = LOCALES.filter((l) => !present.has(l));
          if (missing.length > 0) {
            errors.push(`${rel}${at(node)}: copy object missing ${missing.length} locale(s): ${missing.join(", ")}`);
          }
          const enValue = localeKeys.find((k) => k.name === "en");
          const hansValue = localeKeys.find((k) => k.name === "zh-Hans");
          const hantValue = localeKeys.find((k) => k.name === "zh-Hant");
          const enText =
            enValue && enValue.prop.initializer && ts.isStringLiteral(enValue.prop.initializer)
              ? enValue.prop.initializer.text
              : null;
          for (const { name, prop } of localeKeys) {
            stats.slots += 1;
            stats.perLocale[name] += 1;
            if (!prop.initializer || !ts.isStringLiteral(prop.initializer)) continue;
            const value = prop.initializer.text;
            if (value.length === 0) continue;
            // Mixed-script and residue probes look at the slots a type cannot
            // judge at all — the non-Latin ones — so they run before the checks
            // that only concern Latin-script copy.
            if (NON_LATIN_LOCALES.has(name) && !isTechnical(value)) {
              for (const token of mixedScriptTokens(value)) {
                warnings.push(
                  `${rel}${at(prop.name)}: "${name}" slot has a word mixing scripts: ${token} — ${value.slice(0, 40)}`,
                );
              }
              for (const word of englishResidue(value, enText)) {
                warnings.push(
                  `${rel}${at(prop.name)}: "${name}" slot keeps the English word "${word}" while "${enText ? enText.slice(0, 24) : ""}" was authored — untranslated residue?`,
                );
              }
            }
            if (name === "en") continue;
            if (isTechnical(value)) continue;
            if (hasNonLatinScript(value)) continue;
            if (enText !== null && value === enText) {
              warnings.push(`${rel}${at(prop.name)}: "${name}" slot repeats the English text verbatim: ${value.slice(0, 48)}`);
            }
          }
          // Script-residue probes: a wrong-script character is a real translation
          // defect that no type can express, so check the two Chinese slots.
          const scriptCheck = (slot, re, expected, found) => {
            if (!slot || !slot.prop.initializer || !ts.isStringLiteral(slot.prop.initializer)) return;
            const value = slot.prop.initializer.text;
            const hit = value.match(re);
            if (hit) {
              warnings.push(`${rel}${at(slot.prop.name)}: "${expected}" slot carries ${found} character(s): ${hit.slice(0, 6).join("")} — ${value.slice(0, 40)}`);
            }
          };
          scriptCheck(hansValue, TRADITIONAL_ONLY, "zh-Hans", "traditional-only");
          scriptCheck(hantValue, SIMPLIFIED_ONLY, "zh-Hant", "simplified-only");
        }
      }
      ts.forEachChild(node, visit);
    };

    ts.forEachChild(source, visit);
  }

  return { files, errors, warnings, stats };
}

/**
 * `--self-test` runs these rules over `tools/fixtures/i18n/`: `dirty/` holds one
 * deliberate instance of every defect class, `clean/` holds correct copy that
 * must produce nothing at all. Without it, a rule that quietly stopped matching
 * would keep printing the same green line it printed when it worked, which is
 * how an oracle becomes decoration.
 */
if (process.argv.includes("--self-test")) {
  const FIXTURES = join(ROOT, "tools", "fixtures", "i18n");
  const dirty = scan(join(FIXTURES, "dirty"));
  const clean = scan(join(FIXTURES, "clean"));
  const EXPECTED = [
    ["stale locale tag", "zh-CN / zh-TW tag"],
    ["copy object missing", "missing locale key"],
    ["returns Localized<…>", "function deriving a locale map"],
    ["casts an untyped map", "as Localized<string> cast"],
    ["spreads 1 map(s)", "spread-built copy object"],
    ["cannot parse this file", "file that does not parse"],
    ["keeps the English word", "untranslated English residue"],
    ['keeps the English word "occurrences"', "residue ending in fullwidth punctuation"],
    ["mixing scripts", "word mixing Cyrillic or Thai with Latin"],
    ["carries simplified-only", "simplified text in the zh-Hant slot"],
    ["carries traditional-only", "traditional text in the zh-Hans slot"],
    ["repeats the English text", "slot repeating the English text verbatim"],
  ];
  const fail = [];
  const reported = dirty.errors.concat(dirty.warnings);
  for (const [needle, label] of EXPECTED) {
    if (!reported.some((line) => line.includes(needle))) fail.push(label);
  }
  if (dirty.errors.length === 0) fail.push("every hard-error class");
  if (clean.errors.length > 0) fail.push(`clean fixture reported ${clean.errors.length} error(s): ${clean.errors[0]}`);
  if (clean.warnings.length > 0) fail.push(`clean fixture reported ${clean.warnings.length} warning(s): ${clean.warnings[0]}`);
  console.log(
    `i18n self-test: dirty ${dirty.errors.length} error(s) / ${dirty.warnings.length} warning(s), ` +
      `clean ${clean.errors.length} error(s) / ${clean.warnings.length} warning(s)`,
  );
  if (fail.length > 0) {
    for (const line of fail) console.log(`FAIL i18n self-test: not detected — ${line}`);
    process.exit(1);
  }
  console.log(`i18n self-test: ok — ${EXPECTED.length} defect classes all still detected`);
  process.exit(0);
}

const { files, errors, warnings, stats } = scan(SRC);

const coverage = LOCALES.map((l) => `${l}=${stats.perLocale[l]}`).join(" ");

if (!QUIET) {
  for (const line of errors) console.log(`ERROR  ${line}`);
  for (const line of warnings) console.log(`WARN   ${line}`);
}

console.log(
  `i18n: ${files.length} files, ${stats.objects} copy objects, ${stats.slots} slots, ` +
    `${LOCALES.length} locales required | coverage ${coverage}`,
);
console.log(
  `i18n: ${errors.length} error(s), ${warnings.length} warning(s) ` +
    `(verbatim-copy or script-residue slots)`,
);

if (errors.length > 0) {
  process.exit(1);
}
