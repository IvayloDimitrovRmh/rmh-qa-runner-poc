import path from "path";
import type { TestCaseDefinition, GeneratedSuite } from "./types";
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
 * Builds a GeneratedSuite: discovers files by search text, parses scenarios, assigns T01, T02, ...
 * testCaseName = first non-empty line after "# Scenario:", else test ID.
 */
export function buildSuite(searchText: string): GeneratedSuite {
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
