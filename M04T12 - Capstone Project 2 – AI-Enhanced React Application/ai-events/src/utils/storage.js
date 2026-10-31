/** Reads JSON from localStorage, returning the fallback on any problem. */
export function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

/** Writes JSON to localStorage. */
export function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
