import fs from "fs";
import path from "path";
import type { TestCaseIndexRecord } from "./types";

const INDEX_PATH = path.join(process.cwd(), "public", "testcase-index.json");

/**
 * Loads the precomputed test case index from public/testcase-index.json.
 * Returns empty array if file is missing or invalid.
 */
export function loadIndex(): TestCaseIndexRecord[] {
  if (!fs.existsSync(INDEX_PATH)) return [];
  try {
    const raw = fs.readFileSync(INDEX_PATH, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/**
 * Filters the index by search text: include records whose filename (basename)
 * contains the exact input text (case-sensitive). Preserves deterministic order.
 */
export function filterIndexBySearchText(
  index: TestCaseIndexRecord[],
  searchText: string
): TestCaseIndexRecord[] {
  return index.filter((record) =>
    path.basename(record.fileName).includes(searchText)
  );
}
