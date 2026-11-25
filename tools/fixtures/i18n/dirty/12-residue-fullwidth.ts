// Oracle fixture — residue whose English word ends in fullwidth punctuation.
// A ja slot carrying `0 occurrences。` was invisible to this probe for as long as
// the strip list was ASCII-only, because the chunk never reduced to a word.
export const RESIDUE_FULLWIDTH = {
  en: "Zero occurrences in the current codebase",
  ja: "現在のコードベースでは 0 occurrences。",
};
