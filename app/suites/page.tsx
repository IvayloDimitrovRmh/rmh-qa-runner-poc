import { buildSuite } from "@/src/lib/suiteBuilder";

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
        </section>

        <div className="space-y-4">
          {suite.testCases.map((tc) => (
            <article
              key={tc.id}
              className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-3 flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {tc.id}
                </span>
                <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                  {tc.testCaseName}
                </h3>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {tc.sourceFile}
                </span>
              </div>
              <pre className="whitespace-pre-wrap rounded bg-zinc-100 p-4 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                {tc.scenarioContent}
              </pre>
            </article>
          ))}
        </div>

        {suite.testCases.length === 0 && (
          <p className="rounded-lg border border-zinc-200 bg-white p-6 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            No test cases found. Ensure there are .md files in /testcases whose filename contains
            &quot;{suite.suiteName}&quot; (case-sensitive) and that they use the exact marker
            &quot;# Scenario:&quot;.
          </p>
        )}
      </div>
    </div>
  );
}
