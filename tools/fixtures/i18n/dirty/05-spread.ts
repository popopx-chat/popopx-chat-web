// Oracle fixture — a copy object built by spreading another map. This is the
// shape that type-checks with fifteen languages silently cloned.
const BASE = { en: "Written literally, or not verifiable" };

export const SPREAD = { ...BASE, fr: "Une seule ligne réécrite" };
