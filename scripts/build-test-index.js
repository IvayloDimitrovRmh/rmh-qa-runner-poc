"use strict";

const fs = require("fs");
const path = require("path");

const TESTCASES_DIR = "testcases";
const SCENARIO_MARKER = "# Scenario:";
const INDEX_PATH = path.join(process.cwd(), "public", "testcase-index.json");

function extractTestCaseName(scenarioContent, fallbackId) {
  const firstLine = scenarioContent.split("\n").find((line) => line.trim().length > 0);
  if (!firstLine) return fallbackId;
  const trimmed = firstLine.trim();
  if (trimmed.startsWith(SCENARIO_MARKER)) {
    const after = trimmed.slice(SCENARIO_MARKER.length).trim();
    return after || fallbackId;
  }
  return trimmed || fallbackId;
}

function parseScenarios(content) {
  const parts = content.split(SCENARIO_MARKER);
  const scenarios = [];
  for (let i = 1; i < parts.length; i++) {
    const block = parts[i].trim();
    scenarios.push(SCENARIO_MARKER + (block ? "\n\n" + block : ""));
  }
  return scenarios;
}

/**
 * Recursively collect relative paths (with /) of all .md files under dir.
 */
function collectMdRelativePaths(dir, baseDir, acc = []) {
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

function buildIndex() {
  const baseDir = path.join(process.cwd(), TESTCASES_DIR);
  if (!fs.existsSync(baseDir) || !fs.statSync(baseDir).isDirectory()) {
    fs.writeFileSync(INDEX_PATH, JSON.stringify([], null, 2), "utf-8");
    console.log("No testcases dir; wrote empty index.");
    return;
  }

  const relativePaths = collectMdRelativePaths(baseDir, baseDir).sort();
  const records = [];
  let counter = 1;

  for (const rel of relativePaths) {
    const filePath = path.join(baseDir, ...rel.split("/"));
    const content = fs.readFileSync(filePath, "utf-8");
    const scenarios = parseScenarios(content);

    for (const scenarioContent of scenarios) {
      const testId = "T" + String(counter).padStart(2, "0");
      records.push({
        testId,
        testCaseName: extractTestCaseName(scenarioContent, testId),
        sourceFile: rel,
        scenarioContent,
        fileName: rel,
      });
      counter++;
    }
  }

  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.writeFileSync(INDEX_PATH, JSON.stringify(records, null, 2), "utf-8");
  console.log(`Wrote ${records.length} test cases to public/testcase-index.json`);
}

buildIndex();
