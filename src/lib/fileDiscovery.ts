import fs from "fs";
import path from "path";

const TESTCASES_DIR = "testcases";

/**
 * Finds .md files in /testcases whose filename contains the exact search text (case-sensitive).
 * Returns full paths in deterministic (alphabetical) order.
 */
export function discoverTestFiles(searchText: string): string[] {
  const dir = path.join(process.cwd(), TESTCASES_DIR);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    return [];
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const matching: string[] = [];
  for (const e of entries) {
    if (!e.isFile() || !e.name.endsWith(".md")) continue;
    if (!e.name.includes(searchText)) continue;
    matching.push(e.name);
  }
  matching.sort();
  return matching.map((name) => path.join(dir, name));
}
