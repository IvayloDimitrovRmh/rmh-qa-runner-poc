export interface TestCaseDefinition {
  id: string;
  testCaseName: string;
  sourceFile: string;
  scenarioContent: string;
}

export interface GeneratedSuite {
  suiteName: string;
  sourceFiles: string[];
  testCases: TestCaseDefinition[];
}
