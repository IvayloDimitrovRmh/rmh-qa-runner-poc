import fs from "fs";
import path from "path";

const TESTCASES_DIR = "testcases";

/**
 * Recursively collects relative paths (normalized with /) of all .md files under dir.
 * Does not sort here; caller sorts for deterministic order.
 */
function collectMdRelativePaths(
  dir: string,
  baseDir: string,
  acc: string[] = []
): string[] {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return acc;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.relative(baseDir, full);
    const relNorm = rel.split(path.sep).join("/");
    if (e.isFile()) {
      if (e.name.endsWith(".md")) acc.push(relNorm);
    } else {
      collectMdRelativePaths(full, baseDir, acc);
    }
  }
  return acc;
}

/**
 * Finds .md files under /testcases (recursively) whose filename (basename) contains
 * the exact search text (case-sensitive). Returns full paths in deterministic order
 * (sorted by relative path from testcases).
 */
export function discoverTestFiles(searchText: string): string[] {
  const baseDir = path.join(process.cwd(), TESTCASES_DIR);
  const relativePaths = collectMdRelativePaths(baseDir, baseDir).sort();
  const matching = relativePaths.filter((rel) =>
    path.basename(rel).includes(searchText)
  );
  return matching.map((rel) => path.join(baseDir, ...rel.split("/")));
}
