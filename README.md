# RMH QA Suite Runner

Internal QA tool for executing RMH manual test suites generated from Markdown test case files.

The tool allows QA engineers to load test suites, execute tests, track results, and export/import execution progress.

---

# Overview

RMH QA Suite Runner is a lightweight internal web application built with:

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind**

It reads **Markdown test cases** stored in the repository and generates a **manual execution dashboard** for QA engineers.

The goal is to provide a **deterministic and simple test execution environment** without relying on AI context limits.

---

# Core Concept

Test cases are stored as Markdown files.

The application:

1. Reads Markdown test files
2. Extracts test cases using `# Scenario:` markers
3. Builds a searchable test suite
4. Provides a UI for executing tests manually
5. Tracks results in the browser
6. Allows exporting/importing execution progress

---

# Repository Structure

```
rmh-qa-suite-runner
│
├── app/                     Next.js pages
│
├── src/lib/                 Core logic
│   ├── fileDiscovery.ts
│   ├── scenarioParser.ts
│   ├── suiteBuilder.ts
│   └── indexLoader.ts
│
├── scripts/
│   └── build-test-index.js  Generates test index
│
├── testcases/               Markdown test cases
│
├── public/
│   └── testcase-index.json  Generated test index
│
└── README.md
```

---

# Test Case Format

Each test case must start with the marker:

```
# Scenario:
```

Example:

```
# Scenario:
Create new customer

Steps:
1. Open Customers
2. Click New
3. Enter customer data
4. Save

Expected Result:
Customer is created successfully.
```

Rules:

* Each `# Scenario:` represents **one test case**
* Scenarios are **not merged**
* Order inside files is preserved
* Files are processed deterministically

---

# Nested Test Case Folders

The `/testcases` folder supports **nested directories**.

Example:

```
testcases/

Central Manager/
Central Manager - Worksheets.md
Central Manager - Items.md

Store Manager/
Store Manager - Items.md
Store Manager - Customers.md
```

Search works on **filename only**, not folder name.

Example searches:

```
Items
Customers
Central Manager - Worksheets
```

---

# Test Index System

To improve performance, Markdown files are preprocessed into a JSON index.

Command:

```
npm run build:test-index
```

This generates:

```
public/testcase-index.json
```

The index contains:

* testId
* testCaseName
* sourceFile
* scenarioContent
* fileName

The application loads suites from this index instead of re-parsing Markdown on every request.

---

# Development Workflow

## Start the application

```
npm run dev
```

This command automatically:

1. Builds the test index
2. Starts the Next.js development server

Open:

```
http://localhost:3000
```

---

# Updating Test Cases

When modifying Markdown test files:

```
edit markdown
↓
npm run build:test-index
↓
git add .
git commit
git push
```

---

# Updating Local Environment

When pulling changes from the repository:

```
git pull
↓
npm run build:test-index
↓
npm run dev
```

---

# Using the Application

## Generate a Suite

On the homepage, enter a search string such as:

```
Central Manager - Worksheets
Items
Customers
```

The application loads all Markdown files whose filename **contains the search text**.

---

# Execution Dashboard

The suite dashboard allows QA engineers to:

* execute tests
* mark status
* add comments
* attach bug IDs or screenshot references

Statuses:

```
NOT RUN
PASS
FAIL
BLOCKED
```

---

# Execution Summary

At the top of the dashboard you will see:

* Total tests
* Passed
* Failed
* Blocked
* Not run

Counts update automatically.

---

# Search Inside Suite

The dashboard provides a **suite-level search** that allows filtering test cards by:

* Test ID
* Test name
* Source file
* Scenario content

Search is **case-insensitive**.

---

# Export Progress

Execution progress can be exported as JSON.

Click:

```
Export Progress
```

This downloads a file such as:

```
suite-progress-2026-03-12.json
```

Example structure:

```
{
  "suiteName": "Items",
  "exportedAt": "2026-03-12T11:22:00.000Z",
  "executionState": {
    "T01": { "status": "PASS", "comment": "", "attachment": "" },
    "T02": { "status": "FAIL", "comment": "Inventory mismatch", "attachment": "BUG-123" }
  }
}
```

---

# Import Progress

Execution state can be restored by importing a previously exported JSON file.

Click:

```
Import Progress
```

Rules:

* Unknown test IDs are ignored
* Existing tests are updated
* UI refreshes automatically

---

# Autosave

Execution progress is stored locally in the browser.

Refreshing the page does not lose progress.

---

# Technology Stack

```
Next.js
React
TypeScript
Tailwind CSS
Node.js
```

No external runtime services are required.

---

# Future Improvements (Planned)

Potential future enhancements:

* hosted multi-user version
* shared execution state
* role-based access
* report export improvements
* Azure or internal hosting

---

# Purpose

This tool was created to solve a key problem:

AI-based execution approaches were limited by **context size** when processing large test suites.

By using Markdown test definitions and a deterministic web UI, the workflow becomes:

```
Markdown Test Cases
↓
JSON Index
↓
Suite Runner UI
↓
Manual QA Execution
```