const STORAGE_KEY_PREFIX = "rmh-suite-execution::";

export function getStorageKey(suiteName: string): string {
  return `${STORAGE_KEY_PREFIX}${suiteName}`;
}
