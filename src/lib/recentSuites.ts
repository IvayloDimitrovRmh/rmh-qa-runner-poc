import type { ExportedProgress } from "./progressImport";

const RECENT_SUITES_KEY = "rmh-recent-suites";
const MAX_RECENT = 5;

export interface RecentTreeEntry {
  source: "tree";
  suiteName: string;
  sourceFiles: string[];
  testCount: number;
  openedAt: string;
}

export interface RecentImportEntry {
  source: "import";
  suiteName: string;
  testCount: number;
  fileCount?: number;
  openedAt: string;
  payload: ExportedProgress;
}

export type RecentSuiteEntry = RecentTreeEntry | RecentImportEntry;

function loadRaw(): RecentSuiteEntry[] {
  if (typeof window === "undefined" || !window.localStorage) return [];
  try {
    const raw = window.localStorage.getItem(RECENT_SUITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidEntry);
  } catch {
    return [];
  }
}

function isValidEntry(e: unknown): e is RecentSuiteEntry {
  if (!e || typeof e !== "object") return false;
  const o = e as Record<string, unknown>;
  if (o.source !== "tree" && o.source !== "import") return false;
  if (typeof o.suiteName !== "string") return false;
  if (typeof o.testCount !== "number") return false;
  if (typeof o.openedAt !== "string") return false;
  if (o.source === "tree") {
    if (!Array.isArray(o.sourceFiles)) return false;
    if (o.sourceFiles.some((p: unknown) => typeof p !== "string")) return false;
  }
  if (o.source === "import") {
    if (!o.payload || typeof o.payload !== "object" || !("executionState" in o.payload)) return false;
  }
  return true;
}

function save(list: RecentSuiteEntry[]): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem(RECENT_SUITES_KEY, JSON.stringify(list.slice(0, MAX_RECENT)));
  } catch {
    // ignore quota
  }
}

function sameTree(a: RecentTreeEntry, b: RecentTreeEntry): boolean {
  if (a.sourceFiles.length !== b.sourceFiles.length) return false;
  const sa = [...a.sourceFiles].sort();
  const sb = [...b.sourceFiles].sort();
  return sa.every((p, i) => p === sb[i]);
}

function sameImport(a: RecentImportEntry, b: RecentImportEntry): boolean {
  return a.suiteName === b.suiteName && a.testCount === b.testCount;
}

/** Returns the list of recent suites (newest first), max 5. */
export function getRecentSuites(): RecentSuiteEntry[] {
  return loadRaw();
}

/** Adds or updates a recent suite: moves matching entry to top, keeps max 5. */
export function addRecentSuite(entry: RecentSuiteEntry): void {
  const list = loadRaw();
  const withoutMatch = entry.source === "tree"
    ? list.filter((e) => e.source !== "tree" || !sameTree(e, entry as RecentTreeEntry))
    : list.filter((e) => e.source !== "import" || !sameImport(e, entry as RecentImportEntry));
  const next = [entry, ...withoutMatch].slice(0, MAX_RECENT);
  save(next);
}

/** Removes the recent suite at the given index (0-based). */
export function removeRecentSuite(index: number): void {
  const list = loadRaw();
  if (index < 0 || index >= list.length) return;
  save(list.filter((_, i) => i !== index));
}

/** Removes multiple recent suites by index (indices in descending order to avoid shifting). */
export function removeRecentSuitesByIndices(indices: number[]): void {
  const set = new Set(indices);
  const list = loadRaw().filter((_, i) => !set.has(i));
  save(list);
}

/** Clears all recent suites. */
export function clearRecentSuites(): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.removeItem(RECENT_SUITES_KEY);
  } catch {
    // ignore
  }
}
