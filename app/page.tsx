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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
        <div className="mx-auto w-full max-w-lg rounded-2xl border border-amber-200 bg-amber-50/90 p-8 shadow-md">
          <h1 className="text-2xl font-bold text-amber-900 tracking-tight">RMH QA Suite Runner</h1>
          <p className="mt-3 text-base text-amber-800">
            {loadError}.<br />
            <span className="inline-block mt-2">Run <code className="rounded bg-amber-200/60 px-1.5 py-0.5 text-amber-900">npm run build:test-index</code> to generate the index.</span>
          </p>
          <a href="/" className="mt-6 inline-block text-sm font-medium text-amber-900 hover:underline">Retry</a>
        </div>
      </div>
    );
  }


  if (index === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-slate-500 text-lg">Loading test cases…</div>
      </div>
    );
  }

  const root = buildTreeFromIndex(index);
  const allFilePaths = collectAllFilePaths(root);


  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 flex flex-col">
      <main className="mx-auto w-full max-w-4xl xl:max-w-6xl 2xl:max-w-7xl flex-1 flex flex-col gap-8 px-2 sm:px-4 xl:px-8">
        {/* Hero/Header Section */}
        <section className="w-full flex flex-col items-center text-center mb-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-2">RMH QA Suite Runner</h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mb-4">
            Deterministic manual QA execution for Markdown-based test suites.<br className="hidden sm:inline" />
            Select test cases, execute manually, and track progress with confidence.
          </p>
        </section>

        {/* Main Card Section */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12 2xl:gap-16 xl:max-w-6xl 2xl:max-w-7xl mx-auto">
          {/* Test Suite Selection Card */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-md p-6 xl:p-8 2xl:p-10 flex flex-col gap-4 min-w-0">
            <h2 className="text-lg font-semibold text-slate-900 mb-1">Select Test Cases</h2>
            <p className="text-sm text-slate-600 mb-2">Choose folders or files to build a suite, or import saved progress to restore execution state.</p>
            <input
              ref={importInputRef}
              type="file"
              accept=".json,.html,application/json,text/html"
              className="hidden"
              onChange={handleImportFile}
              aria-hidden
            />
            <div>
              <SuiteTreeView
                root={root}
                selectedFiles={selectedFiles}
                onSelectionChange={setSelectedFiles}
                onLoadSelected={handleLoadSelected}
                allFilePaths={allFilePaths}
                onImportProgress={handleImportProgress}
              />
            </div>
          </div>

          {/* Recent Suites Card */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-md p-6 xl:p-8 2xl:p-10 flex flex-col gap-4 min-h-[340px] min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-slate-900">Recent Suites</h2>
              <div className="flex gap-2">
                {selectedRecentIndices.size > 0 ? (
                  <button
                    type="button"
                    onClick={handleClearSelectedRecent}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                  >
                    Clear Selected ({selectedRecentIndices.size})
                  </button>
                ) : null}
                {recentSuites.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAllRecent}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
            {recentSuites.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 py-8 text-slate-400">
                <svg width="48" height="48" fill="none" viewBox="0 0 48 48" aria-hidden className="mb-2"><rect width="48" height="48" rx="12" fill="#f1f5f9"/><path d="M16 22h16M16 28h10" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/><rect x="12" y="12" width="24" height="24" rx="4" stroke="#cbd5e1" strokeWidth="2"/></svg>
                <span className="text-base">No recent suites</span>
                <span className="text-xs mt-1">Run or import a suite to see it here.</span>
              </div>
            ) : (
              <ul className="space-y-3">
                {recentSuites.map((entry, index) => {
                  const displayName =
                    entry.suiteName?.trim() ||
                    (entry.source === "tree"
                      ? `Selected (${entry.sourceFiles.length} file${entry.sourceFiles.length === 1 ? "" : "s"})`
                      : (entry.payload?.suiteName?.trim() ?? "Imported suite"));
                  return (
                    <li
                      key={`${entry.source}-${entry.openedAt}-${index}`}
                      className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/70 p-3 transition-colors hover:bg-blue-50/40 group"
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
                        <p className="font-medium text-slate-900 truncate">{displayName}</p>
                        <p className="text-xs text-slate-500">
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
                      <div className="flex shrink-0 gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => handleOpenRecent(entry)}
                          className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 shadow-sm"
                        >
                          Open
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveRecent(index)}
                          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>

        {/* About/Info Section */}
        <section className="w-full mt-2 flex flex-col items-center text-center">
          <p className="text-xs text-slate-400 max-w-xl">
            <span className="font-semibold text-slate-500">Note:</span> This tool is for deterministic manual QA execution. Test cases are written in Markdown, indexed for performance, and executed manually. No AI or backend execution occurs at runtime.
          </p>
        </section>
      </main>
    </div>
  );
}
