"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import SuiteTreeView from "./components/SuiteTreeView";
import { buildTreeFromIndex, collectAllFilePaths } from "@/src/lib/treeBuilder";
import { TREE_SELECTION_KEY, SELECTED_FILES_KEY } from "@/src/lib/treeStorageKeys";
import {
  parseProgressFile,
  buildCanonicalImportPayload,
  IMPORTED_PAYLOAD_KEY,
  persistImportedPayloadForRefresh,
} from "@/src/lib/progressImport";
import {
  getRecentSuites,
  removeRecentSuite,
  removeRecentSuitesByIndices,
  clearRecentSuites,
  type RecentSuiteEntry,
} from "@/src/lib/recentSuites";
import type { TestCaseIndexRecord } from "@/src/lib/types";

function formatOpenedAt(iso: string): string {
  try {
    const d = new Date(iso);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const dDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    if (dDay.getTime() === today.getTime()) {
      return `Today, ${d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}`;
    }
    if (dDay.getTime() === yesterday.getTime()) {
      return "Yesterday";
    }
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined });
  } catch {
    return iso;
  }
}

export default function Home() {
  const router = useRouter();
  const [index, setIndex] = useState<TestCaseIndexRecord[] | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [loadError, setLoadError] = useState<string | null>(null);
  const restoredSelectionRef = useRef(false);
  const importInputRef = useRef<HTMLInputElement>(null);
  const [recentSuites, setRecentSuites] = useState<RecentSuiteEntry[]>([]);
  const [selectedRecentIndices, setSelectedRecentIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetch("/testcase-index.json")
      .then((res) => {
        if (!res.ok) throw new Error("Index not found");
        return res.json();
      })
      .then((data: unknown) => {
        if (!Array.isArray(data)) throw new Error("Invalid index");
        setIndex(data as TestCaseIndexRecord[]);
        setLoadError(null);
      })
      .catch((err) => setLoadError(err instanceof Error ? err.message : "Failed to load index"));
  }, []);

  useEffect(() => {
    if (index === null || index.length === 0 || restoredSelectionRef.current) return;
    restoredSelectionRef.current = true;
    const root = buildTreeFromIndex(index);
    const allPaths = new Set(collectAllFilePaths(root));
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(TREE_SELECTION_KEY) : null;
      if (!raw) return;
      const arr = JSON.parse(raw) as unknown;
      if (!Array.isArray(arr)) return;
      const next = new Set<string>();
      for (const p of arr) {
        if (typeof p === "string" && allPaths.has(p)) next.add(p);
      }
      setSelectedFiles(next);
    } catch {
      // ignore
    }
  }, [index]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(TREE_SELECTION_KEY, JSON.stringify(Array.from(selectedFiles)));
    } catch {
      // ignore
    }
  }, [selectedFiles]);

  useEffect(() => {
    setRecentSuites(getRecentSuites());
  }, []);

  const handleOpenRecent = (entry: RecentSuiteEntry) => {
    try {
      if (entry.source === "tree") {
        sessionStorage.setItem(SELECTED_FILES_KEY, JSON.stringify(entry.sourceFiles));
        router.push("/suites?source=tree");
      } else {
        const payloadJson = JSON.stringify(entry.payload);
        sessionStorage.setItem(IMPORTED_PAYLOAD_KEY, payloadJson);
        persistImportedPayloadForRefresh(entry.payload);
        router.push("/suites?source=import");
      }
    } catch {
      window.alert("Could not open this suite. It may no longer be valid.");
    }
  };

  const handleRemoveRecent = (index: number) => {
    removeRecentSuite(index);
    setRecentSuites(getRecentSuites());
    setSelectedRecentIndices((prev) => {
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  };

  const handleClearSelectedRecent = () => {
    if (selectedRecentIndices.size === 0) return;
    removeRecentSuitesByIndices(Array.from(selectedRecentIndices).sort((a, b) => b - a));
    setRecentSuites(getRecentSuites());
    setSelectedRecentIndices(new Set());
  };

  const handleClearAllRecent = () => {
    clearRecentSuites();
    setRecentSuites([]);
    setSelectedRecentIndices(new Set());
  };

  const toggleRecentSelection = (index: number) => {
    setSelectedRecentIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleLoadSelected = () => {
    const list = Array.from(selectedFiles);
    if (list.length === 0) return;
    try {
      sessionStorage.setItem(SELECTED_FILES_KEY, JSON.stringify(list));
      router.push("/suites?source=tree");
    } catch {
      // ignore
    }
  };

  const handleImportProgress = () => {
    importInputRef.current?.click();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const raw = reader.result;
        if (typeof raw !== "string") return;
        const isHtml =
          file.name.toLowerCase().endsWith(".html") || file.type === "text/html";
        const data = parseProgressFile(raw, isHtml);
        if (!data) {
          window.alert(
            "Invalid progress file. Import a file from Save Progress (JSON) or Export HTML."
          );
          return;
        }
        const canonical = buildCanonicalImportPayload(data);
        const hasSuiteData =
          (Array.isArray(canonical.testCases) && canonical.testCases.length > 0) ||
          (Array.isArray(canonical.sourceFiles) && canonical.sourceFiles.length > 0);
        if (hasSuiteData) {
          const payloadJson = JSON.stringify(canonical);
          sessionStorage.setItem(IMPORTED_PAYLOAD_KEY, payloadJson);
          persistImportedPayloadForRefresh(canonical);
          if (sessionStorage.getItem(IMPORTED_PAYLOAD_KEY) === payloadJson) {
            router.push("/suites?source=import");
          } else {
            window.alert("Could not save import data. Try again or use Import Progress on the suite page.");
          }
        } else {
          window.alert(
            "This progress file doesn't include suite data. Open the suite first (select files and Load Selected Tests, or import an Export HTML file), then use Import Progress on the suite page to restore execution state."
          );
        }
      } catch {
        window.alert(
          "Could not read the file. It may be corrupted or not a valid progress file."
        );
      }
    };
    reader.readAsText(file);
  };

  if (loadError) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-2xl rounded-xl border border-amber-200 bg-amber-50/80 p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-amber-900">
            RMH QA Suite Runner
          </h1>
          <p className="mt-2 text-sm text-amber-800">
            {loadError}. Run <code className="rounded bg-amber-200/60 px-1.5 py-0.5 text-amber-900">npm run build:test-index</code> to
            generate the index.
          </p>
          <a href="/" className="mt-4 inline-block text-sm font-medium text-amber-800 hover:underline">Retry</a>
        </div>
      </div>
    );
  }

  if (index === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading test cases…</p>
      </div>
    );
  }

  const root = buildTreeFromIndex(index);
  const allFilePaths = collectAllFilePaths(root);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-1 text-2xl font-semibold text-slate-900">
          RMH QA Suite Runner
        </h1>
        <p className="mb-6 text-sm text-slate-600">
          Select folders or files below and load tests, or import saved progress to open a suite with execution state restored.
        </p>

        <input
          ref={importInputRef}
          type="file"
          accept=".json,.html,application/json,text/html"
          className="hidden"
          onChange={handleImportFile}
          aria-hidden
        />

        <SuiteTreeView
          root={root}
          selectedFiles={selectedFiles}
          onSelectionChange={setSelectedFiles}
          onLoadSelected={handleLoadSelected}
          allFilePaths={allFilePaths}
          onImportProgress={handleImportProgress}
        />

        {recentSuites.length > 0 && (
          <section className="mt-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-slate-900">Recent Suites</h2>
              <div className="flex flex-wrap items-center gap-2">
                {selectedRecentIndices.size > 0 ? (
                  <button
                    type="button"
                    onClick={handleClearSelectedRecent}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    Clear Selected Suites ({selectedRecentIndices.size})
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={handleClearAllRecent}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  Clear All Recent Suites
                </button>
              </div>
            </div>
            <ul className="space-y-3">
              {recentSuites.map((entry, index) => (
                <li
                  key={`${entry.source}-${entry.openedAt}-${index}`}
                  className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-3 transition-colors hover:bg-slate-50"
                >
                  <label className="flex cursor-pointer items-center gap-2 shrink-0">
                    <input
                      type="checkbox"
                      checked={selectedRecentIndices.has(index)}
                      onChange={() => toggleRecentSelection(index)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
                    />
                    <span className="sr-only">Select for remove</span>
                  </label>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-900">{entry.suiteName}</p>
                    <p className="text-sm text-slate-500">
                      {entry.source === "tree"
                        ? `${entry.sourceFiles.length} file${entry.sourceFiles.length === 1 ? "" : "s"} · ${entry.testCount} test${entry.testCount === 1 ? "" : "s"}`
                        : `${entry.fileCount ?? entry.payload.sourceFiles?.length ?? "—"} file(s) · ${entry.testCount} test${entry.testCount === 1 ? "" : "s"}`}
                      {" · "}
                      {formatOpenedAt(entry.openedAt)}
                      {entry.source === "import" && (
                        <span className="ml-1 text-slate-400">(import)</span>
                      )}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenRecent(entry)}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                    >
                      Open
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveRecent(index)}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
