// Oracle fixture — an unquoted `zh-Hans` key. The parser recovers and yields
// an object whose key reads as `zh`, so a scanner that only looks for copy
// objects would report this file as clean.
export const UNPARSEABLE = {
  en: "Syntax damage",
  zh-Hans: "语法损坏",
};
