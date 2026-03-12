# RMH QA Suite Runner

Internal QA tool for generating **manual test execution dashboards** from Markdown test case files.

The application reads Markdown files stored in the `/testcases` folder, converts each `# Scenario:` block into a test case, and renders them in a web interface where QA engineers can execute and record results.

---

# Purpose

The RMH QA Suite Runner allows QA engineers to:

* Maintain test cases using **simple Markdown files**
* Automatically generate **manual execution suites**
* Execute tests in a web UI
* Record test results
* Quickly generate test dashboards from documentation

This tool is designed to be:

* deterministic
* easy to maintain
* easy for QAs to update
* fast even with large test libraries

---

# Architecture

The system workflow looks like this:

```
Markdown Test Cases
        ↓
Index Builder
        ↓
testcase-index.json
        ↓
Suite Search
        ↓
Execution Dashboard
```

### Source of Truth

All test cases live in:

```
/testcases
```

Markdown files are the **single source of truth**.

Example structure:

```
testcases/
Central Manager - Worksheets - 251.md
Store Manager - Customers.md
Store Manager - Items.md
```

---

# Markdown Test Case Format

Each test case must begin with the marker:

```
# Scenario:
```

Example:

```
# Scenario:
Worksheet can be created from Central Manager

Business Purpose:
Verify that a user can create a new worksheet.

Steps:
1. Open Central Manager
2. Navigate to Worksheets
3. Click New
4. Save the worksheet

Expected Result:
Worksheet is saved successfully.
```

Each `# Scenario:` block becomes **one test case in the UI**.

Rules:

* Each scenario = one test case
* Scenario order is preserved
* File order is preserved
* No deduplication
* No merging of scenarios

---

# Searching for Test Suites

The search field matches **file names containing the entered text**.

Example search:

```
Items
```

Matches:

```
Central Manager - Items.md
Store Manager - Items.md
```

Example search:

```
Central Manager - Worksheets
```

Matches:

```
Central Manager - Worksheets - 251.md
```

Matching rules:

* case-sensitive
* deterministic
* based on `filename.includes(searchText)`

---

# Test Case Index

For performance reasons the site does **not parse Markdown files on every request**.

Instead, a prebuilt index is used:

```
public/testcase-index.json
```

This file contains all parsed test cases extracted from Markdown.

Benefits:

* much faster search
* reduced filesystem scanning
* scalable to hundreds or thousands of tests

---

# Rebuilding the Index

Whenever Markdown files are:

* edited
* added
* deleted

you must rebuild the index.

Run:

```
npm run build:test-index
```

This will:

1. Scan `/testcases`
2. Extract all `# Scenario:` blocks
3. Generate deterministic test IDs
4. Write results to:

```
public/testcase-index.json
```

---

# Typical Workflow When Updating Test Cases

1️⃣ Edit Markdown test files

Example:

```
testcases/Central Manager - Worksheets - 251.md
```

2️⃣ Rebuild the index

```
npm run build:test-index
```

3️⃣ Commit changes

```
git add .
git commit -m "Update test cases"
git push
```

---

# Running the Website

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

Open the site:

```
http://localhost:3000
```

---

# Execution Dashboard

When a suite is generated the page displays:

* Test ID
* Test Case Name
* Source File
* Scenario Content

QA engineers can record execution results such as:

```
PASS
FAIL
BLOCKED
NOT RUN
```

Optional fields may include:

* Comment
* Attachment reference (bug ID, screenshot link, etc.)

---

# Technology Stack

The application uses:

```
Next.js
TypeScript
Tailwind CSS
Node.js
```

No external Markdown parsing libraries are used.
The system relies on **deterministic parsing using the `# Scenario:` marker**.

---

# Project Structure

```
rmh-qa-suite-runner
│
├─ app/
│   ├─ page.tsx
│   └─ suites/
│       └─ page.tsx
│
├─ src/
│   └─ lib/
│       ├─ fileDiscovery.ts
│       ├─ scenarioParser.ts
│       ├─ suiteBuilder.ts
│       └─ types.ts
│
├─ scripts/
│   └─ build-test-index.js
│
├─ testcases/
│   └─ *.md
│
├─ public/
│   └─ testcase-index.json
│
├─ package.json
└─ README.md
```

---

# Key Design Principles

This tool intentionally avoids unnecessary complexity.

The system:

* does not use a database
* does not rely on external parsing libraries
* keeps Markdown as the single source of truth
* uses deterministic parsing rules
* prioritizes simplicity and maintainability

---

# Contributing

When adding or modifying test cases:

1. Update Markdown files in `/testcases`
2. Run:

```
npm run build:test-index
```

3. Commit the changes.

---

# License

Internal RMH QA tooling.
