"use client";

import type { ReactElement, ReactNode } from "react";

/**
 * Inline LTR isolation for source citations, protocol names, paths and
 * commands. In an Arabic paragraph the bidi algorithm would reorder a
 * `path:83` suffix around the surrounding RTL run; a `dir="ltr"` boundary
 * (which HTML maps to `unicode-bidi: isolate`) keeps the token as one unit.
 */
export function Ltr({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): ReactElement {
  return (
    <bdi dir="ltr" className={className}>
      {children}
    </bdi>
  );
}

/**
 * Maximal ASCII runs, isolated as one unit when they carry a letter or digit.
 *
 * Isolating single tokens is not enough: in an RTL paragraph a phrase like
 * `Noise XX` is two strong-LTR words around a neutral space, and isolating
 * only `XX` makes the pair render as `XX Noise`. An ASCII run keeps the whole
 * source phrase — a Swift path with a line suffix, `AES-256-GCM · ...` split
 * only at the non-ASCII middle dot, `the owner's tap on approve` — in one LTR boundary,
 * while Arabic/CJK letters and punctuation stay outside it.
 *
 * A short spaced run (`Noise XX`, `Bot Studio`) is additionally kept on one
 * line: when such a run breaks inside an RTL paragraph, the continuation
 * fragment can land at the wrong edge of the next line. Only runs surrounded
 * by whitespace qualify: accented prose (French `… d’un tableau de l’app`,
 * Czech, Hungarian) is fractured at every é/ě/ő, and nowrap fragments joined
 * across such letters or apostrophes chain into one unbreakable word that
 * overflows a 320px line (measured: fr /download/ at 340/320). Long runs —
 * sentences, `code (path:line)` citations — stay breakable for the same reason.
 */
const ASCII_RUN = /[\x20-\x7E]+/g;
const HAS_ALNUM = /[A-Za-z0-9]/;
const KEEP_WHOLE_MAX = 20;

function boundedBySpaces(text: string, start: number, end: number): boolean {
  const before = start === 0 ? " " : text[start - 1];
  const after = end >= text.length ? " " : text[end];
  return /\s/.test(before) && /\s/.test(after);
}

export function LtrText({ text }: { text: string }): ReactElement {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(ASCII_RUN)) {
    const raw = match[0];
    if (!HAS_ALNUM.test(raw)) continue;
    const lead = raw.length - raw.trimStart().length;
    const run = raw.trim();
    const start = (match.index ?? 0) + lead;
    if (start > last) parts.push(text.slice(last, start));
    parts.push(
      <bdi
        dir="ltr"
        key={`${start}-${run}`}
        className={
          run.includes(" ") && run.length <= KEEP_WHOLE_MAX && boundedBySpaces(text, start, start + run.length)
            ? "whitespace-nowrap"
            : undefined
        }
      >
        {run}
      </bdi>,
    );
    last = start + run.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}