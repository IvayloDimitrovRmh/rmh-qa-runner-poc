import { buildSuite } from "@/src/lib/suiteBuilder";
import SuiteExecutionDashboard from "./SuiteExecutionDashboard";

interface PageProps {
  searchParams: Promise<{ name?: string }>;
}

export default async function SuitesPage({ searchParams }: PageProps) {
  const { name } = await searchParams;
  const searchText = (name ?? "").trim();

  if (!searchText) {
    return (
      <div className="min-h-screen bg-zinc-50 px-4 py-8 dark:bg-zinc-950">
        <div className="mx-auto max-w-2xl rounded-lg border border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-950/30">
          <h1 className="text-xl font-semibold text-amber-800 dark:text-amber-200">
            RMH QA Suite Runner
          </h1>
          <p className="mt-2 text-amber-700 dark:text-amber-300">
            No search text provided. Enter suite name or search text on the{" "}
            <a href="/" className="underline">
              home page
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  const suite = buildSuite(searchText);

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            RMH QA Suite Runner
          </h1>
          <a href="/" className="mt-2 inline-block text-sm text-zinc-600 hover:underline dark:text-zinc-400">
            ← Back to home
          </a>
        </header>

        {suite.testCases.length === 0 ? (
          <p className="rounded-lg border border-zinc-200 bg-white p-6 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            No test cases found. Ensure there are .md files in /testcases whose filename contains
            &quot;{suite.suiteName}&quot; (case-sensitive) and that they use the exact marker
            &quot;# Scenario:&quot;.
          </p>
        ) : (
          <SuiteExecutionDashboard suite={suite} />
        )}
      </div>
    </div>
  );
}
