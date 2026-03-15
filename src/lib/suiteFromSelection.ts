import type { TestCaseDefinition, GeneratedSuite, TestCaseIndexRecord } from "./types";
import { getRecordRelativePath } from "./treeBuilder";

/**
 * Builds a suite from the index using only the selected file paths (e.g. from tree selection).
 * Preserves deterministic index order. Safe to use in browser (no Node/fs).
 */
export function buildSuiteFromIndexAndSelectedFiles(
  index: TestCaseIndexRecord[],
  selectedFilePaths: string[]
): GeneratedSuite {
  const selectedSet = new Set(selectedFilePaths);
  const filtered = index.filter((r) => selectedSet.has(getRecordRelativePath(r)));
  const sourceFilesSeen = new Set<string>();
  const sourceFiles: string[] = [];
  for (const r of filtered) {
    const rel = getRecordRelativePath(r);
    if (!sourceFilesSeen.has(rel)) {
      sourceFilesSeen.add(rel);
      sourceFiles.push(rel);
    }
  }
  const testCases: TestCaseDefinition[] = filtered.map((r) => ({
    id: r.testId,
    testCaseName: r.testCaseName,
    sourceFile: getRecordRelativePath(r),
    scenarioContent: r.scenarioContent,
  }));
  const fileCount = sourceFiles.length;
  return {
    suiteName: `Selected (${fileCount} file${fileCount === 1 ? "" : "s"})`,
    sourceFiles,
    testCases,
  };
}
