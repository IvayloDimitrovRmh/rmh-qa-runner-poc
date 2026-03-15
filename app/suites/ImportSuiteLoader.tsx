"use client";

import { useEffect, useState } from "react";
import { buildSuiteFromIndexAndSelectedFiles } from "@/src/lib/suiteFromSelection";
import type { TestCaseIndexRecord, GeneratedSuite, TestCaseDefinition } from "@/src/lib/types";
import {
  IMPORTED_PAYLOAD_KEY,
  IMPORTED_PAYLOAD_PERSISTED_KEY,
  buildCanonicalImportPayload,
  writeImportedProgressToStorage,
  type ExportedProgress,
  type ImportableTestCase,
} from "@/src/lib/progressImport";
import { getStoredDisplayTitle } from "@/src/lib/progressStorage";
import { addRecentSuite } from "@/src/lib/recentSuites";
import SuiteExecutionDashboard from "./SuiteExecutionDashboard";

function suiteFromTestCases(
  suiteName: string,
  testCases: ImportableTestCase[]
): GeneratedSuite {
  const sourceFiles = Array.from(new Set(testCases.map((tc) => tc.sourceFile)));
  const cases: TestCaseDefinition[] = testCases.map((tc) => ({
    id: tc.id,
    testCaseName: tc.testCaseName,
    sourceFile: tc.sourceFile,
    scenarioContent: tc.scenarioContent,
  }));
  return { suiteName, sourceFiles, testCases: cases };
}

export default function ImportSuiteLoader() {
  const [suite, setSuite] = useState<GeneratedSuite | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const raw =
      typeof window !== "undefined"
        ? sessionStorage.getItem(IMPORTED_PAYLOAD_KEY) ??
          localStorage.getItem(IMPORTED_PAYLOAD_PERSISTED_KEY)
        : null;
    if (!raw) {
      setError(
        "No import data found. Use Import Progress on the home page and select a progress file (JSON with suite data, or Export HTML)."
      );
      return;
    }
    sessionStorage.removeItem(IMPORTED_PAYLOAD_KEY);
    let data: ExportedProgress;
    try {
      data = JSON.parse(raw) as ExportedProgress;
      if (!data || typeof data !== "object" || !data.executionState) throw new Error("Invalid payload");
    } catch {
      setError("Invalid or corrupted import data.");
      return;
    }

    if (data.testCases && data.testCases.length > 0) {
      const built = suiteFromTestCases(data.suiteName, data.testCases);
      if (!cancelled) {
        writeImportedProgressToStorage(data);
        setSuite(built);
        setError(null);
        const canonical = buildCanonicalImportPayload(data);
        const displayTitle = getStoredDisplayTitle(data.suiteName) ?? data.suiteName;
        addRecentSuite({
          source: "import",
          suiteName: displayTitle,
          testCount: built.testCases.length,
          fileCount: built.sourceFiles.length,
          openedAt: new Date().toISOString(),
          payload: canonical,
        });
      }
      return;
    }

    if (data.sourceFiles && data.sourceFiles.length > 0) {
      const sourceFiles = data.sourceFiles;
      fetch("/testcase-index.json")
        .then((res) => {
          if (!res.ok) throw new Error("Index not found");
          return res.json();
        })
        .then((indexData: unknown) => {
          if (cancelled) return;
          if (!Array.isArray(indexData)) throw new Error("Invalid index");
          const generated = buildSuiteFromIndexAndSelectedFiles(
            indexData as TestCaseIndexRecord[],
            sourceFiles
          );
          const withName: GeneratedSuite = {
            ...generated,
            suiteName: data.suiteName,
          };
          writeImportedProgressToStorage(data);
          setSuite(withName);
          setError(null);
          const canonical = buildCanonicalImportPayload(data);
          const displayTitle =
            getStoredDisplayTitle(data.suiteName) ?? data.suiteName;
          addRecentSuite({
            source: "import",
            suiteName: displayTitle,
            testCount: withName.testCases.length,
            fileCount: withName.sourceFiles.length,
            openedAt: new Date().toISOString(),
            payload: canonical,
          });
        })
        .catch((err) => {
          if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load suite");
        });
      return;
    }

    setError(
      "This progress file doesn't include suite data. Open the suite first (select files on the home page and Load Selected Tests, or import an Export HTML file), then use Import Progress on the suite page to restore execution state."
    );
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
        <p className="text-slate-600">No test cases in the imported data.</p>
        <a href="/" className="mt-4 inline-block text-sm font-medium text-slate-600 hover:text-blue-600 hover:underline">
          ← Back to home
        </a>
      </div>
    );
  }

  return <SuiteExecutionDashboard suite={suite} />;
}
