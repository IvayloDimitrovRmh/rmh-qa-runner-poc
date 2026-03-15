import fs from "fs";

const SCENARIO_MARKER = "# Scenario:";
const TEST_CASE_MARKER = "# Test Case:";
const SCENARIO_OR_TEST_CASE = /# (Scenario|Test Case):/g;

/**
 * Splits file content by "# Scenario:" or "# Test Case:" and returns each block
 * with the marker re-attached. Preserves order; does not merge or deduplicate.
 */
export function parseScenarios(filePath: string): string[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const parts = content.split(SCENARIO_OR_TEST_CASE);
  if (parts.length <= 1) return [];
  const scenarios: string[] = [];
  for (let i = 1; i < parts.length - 1; i += 2) {
    const marker = parts[i] as string;
    const fullMarker = marker === "Scenario" ? SCENARIO_MARKER : TEST_CASE_MARKER;
    const block = (parts[i + 1] || "").trim();
    scenarios.push(fullMarker + (block ? "\n\n" + block : ""));
  }
  return scenarios;
}
