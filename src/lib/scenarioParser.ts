import fs from "fs";

const SCENARIO_MARKER = "# Scenario:";

/**
 * Splits file content by the exact marker "# Scenario:" and returns each block
 * with the marker re-attached. Preserves order; does not merge or deduplicate.
 */
export function parseScenarios(filePath: string): string[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const parts = content.split(SCENARIO_MARKER);
  const scenarios: string[] = [];
  for (let i = 1; i < parts.length; i++) {
    const block = parts[i].trim();
    scenarios.push(SCENARIO_MARKER + (block ? "\n\n" + block : ""));
  }
  return scenarios;
}
