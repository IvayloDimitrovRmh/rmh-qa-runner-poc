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
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8">
            <h1 className="text-2xl font-semibold text-slate-900">
              RMH QA Suite Runner
            </h1>
            <a href="/" className="mt-2 inline-block text-sm font-medium text-slate-600 hover:text-blue-600 hover:underline">
              ← Back to home
            </a>
          </header>
          <TreeSuiteLoader />
        </div>
      </div>
    );
  }

  if (fromImport) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8">
            <h1 className="text-2xl font-semibold text-slate-900">
              RMH QA Suite Runner
            </h1>
            <a href="/" className="mt-2 inline-block text-sm font-medium text-slate-600 hover:text-blue-600 hover:underline">
              ← Back to home
            </a>
          </header>
          <ImportSuiteLoader />
        </div>
      </div>
    );
  }

  if (!searchText) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-2xl rounded-xl border border-amber-200 bg-amber-50/80 p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-amber-900">
            RMH QA Suite Runner
          </h1>
          <p className="mt-2 text-sm text-amber-800">
            Select folders and files on the{" "}
            <a href="/" className="font-medium underline hover:no-underline">home page</a>
            {" "}and click Load Selected Tests, or import a saved progress file (JSON or HTML).
          </p>
        </div>
      </div>
    );
  }

  const suite = buildSuite(searchText);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">
            RMH QA Suite Runner
          </h1>
          <a href="/" className="mt-2 inline-block text-sm font-medium text-slate-600 hover:text-blue-600 hover:underline">
            ← Back to home
          </a>
        </header>

        {suite.testCases.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-600">
              No test cases found. Ensure there are .md files in /testcases whose filename contains
              &quot;{suite.suiteName}&quot; (case-sensitive) and that they use the exact marker
              &quot;# Scenario:&quot; or &quot;# Test Case:&quot;.
            </p>
          </div>
        ) : (
          <SuiteExecutionDashboard suite={suite} />
        )}
      </div>
    </div>
  );
}
