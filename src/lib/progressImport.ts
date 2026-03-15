import { getStorageKey } from "./progressStorage";

/** Minimal test case shape for reconstructing a suite from imported HTML/JSON */
export interface ImportableTestCase {
  id: string;
  testCaseName: string;
  sourceFile: string;
  scenarioContent: string;
}

/** Progress file payload (JSON or embedded in HTML). executionState keys are test IDs. */
export interface ExportedProgress {
  suiteName: string;
  exportedAt?: string;
  executionState: Record<string, unknown>;
  /** Optional: selected file paths for suite reconstruction (Save Progress JSON). */
  sourceFiles?: string[];
  /** Optional: full test cases for suite reconstruction (Export HTML). */
  testCases?: ImportableTestCase[];
}

/** SessionStorage key for home-page import: pass payload to /suites?source=import */
export const IMPORTED_PAYLOAD_KEY = "rmh-imported-payload";

/** localStorage key for durable import payload so /suites?source=import survives refresh */
export const IMPORTED_PAYLOAD_PERSISTED_KEY = "rmh-imported-suite";

export const EMBEDDED_STATE_SCRIPT_ID = "rmh-execution-state";

function decodePayloadFromHtml(encoded: string): ExportedProgress | null {
  try {
    const trimmed = encoded.trim();
    if (!trimmed) return null;
    const json = decodeURIComponent(escape(atob(trimmed)));
    const data = JSON.parse(json) as unknown;
    if (!data || typeof data !== "object" || !("executionState" in data)) return null;
    return data as ExportedProgress;
  } catch {
    return null;
  }
}

/**
 * Match script tag containing id="rmh-execution-state" or id='rmh-execution-state'.
 * [^>]* is greedy; \\s* allows the space between attributes so we match after backtracking.
 */
const EMBEDDED_SCRIPT_REGEX =
  /<script[^>]*\s*id=["']rmh-execution-state["'][^>]*>([\s\S]*?)<\/script>/i;

/** Extract embedded execution state from exported HTML (report or offline runner), or null if missing/invalid */
export function extractExecutionStateFromHtml(html: string): ExportedProgress | null {
  const match = html.match(EMBEDDED_SCRIPT_REGEX);
  if (!match || !match[1]) return null;
  return decodePayloadFromHtml(match[1].trim());
}

/** Parse a progress file (raw content + whether it's HTML). Returns null if invalid. */
export function parseProgressFile(raw: string, isHtml: boolean): ExportedProgress | null {
  if (isHtml) return extractExecutionStateFromHtml(raw);
  try {
    const data = JSON.parse(raw) as unknown;
    if (!data || typeof data !== "object" || !("executionState" in data)) return null;
    const suiteName = (data as Record<string, unknown>).suiteName;
    if (typeof suiteName !== "string" || !suiteName.trim()) return null;
    return data as ExportedProgress;
  } catch {
    return null;
  }
}

/**
 * Build a canonical import payload for sessionStorage handoff.
 * Ensures both JSON and HTML imports produce the same shape and that testCases/sourceFiles
 * are plain arrays (so they survive JSON.stringify/parse and quota limits are predictable).
 */
export function buildCanonicalImportPayload(data: ExportedProgress): ExportedProgress {
  const canonical: ExportedProgress = {
    suiteName: data.suiteName,
    exportedAt: data.exportedAt,
    executionState:
      data.executionState && typeof data.executionState === "object"
        ? { ...data.executionState }
        : {},
  };
  if (Array.isArray(data.sourceFiles) && data.sourceFiles.length > 0) {
    canonical.sourceFiles = [...data.sourceFiles];
  }
  if (Array.isArray(data.testCases) && data.testCases.length > 0) {
    canonical.testCases = data.testCases.map((tc) => ({
      id: String(tc.id),
      testCaseName: String(tc.testCaseName ?? ""),
      sourceFile: String(tc.sourceFile ?? ""),
      scenarioContent: String(tc.scenarioContent ?? ""),
    }));
  }
  return canonical;
}

/** Write imported progress to localStorage so the suite runner loads it when opened by suite name */
export function writeImportedProgressToStorage(data: ExportedProgress): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  const key = getStorageKey(data.suiteName);
  window.localStorage.setItem(key, JSON.stringify(data.executionState));
}

/** Persist full import payload to localStorage so /suites?source=import can restore after refresh */
export function persistImportedPayloadForRefresh(data: ExportedProgress): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  const canonical = buildCanonicalImportPayload(data);
  window.localStorage.setItem(IMPORTED_PAYLOAD_PERSISTED_KEY, JSON.stringify(canonical));
}
