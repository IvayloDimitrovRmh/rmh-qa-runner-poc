"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { GeneratedSuite, TestCaseDefinition } from "@/src/lib/types";

export type ExecutionStatus = "NOT RUN" | "PASS" | "FAIL" | "BLOCKED";

export interface ExecutionState {
  testId: string;
  status: ExecutionStatus;
  comment: string;
  attachment: string;
}

const STATUS_OPTIONS: ExecutionStatus[] = ["NOT RUN", "PASS", "FAIL", "BLOCKED"];
const FILTER_OPTIONS = ["ALL", ...STATUS_OPTIONS] as const;
export type StatusFilter = (typeof FILTER_OPTIONS)[number];
const STORAGE_KEY_PREFIX = "rmh-suite-execution::";

function getStorageKey(searchText: string): string {
  return `${STORAGE_KEY_PREFIX}${searchText}`;
}

function getDefaultExecution(testId: string): ExecutionState {
  return { testId, status: "NOT RUN", comment: "", attachment: "" };
}

function testMatchesSearch(tc: TestCaseDefinition, searchLower: string): boolean {
  if (!searchLower) return true;
  const text = [
    tc.id,
    tc.testCaseName,
    tc.sourceFile,
    tc.scenarioContent,
  ].join(" ");
  return text.toLowerCase().includes(searchLower);
}

function isValidStatus(s: string): s is ExecutionStatus {
  return STATUS_OPTIONS.includes(s as ExecutionStatus);
}

function loadFromStorage(searchText: string): Record<string, ExecutionState> {
  if (typeof window === "undefined" || !window.localStorage) return {};
  try {
    const raw = window.localStorage.getItem(getStorageKey(searchText));
    if (!raw) return {};
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return {};
    const result: Record<string, ExecutionState> = {};
    for (const key of Object.keys(data)) {
      const v = data[key];
      if (
        v &&
        typeof v === "object" &&
        typeof v.testId === "string" &&
        isValidStatus(v.status) &&
        typeof v.comment === "string" &&
        typeof v.attachment === "string"
      ) {
        result[key] = {
          testId: v.testId,
          status: v.status,
          comment: v.comment,
          attachment: v.attachment,
        };
      }
    }
    return result;
  } catch {
    return {};
  }
}

function saveToStorage(searchText: string, state: Record<string, ExecutionState>): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem(getStorageKey(searchText), JSON.stringify(state));
  } catch {
    // ignore quota or other errors
  }
}

function clearStorage(searchText: string): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.removeItem(getStorageKey(searchText));
  } catch {
    // ignore
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sanitizeFilename(name: string): string {
  return name.replace(/[\\/:*?"<>|]/g, "-").trim() || "suite";
}

export interface ExportedProgress {
  suiteName: string;
  exportedAt: string;
  executionState: Record<string, ExecutionState>;
}

function isValidExecutionState(v: unknown): v is ExecutionState {
  return (
    v !== null &&
    typeof v === "object" &&
    typeof (v as ExecutionState).testId === "string" &&
    isValidStatus((v as ExecutionState).status) &&
    typeof (v as ExecutionState).comment === "string" &&
    typeof (v as ExecutionState).attachment === "string"
  );
}

function downloadJson(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function buildExportHtml(
  suite: GeneratedSuite,
  executionByTestId: Record<string, ExecutionState>,
  getExecution: (testId: string) => ExecutionState
): string {
  const total = suite.testCases.length;
  const passed = suite.testCases.filter((tc) => getExecution(tc.id).status === "PASS").length;
  const failed = suite.testCases.filter((tc) => getExecution(tc.id).status === "FAIL").length;
  const blocked = suite.testCases.filter((tc) => getExecution(tc.id).status === "BLOCKED").length;
  const notRun = suite.testCases.filter(
    (tc) => getExecution(tc.id).status === "NOT RUN"
  ).length;

  const rows = suite.testCases
    .map((tc) => {
      const ex = getExecution(tc.id);
      return `<tr>
        <td>${escapeHtml(tc.id)}</td>
        <td>${escapeHtml(tc.testCaseName)}</td>
        <td>${escapeHtml(tc.sourceFile)}</td>
        <td>${escapeHtml(ex.status)}</td>
        <td>${escapeHtml(ex.comment)}</td>
        <td>${escapeHtml(ex.attachment)}</td>
      </tr>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Execution Report - ${escapeHtml(suite.suiteName)}</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 960px; margin: 2rem auto; padding: 0 1rem; color: #171717; }
    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    .meta { color: #525252; font-size: 0.875rem; margin-bottom: 1.5rem; }
    .summary { margin-bottom: 1.5rem; }
    .summary ul { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 1rem; }
    .summary li { font-size: 0.875rem; }
    table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
    th, td { border: 1px solid #d4d4d4; padding: 0.5rem 0.75rem; text-align: left; }
    th { background: #f5f5f5; font-weight: 600; }
    tr:nth-child(even) { background: #fafafa; }
  </style>
</head>
<body>
  <h1>RMH QA Suite Runner – Execution Report</h1>
  <div class="meta">
    <p><strong>Suite name / Search text:</strong> ${escapeHtml(suite.suiteName)}</p>
    <p><strong>Source files:</strong> ${escapeHtml(suite.sourceFiles.length > 0 ? suite.sourceFiles.join(", ") : "none")}</p>
  </div>
  <div class="summary">
    <h2 style="font-size: 1rem; margin-bottom: 0.5rem;">Execution summary</h2>
    <ul>
      <li><strong>Total:</strong> ${total}</li>
      <li><strong>Passed:</strong> ${passed}</li>
      <li><strong>Failed:</strong> ${failed}</li>
      <li><strong>Blocked:</strong> ${blocked}</li>
      <li><strong>Not run:</strong> ${notRun}</li>
    </ul>
  </div>
  <table>
    <thead>
      <tr>
        <th>Test ID</th>
        <th>Test Case Name</th>
        <th>Source File</th>
        <th>Status</th>
        <th>Comment</th>
        <th>Attachment</th>
      </tr>
    </thead>
    <tbody>
${rows}
    </tbody>
  </table>
</body>
</html>`;
}

function downloadReport(html: string, filename: string) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function ExecutionSummary({
  testCases,
  executionByTestId,
}: {
  testCases: TestCaseDefinition[];
  executionByTestId: Record<string, ExecutionState>;
}) {
  const total = testCases.length;
  const passed = testCases.filter((tc) => executionByTestId[tc.id]?.status === "PASS").length;
  const failed = testCases.filter((tc) => executionByTestId[tc.id]?.status === "FAIL").length;
  const blocked = testCases.filter((tc) => executionByTestId[tc.id]?.status === "BLOCKED").length;
  const notRun = testCases.filter(
    (tc) => !executionByTestId[tc.id] || executionByTestId[tc.id].status === "NOT RUN"
  ).length;

  return (
    <section className="mb-6 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Execution summary
      </h2>
      <ul className="flex flex-wrap gap-4 text-sm">
        <li>
          <span className="text-zinc-500 dark:text-zinc-400">Total:</span>{" "}
          <span className="font-medium text-zinc-900 dark:text-zinc-100">{total}</span>
        </li>
        <li>
          <span className="text-zinc-500 dark:text-zinc-400">Passed:</span>{" "}
          <span className="font-medium text-green-600 dark:text-green-400">{passed}</span>
        </li>
        <li>
          <span className="text-zinc-500 dark:text-zinc-400">Failed:</span>{" "}
          <span className="font-medium text-red-600 dark:text-red-400">{failed}</span>
        </li>
        <li>
          <span className="text-zinc-500 dark:text-zinc-400">Blocked:</span>{" "}
          <span className="font-medium text-amber-600 dark:text-amber-400">{blocked}</span>
        </li>
        <li>
          <span className="text-zinc-500 dark:text-zinc-400">Not run:</span>{" "}
          <span className="font-medium text-zinc-600 dark:text-zinc-400">{notRun}</span>
        </li>
      </ul>
    </section>
  );
}

const SCENARIO_PREVIEW_LINES = 3;

function getScenarioPreview(content: string, maxLines: number): string {
  const lines = content.split("\n");
  const preview = lines.slice(0, maxLines).join("\n");
  return lines.length <= maxLines ? preview : preview + "\n…";
}

function TestCaseCard({
  tc,
  execution,
  onUpdate,
  isExpanded,
  onToggleExpand,
}: {
  tc: TestCaseDefinition;
  execution: ExecutionState;
  onUpdate: (next: ExecutionState) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex flex-wrap items-baseline gap-2">
        <span className="font-mono text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {tc.id}
        </span>
        <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
          {tc.testCaseName}
        </h3>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">{tc.sourceFile}</span>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          Status
          <select
            value={execution.status}
            onChange={(e) =>
              onUpdate({ ...execution, status: e.target.value as ExecutionStatus })
            }
            className="rounded border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm text-zinc-600 dark:text-zinc-400">Comment</label>
        <textarea
          value={execution.comment}
          onChange={(e) => onUpdate({ ...execution, comment: e.target.value })}
          placeholder="Optional"
          rows={2}
          className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm text-zinc-600 dark:text-zinc-400">
          Attachment (screenshot or bug ID)
        </label>
        <input
          type="text"
          value={execution.attachment}
          onChange={(e) => onUpdate({ ...execution, attachment: e.target.value })}
          placeholder="Optional"
          className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400"
        />
      </div>

      <div className="rounded bg-zinc-100 p-4 dark:bg-zinc-800">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Scenario content
          </span>
          <button
            type="button"
            onClick={onToggleExpand}
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        </div>
        {isExpanded ? (
          <pre className="whitespace-pre-wrap text-sm text-zinc-800 dark:text-zinc-200">
            {tc.scenarioContent}
          </pre>
        ) : (
          <>
            <pre className="whitespace-pre-wrap text-sm text-zinc-800 dark:text-zinc-200">
              {getScenarioPreview(tc.scenarioContent, SCENARIO_PREVIEW_LINES)}
            </pre>
            <button
              type="button"
              onClick={onToggleExpand}
              className="mt-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Show more
            </button>
          </>
        )}
      </div>
    </article>
  );
}

export default function SuiteExecutionDashboard({ suite }: { suite: GeneratedSuite }) {
  const [executionByTestId, setExecutionByTestId] = useState<Record<string, ExecutionState>>(
    () => loadFromStorage(suite.suiteName)
  );
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [textSearch, setTextSearch] = useState("");
  const [expandedByTestId, setExpandedByTestId] = useState<Record<string, boolean>>({});

  const getExecution = useCallback(
    (testId: string): ExecutionState => {
      return executionByTestId[testId] ?? getDefaultExecution(testId);
    },
    [executionByTestId]
  );

  const statusFiltered =
    statusFilter === "ALL"
      ? suite.testCases
      : suite.testCases.filter((tc) => getExecution(tc.id).status === statusFilter);

  const searchTrimmed = textSearch.trim().toLowerCase();
  const visibleTests =
    searchTrimmed === ""
      ? statusFiltered
      : statusFiltered.filter((tc) => testMatchesSearch(tc, searchTrimmed));

  useEffect(() => {
    setExecutionByTestId(loadFromStorage(suite.suiteName));
  }, [suite.suiteName]);

  useEffect(() => {
    saveToStorage(suite.suiteName, executionByTestId);
    // Only re-run when execution state changes; suite.suiteName is read for the storage key
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [executionByTestId]);

  const updateExecution = useCallback((next: ExecutionState) => {
    setExecutionByTestId((prev) => ({ ...prev, [next.testId]: next }));
  }, []);

  const handleClearProgress = useCallback(() => {
    clearStorage(suite.suiteName);
    setExecutionByTestId({});
  }, [suite.suiteName]);

  const expandAll = useCallback(() => {
    setExpandedByTestId(
      suite.testCases.reduce<Record<string, boolean>>((acc, tc) => {
        acc[tc.id] = true;
        return acc;
      }, {})
    );
  }, [suite.testCases]);

  const collapseAll = useCallback(() => {
    setExpandedByTestId({});
  }, []);

  const exportProgress = useCallback(() => {
    const payload: ExportedProgress = {
      suiteName: suite.suiteName,
      exportedAt: new Date().toISOString(),
      executionState: executionByTestId,
    };
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    downloadJson(payload, `suite-progress-${timestamp}.json`);
  }, [suite.suiteName, executionByTestId]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const importProgress = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImportFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const raw = reader.result;
          if (typeof raw !== "string") return;
          const data = JSON.parse(raw) as unknown;
          if (!data || typeof data !== "object" || !("executionState" in data)) return;
          const state = (data as { executionState?: unknown }).executionState;
          if (!state || typeof state !== "object") return;
          if (
            "suiteName" in data &&
            typeof data.suiteName === "string" &&
            data.suiteName !== suite.suiteName
          ) {
            const proceed = window.confirm(
              `This file was exported from suite "${data.suiteName}". Current suite is "${suite.suiteName}". Import anyway?`
            );
            if (!proceed) return;
          }
          const currentTestIds = new Set(suite.testCases.map((tc) => tc.id));
          const merged: Record<string, ExecutionState> = { ...executionByTestId };
          for (const key of Object.keys(state)) {
            if (!currentTestIds.has(key)) continue;
            const v = (state as Record<string, unknown>)[key];
            if (isValidExecutionState(v)) merged[key] = v;
          }
          setExecutionByTestId(merged);
        } catch {
          // malformed file: do nothing
        }
      };
      reader.readAsText(file);
    },
    [suite.suiteName, suite.testCases, executionByTestId]
  );

  return (
    <>
      <section className="mb-8 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Search text used: {suite.suiteName}
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Source files: {suite.sourceFiles.length > 0 ? suite.sourceFiles.join(", ") : "none"}
        </p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Total tests: {suite.testCases.length}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              const html = buildExportHtml(suite, executionByTestId, getExecution);
              const filename = `${sanitizeFilename(suite.suiteName)}-execution-report.html`;
              downloadReport(html, filename);
            }}
            className="rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            Export Results
          </button>
          <button
            type="button"
            onClick={handleClearProgress}
            className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            Clear saved progress
          </button>
        </div>
      </section>

      <ExecutionSummary testCases={suite.testCases} executionByTestId={executionByTestId} />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImportFile}
          aria-hidden
        />
        <button
          type="button"
          onClick={exportProgress}
          className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          Export Progress
        </button>
        <button
          type="button"
          onClick={importProgress}
          className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          Import Progress
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          Search in suite
          <input
            type="search"
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
            placeholder="Filter by text…"
            className="rounded border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 placeholder-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          Filter by status
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="rounded border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          >
            {FILTER_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          Showing {visibleTests.length} of {suite.testCases.length} tests
        </span>
        <span className="text-zinc-400 dark:text-zinc-500">|</span>
        <button
          type="button"
          onClick={expandAll}
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Expand All
        </button>
        <button
          type="button"
          onClick={collapseAll}
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Collapse All
        </button>
      </div>

      <div className="space-y-4">
        {visibleTests.map((tc) => (
          <TestCaseCard
            key={tc.id}
            tc={tc}
            execution={getExecution(tc.id)}
            onUpdate={updateExecution}
            isExpanded={expandedByTestId[tc.id] === true}
            onToggleExpand={() =>
              setExpandedByTestId((prev) => ({ ...prev, [tc.id]: !prev[tc.id] }))
            }
          />
        ))}
      </div>
    </>
  );
}
