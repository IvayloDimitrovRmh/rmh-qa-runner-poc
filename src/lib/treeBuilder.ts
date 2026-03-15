import type { TestCaseIndexRecord } from "./types";
import type { TreeFolderNode, TreeFileNode, TreeNode } from "./types";

/** Relative path from testcases for a record (supports index with or without relativePath) */
export function getRecordRelativePath(r: TestCaseIndexRecord): string {
  return r.relativePath ?? r.sourceFile;
}

/**
 * Builds a deterministic folder/file tree from the test case index.
 * Uses unique relative paths from the index; no raw filesystem access.
 * Folders are populated with descendantFilePaths for selection logic.
 */
export function buildTreeFromIndex(index: TestCaseIndexRecord[]): TreeFolderNode {
  const uniquePaths = Array.from(new Set(index.map(getRecordRelativePath))).sort();
  const root: TreeFolderNode = {
    id: "root",
    type: "folder",
    name: "testcases",
    path: "",
    children: [],
    descendantFilePaths: [],
  };

  for (const filePath of uniquePaths) {
    const segments = filePath.split("/");
    if (segments.length === 0) continue;
    let current: TreeFolderNode = root;
    for (let i = 0; i < segments.length - 1; i++) {
      const segment = segments[i];
      const folderPath = segments.slice(0, i + 1).join("/");
      let child = current.children.find(
        (c): c is TreeFolderNode => c.type === "folder" && c.path === folderPath
      );
      if (!child) {
        child = {
          id: `folder:${folderPath}`,
          type: "folder",
          name: segment,
          path: folderPath,
          children: [],
          descendantFilePaths: [],
        };
        current.children.push(child);
      }
      current = child;
    }
    const fileName = segments[segments.length - 1];
    const fileNode: TreeFileNode = {
      id: filePath,
      type: "file",
      name: fileName,
      path: filePath,
    };
    current.children.push(fileNode);
  }

  sortTreeChildren(root);
  fillDescendantFilePaths(root);
  return root;
}

function sortTreeChildren(node: TreeFolderNode): void {
  node.children.sort((a, b) => {
    const aIsFolder = a.type === "folder" ? 0 : 1;
    const bIsFolder = b.type === "folder" ? 0 : 1;
    if (aIsFolder !== bIsFolder) return aIsFolder - bIsFolder;
    return a.name.localeCompare(b.name);
  });
  node.children.forEach((c) => {
    if (c.type === "folder") sortTreeChildren(c);
  });
}

function fillDescendantFilePaths(node: TreeFolderNode): void {
  const files: string[] = [];
  for (const c of node.children) {
    if (c.type === "file") {
      files.push(c.path);
    } else {
      fillDescendantFilePaths(c);
      files.push(...c.descendantFilePaths);
    }
  }
  node.descendantFilePaths = files;
}

/**
 * Returns all file paths in the tree (flat list) for Select All.
 */
export function collectAllFilePaths(root: TreeFolderNode): string[] {
  return root.descendantFilePaths;
}
