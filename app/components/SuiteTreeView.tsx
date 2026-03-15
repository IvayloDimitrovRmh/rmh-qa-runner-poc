"use client";

import { useState, useRef, useEffect } from "react";
import type { TreeFolderNode, TreeNode } from "@/src/lib/types";
import { TREE_EXPANDED_KEY } from "@/src/lib/treeStorageKeys";

interface SuiteTreeViewProps {
  root: TreeFolderNode;
  selectedFiles: Set<string>;
  onSelectionChange: (next: Set<string>) => void;
  onLoadSelected: () => void;
  allFilePaths: string[];
  onImportProgress?: () => void;
}

function nodeMatchesFilter(node: TreeNode, filterLower: string): boolean {
  if (filterLower === "") return true;
  if (node.type === "file") {
    return (
      node.name.toLowerCase().includes(filterLower) ||
      node.path.toLowerCase().includes(filterLower)
    );
  }
  return (
    node.name.toLowerCase().includes(filterLower) ||
    node.children.some((c) => nodeMatchesFilter(c, filterLower))
  );
}

function FolderRow({
  node,
  depth,
  selectedFiles,
  onToggleFolder,
  onToggleFile,
  expandedIds,
  onToggleExpanded,
  filterLower,
}: {
  node: TreeFolderNode;
  depth: number;
  selectedFiles: Set<string>;
  onToggleFolder: (node: TreeFolderNode) => void;
  onToggleFile: (path: string) => void;
  expandedIds: Set<string>;
  onToggleExpanded: (id: string) => void;
  filterLower: string;
}) {
  const visibleChildren =
    filterLower === ""
      ? node.children
      : node.children.filter((c) => nodeMatchesFilter(c, filterLower));

  const allSelected =
    node.descendantFilePaths.length > 0 &&
    node.descendantFilePaths.every((f) => selectedFiles.has(f));
  const someSelected = node.descendantFilePaths.some((f) => selectedFiles.has(f));
  const indeterminate = someSelected && !allSelected;
  const isExpanded = expandedIds.has(node.id);
  const checkboxRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (checkboxRef.current) checkboxRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div className="select-none">
      <div
        className="flex items-center gap-2 py-1.5 pr-2 hover:bg-slate-50 rounded-md transition-colors"
        style={{ paddingLeft: depth * 16 + 4 }}
      >
        <button
          type="button"
          onClick={() => onToggleExpanded(node.id)}
          className="shrink-0 w-5 h-5 flex items-center justify-center text-slate-500 hover:text-slate-700"
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {node.children.length > 0 ? (isExpanded ? "▼" : "▶") : null}
        </button>
        <label className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer">
          <input
            ref={checkboxRef}
            type="checkbox"
            checked={allSelected}
            onChange={() => onToggleFolder(node)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 shrink-0"
          />
          <span className="font-medium text-slate-800 truncate">
            {node.name}
          </span>
        </label>
      </div>
      {isExpanded &&
        visibleChildren.map((child) =>
          child.type === "folder" ? (
            <FolderRow
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedFiles={selectedFiles}
              onToggleFolder={onToggleFolder}
              onToggleFile={onToggleFile}
              expandedIds={expandedIds}
              onToggleExpanded={onToggleExpanded}
              filterLower={filterLower}
            />
          ) : (
            <FileRow
              key={child.id}
              path={child.path}
              name={child.name}
              depth={depth + 1}
              selected={selectedFiles.has(child.path)}
              onToggle={() => onToggleFile(child.path)}
            />
          )
        )}
    </div>
  );
}

function FileRow({
  path,
  name,
  depth,
  selected,
  onToggle,
}: {
  path: string;
  name: string;
  depth: number;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="flex items-center gap-2 py-1.5 pr-2 hover:bg-slate-50 rounded-md transition-colors"
      style={{ paddingLeft: depth * 16 + 4 }}
    >
      <span className="w-5 shrink-0" />
      <label className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 shrink-0"
        />
        <span className="text-sm text-slate-600 truncate">{name}</span>
      </label>
    </div>
  );
}

export default function SuiteTreeView({
  root,
  selectedFiles,
  onSelectionChange,
  onLoadSelected,
  allFilePaths,
  onImportProgress,
}: SuiteTreeViewProps) {
  const [filterText, setFilterText] = useState("");
  const filterLower = filterText.trim().toLowerCase();

  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    if (typeof window === "undefined") {
      const ids = new Set<string>(["root"]);
      root.children.forEach((c) => {
        if (c.type === "folder") ids.add(c.id);
      });
      return ids;
    }
    try {
      const raw = localStorage.getItem(TREE_EXPANDED_KEY);
      if (!raw) throw new Error("no saved");
      const arr = JSON.parse(raw) as unknown;
      if (!Array.isArray(arr)) throw new Error("invalid");
      const ids = new Set<string>(["root"]);
      arr.forEach((id: unknown) => {
        if (typeof id === "string") ids.add(id);
      });
      return ids;
    } catch {
      const ids = new Set<string>(["root"]);
      root.children.forEach((c) => {
        if (c.type === "folder") ids.add(c.id);
      });
      return ids;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(TREE_EXPANDED_KEY, JSON.stringify(Array.from(expandedIds)));
    } catch {
      // ignore
    }
  }, [expandedIds]);

  const onToggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const onToggleFolder = (node: TreeFolderNode) => {
    const allSelected =
      node.descendantFilePaths.length > 0 &&
      node.descendantFilePaths.every((f) => selectedFiles.has(f));
    const next = new Set(selectedFiles);
    if (allSelected) {
      node.descendantFilePaths.forEach((f) => next.delete(f));
    } else {
      node.descendantFilePaths.forEach((f) => next.add(f));
    }
    onSelectionChange(next);
  };

  const onToggleFile = (path: string) => {
    const next = new Set(selectedFiles);
    if (next.has(path)) next.delete(path);
    else next.add(path);
    onSelectionChange(next);
  };

  const selectAll = () => {
    onSelectionChange(new Set(allFilePaths));
  };

  const clearSelection = () => {
    onSelectionChange(new Set());
  };

  const selectedCount = selectedFiles.size;

  const visibleTopLevel =
    filterLower === ""
      ? root.children
      : root.children.filter((c) => nodeMatchesFilter(c, filterLower));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          Filter tree
          <input
            type="search"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Folder or file name…"
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={selectAll}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        >
          Select All
        </button>
        <button
          type="button"
          onClick={clearSelection}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        >
          Clear Selection
        </button>
        <button
          type="button"
          onClick={onLoadSelected}
          disabled={selectedCount === 0}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
        >
          Load Selected Tests
        </button>
        {onImportProgress ? (
          <button
            type="button"
            onClick={onImportProgress}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            Import Progress
          </button>
        ) : null}
        <span className="text-sm text-slate-500">
          {selectedCount} file{selectedCount === 1 ? "" : "s"} selected
        </span>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-auto max-h-[60vh]">
        {visibleTopLevel.map((child) =>
          child.type === "folder" ? (
            <FolderRow
              key={child.id}
              node={child}
              depth={0}
              selectedFiles={selectedFiles}
              onToggleFolder={onToggleFolder}
              onToggleFile={onToggleFile}
              expandedIds={expandedIds}
              onToggleExpanded={onToggleExpanded}
              filterLower={filterLower}
            />
          ) : (
            <FileRow
              key={child.id}
              path={child.path}
              name={child.name}
              depth={0}
              selected={selectedFiles.has(child.path)}
              onToggle={() => onToggleFile(child.path)}
            />
          )
        )}
      </div>
    </div>
  );
}
