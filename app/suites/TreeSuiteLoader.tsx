"use client";

import { useEffect, useState } from "react";
import { buildSuiteFromIndexAndSelectedFiles } from "@/src/lib/suiteFromSelection";
import type { TestCaseIndexRecord, GeneratedSuite } from "@/src/lib/types";
import { SELECTED_FILES_KEY } from "@/src/lib/treeStorageKeys";
import { addRecentSuite } from "@/src/lib/recentSuites";
import SuiteExecutionDashboard from "./SuiteExecutionDashboard";

export default function TreeSuiteLoader() {
  const [suite, setSuite] = useState<GeneratedSuite | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/testcase-index.json")
      .then((res) => {
        if (!res.ok) throw new Error("Index not found");
        return res.json();
      })
      .then((data: unknown) => {
        if (cancelled) return;
        if (!Array.isArray(data)) throw new Error("Invalid index");
        const raw = typeof window !== "undefined" ? sessionStorage.getItem(SELECTED_FILES_KEY) : null;
        if (!raw) {
          setError("No selection found. Select files on the home page and click Load Selected Tests.");
          return;
        }
        let selected: string[];
        try {
          selected = JSON.parse(raw) as string[];
          if (!Array.isArray(selected)) throw new Error("Invalid selection");
        } catch {
          setError("Invalid saved selection.");
          return;
        }
        const generated = buildSuiteFromIndexAndSelectedFiles(
          data as TestCaseIndexRecord[],
          selected
        );
        setSuite(generated);
        setError(null);
        addRecentSuite({
          source: "tree",
          suiteName: generated.suiteName,
          sourceFiles: generated.sourceFiles,
          testCount: generated.testCases.length,
          openedAt: new Date().toISOString(),
        });
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load suite");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-6 shadow-sm">
        <p className="text-amber-800">{error}</p>
        <a href="/" className="mt-4 inline-block text-sm font-medium text-amber-800 hover:underline">
          ← Back to home
        </a>
      </div>
    );
  }

  if (!suite) {
    return <p className="text-slate-500">Loading suite…</p>;
  }

  if (suite.testCases.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-600">No test cases in the selected files.</p>
        <a href="/" className="mt-4 inline-block text-sm font-medium text-slate-600 hover:text-blue-600 hover:underline">← Back to home</a>
      </div>
    );
  }

  return <SuiteExecutionDashboard suite={suite} />;
}
