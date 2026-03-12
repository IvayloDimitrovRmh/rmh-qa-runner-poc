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

function buildIndex() {
  const dir = path.join(process.cwd(), TESTCASES_DIR);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    fs.writeFileSync(INDEX_PATH, JSON.stringify([], null, 2), "utf-8");
    console.log("No testcases dir; wrote empty index.");
    return;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const mdFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => e.name)
    .sort();

  const records = [];
  let counter = 1;

  for (const basename of mdFiles) {
    const filePath = path.join(dir, basename);
    const content = fs.readFileSync(filePath, "utf-8");
    const scenarios = parseScenarios(content);

    for (const scenarioContent of scenarios) {
      const testId = "T" + String(counter).padStart(2, "0");
      records.push({
        testId,
        testCaseName: extractTestCaseName(scenarioContent, testId),
        sourceFile: basename,
        scenarioContent,
        fileName: basename,
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
