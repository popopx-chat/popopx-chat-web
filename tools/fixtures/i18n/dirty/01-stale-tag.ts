// Oracle fixture — a copy object still carrying the old tri-lingual tags.
// Deliberately defective input for `node tools/check-i18n.mjs --self-test`;
// excluded from `tsc` by `tsconfig.json`.
export const STALE_TAG = {
  en: "No global identity at all",
  "zh-CN": "根本没有全局身份",
  "zh-TW": "根本沒有全局身分",
};
