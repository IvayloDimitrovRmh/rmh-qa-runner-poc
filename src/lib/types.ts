export interface TestCaseDefinition {
  id: string;
  testCaseName: string;
  sourceFile: string;
  scenarioContent: string;
}

/** Record shape in public/testcase-index.json */
export interface TestCaseIndexRecord {
  testId: string;
  testCaseName: string;
  sourceFile: string;
  scenarioContent: string;
  fileName: string;
}

export interface GeneratedSuite {
  suiteName: string;
  sourceFiles: string[];
  testCases: TestCaseDefinition[];
}
