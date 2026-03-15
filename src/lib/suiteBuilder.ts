import path from "path";
import type { TestCaseDefinition, GeneratedSuite } from "./types";
import { loadIndex, filterIndexBySearchText } from "./indexLoader";
import { discoverTestFiles } from "./fileDiscovery";
import { buildSuiteFromIndexAndSelectedFiles } from "./suiteFromSelection";
import { parseScenarios } from "./scenarioParser";

function extractTestCaseName(scenarioContent: string, fallbackId: string): string {
  const firstLine = scenarioContent.split("\n").find((line) => line.trim().length > 0);
  if (!firstLine) return fallbackId;
  const trimmed = firstLine.trim();
  if (trimmed.startsWith("# Scenario:")) {
    const after = trimmed.slice("# Scenario:".length).trim();
    return after || fallbackId;
  }
  if (trimmed.startsWith("# Test Case:")) {
    const after = trimmed.slice("# Test Case:".length).trim();
    return after || fallbackId;
  }
  return trimmed || fallbackId;
}

const TESTCASES_DIR = "testcases";

/**
 * Builds a suite from markdown files (fallback when index is missing or empty).
 * Uses relative path from /testcases for sourceFile (e.g. "Folder/File.md").
 */
export function buildSuiteFromMarkdown(searchText: string): GeneratedSuite {
  const baseDir = path.join(process.cwd(), TESTCASES_DIR);
  const absolutePaths = discoverTestFiles(searchText);
  const sourceFilesSeen = new Set<string>();
  const sourceFiles: string[] = [];
  const testCases: TestCaseDefinition[] = [];
  let counter = 1;

  for (const filePath of absolutePaths) {
    const rel = path.relative(baseDir, filePath);
    const relativePath = rel.split(path.sep).join("/");
    if (!sourceFilesSeen.has(relativePath)) {
      sourceFilesSeen.add(relativePath);
      sourceFiles.push(relativePath);
    }
    const scenarios = parseScenarios(filePath);
    for (const scenarioContent of scenarios) {
      const id = `T${String(counter).padStart(2, "0")}`;
      testCases.push({
        id,
        testCaseName: extractTestCaseName(scenarioContent, id),
        sourceFile: relativePath,
        scenarioContent,
      });
      counter++;
    }
  }

  return {
    suiteName: searchText,
    sourceFiles,
    testCases,
  };
}

/**
 * Builds a GeneratedSuite from the precomputed JSON index when available;
 * otherwise falls back to scanning and parsing markdown files.
 */
export function buildSuite(searchText: string): GeneratedSuite {
  const index = loadIndex();
  if (index.length > 0) {
    const filtered = filterIndexBySearchText(index, searchText);
    const sourceFilesSeen = new Set<string>();
    const sourceFiles: string[] = [];
    for (const r of filtered) {
      if (!sourceFilesSeen.has(r.fileName)) {
        sourceFilesSeen.add(r.fileName);
        sourceFiles.push(r.fileName);
      }
    }
    const testCases: TestCaseDefinition[] = filtered.map((r) => ({
      id: r.testId,
      testCaseName: r.testCaseName,
      sourceFile: r.sourceFile,
      scenarioContent: r.scenarioContent,
    }));
    return {
      suiteName: searchText,
      sourceFiles,
      testCases,
    };
  }
  return buildSuiteFromMarkdown(searchText);
}

export { buildSuiteFromIndexAndSelectedFiles } from "./suiteFromSelection";
