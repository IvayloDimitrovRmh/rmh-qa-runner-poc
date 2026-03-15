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
  /** File basename (e.g. "File.md") for display and filename search */
  fileName: string;
  /** Relative path from testcases (e.g. "Folder/File.md"); fallback to sourceFile if absent */
  relativePath?: string;
}

export interface GeneratedSuite {
  suiteName: string;
  sourceFiles: string[];
  testCases: TestCaseDefinition[];
}

/** Tree node for /testcases folder structure (folder or file) */
export interface TreeFolderNode {
  id: string;
  type: "folder";
  name: string;
  path: string;
  children: TreeNode[];
  /** All relative file paths under this folder (for selection) */
  descendantFilePaths: string[];
}

export interface TreeFileNode {
  id: string;
  type: "file";
  name: string;
  path: string;
}

export type TreeNode = TreeFolderNode | TreeFileNode;

export function isFolderNode(node: TreeNode): node is TreeFolderNode {
  return node.type === "folder";
}
