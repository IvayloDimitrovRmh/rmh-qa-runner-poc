const STORAGE_KEY_PREFIX = "rmh-suite-execution::";

export function getStorageKey(suiteName: string): string {
  return `${STORAGE_KEY_PREFIX}${suiteName}`;
}

/**
 * Returns the stored display title for a suite if it was edited and saved (new blob shape).
 * Returns undefined for legacy blobs or when no custom title is stored.
 */
export function getStoredDisplayTitle(suiteName: string): string | undefined {
  if (typeof window === "undefined" || !window.localStorage) return undefined;
  try {
    const raw = window.localStorage.getItem(getStorageKey(suiteName));
    if (!raw) return undefined;
    const data = JSON.parse(raw) as unknown;
    if (!data || typeof data !== "object" || !("executionState" in data)) return undefined;
    const name = (data as { suiteName?: string }).suiteName;
    return typeof name === "string" && name.trim() ? name.trim() : undefined;
  } catch {
    return undefined;
  }
}
