"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { GeneratedSuite, TestCaseDefinition } from "@/src/lib/types";
import { getStorageKey } from "@/src/lib/progressStorage";
import { updateRecentSuiteTitle } from "@/src/lib/recentSuites";
import {
  ExportedProgress,
  extractExecutionStateFromHtml,
  EMBEDDED_STATE_SCRIPT_ID,
} from "@/src/lib/progressImport";

export type ExecutionStatus = "NOT RUN" | "PASS" | "FAIL" | "BLOCKED";

export interface QAAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  note?: string;
  dataUrl: string;
  url?: string;
}

export interface ExecutionState {
  testId: string;
  status: ExecutionStatus;
  comment: string;
  attachment: string;
  attachments?: QAAttachment[];
}

const STATUS_OPTIONS: ExecutionStatus[] = ["NOT RUN", "PASS", "FAIL", "BLOCKED"];
const FILTER_OPTIONS = ["ALL", ...STATUS_OPTIONS] as const;
export type StatusFilter = (typeof FILTER_OPTIONS)[number];

// Stable reference used by getDefaultExecution so the attachments dep never
// changes between renders for tests that haven't been touched yet.
const STABLE_EMPTY_ATTACHMENTS: QAAttachment[] = [];

function getDefaultExecution(testId: string): ExecutionState {
  return { testId, status: "NOT RUN", comment: "", attachment: "", attachments: STABLE_EMPTY_ATTACHMENTS };
}

/** Parsed attachment: either plain text or an uploaded image (name + data URL) */
type ParsedAttachment =
  | { type: "text"; value: string }
  | { type: "image"; name: string; data: string };

function parseAttachment(attachment: string): ParsedAttachment {
  if (!attachment.trim()) return { type: "text", value: "" };
  try {
    const parsed = JSON.parse(attachment) as unknown;
    if (
      parsed &&
      typeof parsed === "object" &&
      "type" in parsed &&
      (parsed as { type: string }).type === "image" &&
      "name" in parsed &&
      "data" in parsed &&
      typeof (parsed as { name: unknown }).name === "string" &&
      typeof (parsed as { data: unknown }).data === "string"
    ) {
      return {
        type: "image",
        name: (parsed as { name: string }).name,
        data: (parsed as { data: string }).data,
      };
    }
  } catch {
    // not JSON, treat as text
  }
  return { type: "text", value: attachment };
}

/** Build a portable image attachment payload for storage/export (name + mimeType + base64 data URL) */
function buildImageAttachmentPayload(fileName: string, mimeType: string, dataUrl: string): string {
  return JSON.stringify({
    type: "image",
    name: fileName,
    mimeType: mimeType || "image/png",
    data: dataUrl,
  });
}

const ACCEPTED_IMAGE_TYPES = "image/png,image/jpeg,image/jpg,image/gif";

function ImageLightbox({
  src,
  alt,
  open,
  onClose,
}: {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center rounded-lg bg-white p-2 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close"
        >
          <span className="text-xl leading-none" aria-hidden>×</span>
        </button>
        <img
          src={src}
          alt={alt}
          className="max-h-[85vh] max-w-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
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

export interface LoadedSuiteState {
  executionState: Record<string, ExecutionState>;
  suiteName?: string;
}

function loadFromStorage(searchText: string): LoadedSuiteState {
  if (typeof window === "undefined" || !window.localStorage)
    return { executionState: {} };
  try {
    const raw = window.localStorage.getItem(getStorageKey(searchText));
    if (!raw) return { executionState: {} };
    const data = JSON.parse(raw) as unknown;
    if (!data || typeof data !== "object") return { executionState: {} };
    const rec = data as Record<string, unknown>;
    const hasNewShape =
      "executionState" in rec &&
      typeof rec.executionState === "object";
    const map = hasNewShape
      ? (rec.executionState as Record<string, unknown>)
      : rec;
    const suiteName =
      hasNewShape &&
      "suiteName" in rec &&
      typeof rec.suiteName === "string"
        ? rec.suiteName
        : undefined;
    const result: Record<string, ExecutionState> = {};
    for (const key of Object.keys(map)) {
      const v = map[key];
      if (
        v &&
        typeof v === "object" &&
        typeof (v as ExecutionState).testId === "string" &&
        isValidStatus((v as ExecutionState).status) &&
        typeof (v as ExecutionState).comment === "string" &&
        typeof (v as ExecutionState).attachment === "string"
      ) {
        const ex = v as ExecutionState;
        result[key] = {
          testId: ex.testId,
          status: ex.status,
          comment: ex.comment,
          attachment: ex.attachment,
          attachments: Array.isArray((ex as any).attachments) ? (ex as any).attachments : [],
        };
      }
    }
    return { executionState: result, suiteName };
  } catch {
    return { executionState: {} };
  }
}

function saveToStorage(
  searchText: string,
  state: Record<string, ExecutionState>,
  displayTitle?: string
): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    // Ensure attachments are included in persisted state
    const normalizedState: Record<string, ExecutionState> = {};
    for (const key of Object.keys(state)) {
      const ex = state[key];
      normalizedState[key] = {
        ...ex,
        attachments: Array.isArray(ex.attachments) ? ex.attachments : [],
      };
    }
    const payload =
      displayTitle !== undefined && displayTitle !== searchText
        ? { executionState: normalizedState, suiteName: displayTitle }
        : { executionState: normalizedState, suiteName: searchText };
    window.localStorage.setItem(getStorageKey(searchText), JSON.stringify(payload));
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

/** Sanitize a suite name for use as a filename prefix: strip illegal chars, replace spaces with underscores */
function filenamePrefix(name: string | undefined): string {
  if (!name || !name.trim()) return "suite";
  return name.replace(/[\\/:*?"<>|]/g, "").replace(/\s+/g, "_").trim() || "suite";
}

/** Filesystem-safe timestamp: YYYY-MM-DD_HH-mm-ss */
function getTimestamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
}



const PIE_SLICE_COLORS = ["#10b981", "#ef4444", "#f59e0b", "#94a3b8"] as const; // PASS, FAIL, BLOCKED, NOT RUN

function buildPieChartSvg(
  passed: number,
  failed: number,
  blocked: number,
  notRun: number,
  total: number
): string {
  const r = 80;
  const cx = 100;
  const cy = 100;
  const sum = total || 1;
  if (total <= 0) {
    return `<svg width="200" height="200" viewBox="0 0 200 200" aria-label="Execution status pie chart"><circle cx="${cx}" cy="${cy}" r="${r}" fill="${PIE_SLICE_COLORS[3]}"/></svg>`;
  }
  const toRad = (pct: number) => ((pct / 100) * 360 - 90) * (Math.PI / 180);
  const point = (pct: number) => ({
    x: cx + r * Math.cos(toRad(pct)),
    y: cy + r * Math.sin(toRad(pct)),
  });
  const slices = [
    { pct: (passed / sum) * 100, color: PIE_SLICE_COLORS[0] },
    { pct: (failed / sum) * 100, color: PIE_SLICE_COLORS[1] },
    { pct: (blocked / sum) * 100, color: PIE_SLICE_COLORS[2] },
    { pct: (notRun / sum) * 100, color: PIE_SLICE_COLORS[3] },
  ];
  let acc = 0;
  const paths = slices
    .map(({ pct, color }) => {
      if (pct <= 0) return "";
      if (pct >= 99.99) return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/>`;
      const start = point(acc);
      acc += pct;
      const end = point(acc);
      const large = pct > 50 ? 1 : 0;
      const d = `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y} Z`;
      return `<path fill="${color}" d="${d}"/>`;
    })
    .join("");
  return `<svg width="200" height="200" viewBox="0 0 200 200" aria-label="Execution status pie chart">${paths}</svg>`;
}

const REPORT_PIE_STATUSES: ExecutionStatus[] = ["PASS", "FAIL", "BLOCKED", "NOT RUN"];

/** Pie chart SVG with data-status on each path for report page filtering */
function buildPieChartSvgForReport(
  passed: number,
  failed: number,
  blocked: number,
  notRun: number,
  total: number
): string {
  const r = 80;
  const cx = 100;
  const cy = 100;
  const sum = total || 1;
  if (total <= 0) {
    return `<svg class="report-pie" width="200" height="200" viewBox="0 0 200 200" aria-label="Execution status pie chart"><path fill="${PIE_SLICE_COLORS[3]}" d="M 100 100 L 100 20 A 80 80 0 1 1 100 20 Z" data-status="NOT RUN"/></svg>`;
  }
  const toRad = (pct: number) => ((pct / 100) * 360 - 90) * (Math.PI / 180);
  const point = (pct: number) => ({
    x: cx + r * Math.cos(toRad(pct)),
    y: cy + r * Math.sin(toRad(pct)),
  });
  const slices = [
    { pct: (passed / sum) * 100, color: PIE_SLICE_COLORS[0], status: REPORT_PIE_STATUSES[0] },
    { pct: (failed / sum) * 100, color: PIE_SLICE_COLORS[1], status: REPORT_PIE_STATUSES[1] },
    { pct: (blocked / sum) * 100, color: PIE_SLICE_COLORS[2], status: REPORT_PIE_STATUSES[2] },
    { pct: (notRun / sum) * 100, color: PIE_SLICE_COLORS[3], status: REPORT_PIE_STATUSES[3] },
  ];
  let acc = 0;
  const paths = slices
    .map(({ pct, color, status }) => {
      if (pct <= 0) return "";
      if (pct >= 99.99) return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" data-status="${status}" role="button" tabindex="0" style="cursor:pointer"/>`;
      const start = point(acc);
      acc += pct;
      const end = point(acc);
      const large = pct > 50 ? 1 : 0;
      const d = `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y} Z`;
      return `<path fill="${color}" d="${d}" data-status="${status}" role="button" tabindex="0" style="cursor:pointer"/>`;
    })
    .join("");
  return `<svg class="report-pie" width="200" height="200" viewBox="0 0 200 200" aria-label="Execution status pie chart">${paths}</svg>`;
}

function reportSourceFileBasename(sourceFile: string): string {
  const parts = sourceFile.split(/[/\\]/);
  return parts.length > 1 ? parts[parts.length - 1]! : sourceFile;
}

/** Inline script for report page: editable state, chart filtering, chip toolbar, attachment lightbox, download. No literal </script> in output. */
function getReportPageScript(): string {
  return `
(function(){
  var selected = [];
  var table = document.getElementById("report-table");
  var tbody = table && table.tBodies[0];
  var rows = tbody ? tbody.rows : [];
  var filtersEl = document.getElementById("report-filters");
  var activeEl = document.getElementById("report-active-filters");
  var clearBtn = document.getElementById("report-clear-filters");
  var lightbox = document.getElementById("report-lightbox");
  var lightboxImg = document.getElementById("report-lightbox-img");
  var lightboxClose = document.getElementById("report-lightbox-close");
  var chipToolbar = document.getElementById("report-chip-toolbar");
  var stateEl = document.getElementById("rmh-execution-state");
  var payload = null;

  if (stateEl) {
    try {
      var raw = stateEl.textContent.trim();
      if (raw) {
        var json = decodeURIComponent(escape(atob(raw)));
        payload = JSON.parse(json);
        if (!payload.executionState) payload.executionState = {};
      }
    } catch (e) {}
  }

  function getEx(tid) {
    if (!payload || !payload.executionState) return { status: "NOT RUN", comment: "", attachment: "" };
    var ex = payload.executionState[tid];
    if (!ex || typeof ex !== "object") return { status: "NOT RUN", comment: "", attachment: "" };
    return { status: ex.status || "NOT RUN", comment: ex.comment || "", attachment: ex.attachment || "" };
  }
  function ensureEx(tid) {
    if (!payload.executionState) payload.executionState = {};
    if (!payload.executionState[tid]) payload.executionState[tid] = { status: "NOT RUN", comment: "", attachment: "" };
    return payload.executionState[tid];
  }
  function persist() {
    if (!stateEl || !payload) return;
    try {
      stateEl.textContent = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    } catch (e) {}
  }



  function applyFilter(){
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].getAttribute("data-steps-row")) continue;
      var status = rows[i].getAttribute("data-status");
      var show = selected.length === 0 || selected.indexOf(status) !== -1;
      rows[i].classList.toggle("report-row-hidden", !show);
      var tid = rows[i].getAttribute("data-test-id");
      if (tid) {
        var sr = document.querySelector("tr[data-steps-for='" + tid + "'][data-steps-row]");
        if (sr) sr.classList.toggle("report-steps-filtered", !show);
      }
    }
  }
  function updateFilterUI(){
    if (selected.length > 0 && filtersEl) {
      filtersEl.style.display = "flex";
      if (activeEl) activeEl.textContent = selected.join(", ");
    } else if (filtersEl) {
      filtersEl.style.display = "none";
    }
  }
  function updateChipUI(){
    if (!chipToolbar) return;
    var chips = chipToolbar.querySelectorAll(".report-chip");
    for (var i = 0; i < chips.length; i++) {
      var s = chips[i].getAttribute("data-status");
      if (s === "All") chips[i].classList.toggle("report-chip-active", selected.length === 0);
      else chips[i].classList.toggle("report-chip-active", selected.indexOf(s) !== -1);
    }
  }
  function setSelected(next){
    selected = next;
    applyFilter();
    updateFilterUI();
    updateChipUI();
  }
  function toggleStatus(status){
    var idx = selected.indexOf(status);
    if (idx === -1) selected.push(status); else selected.splice(idx, 1);
    applyFilter();
    updateFilterUI();
    updateChipUI();
  }
  if (clearBtn) clearBtn.addEventListener("click", function(){ setSelected([]); });
  if (chipToolbar) chipToolbar.addEventListener("click", function(e){
    var chip = e.target && e.target.closest && e.target.closest(".report-chip");
    if (!chip) return;
    var s = chip.getAttribute("data-status");
    if (s === "All") setSelected([]);
    else toggleStatus(s);
  });

  var pie = document.querySelector(".report-pie");
  if (pie) pie.addEventListener("click", function(e){
    var path = e.target.closest && e.target.closest("path[data-status]");
    if (path) toggleStatus(path.getAttribute("data-status"));
  });
  var legend = document.getElementById("report-legend");
  if (legend) legend.addEventListener("click", function(e){
    var li = e.target.closest && e.target.closest("li[data-status]");
    if (li) toggleStatus(li.getAttribute("data-status"));
  });
  var barChart = document.getElementById("report-bar-chart");
  if (barChart) barChart.addEventListener("click", function(e){
    var row = e.target.closest && e.target.closest(".report-bar-row");
    if (row) toggleStatus(row.getAttribute("data-status"));
  });

  document.addEventListener("click", function(e){
    var btn = e.target && e.target.closest && e.target.closest(".report-attachment-img");
    if (btn) {
      e.preventDefault();
      var src = btn.getAttribute("data-src");
      if (src && lightbox && lightboxImg) { lightboxImg.src = src; lightbox.classList.add("report-lightbox-open"); }
    }
  });
  document.addEventListener("click", function(e){
    var sbtn = e.target && e.target.closest && e.target.closest(".report-steps-btn");
    if (sbtn) {
      var tid = sbtn.getAttribute("data-steps-for");
      if (!tid) return;
      var detailRow = document.querySelector("tr[data-steps-for='" + tid + "'][data-steps-row]");
      if (!detailRow) return;
      var isExpanded = sbtn.getAttribute("aria-expanded") === "true";
      sbtn.setAttribute("aria-expanded", isExpanded ? "false" : "true");
      var lbl = sbtn.querySelector(".steps-btn-label");
      if (lbl) lbl.textContent = isExpanded ? "View Steps" : "Hide Steps";
      detailRow.classList.toggle("report-steps-open", !isExpanded);
    }
  });
  if (lightboxClose) lightboxClose.addEventListener("click", function(){ if (lightbox) lightbox.classList.remove("report-lightbox-open"); });
  if (lightbox) lightbox.addEventListener("click", function(e){ if (e.target === lightbox) lightbox.classList.remove("report-lightbox-open"); });
  document.addEventListener("keydown", function(e){ if (e.key === "Escape" && lightbox) lightbox.classList.remove("report-lightbox-open"); });

  function esc(s) { if (!s) return ""; return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function downloadProgress(asHtml) {
    if (!payload) return;
    var exportPayload = { suiteName: payload.suiteName, exportedAt: payload.exportedAt || new Date().toISOString(), executionState: payload.executionState, testCases: payload.testCases || [] };
    var str = JSON.stringify(exportPayload, null, 2);
    var blob;
    if (asHtml) {
      var enc = btoa(unescape(encodeURIComponent(str)));
      var html = "<!DOCTYPE html><html><head><meta charset=\\"utf-8\\"><title>Progress - " + esc(payload.suiteName) + "</title></head><body><p>Execution progress. Import this file in RMH QA Suite Runner.</p><script type=\\"application/json\\" id=\\"rmh-execution-state\\">" + enc + "<" + "/script></body></html>";
      blob = new Blob([html], { type: "text/html;charset=utf-8" });
    } else {
      blob = new Blob([str], { type: "application/json;charset=utf-8" });
    }
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    var _d = new Date(); function _p(n){ return n < 10 ? "0" + n : "" + n; } var _ts = _d.getFullYear() + "-" + _p(_d.getMonth()+1) + "-" + _p(_d.getDate()) + "_" + _p(_d.getHours()) + "-" + _p(_d.getMinutes()) + "-" + _p(_d.getSeconds());
    var _sn = (payload.suiteName || "").replace(/[\\\/:*?"<>|]/g, "").replace(/\\s+/g, "_").trim() || "suite";
    a.download = _sn + "-progress-" + _ts + (asHtml ? ".html" : ".json");
    a.click();
    URL.revokeObjectURL(a.href);
  }
  var dlJson = document.getElementById("report-dl-json");
  if (dlJson) dlJson.addEventListener("click", function(){ downloadProgress(false); });
})();
`.replace(/\n/g, " ").trim();
}

export type { ExportedProgress } from "@/src/lib/progressImport";

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

/** Base64-encode UTF-8 JSON for safe embedding in HTML (avoids </script> in payload) */
function encodePayloadForHtml(payload: ExportedProgress): string {
  const json = JSON.stringify(payload);
  return btoa(unescape(encodeURIComponent(json)));
}

/** Payload embedded in offline runner HTML: suite + execution state for bootstrapping and re-import */
interface OfflineRunnerPayload extends ExportedProgress {
  testCases: Array<{
    id: string;
    testCaseName: string;
    sourceFile: string;
    scenarioContent: string;
    scenarioHtml: string;
  }>;
}

function encodeOfflinePayload(payload: OfflineRunnerPayload): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
}

/** Build self-contained offline runner HTML: editable test cards, summary, chart, and embedded state for re-import */
function buildOfflineRunnerHtml(
  suite: GeneratedSuite,
  executionByTestId: Record<string, ExecutionState>,
  displayTitle?: string
): string {
  const suiteName = displayTitle ?? suite.suiteName;
  const payload: OfflineRunnerPayload = {
    suiteName,
    exportedAt: new Date().toISOString(),
    executionState: executionByTestId,
    testCases: suite.testCases.map((tc) => ({
      id: tc.id,
      testCaseName: tc.testCaseName,
      sourceFile: tc.sourceFile,
      scenarioContent: tc.scenarioContent,
      scenarioHtml: getScenarioHtml(tc.scenarioContent),
    })),
  };
  const encoded = encodeOfflinePayload(payload);
  const runnerScript = getOfflineRunnerScript();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>RMH QA Suite Runner – ${escapeHtml(suiteName)} (offline)</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 1rem; }
    .container { max-width: 80rem; margin: 0 auto; }
    h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
    .meta { font-size: 0.875rem; color: #64748b; margin-bottom: 1.5rem; }
    .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 1.25rem; margin-bottom: 1rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
    .card-header { font-size: 0.875rem; margin-bottom: 0.75rem; }
    .scenario-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 0.75rem; margin-bottom: 1rem; font-size: 0.875rem; }
    .scenario-title { font-weight: 600; color: #0f172a; margin-bottom: 0.25rem; }
    .scenario-body { color: #475569; font-size: 0.875rem; line-height: 1.5; max-height: 80rem; overflow-y: auto; }
    .scenario-body .scenario-h2 { font-size: 1rem; font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.25rem; margin: 0 0 0.5rem; }
    .scenario-body .scenario-section { margin-top: 1rem; margin-bottom: 0.25rem; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; }
    .scenario-body .scenario-ul { list-style: disc; padding-left: 1.25rem; margin: 0.25rem 0; }
    .scenario-body .scenario-ul li { margin-bottom: 0.125rem; }
    .scenario-body .scenario-ol { list-style: decimal; padding-left: 1.25rem; margin: 0.25rem 0; }
    .scenario-body .scenario-ol li { margin-bottom: 0.125rem; }
    .scenario-body .scenario-hr { border: 0; border-top: 1px solid #e2e8f0; margin: 0.5rem 0; }
    .scenario-body .scenario-p { margin: 0.25rem 0; }
    .scenario-body .scenario-strong { font-weight: 600; color: #0f172a; }
    .scenario-body .scenario-plain { white-space: pre-wrap; margin: 0; font-family: inherit; }
    label { display: block; font-size: 0.75rem; font-weight: 600; color: #475569; margin-bottom: 0.25rem; }
    select, textarea, input[type="text"] { width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 0.5rem; font-size: 0.875rem; }
    .row { display: flex; gap: 0.75rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
    .thumb { width: 4rem; height: 4rem; border-radius: 0.25rem; object-fit: cover; border: 1px solid #e2e8f0; }
    .download-section { background: #fff; border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 1rem; margin-top: 1.5rem; }
    .download-section h2 { font-size: 0.875rem; margin: 0 0 0.5rem; }
    .download-section p { font-size: 0.8125rem; color: #64748b; margin: 0 0 0.75rem; }
    .btn { display: inline-block; padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 500; cursor: pointer; border: 1px solid #cbd5e1; background: #fff; margin-right: 0.5rem; margin-bottom: 0.5rem; }
    .btn-primary { background: #2563eb; color: #fff; border-color: #2563eb; }
    .summary-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 1rem; margin-bottom: 1rem; }
    .summary-card h2 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin: 0 0 0.5rem; }
    .summary-list { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; font-size: 0.875rem; }
    .chart-row { display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.375rem; font-size: 0.875rem; }
    .chart-bar-wrap { flex: 1; background: #e2e8f0; border-radius: 999px; overflow: hidden; height: 1.25rem; }
    .chart-bar { height: 100%; border-radius: 999px; }
  </style>
</head>
<body>
  <div class="container" id="app"></div>
  <script type="application/json" id="${EMBEDDED_STATE_SCRIPT_ID}">${encoded}</script>
  <script>${runnerScript}</script>
</body>
</html>`;
}

/** Returns the inline runner script (no </script> literal in output) */
function getOfflineRunnerScript(): string {
  return `
(function(){
  var el = document.getElementById("rmh-execution-state");
  if (!el) return;
  var raw = el.textContent.trim();
  var json;
  try { json = decodeURIComponent(escape(atob(raw))); } catch (e) { return; }
  var payload;
  try { payload = JSON.parse(json); } catch (e) { return; }
  var testCases = payload.testCases || [];
  var executionState = {};
  for (var k in payload.executionState || {}) executionState[k] = Object.assign({}, payload.executionState[k]);

  function esc(s){ if (!s) return ""; return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function getEx(tid){ return executionState[tid] || { testId: tid, status: "NOT RUN", comment: "", attachment: "" }; }
  function parseAtt(att){
    if (!att || !att.trim()) return { type: "text", value: "" };
    try {
      var p = JSON.parse(att);
      if (p && p.type === "image" && p.name && p.data) return { type: "image", name: p.name, data: p.data };
    } catch(e){}
    return { type: "text", value: att };
  }

  function counts(){
    var p=0,f=0,b=0,n=0;
    for (var i=0;i<testCases.length;i++){
      var ex = getEx(testCases[i].id);
      if (ex.status === "PASS") p++; else if (ex.status === "FAIL") f++; else if (ex.status === "BLOCKED") b++; else n++;
    }
    return { total: testCases.length, passed: p, failed: f, blocked: b, notRun: n };
  }

  function renderSummary(){
    var c = counts();
    var el = document.getElementById("rmh-summary");
    if (!el) return;
    el.innerHTML = "<h2>Execution summary</h2><ul class=\\"summary-list\\"><li><strong>Total:</strong> " + c.total + "</li><li><strong>Passed:</strong> " + c.passed + "</li><li><strong>Failed:</strong> " + c.failed + "</li><li><strong>Blocked:</strong> " + c.blocked + "</li><li><strong>Not run:</strong> " + c.notRun + "</li></ul>";
  }

  function renderChart(){
    var c = counts();
    var el = document.getElementById("rmh-chart");
    if (!el) return;
    var max = Math.max(c.total, 1);
    var colors = ["#10b981","#ef4444","#f59e0b","#94a3b8"];
    var items = [{ l: "PASS", v: c.passed }, { l: "FAIL", v: c.failed }, { l: "BLOCKED", v: c.blocked }, { l: "NOT RUN", v: c.notRun }];
    var bars = items.map(function(x, i){ var w = (x.v / max) * 100; return "<div class=\\"chart-row\\"><span style=\\"width:4rem\\">" + x.l + "</span><div class=\\"chart-bar-wrap\\"><div class=\\"chart-bar\\" style=\\"width:" + w + "%;background:" + colors[i] + "\\"></div></div><span style=\\"width:2rem;text-align:right\\">" + x.v + "</span></div>"; }).join("");
    el.innerHTML = "<h2>Status chart</h2>" + bars;
  }

  function renderCards(){
    var container = document.getElementById("rmh-cards");
    if (!container) return;
    var html = "";
    for (var i = 0; i < testCases.length; i++) {
      var tc = testCases[i];
      var ex = getEx(tc.id);
      var att = parseAtt(ex.attachment);
      var scenarioBodyHtml = (tc.scenarioHtml && tc.scenarioHtml.length > 0) ? tc.scenarioHtml : ("<pre class=\\"scenario-plain\\">" + esc(tc.scenarioContent) + "</pre>");
      var attHtml = att.type === "image"
        ? "<div class=\\"row\\"><img src=\\""
          + esc(att.data).replace(/"/g, "&quot;") + "\\" alt=\\""
          + esc(att.name) + "\\" class=\\"thumb\\"/><div><p style=\\"font-size:0.75rem;margin:0\\">" + esc(att.name) + "</p><button type=\\"button\\" class=\\"btn\\" data-test-id=\\""
          + esc(tc.id) + "\\" data-action=\\"replace-att\\">Replace</button><button type=\\"button\\" class=\\"btn\\" data-test-id=\\""
          + esc(tc.id) + "\\" data-action=\\"remove-att\\">Remove</button></div></div><input type=\\"file\\" accept=\\"image/png,image/jpeg,image/jpg,image/gif\\" data-test-id=\\""
          + esc(tc.id) + "\\" data-att-file=\\"1\\" style=\\"display:none\\"/>"
        : "<input type=\\"text\\" name=\\"attachment\\" data-test-id=\\""
          + esc(tc.id) + "\\" placeholder=\\"Bug ID or note\\" value=\\""
          + esc(ex.attachment) + "\\" class=\\"attachment-text\\"/>";
      html += "<div class=\\"card\\" data-test-id=\\""
        + esc(tc.id) + "\\"><div class=\\"card-header\\"><strong>" + esc(tc.id) + "</strong> – " + esc(tc.testCaseName) + "</div>"
        + "<div class=\\"scenario-box\\"><div class=\\"scenario-title\\">Scenario content</div><div class=\\"scenario-body\\">" + scenarioBodyHtml + "</div></div>"
        + "<label>Status</label><select name=\\"status\\" data-test-id=\\""
        + esc(tc.id) + "\\"><option value=\\"NOT RUN\\"" + (ex.status === "NOT RUN" ? " selected" : "") + ">NOT RUN</option><option value=\\"PASS\\"" + (ex.status === "PASS" ? " selected" : "") + ">PASS</option><option value=\\"FAIL\\"" + (ex.status === "FAIL" ? " selected" : "") + ">FAIL</option><option value=\\"BLOCKED\\"" + (ex.status === "BLOCKED" ? " selected" : "") + ">BLOCKED</option></select>"
        + "<label style=\\"margin-top:0.5rem\\">Comment</label><textarea name=\\"comment\\" data-test-id=\\""
        + esc(tc.id) + "\\" rows=\\"2\\">" + esc(ex.comment) + "</textarea>"
        + "<label style=\\"margin-top:0.5rem\\">Attachment</label>" + attHtml + "</div>";
    }
    container.innerHTML = html;
    container.querySelectorAll("select[name=status]").forEach(function(sel){
      sel.addEventListener("change", function(){ var id = this.getAttribute("data-test-id"); executionState[id] = executionState[id] || getEx(id); executionState[id].status = this.value; renderSummary(); renderChart(); });
    });
    container.querySelectorAll("textarea[name=comment]").forEach(function(ta){
      ta.addEventListener("input", function(){ var id = this.getAttribute("data-test-id"); executionState[id] = executionState[id] || getEx(id); executionState[id].comment = this.value; });
    });
    container.querySelectorAll("input.attachment-text").forEach(function(inp){
      inp.addEventListener("input", function(){ var id = this.getAttribute("data-test-id"); executionState[id] = executionState[id] || getEx(id); executionState[id].attachment = this.value; });
    });
    container.querySelectorAll("[data-action=replace-att]").forEach(function(btn){
      btn.addEventListener("click", function(){ var card = this.closest(".card"); var f = card ? card.querySelector("input[data-att-file]") : null; if (f) f.click(); });
    });
    container.querySelectorAll("input[data-att-file]").forEach(function(inp){
      inp.addEventListener("change", function(){
        var id = this.getAttribute("data-test-id");
        var file = this.files && this.files[0];
        this.value = "";
        if (!file || !file.type.match(/^image\\//)) return;
        var r = new FileReader();
        r.onload = function(){ var d = r.result; if (typeof d !== "string") return; executionState[id] = executionState[id] || getEx(id); executionState[id].attachment = JSON.stringify({ type: "image", name: file.name, mimeType: file.type || "image/png", data: d }); renderCards(); renderSummary(); renderChart(); };
        r.readAsDataURL(file);
      });
    });
    container.querySelectorAll("[data-action=remove-att]").forEach(function(btn){
      btn.addEventListener("click", function(){ var id = this.getAttribute("data-test-id"); executionState[id] = executionState[id] || getEx(id); executionState[id].attachment = ""; renderCards(); renderSummary(); });
    });
  }

  function downloadProgress(asHtml){
    var payloadExport = { suiteName: payload.suiteName, exportedAt: new Date().toISOString(), executionState: executionState, testCases: payload.testCases || [] };
    var str = JSON.stringify(payloadExport, null, 2);
    if (asHtml) {
      var enc = btoa(unescape(encodeURIComponent(str)));
      var html = "<!DOCTYPE html><html><head><meta charset=\\"utf-8\\"><title>Progress - " + esc(payload.suiteName) + "</title></head><body><p>Execution progress. Import this file in RMH QA Suite Runner.</p><script type=\\"application/json\\" id=\\"rmh-execution-state\\">" + enc + "<" + "/script></body></html>";
      var blob = new Blob([html], { type: "text/html;charset=utf-8" });
    } else {
      var blob = new Blob([str], { type: "application/json;charset=utf-8" });
    }
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    var _d = new Date(); function _p(n){ return n < 10 ? "0" + n : "" + n; } var _ts = _d.getFullYear() + "-" + _p(_d.getMonth()+1) + "-" + _p(_d.getDate()) + "_" + _p(_d.getHours()) + "-" + _p(_d.getMinutes()) + "-" + _p(_d.getSeconds());
    var _sn = (payload.suiteName || "").replace(/[\\\/:*?"<>|]/g, "").replace(/\\s+/g, "_").trim() || "suite";
    a.download = _sn + "-progress-" + _ts + (asHtml ? ".html" : ".json");
    a.click();
    URL.revokeObjectURL(a.href);
  }

  var app = document.getElementById("app");
  app.innerHTML = "<h1>RMH QA Suite Runner (offline)</h1><p class=\\"meta\\">Suite: " + esc(payload.suiteName) + " – " + testCases.length + " tests. Edit below and use \\"Download progress\\" to bring changes back into the main app.</p>"
    + "<div class=\\"summary-card\\" id=\\"rmh-summary\\"></div>"
    + "<div class=\\"summary-card\\" id=\\"rmh-chart\\"></div>"
    + "<div id=\\"rmh-cards\\"></div>"
    + "<div class=\\"download-section\\"><h2>Download progress</h2><p>Use one of these to save your work and import it later in the main RMH QA Suite Runner.</p><button type=\\"button\\" class=\\"btn btn-primary\\" id=\\"rmh-dl-json\\">Download as JSON</button></div>";
  renderSummary();
  renderChart();
  renderCards();
  document.getElementById("rmh-dl-json").onclick = function(){ downloadProgress(false); };
})();
`.replace(/\n/g, " ").trim();
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

function countStepsInScenario(content: string): number {
  const blocks = parseScenarioBlocks(content);
  let count = 0;
  for (const block of blocks) {
    if (block.type === "ol" || block.type === "ul") count += block.items.length;
  }
  return count;
}

function buildExportHtml(
  suite: GeneratedSuite,
  executionByTestId: Record<string, ExecutionState>,
  getExecution: (testId: string) => ExecutionState,
  displayTitle?: string
): string {
  const suiteName = displayTitle ?? suite.suiteName;
  const total = suite.testCases.length;
  const passed = suite.testCases.filter((tc) => getExecution(tc.id).status === "PASS").length;
  const failed = suite.testCases.filter((tc) => getExecution(tc.id).status === "FAIL").length;
  const blocked = suite.testCases.filter((tc) => getExecution(tc.id).status === "BLOCKED").length;
  const notRun = suite.testCases.filter(
    (tc) => getExecution(tc.id).status === "NOT RUN"
  ).length;
  const maxCount = Math.max(total, 1);
  const barItems = [
    { label: "PASS", count: passed, color: PIE_SLICE_COLORS[0], status: "PASS" },
    { label: "FAIL", count: failed, color: PIE_SLICE_COLORS[1], status: "FAIL" },
    { label: "BLOCKED", count: blocked, color: PIE_SLICE_COLORS[2], status: "BLOCKED" },
    { label: "NOT RUN", count: notRun, color: PIE_SLICE_COLORS[3], status: "NOT RUN" },
  ];

  function attachmentCellHtml(ex: ExecutionState): string {
    // Support multiple attachments
    const attachments = Array.isArray(ex.attachments) ? ex.attachments : [];
    if (attachments.length === 0) {
      // Fallback to legacy single attachment
      const parsed = parseAttachment(ex.attachment);
      if (parsed.type === "image") {
        const src = escapeHtml(parsed.data);
        const name = escapeHtml(parsed.name);
        return `<button type="button" class="report-attachment-img" data-src="${src.replace(/"/g, "&quot;")}" title="Click to preview"><img src="${src}" alt="${name}" class="report-thumb"/><span class="report-attachment-name">${name}</span></button>`;
      }
      return `<span class="report-attachment-text">${escapeHtml(parsed.value)}</span>`;
    }
    // Render all attachments
    return attachments
      .map(att => {
        if (att.type.startsWith("image/")) {
          const src = escapeHtml(att.dataUrl);
          const name = escapeHtml(att.name);
          return `<button type="button" class="report-attachment-img" data-src="${src.replace(/"/g, "&quot;")}" title="Click to preview"><img src="${src}" alt="${name}" class="report-thumb" style="max-width:48px;max-height:32px;border-radius:6px;border:1px solid #e2e8f0;margin-right:4px;margin-bottom:2px;"/><span class="report-attachment-name">${name}</span></button>`;
        }
        // Non-image: render as file chip
        return `<span class="report-attachment-chip" style="display:inline-block;padding:2px 6px;border-radius:4px;background:#f1f5f9;border:1px solid #e2e8f0;font-size:11px;margin-right:4px;margin-bottom:2px;">${escapeHtml(att.name)}</span>`;
      })
      .join("");
  }

  const rows = suite.testCases
    .map((tc) => {
      const ex = getExecution(tc.id);
      const scenarioTitle =
        getCollapsedScenarioDisplay(tc.scenarioContent).title || tc.testCaseName;
      const sourceBasename = reportSourceFileBasename(tc.sourceFile);
      const badgeClass = ex.status === "PASS" ? "report-status-badge-pass" : ex.status === "FAIL" ? "report-status-badge-fail" : ex.status === "BLOCKED" ? "report-status-badge-blocked" : "report-status-badge-not-run";
      const commentHtml = ex.comment.trim()
        ? `<span class="report-comment-text">${escapeHtml(ex.comment)}</span>`
        : `<span class="report-comment-empty">-</span>`;
      const stepCount = countStepsInScenario(tc.scenarioContent);
      const stepsContentHtml = getScenarioHtml(tc.scenarioContent);
      const safeId = escapeHtml(tc.id);
      const stepsBtnHtml = stepCount > 0
        ? `<button type="button" class="report-steps-btn" aria-expanded="false" data-steps-for="${safeId}"><span class="steps-btn-label">View Steps</span><span class="steps-count-badge">${stepCount}</span><svg class="steps-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`
        : `<span class="report-no-steps">No steps</span>`;
      const detailRowHtml = stepCount > 0
        ? `<tr data-steps-row="1" data-steps-for="${safeId}" class="report-steps-row"><td colspan="7" style="padding:0;border-top:none"><div class="report-steps-panel"><div class="report-steps-panel-inner"><div class="report-steps-panel-header"><span class="report-steps-panel-title">Test Steps</span><span class="report-steps-panel-count">${stepCount} step${stepCount !== 1 ? "s" : ""}</span></div><div class="report-steps-content">${stepsContentHtml}</div></div></div></td></tr>`
        : "";
      return `<tr data-status="${escapeHtml(ex.status)}" data-test-id="${safeId}">
        <td class="report-cell-id">${escapeHtml(tc.id)}</td>
        <td class="report-cell-name">${escapeHtml(scenarioTitle)}</td>
        <td class="report-cell-source">${escapeHtml(sourceBasename)}</td>
        <td class="report-cell-status"><span class="report-status-badge ${badgeClass}">${escapeHtml(ex.status)}</span></td>
        <td class="report-cell-comment">${commentHtml}</td>
        <td class="report-cell-attachment">${attachmentCellHtml(ex)}</td>
        <td class="report-cell-steps">${stepsBtnHtml}</td>
      </tr>${detailRowHtml}`;
    })
    .join("\n");

  const pieSvg = buildPieChartSvgForReport(passed, failed, blocked, notRun, total);
  const barChartHtml = barItems
    .map(
      (item) =>
        `<div class="report-bar-row" data-status="${item.status}" role="button" tabindex="0"><span class="report-bar-label">${item.label}</span><div class="report-bar-wrap"><div class="report-bar" style="width:${(item.count / maxCount) * 100}%;background:${item.color}"></div></div><span class="report-bar-count">${item.count}</span></div>`
    )
    .join("");

  const reportScript = getReportPageScript();
  const exportedAt = (() => {
    const d = new Date();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} \u2022 ${hh}:${mm}`;
  })();
  const fileCount = suite.sourceFiles.length;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Execution Report - ${escapeHtml(suiteName)}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; background: #f1f5f9; color: #0f172a; margin: 0; padding: 1.5rem 1rem; }
    .report-container { max-width: 80rem; margin: 0 auto; }
    .report-summary-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 1.25rem 1.5rem; margin-bottom: 1.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04); }
    .report-summary-card ul { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 1rem 2rem; font-size: 0.875rem; color: #475569; }
    .report-summary-card strong { color: #0f172a; }
    .report-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 1.5rem; margin-bottom: 1.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04); }
    .report-card h2 { font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #334155; margin: 0 0 1rem; padding-bottom: 0.625rem; border-bottom: 1px solid #f1f5f9; }
    .report-charts { display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: flex-start; margin-bottom: 0.5rem; }
    .report-pie-wrap { flex-shrink: 0; }
    .report-pie path:hover { opacity: 0.9; }
    .report-pie:focus, .report-pie:focus-visible, .report-pie path:focus, .report-pie path:focus-visible { outline: none; }
    .report-bar-row:focus, .report-bar-row:focus-visible { outline: none; }
    .report-legend { list-style: none; padding: 0; margin: 0.5rem 0 0; display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; font-size: 0.8125rem; }
    .report-legend li { display: flex; align-items: center; gap: 0.375rem; cursor: pointer; padding: 0.125rem 0.25rem; border-radius: 0.25rem; }
    .report-legend li:hover { background: #f1f5f9; }
    .report-legend span.swatch { display: inline-block; width: 10px; height: 10px; border-radius: 2px; }
    .report-bar-chart { min-width: 200px; flex: 1; display: flex; flex-direction: column; gap: 0.5rem; }
    .report-bar-row { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; padding: 0.25rem 0; border-radius: 0.375rem; }
    .report-bar-row:hover { background: #f8fafc; }
    .report-bar-label { width: 4.5rem; font-size: 0.8125rem; font-weight: 500; color: #475569; }
    .report-bar-wrap { flex: 1; background: #e2e8f0; border-radius: 999px; overflow: hidden; height: 1.25rem; }
    .report-bar { height: 100%; border-radius: 999px; }
    .report-bar-count { width: 2rem; text-align: right; font-size: 0.8125rem; color: #64748b; }
    .report-filters { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
    .report-filters .active-label { font-size: 0.8125rem; color: #475569; }
    .report-filters .active-list { font-weight: 500; color: #0f172a; }
    .report-filters .clear-btn { font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 0.5rem; border: 1px solid #cbd5e1; background: #fff; color: #475569; cursor: pointer; }
    .report-filters .clear-btn:hover { background: #f8fafc; color: #0f172a; }
    .report-summary ul { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; font-size: 0.875rem; }
    .report-chip-toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
    .report-chip { padding: 0.375rem 0.75rem; font-size: 0.8125rem; font-weight: 500; border-radius: 9999px; border: 1px solid #cbd5e1; background: #fff; color: #475569; cursor: pointer; }
    .report-chip:hover { background: #f8fafc; color: #0f172a; border-color: #94a3b8; }
    .report-chip.report-chip-active { background: #2563eb; border-color: #2563eb; color: #fff; }
    .report-table-wrap { overflow-x: auto; }
    .report-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; table-layout: auto; }
    .report-table th, .report-table td { border: 1px solid #e2e8f0; padding: 0.625rem 0.875rem; text-align: left; vertical-align: top; }
    .report-table thead th { position: sticky; top: 0; background: #f1f5f9; font-weight: 600; color: #334155; z-index: 1; box-shadow: 0 1px 0 0 #cbd5e1; white-space: nowrap; }
    .report-table tbody tr:nth-child(even) { background: #f8fafc; }
    .report-table tbody tr:hover { background: #eff6ff; }
    .report-table tbody tr.report-row-hidden { display: none; }
    .report-col-id { width: 8rem; }
    .report-col-name { width: 22rem; }
    .report-cell-id { font-family: ui-monospace, monospace; font-size: 0.8125rem; }
    .report-edit-status { width: 100%; min-width: 5.5rem; padding: 0.375rem 0.5rem; font-size: 0.8125rem; border: 1px solid #cbd5e1; border-radius: 0.375rem; background: #fff; color: #0f172a; }
    .report-edit-comment { width: 100%; min-height: 2.5rem; padding: 0.375rem 0.5rem; font-size: 0.8125rem; border: 1px solid #cbd5e1; border-radius: 0.375rem; background: #fff; color: #0f172a; resize: vertical; font-family: inherit; }
    .report-status-badge { display: inline-flex; align-items: center; padding: 0.3rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.025em; white-space: nowrap; border: 1px solid transparent; }
    .report-status-badge-pass { background: #d1fae5; color: #065f46; border-color: #a7f3d0; }
    .report-status-badge-fail { background: #fee2e2; color: #991b1b; border-color: #fecaca; }
    .report-status-badge-blocked { background: #fef3c7; color: #92400e; border-color: #fde68a; }
    .report-status-badge-not-run { background: #f1f5f9; color: #475569; border-color: #e2e8f0; }
    .report-comment-text { font-size: 0.8125rem; color: #0f172a; white-space: pre-wrap; word-break: break-word; }
    .report-comment-empty { font-size: 0.8125rem; color: #94a3b8; }
    .report-cell-attachment { max-width: 12rem; }
    .report-attachment-img { display: inline-flex; flex-direction: column; align-items: flex-start; gap: 0.25rem; padding: 0; border: none; background: none; cursor: pointer; text-align: left; }
    .report-attachment-img:hover .report-thumb { outline: 2px solid #3b82f6; outline-offset: 1px; }
    .report-thumb { max-width: 120px; max-height: 80px; object-fit: contain; vertical-align: middle; border-radius: 0.25rem; border: 1px solid #e2e8f0; }
    .report-attachment-name { font-size: 0.75rem; color: #64748b; }
    .report-attachment-text { color: #475569; }
    .report-lightbox { position: fixed; inset: 0; z-index: 100; display: none; align-items: center; justify-content: center; background: rgba(15,23,42,0.6); padding: 1rem; }
    .report-lightbox.report-lightbox-open { display: flex; }
    .report-lightbox-inner { position: relative; max-width: 90vw; max-height: 90vh; background: #fff; border-radius: 0.75rem; padding: 0.5rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
    .report-lightbox-inner img { max-width: 85vw; max-height: 85vh; object-fit: contain; display: block; }
    .report-lightbox-close { position: absolute; top: 0.5rem; right: 0.5rem; width: 2rem; height: 2rem; border: none; background: #f1f5f9; color: #475569; border-radius: 0.5rem; cursor: pointer; font-size: 1.25rem; line-height: 1; }
    .report-lightbox-close:hover { background: #e2e8f0; color: #0f172a; }
    .report-download-section { background: #fff; border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 1.5rem; margin-top: 1.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04); }
    .report-download-section h2 { font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #334155; margin: 0 0 0.5rem; padding-bottom: 0.625rem; border-bottom: 1px solid #f1f5f9; }
    .report-download-section p { font-size: 0.8125rem; color: #64748b; margin: 0 0 0.75rem; }
    .report-download-section .report-dl-btn { display: inline-block; padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 500; cursor: pointer; border: 1px solid #cbd5e1; background: #fff; margin-right: 0.5rem; margin-bottom: 0.5rem; color: #475569; }
    .report-download-section .report-dl-btn:hover { background: #f8fafc; color: #0f172a; }
    .report-download-section .report-dl-btn-primary { background: #2563eb; color: #fff; border-color: #2563eb; }
    .report-download-section .report-dl-btn-primary:hover { background: #1d4ed8; }
    .report-col-steps { width: 7rem; white-space: nowrap; }
    .report-cell-steps { text-align: center; vertical-align: middle; }
    .report-steps-btn { display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.3125rem 0.75rem; font-size: 0.75rem; font-weight: 600; color: #3b82f6; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 9999px; cursor: pointer; white-space: nowrap; transition: background 0.15s, border-color 0.15s, color 0.15s; }
    .report-steps-btn:hover { background: #dbeafe; border-color: #93c5fd; color: #2563eb; }
    .report-steps-btn:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }
    .report-steps-btn[aria-expanded="true"] { background: #dbeafe; border-color: #93c5fd; }
    .steps-count-badge { display: inline-flex; align-items: center; justify-content: center; min-width: 1.25rem; height: 1.25rem; padding: 0 0.25rem; background: #3b82f6; color: #fff; border-radius: 9999px; font-size: 0.625rem; font-weight: 700; line-height: 1; }
    .report-steps-btn[aria-expanded="true"] .steps-count-badge { background: #2563eb; }
    .steps-chevron { flex-shrink: 0; transition: transform 0.2s ease; color: #3b82f6; }
    .report-steps-btn[aria-expanded="true"] .steps-chevron { transform: rotate(180deg); }
    .report-no-steps { font-size: 0.8125rem; color: #94a3b8; }
    .report-steps-row { display: none; }
    .report-steps-row.report-steps-open { display: table-row; }
    .report-steps-filtered { display: none !important; }
    .report-steps-panel { padding: 1rem 1.25rem 1.25rem; background: linear-gradient(to bottom, #f8fafc, #f1f5f9); border-bottom: 1px solid #e2e8f0; }
    .report-steps-panel-inner { background: #fff; border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 1.25rem 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); animation: steps-fadein 0.18s ease; }
    .report-steps-panel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 0.625rem; border-bottom: 1px solid #f1f5f9; }
    .report-steps-panel-title { font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #475569; }
    .report-steps-panel-count { font-size: 0.75rem; color: #94a3b8; font-weight: 500; }
    .report-steps-content { font-size: 0.875rem; color: #334155; line-height: 1.65; }
    .report-steps-content .scenario-h2 { font-size: 0.9375rem; font-weight: 700; color: #0f172a; margin: 0.875rem 0 0.5rem; padding-bottom: 0.3125rem; border-bottom: 1px solid #f1f5f9; }
    .report-steps-content .scenario-section { font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin: 1rem 0 0.375rem; }
    .report-steps-content .scenario-ul { list-style: none; padding: 0; margin: 0.25rem 0 0.75rem; }
    .report-steps-content .scenario-ul li { display: flex; align-items: flex-start; gap: 0.625rem; padding: 0.4375rem 0.75rem; margin-bottom: 0.25rem; border-radius: 0.375rem; background: #f8fafc; border: 1px solid #f1f5f9; }
    .report-steps-content .scenario-ul li::before { content: "•"; color: #94a3b8; font-weight: 700; flex-shrink: 0; }
    .report-steps-content .scenario-ol { list-style: none; padding: 0; margin: 0.25rem 0 0.75rem; counter-reset: steps-ctr; }
    .report-steps-content .scenario-ol li { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.5625rem 0.875rem; margin-bottom: 0.375rem; border-radius: 0.5rem; border: 1px solid #e2e8f0; background: #fafcff; counter-increment: steps-ctr; transition: background 0.1s; }
    .report-steps-content .scenario-ol li:hover { background: #f0f7ff; }
    .report-steps-content .scenario-ol li::before { content: counter(steps-ctr); display: inline-flex; align-items: center; justify-content: center; min-width: 1.5rem; height: 1.5rem; background: #3b82f6; color: #fff; border-radius: 50%; font-size: 0.6875rem; font-weight: 700; flex-shrink: 0; margin-top: 0.0625rem; }
    .report-steps-content .scenario-hr { border: 0; border-top: 1px solid #e2e8f0; margin: 0.75rem 0; }
    .report-steps-content .scenario-p { margin: 0.25rem 0; }
    .report-steps-content .scenario-strong { font-weight: 700; color: #0f172a; }
    @keyframes steps-fadein { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
  </style>
</head>
<body>
  <div class="report-container">
    <div class="report-summary-card">
      <ul>
        <li><strong>Suite:</strong> ${escapeHtml(suiteName)}</li>
        <li><strong>Exported:</strong> ${escapeHtml(exportedAt)}</li>
        <li><strong>Files:</strong> ${fileCount}</li>
        <li><strong>Tests:</strong> ${total}</li>
      </ul>
    </div>

    <div class="report-card">
      <div class="report-filters" id="report-filters" style="display:none;">
        <span class="active-label">Active filters:</span>
        <span class="active-list" id="report-active-filters"></span>
        <button type="button" class="clear-btn" id="report-clear-filters">Clear all</button>
      </div>
      <div class="report-charts">
        <div class="report-pie-wrap">${pieSvg}</div>
        <ul class="report-legend" id="report-legend">
          <li data-status="PASS"><span class="swatch" style="background:${PIE_SLICE_COLORS[0]}"></span>PASS: ${passed}</li>
          <li data-status="FAIL"><span class="swatch" style="background:${PIE_SLICE_COLORS[1]}"></span>FAIL: ${failed}</li>
          <li data-status="BLOCKED"><span class="swatch" style="background:${PIE_SLICE_COLORS[2]}"></span>BLOCKED: ${blocked}</li>
          <li data-status="NOT RUN"><span class="swatch" style="background:${PIE_SLICE_COLORS[3]}"></span>NOT RUN: ${notRun}</li>
        </ul>
        <div class="report-bar-chart" id="report-bar-chart">${barChartHtml}</div>
      </div>
    </div>

    <div class="report-card report-summary">
      <h2>Execution summary</h2>
      <ul>
        <li><strong>Total:</strong> ${total}</li>
        <li><strong>Passed:</strong> ${passed}</li>
        <li><strong>Failed:</strong> ${failed}</li>
        <li><strong>Blocked:</strong> ${blocked}</li>
        <li><strong>Not run:</strong> ${notRun}</li>
      </ul>
    </div>

    <div class="report-card">
      <div class="report-chip-toolbar" id="report-chip-toolbar">
        <button type="button" class="report-chip report-chip-active" data-status="All" id="report-chip-all">All</button>
        <button type="button" class="report-chip" data-status="PASS">PASS</button>
        <button type="button" class="report-chip" data-status="FAIL">FAIL</button>
        <button type="button" class="report-chip" data-status="BLOCKED">BLOCKED</button>
        <button type="button" class="report-chip" data-status="NOT RUN">NOT RUN</button>
      </div>
      <div class="report-table-wrap">
      <table class="report-table" id="report-table">
        <thead>
          <tr>
            <th class="report-col-id">Test ID</th>
            <th class="report-col-name">Test Case Name</th>
            <th>Source File</th>
            <th>Status</th>
            <th>Comment</th>
            <th>Attachment</th>
            <th class="report-col-steps">Steps</th>
          </tr>
        </thead>
        <tbody>
${rows}
        </tbody>
      </table>
      </div>
    </div>

    <div class="report-download-section">
      <h2>Download progress</h2>
      <p>Use one of these to download the execution state for import into the main RMH QA Suite Runner.</p>
      <button type="button" class="report-dl-btn report-dl-btn-primary" id="report-dl-json">Download as JSON</button>
    </div>
  </div>

  <div class="report-lightbox" id="report-lightbox" role="dialog" aria-modal="true" aria-label="Image preview">
    <div class="report-lightbox-inner">
      <button type="button" class="report-lightbox-close" id="report-lightbox-close" aria-label="Close">&times;</button>
      <img id="report-lightbox-img" src="" alt=""/>
    </div>
  </div>

  <script type="application/json" id="${EMBEDDED_STATE_SCRIPT_ID}">${encodePayloadForHtml({
    suiteName,
    exportedAt: new Date().toISOString(),
    executionState: executionByTestId,
    testCases: suite.testCases.map((tc) => ({
      id: tc.id,
      testCaseName: tc.testCaseName,
      sourceFile: tc.sourceFile,
      scenarioContent: tc.scenarioContent,
    })),
  })}</script>
  <script>${reportScript}</script>
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

function getStatusCounts(
  testCases: TestCaseDefinition[],
  executionByTestId: Record<string, ExecutionState>
) {
  const passed = testCases.filter((tc) => executionByTestId[tc.id]?.status === "PASS").length;
  const failed = testCases.filter((tc) => executionByTestId[tc.id]?.status === "FAIL").length;
  const blocked = testCases.filter((tc) => executionByTestId[tc.id]?.status === "BLOCKED").length;
  const notRun = testCases.filter(
    (tc) => !executionByTestId[tc.id] || executionByTestId[tc.id].status === "NOT RUN"
  ).length;
  return { passed, failed, blocked, notRun };
}

const STATUS_CHART_ITEMS: { key: keyof ReturnType<typeof getStatusCounts>; label: string; barClass: string; fill: string }[] = [
  { key: "passed", label: "PASS", barClass: "bg-emerald-500", fill: "#10b981" },
  { key: "failed", label: "FAIL", barClass: "bg-red-500", fill: "#ef4444" },
  { key: "blocked", label: "BLOCKED", barClass: "bg-amber-500", fill: "#f59e0b" },
  { key: "notRun", label: "NOT RUN", barClass: "bg-slate-400", fill: "#94a3b8" },
];

const CHART_KEY_TO_STATUS: Record<keyof ReturnType<typeof getStatusCounts>, ExecutionStatus> = {
  passed: "PASS",
  failed: "FAIL",
  blocked: "BLOCKED",
  notRun: "NOT RUN",
};

function ExecutionPieChart({
  counts,
  total,
  selectedStatuses,
  onSliceClick,
}: {
  counts: ReturnType<typeof getStatusCounts>;
  total: number;
  selectedStatuses: Set<ExecutionStatus>;
  onSliceClick: (status: ExecutionStatus) => void;
}) {
  const r = 80;
  const cx = 100;
  const cy = 100;
  const sum = total || 1;
  if (total <= 0) {
    return (
      <svg width={200} height={200} viewBox="0 0 200 200" className="shrink-0" aria-label="Execution status pie chart">
        <circle cx={cx} cy={cy} r={r} fill="#94a3b8" />
      </svg>
    );
  }
  const toRad = (pct: number) => ((pct / 100) * 360 - 90) * (Math.PI / 180);
  const point = (pct: number) => ({
    x: cx + r * Math.cos(toRad(pct)),
    y: cy + r * Math.sin(toRad(pct)),
  });
  let acc = 0;
  const slices = STATUS_CHART_ITEMS.map(({ key, fill }) => {
    const count = counts[key];
    const pct = (count / sum) * 100;
    const isFullCircle = pct >= 99.99;
    const isZero = pct <= 0;
    let d = "";
    if (!isZero && !isFullCircle) {
      const start = point(acc);
      acc += pct;
      const end = point(acc);
      const large = pct > 50 ? 1 : 0;
      d = `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y} Z`;
    } else {
      acc += pct;
    }
    const status = CHART_KEY_TO_STATUS[key];
    return { d, fill, status, isFullCircle, isZero };
  });

  return (
    <svg width={200} height={200} viewBox="0 0 200 200" className="shrink-0 cursor-pointer" aria-label="Execution status pie chart">
      {slices.map(({ d, fill, status, isFullCircle, isZero }, i) => {
        if (isZero) return null;
        const isSelected = selectedStatuses.has(status);
        const isDimmed = selectedStatuses.size > 0 && !isSelected;
        if (isFullCircle) return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill={fill}
            opacity={isDimmed ? 0.35 : 1}
            className="transition-opacity duration-200 hover:opacity-100 outline-none focus:outline-none focus:ring-0"
            style={{ outline: "none" }}
            role="button"
            tabIndex={0}
            aria-label={isSelected ? `Remove ${status} from filter` : `Filter by ${status}`}
            aria-pressed={isSelected}
            onClick={(e) => {
              e.stopPropagation();
              onSliceClick(status);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSliceClick(status);
              }
            }}
          />
        );
        return (
          <path
            key={i}
            fill={fill}
            d={d}
            opacity={isDimmed ? 0.35 : 1}
            className="transition-opacity duration-200 hover:opacity-100 outline-none focus:outline-none focus:ring-0"
            style={{ outline: "none" }}
            role="button"
            tabIndex={0}
            aria-label={isSelected ? `Remove ${status} from filter` : `Filter by ${status}`}
            aria-pressed={isSelected}
            onClick={(e) => {
              e.stopPropagation();
              onSliceClick(status);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSliceClick(status);
              }
            }}
          />
        );
      })}
    </svg>
  );
}

const STATUS_DISPLAY_ORDER: ExecutionStatus[] = ["PASS", "FAIL", "BLOCKED", "NOT RUN"];

function ExecutionStatusChart({
  testCases,
  executionByTestId,
  selectedStatuses,
  onStatusToggle,
  onClearAll,
}: {
  testCases: TestCaseDefinition[];
  executionByTestId: Record<string, ExecutionState>;
  selectedStatuses: Set<ExecutionStatus>;
  onStatusToggle: (status: ExecutionStatus) => void;
  onClearAll: () => void;
}) {
  const total = testCases.length;
  const counts = getStatusCounts(testCases, executionByTestId);
  const maxCount = Math.max(total, 1);

  const handleChartStatusClick = useCallback(
    (status: ExecutionStatus) => {
      onStatusToggle(status);
    },
    [onStatusToggle]
  );

  const activeFiltersLabel =
    selectedStatuses.size > 0
      ? Array.from(selectedStatuses)
          .sort((a, b) => STATUS_DISPLAY_ORDER.indexOf(a) - STATUS_DISPLAY_ORDER.indexOf(b))
          .join(", ")
      : "";

  return (
    <section className="execution-chart-section mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Status chart
          </h2>
          <span className="text-sm text-slate-600">
            Total tests: {total}
          </span>
        </div>
        {selectedStatuses.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">
              Active filters: <span className="font-medium text-slate-900">{activeFiltersLabel}</span>
            </span>
            <button
              type="button"
              onClick={onClearAll}
              className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
        <div className="flex flex-shrink-0 flex-col items-center gap-3">
          <ExecutionPieChart
            counts={counts}
            total={total}
            selectedStatuses={selectedStatuses}
            onSliceClick={handleChartStatusClick}
          />
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs" aria-hidden>
            {STATUS_CHART_ITEMS.map(({ key, label, fill }) => {
              const status = CHART_KEY_TO_STATUS[key];
              const isSelected = selectedStatuses.has(status);
              const isDimmed = selectedStatuses.size > 0 && !isSelected;
              return (
                <li
                  key={key}
                  className={`flex cursor-pointer items-center gap-1.5 rounded px-0.5 ${isDimmed ? "opacity-50" : ""} ${isSelected ? "ring-1 ring-blue-500/60 ring-offset-1 bg-slate-50" : ""}`}
                  onClick={() => handleChartStatusClick(status)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleChartStatusClick(status);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-sm shrink-0"
                    style={{ backgroundColor: fill }}
                  />
                  <span className="text-slate-600">
                    {label}: <span className="font-medium tabular-nums text-slate-800">{counts[key]}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="min-w-0 flex-1 space-y-2.5">
          {STATUS_CHART_ITEMS.map(({ key, label, barClass }) => {
            const count = counts[key];
            const status = CHART_KEY_TO_STATUS[key];
            const widthPercent = total === 0 ? 0 : (count / maxCount) * 100;
            const isSelected = selectedStatuses.has(status);
            const isDimmed = selectedStatuses.size > 0 && !isSelected;
            return (
              <div
                key={key}
                role="button"
                tabIndex={0}
                aria-label={isSelected ? `Remove ${label} from filter` : `Filter by ${label}`}
                aria-pressed={isSelected}
                onClick={() => handleChartStatusClick(status)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleChartStatusClick(status);
                  }
                }}
                className={`flex cursor-pointer items-center gap-3 rounded-md py-0.5 pr-1 transition-opacity outline-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-inset ${isDimmed ? "opacity-45" : ""} hover:opacity-100 ${isSelected ? "ring-1 ring-blue-500/60 ring-offset-1" : ""}`}
              >
                <span className="w-20 shrink-0 text-sm font-medium text-slate-700">
                  {label}
                </span>
                <div className="min-w-0 flex-1 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-5 rounded-full ${barClass} transition-all duration-200`}
                    style={{ width: `${widthPercent}%`, minWidth: count > 0 ? "4px" : 0 }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-sm tabular-nums text-slate-600">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const SCENARIO_PREVIEW_LINES = 3;
const COLLAPSED_PREVIEW_MAX_LINES = 2;
const COLLAPSED_PREVIEW_MAX_CHARS = 140;

/**
 * For collapsed card display only: extracts a clean title and short preview from
 * scenario content. Title = first line after "# Scenario:" (or that line's text);
 * preview = next 1–2 meaningful lines. Never shows "Scenario" as a label.
 */
function getCollapsedScenarioDisplay(content: string): { title: string; preview: string } {
  const lines = content.split("\n").map((l) => l.trim());
  const titleRe = /^# (?:Scenario|Test Case):\s*(.*)$/;
  let title = "";
  let startIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(titleRe);
    if (m) {
      title = (m[1] || "").trim();
      startIndex = i + 1;
      break;
    }
    if (lines[i]) {
      title = lines[i].replace(/^# (?:Scenario|Test Case):\s*/i, "").trim();
      startIndex = i + 1;
      break;
    }
  }

  // If marker had no text (e.g. "# Scenario:\n\nReal Title"), use first non-empty line as title
  if (!title) {
    for (let i = startIndex; i < lines.length; i++) {
      if (lines[i]) {
        title = lines[i].replace(/^#+\s*/, "").trim();
        startIndex = i + 1;
        break;
      }
    }
  }

  const previewLines: string[] = [];
  for (let i = startIndex; i < lines.length && previewLines.length < COLLAPSED_PREVIEW_MAX_LINES; i++) {
    const line = lines[i];
    if (!line) continue;
    const stripped = line.replace(/^#+\s*/, "").replace(/^[-*]\s*/, "").trim();
    if (stripped) previewLines.push(stripped);
  }
  let preview = previewLines.join(" ").trim();
  if (preview.length > COLLAPSED_PREVIEW_MAX_CHARS) {
    preview = preview.slice(0, COLLAPSED_PREVIEW_MAX_CHARS).trim() + "…";
  }
  return { title: title || "", preview };
}

function getScenarioPreview(content: string, maxLines: number): string {
  const lines = content.split("\n");
  const preview = lines.slice(0, maxLines).join("\n");
  return lines.length <= maxLines ? preview : preview + "\n…";
}

/** Renders inline **bold** as <strong>; returns React nodes, no raw HTML */
function renderInlineBold(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const re = /\*\*(.+?)\*\*/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIndex) {
      parts.push(text.slice(lastIndex, m.index));
    }
    parts.push(<strong key={m.index} className="font-semibold text-slate-900">{m[1]}</strong>);
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : <>{parts}</>;
}

type Block = { type: "scenarioTitle"; text: string } | { type: "section"; text: string } | { type: "ul"; items: string[] } | { type: "ol"; items: string[] } | { type: "hr" } | { type: "p"; text: string };

function parseScenarioBlocks(content: string): Block[] {
  const lines = content.split("\n");
  const blocks: Block[] = [];
  let ulAcc: string[] = [];
  let olAcc: string[] = [];

  const flushUl = () => {
    if (ulAcc.length > 0) {
      blocks.push({ type: "ul", items: [...ulAcc] });
      ulAcc = [];
    }
  };
  const flushOl = () => {
    if (olAcc.length > 0) {
      blocks.push({ type: "ol", items: [...olAcc] });
      olAcc = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed === "") {
      flushUl();
      flushOl();
      continue;
    }
    const scenarioMatch = trimmed.match(/^# (?:Scenario|Test Case):\s*(.*)$/);
    if (scenarioMatch) {
      flushUl();
      flushOl();
      blocks.push({ type: "scenarioTitle", text: scenarioMatch[1].trim() });
      continue;
    }
    const sectionMatch = trimmed.match(/^##\s+(.+)$/);
    if (sectionMatch) {
      flushUl();
      flushOl();
      blocks.push({ type: "section", text: sectionMatch[1].trim() });
      continue;
    }
    if (/^---\s*$/.test(trimmed)) {
      flushUl();
      flushOl();
      blocks.push({ type: "hr" });
      continue;
    }
    const ulMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (ulMatch) {
      flushOl();
      ulAcc.push(ulMatch[1].trim());
      continue;
    }
    const olMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (olMatch) {
      flushUl();
      olAcc.push(olMatch[2].trim());
      continue;
    }
    flushUl();
    flushOl();
    blocks.push({ type: "p", text: trimmed });
  }
  flushUl();
  flushOl();
  return blocks;
}

/** Renders a single parsed block as a React element */
function renderBlock(block: Block, key: number): React.ReactNode {
  if (block.type === "scenarioTitle") {
    return (
      <h2 key={key} className="text-base font-semibold text-slate-900 border-b border-slate-200 pb-1 mb-2">
        {renderInlineBold(block.text)}
      </h2>
    );
  }
  if (block.type === "section") {
    return (
      <div key={key} className="mt-4 mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {block.text}
      </div>
    );
  }
  if (block.type === "ul") {
    return (
      <ul key={key} className="list-none p-0 space-y-1.5 my-1.5">
        {block.items.map((item, j) => (
          <li key={j} className="flex items-start gap-2.5 rounded-md border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700 leading-snug">
            <span className="mt-px text-slate-400 select-none">•</span>
            <span>{renderInlineBold(item)}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "ol") {
    return (
      <ol key={key} className="list-none p-0 space-y-1.5 my-1.5">
        {block.items.map((item, j) => (
          <li key={j} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 leading-snug hover:bg-blue-50/40 transition-colors duration-100">
            <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[0.6rem] font-bold text-white leading-none">
              {j + 1}
            </span>
            <span>{renderInlineBold(item)}</span>
          </li>
        ))}
      </ol>
    );
  }
  if (block.type === "hr") {
    return <hr key={key} className="border-slate-200 my-2" />;
  }
  return (
    <p key={key} className="leading-relaxed">
      {renderInlineBold(block.text)}
    </p>
  );
}

/** Groups parsed blocks into sections: preamble (blocks before first section heading) and named sections */
function groupBlocksIntoSections(blocks: Block[]): { preamble: Block[]; sections: { title: string; blocks: Block[] }[] } {
  const preamble: Block[] = [];
  const sections: { title: string; blocks: Block[] }[] = [];
  let current: { title: string; blocks: Block[] } | null = null;

  for (const block of blocks) {
    if (block.type === "section") {
      if (current) sections.push(current);
      current = { title: block.text, blocks: [] };
    } else if (current) {
      current.blocks.push(block);
    } else {
      preamble.push(block);
    }
  }
  if (current) sections.push(current);
  return { preamble, sections };
}

function CollapsibleSection({ title, children, defaultExpanded }: { title: string; children: React.ReactNode; defaultExpanded: boolean }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {title}
        </span>
        <span className="text-xs text-slate-400 select-none">{expanded ? "▲" : "▼"}</span>
      </button>
      {expanded && (
        <div className="px-3 py-2 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
}

function ScenarioContentRenderer({ content }: { content: string }) {
  const blocks = parseScenarioBlocks(content);
  const { preamble, sections } = groupBlocksIntoSections(blocks);

  // No section headings detected — render flat as before
  if (sections.length === 0) {
    return (
      <div className="space-y-1 text-sm text-slate-700">
        {blocks.map((block, i) => renderBlock(block, i))}
      </div>
    );
  }

  let blockIndex = 0;
  return (
    <div className="space-y-1 text-sm text-slate-700">
      {preamble.length > 0 && preamble.map((block) => renderBlock(block, blockIndex++))}
      <div className="space-y-2 mt-2">
        {sections.map((section, si) => (
          <CollapsibleSection key={si} title={section.title} defaultExpanded={true}>
            {section.blocks.map((block) => renderBlock(block, blockIndex++))}
          </CollapsibleSection>
        ))}
      </div>
    </div>
  );
}

/** Renders **bold** to <strong> in HTML string; escapes text for safe HTML */
function renderInlineBoldToHtml(text: string): string {
  const escaped = escapeHtml(text);
  return escaped.replace(/\*\*(.+?)\*\*/g, (_, inner) => `<strong class="scenario-strong">${inner}</strong>`);
}

/** Converts parsed scenario blocks to HTML matching ScenarioContentRenderer (for offline export) */
function scenarioBlocksToHtml(blocks: Block[]): string {
  const parts: string[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.type === "scenarioTitle") {
      parts.push(`<h2 class="scenario-h2">${renderInlineBoldToHtml(block.text)}</h2>`);
    } else if (block.type === "section") {
      parts.push(`<div class="scenario-section">${escapeHtml(block.text)}</div>`);
    } else if (block.type === "ul") {
      parts.push(
        `<ul class="scenario-ul">${block.items.map((item) => `<li>${renderInlineBoldToHtml(item)}</li>`).join("")}</ul>`
      );
    } else if (block.type === "ol") {
      parts.push(
        `<ol class="scenario-ol">${block.items.map((item) => `<li>${renderInlineBoldToHtml(item)}</li>`).join("")}</ol>`
      );
    } else if (block.type === "hr") {
      parts.push('<hr class="scenario-hr" />');
    } else {
      parts.push(`<p class="scenario-p">${renderInlineBoldToHtml(block.text)}</p>`);
    }
  }
  return parts.join("");
}

/** Full scenario content as formatted HTML (for offline export); no truncation */
function getScenarioHtml(content: string): string {
  const blocks = parseScenarioBlocks(content);
  return scenarioBlocksToHtml(blocks);
}

function AttachmentField({
  execution,
  onUpdate,
}: {
  execution: ExecutionState;
  onUpdate: (next: ExecutionState) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pasteTargetRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const parsed = parseAttachment(execution.attachment);
  // Store attachments as serializable objects
  type QAAttachment = {
    id: string;
    name: string;
    type: string;
    size: number;
    dataUrl: string;
    url?: string;
  };
  const [attachments, setAttachments] = useState<QAAttachment[]>(() => Array.isArray(execution.attachments) ? execution.attachments : []);
  const [linkInput, setLinkInput] = useState("");

  // Always-fresh refs so the write-back effect never closes over stale values.
  const executionRef = useRef(execution);
  const onUpdateRef = useRef(onUpdate);
  executionRef.current = execution;
  onUpdateRef.current = onUpdate;

  // Sync attachments to local state whenever the parent passes in new ones
  // (e.g. navigating to a different test case in focus view).
  useEffect(() => {
    if (Array.isArray(execution.attachments)) {
      setAttachments(execution.attachments);
    }
  }, [execution.attachments]);

  // Write back local attachment changes to the parent.  Uses refs so it always
  // operates on the current test's execution object, not a stale closure copy.
  useEffect(() => {
    if (attachments !== executionRef.current.attachments) {
      onUpdateRef.current({ ...executionRef.current, attachments });
    }
  }, [attachments]);
  // Generic URL validation
  function isValidUrl(url: string) {
    try {
      const u = new URL(url);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }
  // Handle link input Enter
  const handleLinkInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const url = linkInput.trim();
      if (url && isValidUrl(url)) {
        e.preventDefault();
        const hostname = (() => {
          try {
            const u = new URL(url);
            return u.hostname;
          } catch {
            return url;
          }
        })();
        setAttachments(prev => [
          ...prev,
          {
            id: `link-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
            name: hostname,
            type: "link",
            size: url.length,
            dataUrl: "",
            url,
          },
        ]);
        setLinkInput("");
      }
    }
  }, [linkInput]);

  // SAFE: file input handler for multiple, store as serializable objects
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    e.target.value = "";
    if (files.length) {
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          const newAttachment: QAAttachment = {
            id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
            name: file.name,
            type: file.type,
            size: file.size,
            dataUrl,
          };
          setAttachments(prev => [...prev, newAttachment]);
        };
        reader.readAsDataURL(file);
      });
    }
  }, []);

  // Remove handler for attachments
  const removeAttachment = useCallback((index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Paste handler: append as serializable objects
  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === "file" && item.type.startsWith("image/")) {
        const blob = item.getAsFile();
        if (blob) {
          const ts = Date.now();
          const ext = blob.type === "image/png" ? "png" : blob.type === "image/jpeg" ? "jpg" : "img";
          const file = new File([blob], `screenshot-${ts}.${ext}`, { type: blob.type });
          const reader = new FileReader();
          reader.onload = () => {
            const dataUrl = reader.result as string;
            const newAttachment: QAAttachment = {
              id: `${file.name}-${ts}-${Math.random().toString(36).slice(2,8)}`,
              name: file.name,
              type: file.type,
              size: file.size,
              dataUrl,
            };
            setAttachments(prev => [...prev, newAttachment]);
          };
          reader.readAsDataURL(file);
        }
      }
    }
    e.preventDefault();
  }, []);

  // Focus the paste target when the area is clicked (for accessibility)
  const handlePasteTargetClick = useCallback(() => {
    pasteTargetRef.current?.focus();
  }, []);

  // ...existing code...
  // Modal preview for image attachments
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState<string | null>(null);
  const handlePreview = (attachment: QAAttachment) => {
    if (attachment.type.startsWith("image/")) {
      setPreviewUrl(attachment.dataUrl);
      setPreviewName(attachment.name);
    }
  };
  const closePreview = () => {
    setPreviewUrl(null);
    setPreviewName(null);
  };

  return (
    <div className="mb-3">
      <label className="mb-1 block text-sm font-semibold text-slate-700">Attachments</label>
      <div
        ref={pasteTargetRef}
        tabIndex={0}
        onPaste={handlePaste}
        className="group/attachment-paste-area focus-within:ring-2 focus-within:ring-blue-500/30 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3"
        aria-label="Attachment area. Paste screenshot with Ctrl+V or upload an image."
      >
        <div className="flex items-center gap-1 mb-1">
          <input
            type="text"
            value={linkInput}
            onChange={e => setLinkInput(e.target.value)}
            onKeyDown={handleLinkInputKeyDown}
            placeholder="Paste screenshot with Ctrl+V or upload an image"
            className="flex-1 h-9 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            autoFocus={false}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="shrink-0 h-9 rounded-lg border border-blue-500 bg-blue-50 px-2 py-1.5 text-xs font-medium text-blue-700 shadow-sm hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            Upload image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_IMAGE_TYPES}
            className="hidden"
            onChange={handleFileChange}
            multiple
            aria-hidden
          />
        </div>
        {/* Helper text moved to input placeholder. */}
        {attachments.length > 0 && (
          <div className="grid grid-flow-row auto-cols-min grid-cols-[repeat(auto-fit,minmax(0,min-content))] justify-start gap-x-2.5 gap-y-3.5 mt-2">
            {attachments.map((attachment, index) => (
              <div
                key={attachment.id}
                className="group flex flex-col items-center justify-center rounded border border-slate-200 bg-white shadow-sm p-[2px] hover:border-blue-400 transition-all duration-150 cursor-pointer relative w-auto max-w-[70px] hover:scale-[1.03] hover:shadow-md"
                tabIndex={0}
                aria-label={`Preview ${attachment.name}`}
                onClick={() => {
                  if (attachment.type === "image" || attachment.type.startsWith("image/")) {
                    handlePreview(attachment);
                  } else if (attachment.type === "link" && attachment.url) {
                    window.open(attachment.url, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                {attachment.type === "image" || attachment.type.startsWith("image/") ? (
                  <div className="flex items-center justify-center w-full">
                    <img
                      src={attachment.dataUrl}
                      alt={attachment.name}
                      className="max-h-8 object-contain rounded mx-auto"
                      style={{ pointerEvents: "none" }}
                    />
                  </div>
                ) : attachment.type === "link" ? (
                  <div className="flex items-center justify-center w-full max-h-8 bg-blue-100 rounded mx-auto">
                    <svg width="14" height="14" fill="none" viewBox="0 0 16 16"><path stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M7.5 2.5h-2A3 3 0 0 0 2.5 7.5v2A3 3 0 0 0 7.5 13.5h2A3 3 0 0 0 13.5 8.5v-2"/><path stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9.5 2.5h4v4"/><path stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9.5 6.5l4-4"/></svg>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full max-h-8 bg-slate-100 rounded mx-auto">
                    <span className="text-[9px] text-slate-500">File</span>
                  </div>
                )}
                <span className="truncate text-[9px] font-medium text-slate-700 mt-0 w-full text-center leading-tight">
                  {attachment.type === "link" && attachment.url ? attachment.url.replace(/^https?:\/\//, "").split("/")[0] : attachment.name}
                </span>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); removeAttachment(index); }}
                  className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-slate-100 hover:bg-red-100 p-0.5 text-[9px] text-red-400 shadow-sm focus:outline-none"
                  aria-label={`Remove ${attachment.name}`}
                  style={{ fontSize: '9px' }}
                >
                  <svg width="9" height="9" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 4l8 8M12 4l-8 8"/></svg>
                </button>
              </div>
            ))}
          </div>
        )}
        {previewUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-6 relative max-w-md w-full flex flex-col items-center">
              <img src={previewUrl} alt={previewName || "Preview"} className="max-h-80 rounded-lg mb-4" />
              <span className="text-sm font-medium text-slate-700 mb-2">{previewName}</span>
              <button
                type="button"
                onClick={closePreview}
                className="mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TestCaseCard({
  tc,
  execution,
  onUpdate,
  isExpanded,
  onToggleExpand,
  isFullExpanded,
  onExpandAll,
  onCollapseAll,
  isFocusView = false,
  cardRef,
}: {
  tc: TestCaseDefinition;
  execution: ExecutionState;
  onUpdate: (next: ExecutionState) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  isFullExpanded: boolean;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  isFocusView?: boolean;
  cardRef?: (el: HTMLElement | null) => void;
}) {
  const statusStyle: React.CSSProperties =
    execution.status === "PASS"
      ? { borderLeft: "3px solid rgba(34,197,94,0.65)", boxShadow: "0 0 0 1px rgba(34,197,94,0.08), 0 1px 3px rgba(34,197,94,0.06)" }
      : execution.status === "FAIL"
      ? { borderLeft: "3px solid rgba(239,68,68,0.65)", boxShadow: "0 0 0 1px rgba(239,68,68,0.08), 0 1px 3px rgba(239,68,68,0.06)" }
      : execution.status === "BLOCKED"
      ? { borderLeft: "3px solid rgba(249,115,22,0.60)", boxShadow: "0 0 0 1px rgba(249,115,22,0.07), 0 1px 3px rgba(249,115,22,0.05)" }
      : { borderLeft: "3px solid transparent" };

  return (
    <article
      ref={cardRef}
      tabIndex={-1}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm outline-none"
      style={{ transition: "border-left-color 150ms ease-out, box-shadow 150ms ease-out, transform 150ms ease-out", transform: execution.status !== "NOT RUN" ? "scale(1.005)" : "scale(1)", ...statusStyle }}
    >
      <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50/80 p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Scenario content — <span className="font-mono">{tc.id}</span>
          </span>
          {!isFocusView && (
            <button
              type="button"
              onClick={(isFullExpanded && isExpanded) ? onCollapseAll : onExpandAll}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none"
            >
              {(isFullExpanded && isExpanded) ? "Collapse" : "Expand"}
            </button>
          )}
        </div>
        {isExpanded ? (
          <>
            <ScenarioContentRenderer content={tc.scenarioContent} />
            <button
              type="button"
              onClick={onToggleExpand}
              className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none"
            >
              Hide details
            </button>
          </>
        ) : (
          (() => {
            const { title } = getCollapsedScenarioDisplay(tc.scenarioContent);
            return (
              <>
                {title ? (
                  <p className="text-sm font-semibold text-slate-900">
                    {title}
                  </p>
                ) : null}
                <button
                  type="button"
                  onClick={onToggleExpand}
                  className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none"
                >
                  Show details
                </button>
              </>
            );
          })()
        )}
      </div>

      {(isFullExpanded || isFocusView) && (
        <div className="qa-expand-in">
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-slate-600">Comment</label>
            <textarea
              value={execution.comment}
              onChange={(e) => onUpdate({ ...execution, comment: e.target.value })}
              placeholder="Optional"
              rows={2}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <AttachmentField execution={execution} onUpdate={onUpdate} />
        </div>
      )}

      <div className="mt-6 border-t border-slate-200 pt-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="font-medium mr-1">Status</span>
          <div className="flex rounded-xl bg-white/95 border border-slate-100 shadow-sm px-1 py-0.5">
            {STATUS_OPTIONS.map((s, i) => {
              const selected = execution.status === s;
              // Selected: floating pill, soft colored bg, shadow, rounded-full
              // Unselected: transparent bg, colored/neutral text
              let color = '';
              if (s === 'PASS') color = selected
                ? 'bg-green-200/90 text-green-900 shadow-lg border border-green-300'
                : 'bg-transparent text-green-700 hover:bg-green-50';
              else if (s === 'FAIL') color = selected
                ? 'bg-red-200/90 text-red-900 shadow-lg border border-red-300'
                : 'bg-transparent text-red-700 hover:bg-red-50';
              else if (s === 'BLOCKED') color = selected
                ? 'bg-amber-200/90 text-amber-900 shadow-lg border border-amber-300'
                : 'bg-transparent text-amber-800 hover:bg-amber-50';
              else color = selected
                ? 'bg-slate-200/90 text-slate-900 shadow-lg border border-slate-300'
                : 'bg-transparent text-slate-600 hover:bg-slate-50';
              // Button base style
              let base = 'relative min-w-[68px] px-4 py-1.5 text-xs font-semibold rounded-full focus:outline-none transition-all duration-200 cursor-pointer flex items-center justify-center';
              // Remove divider for pill look
              let divider = '';
              // Selected: slightly elevated, floating pill
              let selectedRing = selected ? 'z-10 scale-105' : '';
              // Typography
              let font = selected ? 'font-bold' : 'font-semibold';
              // Focus/hover polish
              let focus = 'focus:z-20 focus:ring-2 focus:ring-blue-300';
              // Muted semantic color for unselected text
              let textMuted = '';
              if (!selected) {
                if (s === 'PASS') textMuted = 'text-green-600';
                else if (s === 'FAIL') textMuted = 'text-red-600';
                else if (s === 'BLOCKED') textMuted = 'text-amber-700';
                else textMuted = 'text-slate-500';
              }
              return (
                <button
                  key={s}
                  type="button"
                  className={[
                    base,
                    color,
                    divider,
                    selectedRing,
                    font,
                    focus,
                    textMuted
                  ].join(' ')}
                  aria-pressed={selected}
                  tabIndex={0}
                  style={{
                    marginLeft: i !== 0 ? '0.25rem' : undefined,
                  }}
                  onClick={() => onUpdate({ ...execution, status: s })}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function SuiteExecutionDashboard({ suite }: { suite: GeneratedSuite }) {
    // Pagination state
    const [pageSize, setPageSize] = useState<number>(() => {
      try {
        const raw = sessionStorage.getItem(`qa-ui:${suite.suiteName}`);
        if (raw) { const s = JSON.parse(raw); if (typeof s.pageSize === "number" && [5,10,20].includes(s.pageSize)) return s.pageSize; }
      } catch { /* ignore */ }
      return 5;
    });
    const [page, setPage] = useState<number>(() => {
      try {
        const raw = sessionStorage.getItem(`qa-ui:${suite.suiteName}`);
        if (raw) { const s = JSON.parse(raw); if (typeof s.page === "number" && s.page >= 0) return s.page; }
      } catch { /* ignore */ }
      return 0;
    });

  const [session, setSession] = useState<LoadedSuiteState>(() => {
    const l = loadFromStorage(suite.suiteName);
    return {
      executionState: l.executionState,
      suiteName: l.suiteName ?? suite.suiteName,
    };
  });
  const executionByTestId = session.executionState;
  const displayTitle = session.suiteName?.trim() || suite.suiteName;
  const setExecutionByTestId = useCallback(
    (
      next:
        | Record<string, ExecutionState>
        | ((prev: Record<string, ExecutionState>) => Record<string, ExecutionState>)
    ) => {
      setSession((prev) => ({
        ...prev,
        executionState:
          typeof next === "function" ? next(prev.executionState) : next,
      }));
    },
    []
  );
  const setDisplayTitle = useCallback((title: string) => {
    setSession((prev) => ({ ...prev, suiteName: title }));
  }, []);
  const [selectedStatuses, setSelectedStatuses] = useState<Set<ExecutionStatus>>(new Set());
  const [textSearch, setTextSearch] = useState("");
  const [expandedByTestId, setExpandedByTestId] = useState<Record<string, boolean>>({});
  const [fullExpandedByTestId, setFullExpandedByTestId] = useState<Record<string, boolean>>({});
  const [autoExpandedOnceIds, setAutoExpandedOnceIds] = useState<Set<string>>(new Set());
  const [currentView, setCurrentView] = useState<"list" | "focus">(() => {
    try {
      const raw = sessionStorage.getItem(`qa-ui:${suite.suiteName}`);
      if (raw) { const s = JSON.parse(raw); if (s.view === "list" || s.view === "focus") return s.view; }
    } catch { /* ignore */ }
    return "list";
  });
  const [focusIndex, setFocusIndex] = useState<number>(() => {
    try {
      const raw = sessionStorage.getItem(`qa-ui:${suite.suiteName}`);
      if (raw) {
        const s = JSON.parse(raw);
        if (typeof s.focusId === "string") {
          const idx = suite.testCases.findIndex((tc) => tc.id === s.focusId);
          if (idx !== -1) return idx;
        }
        if (typeof s.focusIndex === "number" && s.focusIndex >= 0 && s.focusIndex < suite.testCases.length) return s.focusIndex;
      }
    } catch { /* ignore */ }
    return 0;
  });
  const [focusSlideDir, setFocusSlideDir] = useState<"next" | "prev">("next");
  const [focusAnimKey, setFocusAnimKey] = useState(0);
  const focusAnimRef = useRef<HTMLDivElement>(null);
  const cardRefsMap = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const el = focusAnimRef.current;
    if (!el) return;
    const cls = focusSlideDir === "next" ? "focus-slide-next" : "focus-slide-prev";
    el.classList.remove("focus-slide-next", "focus-slide-prev");
    void el.offsetWidth; // force reflow to re-trigger the animation
    el.classList.add(cls);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusAnimKey]);

  const getExecution = useCallback(
    (testId: string): ExecutionState => {
      return executionByTestId[testId] ?? getDefaultExecution(testId);
    },
    [executionByTestId]
  );

  const statusFiltered =
    selectedStatuses.size === 0
      ? suite.testCases
      : suite.testCases.filter((tc) => selectedStatuses.has(getExecution(tc.id).status));

  const handleStatusToggle = useCallback((status: ExecutionStatus) => {
    setSelectedStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  }, []);

  const handleStatusClearAll = useCallback(() => {
    setSelectedStatuses(new Set());
  }, []);

  const statusDropdownValue =
    selectedStatuses.size === 0
      ? "ALL"
      : selectedStatuses.size === 1
        ? Array.from(selectedStatuses)[0]
        : "MULTIPLE";

  const handleStatusDropdownChange = useCallback((value: string) => {
    if (value === "ALL" || value === "MULTIPLE") {
      setSelectedStatuses(new Set());
    } else {
      setSelectedStatuses(new Set([value as ExecutionStatus]));
    }
  }, []);

  const searchTrimmed = textSearch.trim().toLowerCase();
  const visibleTests =
    searchTrimmed === ""
      ? statusFiltered
      : statusFiltered.filter((tc) => testMatchesSearch(tc, searchTrimmed));

  // Clamp page if pageSize or visibleTests changes
  useEffect(() => {
    setPage((prev) => {
      const maxPage = Math.max(0, Math.ceil(visibleTests.length / pageSize) - 1);
      return Math.min(prev, maxPage);
    });
  }, [pageSize, visibleTests.length]);

  // Persist UI view state to sessionStorage (tab-only)
  useEffect(() => {
    try {
      const focusedTc = visibleTests[Math.min(focusIndex, visibleTests.length - 1)];
      sessionStorage.setItem(`qa-ui:${suite.suiteName}`, JSON.stringify({
        view: currentView,
        page,
        pageSize,
        focusIndex,
        focusId: focusedTc?.id ?? null,
      }));
    } catch { /* ignore quota/security errors */ }
  }, [currentView, page, pageSize, focusIndex, suite.suiteName, visibleTests]);

  const paginatedTests = visibleTests.slice(page * pageSize, page * pageSize + pageSize);
  const totalPages = Math.max(1, Math.ceil(visibleTests.length / pageSize));
  const from = visibleTests.length === 0 ? 0 : page * pageSize + 1;
  const to = Math.min((page + 1) * pageSize, visibleTests.length);

  function ListPageNav() {
    return (
      <div className="grid items-center mb-2" style={{ gridTemplateColumns: "1fr auto 1fr" }}>
        {/* Left spacer */}
        <div />
        {/* Center: large nav buttons — truly centered */}
        <div className="flex items-center gap-2 justify-self-center">
          <button
            type="button"
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-label="Previous page"
          >
            ← Previous
          </button>
          <span className="text-xs font-medium text-slate-500">
            Page {page + 1} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-label="Next page"
          >
            Next →
          </button>
        </div>
        {/* Right spacer */}
        <div />
      </div>
    );
  }

  function PaginationControls() {
    return (
      <div className="grid items-center mb-2" style={{ gridTemplateColumns: "1fr auto 1fr" }}>
        {/* Left: info */}
        <div className="flex items-center gap-2 justify-self-start">
          <span className="text-xs text-slate-500">
            Showing {from}–{to} of {visibleTests.length} test{visibleTests.length === 1 ? '' : 's'}
          </span>
          <label className="text-xs text-slate-500 flex items-center gap-1">
            Page size
            <select
              className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={pageSize}
              onChange={e => { setPageSize(Number(e.target.value)); setPage(0); }}
            >
              {[5, 10, 20].map(sz => <option key={sz} value={sz}>{sz}</option>)}
            </select>
          </label>
        </div>
        {/* Center: large nav buttons — truly centered */}
        <div className="flex items-center gap-2 justify-self-center">
          <button
            type="button"
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-label="Previous page"
          >
            ← Previous
          </button>
          <span className="text-xs font-medium text-slate-500">
            Page {page + 1} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-label="Next page"
          >
            Next →
          </button>
        </div>
        {/* Right: view toggle */}
        <div className="flex items-center justify-self-end rounded-md border border-slate-200 bg-slate-100/70 p-0.5" role="group" aria-label="View mode">
          <button
            type="button"
            onClick={() => setCurrentView("list")}
            aria-pressed={currentView === "list"}
            className={`inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
              currentView === "list"
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            List
          </button>
          <button
            type="button"
            onClick={() => setCurrentView("focus")}
            aria-pressed={currentView === "focus"}
            className={`inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
              currentView === "focus"
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Focus
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const l = loadFromStorage(suite.suiteName);
    setSession({
      executionState: l.executionState,
      suiteName: l.suiteName ?? suite.suiteName,
    });
  }, [suite.suiteName]);

  useEffect(() => {
    saveToStorage(suite.suiteName, executionByTestId, displayTitle);
    // Persist execution state and display title; key is suite.suiteName
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [executionByTestId, displayTitle]);

  useEffect(() => {
    if (displayTitle === suite.suiteName) return;
    updateRecentSuiteTitle(
      {
        sourceFiles: suite.sourceFiles,
        suiteName: suite.suiteName,
        testCount: suite.testCases.length,
      },
      displayTitle
    );
  }, [
    displayTitle,
    suite.suiteName,
    suite.sourceFiles,
    suite.testCases.length,
  ]);

  // Keyboard pagination: ArrowLeft/ArrowRight in List View only
  useEffect(() => {
    if (currentView !== "list") return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) return;
      const tag = (e.target as HTMLElement)?.tagName ?? "";
      const editable = (e.target as HTMLElement)?.isContentEditable;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || editable) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setPage(p => Math.max(0, p - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setPage(p => Math.min(totalPages - 1, p + 1));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentView, totalPages]);

  const updateExecution = useCallback((next: ExecutionState) => {
    const prevStatus = executionByTestId[next.testId]?.status ?? "NOT RUN";
    if (
      (next.status === "FAIL" || next.status === "BLOCKED") &&
      prevStatus === "NOT RUN" &&
      !autoExpandedOnceIds.has(next.testId) &&
      !fullExpandedByTestId[next.testId]
    ) {
      setAutoExpandedOnceIds((prev) => new Set([...prev, next.testId]));
      setFullExpandedByTestId((prev) => ({ ...prev, [next.testId]: true }));
    }
    setExecutionByTestId((prev) => ({ ...prev, [next.testId]: next }));
  }, [executionByTestId, autoExpandedOnceIds, fullExpandedByTestId]);

  const handleClearProgress = useCallback(() => {
    clearStorage(suite.suiteName);
    setSession({ executionState: {}, suiteName: suite.suiteName });
  }, [suite.suiteName]);

  const expandAll = useCallback(() => {
    const all = suite.testCases.reduce<Record<string, boolean>>((acc, tc) => {
      acc[tc.id] = true;
      return acc;
    }, {});
    setExpandedByTestId(all);
    setFullExpandedByTestId(all);
  }, [suite.testCases]);

  const collapseAll = useCallback(() => {
    setExpandedByTestId({});
    setFullExpandedByTestId({});
  }, []);

  const saveProgress = useCallback(() => {
    const payload: ExportedProgress = {
      suiteName: displayTitle,
      exportedAt: new Date().toISOString(),
      executionState: executionByTestId,
      sourceFiles: suite.sourceFiles,
    };
    downloadJson(payload, `${filenamePrefix(displayTitle)}-progress-${getTimestamp()}.json`);
  }, [displayTitle, suite.sourceFiles, executionByTestId]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const importProgress = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const applyImportedState = useCallback(
    (data: ExportedProgress) => {
      if (
        typeof data.suiteName === "string" &&
        data.suiteName !== suite.suiteName &&
        data.suiteName !== displayTitle
      ) {
        const proceed = window.confirm(
          `This file was exported from suite "${data.suiteName}". Current suite is "${displayTitle}". Import anyway?`
        );
        if (!proceed) return;
      }
      const state = data.executionState;
      if (!state || typeof state !== "object") return;
      const currentTestIds = new Set(suite.testCases.map((tc) => tc.id));
      const merged: Record<string, ExecutionState> = { ...executionByTestId };
      for (const key of Object.keys(state)) {
        if (!currentTestIds.has(key)) continue;
        const v = (state as Record<string, unknown>)[key];
        if (!isValidExecutionState(v)) continue;
        const ex = v as ExecutionState;
        merged[key] = {
          testId: ex.testId,
          status: ex.status,
          comment: typeof ex.comment === "string" ? ex.comment : "",
          attachment: typeof ex.attachment === "string" ? ex.attachment : "",
          attachments: Array.isArray(ex.attachments) ? ex.attachments : [],
        };
      }
      setSession((prev) => ({
        ...prev,
        executionState: merged,
        suiteName: typeof data.suiteName === "string" ? data.suiteName : prev.suiteName,
      }));
    },
    [suite.suiteName, suite.testCases, executionByTestId, displayTitle]
  );

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
          const isHtml = file.name.toLowerCase().endsWith(".html") || file.type === "text/html";
          if (isHtml) {
            const data = extractExecutionStateFromHtml(raw);
            if (!data) {
              window.alert(
                "This HTML file does not contain embedded progress data. It may be an older report or from another source. Import a progress file (Save Progress JSON or Export HTML) to restore state."
              );
              return;
            }
            applyImportedState(data);
          } else {
            const data = JSON.parse(raw) as unknown;
            if (!data || typeof data !== "object" || !("executionState" in data)) {
              window.alert("Invalid progress file. The file must contain execution state from Save Progress (JSON) or Export HTML.");
              return;
            }
            applyImportedState(data as ExportedProgress);
          }
        } catch {
          window.alert("Could not read the selected file. It may be corrupted or not a valid progress file.");
        }
      };
      reader.readAsText(file);
    },
    [applyImportedState]
  );

  const [editingTitle, setEditingTitle] = useState(false);
  const [titleInputValue, setTitleInputValue] = useState(displayTitle);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const startEditingTitle = useCallback(() => {
    setTitleInputValue(displayTitle);
    setEditingTitle(true);
    setTimeout(() => titleInputRef.current?.focus(), 0);
  }, [displayTitle]);

  const saveTitle = useCallback(() => {
    const trimmed = titleInputValue.trim();
    setDisplayTitle(trimmed || suite.suiteName);
    setEditingTitle(false);
  }, [titleInputValue, suite.suiteName]);

  const cancelEditingTitle = useCallback(() => {
    setTitleInputValue(displayTitle);
    setEditingTitle(false);
  }, [displayTitle]);

  useEffect(() => {
    if (!editingTitle) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        saveTitle();
      } else if (e.key === "Escape") {
        cancelEditingTitle();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [editingTitle, saveTitle, cancelEditingTitle]);

  useEffect(() => {
    if (currentView !== "focus") return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const tag = (e.target as HTMLElement).tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        (e.target as HTMLElement).isContentEditable
      ) return;
      if (e.key === "ArrowLeft") {
        setFocusSlideDir("prev");
        setFocusAnimKey((k) => k + 1);
        setFocusIndex((i) => Math.max(0, i - 1));
      } else {
        setFocusSlideDir("next");
        setFocusAnimKey((k) => k + 1);
        setFocusIndex((i) => Math.min(visibleTests.length - 1, i + 1));
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [currentView, visibleTests.length]);

  return (
    <>
      <section className="-mt-4 mb-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              aria-label="Back"
              title="Back"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {editingTitle ? (
              <input
                ref={titleInputRef}
                type="text"
                value={titleInputValue}
                onChange={(e) => setTitleInputValue(e.target.value)}
                onBlur={saveTitle}
                className="min-w-[12rem] rounded-lg border border-slate-300 bg-white px-4 py-2 text-2xl font-bold text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder={suite.suiteName}
                aria-label="Suite title"
              />
            ) : (
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {displayTitle}
                <button
                  type="button"
                  onClick={startEditingTitle}
                  className="ml-2 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  title="Edit suite title"
                  aria-label="Edit suite title"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </h1>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                const html = buildExportHtml(suite, executionByTestId, getExecution, displayTitle);
                const filename = `${filenamePrefix(displayTitle)}-results-${getTimestamp()}.html`;
                downloadReport(html, filename);
              }}
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Export Results
            </button>
            <button
              type="button"
              onClick={handleClearProgress}
              className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-md hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            >
              Clear Progress
            </button>
          </div>
        </div>
      </section>

      <ExecutionStatusChart
        testCases={suite.testCases}
        executionByTestId={executionByTestId}
        selectedStatuses={selectedStatuses}
        onStatusToggle={handleStatusToggle}
        onClearAll={handleStatusClearAll}
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,.html,application/json,text/html"
          className="hidden"
          onChange={handleImportFile}
          aria-hidden
        />
        <button
          type="button"
          onClick={saveProgress}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        >
          Save Progress
        </button>
        <button
          type="button"
          onClick={importProgress}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        >
          Import Progress
        </button>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            Search in suite
            <input
              type="search"
              value={textSearch}
              onChange={(e) => setTextSearch(e.target.value)}
              placeholder="Filter by text…"
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            Filter by status
            <select
              value={statusDropdownValue}
              onChange={(e) => handleStatusDropdownChange(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="ALL">All</option>
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
              <option value="MULTIPLE">Multiple</option>
            </select>
          </label>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={expandAll}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none"
          >
            Collapse All
          </button>
        </div>
      </div>

      {currentView === "list" ? (
        <div className="space-y-5">
          {/* Top Pagination */}
          <PaginationControls />
          {/* Test Cases List */}
          {paginatedTests.map((tc, idx) => (
            <TestCaseCard
              key={tc.id}
              tc={tc}
              execution={getExecution(tc.id)}
              onUpdate={updateExecution}
              isExpanded={expandedByTestId[tc.id] === true}
              onToggleExpand={() => {
                const wasExpanded = expandedByTestId[tc.id] === true;
                console.log("[ToggleExpand] wasExpanded:", wasExpanded, "idx:", idx, "tc.id:", tc.id);
                setExpandedByTestId((prev) => ({ ...prev, [tc.id]: !prev[tc.id] }));
                if (wasExpanded) {
                  const nextTc = paginatedTests[idx + 1];
                  console.log("[ToggleExpand] next tc:", nextTc?.id ?? "none");
                  if (nextTc) {
                    requestAnimationFrame(() => {
                      requestAnimationFrame(() => {
                        const nextEl = cardRefsMap.current.get(nextTc.id);
                        console.log("[ToggleExpand] next ref el:", nextEl);
                        if (nextEl) {
                          console.log("[ToggleExpand] focusing next card");
                          nextEl.focus();
                          const rect = nextEl.getBoundingClientRect();
                          const elementTop = rect.top + window.scrollY;
                          window.scrollTo({ top: elementTop - window.innerHeight * 0.3, behavior: "smooth" });
                        }
                      });
                    });
                  }
                }
              }}
              isFullExpanded={fullExpandedByTestId[tc.id] === true}
              onExpandAll={() => {
                setExpandedByTestId((prev) => ({ ...prev, [tc.id]: true }));
                setFullExpandedByTestId((prev) => ({ ...prev, [tc.id]: true }));
              }}
              onCollapseAll={() => {
                console.log("[CollapseAll] Manual collapse detected, idx:", idx, "tc.id:", tc.id);
                setExpandedByTestId((prev) => ({ ...prev, [tc.id]: false }));
                setFullExpandedByTestId((prev) => ({ ...prev, [tc.id]: false }));
                const nextTc = paginatedTests[idx + 1];
                console.log("[CollapseAll] next tc:", nextTc?.id ?? "none");
                if (nextTc) {
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      const nextEl = cardRefsMap.current.get(nextTc.id);
                      console.log("[CollapseAll] next ref el:", nextEl);
                      if (nextEl) {
                        console.log("[CollapseAll] focusing next card");
                        nextEl.focus();
                        const rect = nextEl.getBoundingClientRect();
                        const elementTop = rect.top + window.scrollY;
                        window.scrollTo({ top: elementTop - window.innerHeight * 0.3, behavior: "smooth" });
                      }
                    });
                  });
                }
              }}
              cardRef={(el) => {
                if (el) cardRefsMap.current.set(tc.id, el);
                else cardRefsMap.current.delete(tc.id);
              }}
            />
          ))}
          {/* Bottom Pagination */}
          <PaginationControls />
        </div>
      ) : (
        <div className="space-y-4">
          {visibleTests.length === 0 ? (
            <p className="py-12 text-center text-sm text-slate-500">No tests match the current filters.</p>
          ) : (
            <>
              <div className="flex items-center justify-between px-1">
                {/* Left: counter */}
                <span className="text-xs font-medium text-slate-500 w-24">
                  Test {focusIndex + 1} of {visibleTests.length}
                </span>
                {/* Center: navigation */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => { setFocusSlideDir("prev"); setFocusAnimKey((k) => k + 1); setFocusIndex((i) => Math.max(0, i - 1)); }}
                    disabled={focusIndex === 0}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => { setFocusSlideDir("next"); setFocusAnimKey((k) => k + 1); setFocusIndex((i) => Math.min(visibleTests.length - 1, i + 1)); }}
                    disabled={focusIndex >= visibleTests.length - 1}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    Next →
                  </button>
                </div>
                {/* Right: view toggle */}
                <div className="flex w-24 justify-end">
                  <div className="flex items-center rounded-md border border-slate-200 bg-slate-100/70 p-0.5" role="group" aria-label="View mode">
                    <button
                      type="button"
                      onClick={() => setCurrentView("list")}
                      aria-pressed={false}
                      className="inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-slate-500 hover:text-slate-700"
                    >
                      <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                      List
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentView("focus")}
                      aria-pressed={true}
                      className="inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white text-slate-800 shadow-sm"
                    >
                      <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Focus
                    </button>
                  </div>
                </div>
              </div>
              {(() => {
                const clampedIndex = Math.min(focusIndex, visibleTests.length - 1);
                const tc = visibleTests[clampedIndex];
                return (
                  <div style={{ overflow: "clip", overflowClipMargin: "6px" }}>
                    <div ref={focusAnimRef} className={focusSlideDir === "next" ? "focus-slide-next" : "focus-slide-prev"}>
                      <TestCaseCard
                        key={tc.id}
                        tc={tc}
                        execution={getExecution(tc.id)}
                        onUpdate={updateExecution}
                        isExpanded={expandedByTestId[tc.id] ?? true}
                        onToggleExpand={() =>
                          setExpandedByTestId((prev) => ({ ...prev, [tc.id]: !(prev[tc.id] ?? true) }))
                        }
                        isFullExpanded={fullExpandedByTestId[tc.id] === true}
                        onExpandAll={() => {
                          setExpandedByTestId((prev) => ({ ...prev, [tc.id]: true }));
                          setFullExpandedByTestId((prev) => ({ ...prev, [tc.id]: true }));
                        }}
                        onCollapseAll={() => {
                          setExpandedByTestId((prev) => ({ ...prev, [tc.id]: false }));
                          setFullExpandedByTestId((prev) => ({ ...prev, [tc.id]: false }));
                        }}
                        isFocusView={true}
                      />
                    </div>
                  </div>
                );
              })()}
            </>
          )}
        </div>
      )}
    </>
  );
}
