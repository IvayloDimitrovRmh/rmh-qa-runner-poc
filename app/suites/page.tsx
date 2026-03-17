import { buildSuite } from "@/src/lib/suiteBuilder";
import SuiteExecutionDashboard from "./SuiteExecutionDashboard";
import TreeSuiteLoader from "./TreeSuiteLoader";
import ImportSuiteLoader from "./ImportSuiteLoader";

interface PageProps {
  searchParams: Promise<{ name?: string; source?: string }>;
}

export default async function SuitesPage({ searchParams }: PageProps) {
  const { name, source } = await searchParams;
  const searchText = (name ?? "").trim();
  const fromTree = source === "tree";
  const fromImport = source === "import";

  if (fromTree) {
    return (
      <div className="min-h-screen bg-slate-50 px-2 sm:px-4 py-8 flex flex-col">
        <main className="mx-auto w-full max-w-4xl flex-1 flex flex-col gap-8">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b border-slate-200 pb-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">Suite Management</h1>
              <p className="mt-1 text-base text-slate-600 font-medium">Select and manage your QA suites. Review, filter, and launch test execution.</p>
            </div>
            <a href="/" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition">
              <span aria-hidden>←</span> Back to Home
            </a>
          </header>
          <section className="w-full">
            <TreeSuiteLoader />
          </section>
        </main>
      </div>
    );
  }

  if (fromImport) {
    return (
      <div className="min-h-screen bg-slate-50 px-2 sm:px-4 py-8 flex flex-col">
        <main className="mx-auto w-full max-w-4xl flex-1 flex flex-col gap-8">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b border-slate-200 pb-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">Import Suite</h1>
              <p className="mt-1 text-base text-slate-600 font-medium">Restore a saved suite and execution state from a progress file.</p>
            </div>
            <a href="/" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition">
              <span aria-hidden>←</span> Back to Home
            </a>
          </header>
          <section className="w-full">
            <ImportSuiteLoader />
          </section>
        </main>
      </div>
    );
  }

  if (!searchText) {
    return (
      <div className="min-h-screen bg-slate-50 px-2 sm:px-4 py-8 flex flex-col">
        <main className="mx-auto w-full max-w-2xl flex-1 flex flex-col items-center justify-center">
          <div className="w-full rounded-2xl border border-amber-200 bg-amber-50/90 p-8 shadow-md text-center">
            <h1 className="text-2xl font-bold text-amber-900 tracking-tight mb-2">No Suite Selected</h1>
            <p className="text-base text-amber-800 mb-2">
              Select folders and files on the{' '}
              <a href="/" className="font-semibold underline hover:no-underline">home page</a>
              {' '}and click <span className="font-semibold">Load Selected Tests</span>, or import a saved progress file (JSON or HTML).
            </p>
          </div>
        </main>
      </div>
    );
  }

  const suite = buildSuite(searchText);

  return (
    <div className="min-h-screen bg-slate-50 px-2 sm:px-4 py-8 flex flex-col">
      <main className="mx-auto w-full max-w-4xl flex-1 flex flex-col gap-8">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">Suite: <span className="font-bold text-blue-700">{suite.suiteName}</span></h1>
            <p className="mt-1 text-base text-slate-600 font-medium">Manage and execute your selected QA suite. Review test cases, track status, and export results.</p>
          </div>
          <a href="/" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition">
            <span aria-hidden>←</span> Back to Home
          </a>
        </header>

        {suite.testCases.length === 0 ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-md text-center">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">No Test Cases Found</h2>
            <p className="text-base text-slate-600 mb-1">
              No test cases matched this suite. Ensure there are <span className="font-mono">.md</span> files in <span className="font-mono">/testcases</span> whose filename contains <span className="font-semibold">{suite.suiteName}</span> (case-sensitive) and that they use the exact marker <span className="font-mono"># Scenario:</span> or <span className="font-mono"># Test Case:</span>.
            </p>
          </section>
        ) : (
          <section className="w-full">
            <SuiteExecutionDashboard suite={suite} />
          </section>
        )}
      </main>
    </div>
  );
}
