import path from "path";
import type { TestCaseDefinition, GeneratedSuite } from "./types";
import { loadIndex, filterIndexBySearchText } from "./indexLoader";
import { discoverTestFiles } from "./fileDiscovery";
import { parseScenarios } from "./scenarioParser";

function extractTestCaseName(scenarioContent: string, fallbackId: string): string {
  const firstLine = scenarioContent.split("\n").find((line) => line.trim().length > 0);
  if (!firstLine) return fallbackId;
  const trimmed = firstLine.trim();
  if (trimmed.startsWith("# Scenario:")) {
    const after = trimmed.slice("# Scenario:".length).trim();
    return after || fallbackId;
  }
  return trimmed || fallbackId;
}

/**
 * Builds a suite from markdown files (fallback when index is missing or empty).
 */
export function buildSuiteFromMarkdown(searchText: string): GeneratedSuite {
  const absolutePaths = discoverTestFiles(searchText);
  const sourceFiles = absolutePaths.map((p) => path.basename(p));
  const testCases: TestCaseDefinition[] = [];
  let counter = 1;

  for (const filePath of absolutePaths) {
    const scenarios = parseScenarios(filePath);
    const baseName = path.basename(filePath);
    for (const scenarioContent of scenarios) {
      const id = `T${String(counter).padStart(2, "0")}`;
      testCases.push({
        id,
        testCaseName: extractTestCaseName(scenarioContent, id),
        sourceFile: baseName,
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
