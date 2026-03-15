# RMH QA Suite Runner

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**RMH QA Suite Runner** is an internal web tool for executing **Retail Management Hero (RMH)** manual test suites generated from Markdown test case files.

The tool provides a **deterministic manual execution environment** where QA engineers can build suites, run tests, track results, attach screenshots, and export or import execution progress. It replaces AI-based execution approaches with a **predictable Markdown → JSON → UI workflow**.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Overview](#overview)
- [Core Workflow](#core-workflow)
- [Key Features](#key-features)
  - [Suite Generation](#suite-generation)
  - [Execution Dashboard](#execution-dashboard)
  - [Charts & Filtering](#charts--filtering)
  - [Progress Management](#progress-management)
  - [Offline HTML Runner](#offline-html-runner)
  - [Autosave](#autosave)
  - [Recent Suites](#recent-suites)
- [Repository Structure](#repository-structure)
- [Test Case Format](#test-case-format)
- [Nested Test Case Folders](#nested-test-case-folders)
- [Test Case Tree Selection](#test-case-tree-selection)
- [Test Index System](#test-index-system)
- [Using the Application](#using-the-application)
- [Progress Import / Export](#progress-import--export)
- [Technology Stack](#technology-stack)
- [Purpose](#purpose)

---

## Quick Start

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Overview

RMH QA Suite Runner is built using:

- Next.js
- React
- TypeScript
- Tailwind CSS

The application reads **Markdown test cases** stored in the repository, converts them into a deterministic suite, and renders an interactive **manual execution dashboard**. No external services or databases are required.

---

## Core Workflow

```text
Markdown Test Cases
        ↓
Test Index Generator
        ↓
JSON Test Index
        ↓
Suite Runner UI
        ↓
Manual Test Execution
        ↓
JSON / HTML Export
```

Markdown files are preprocessed into a JSON index which the application loads to build suites.

---

## Key Features

### Suite Generation

- Tree-based test case selection
- Folder or file level selection
- Deterministic suite generation
- Nested test case folder support
- Filtering of test tree

---

### Execution Dashboard

- Manual test execution interface
- Status tracking:

  ```text
  PASS
  FAIL
  BLOCKED
  NOT RUN
  ```

- Comments per test
- Screenshot attachments
- Attachment preview with modal viewer
- Editable suite title

---

### Charts & Filtering

- Pie chart showing status distribution
- Bar chart showing status counts
- Charts are clickable and filter tests dynamically
- Status filters update the test list instantly

---

### Progress Management

- JSON progress export
- Self-contained HTML runner export
- Import progress from JSON files
- Import progress from exported HTML runner files
- Import supported from both the **Home Page** and the **Suite Runner**

---

### Offline HTML Runner

Exported HTML files:

- contain the full suite
- include formatted scenario content
- embed attachments and screenshots
- preserve execution state
- include charts and filtering
- can be edited offline
- can be imported back into the application

---

### Autosave

Execution progress is automatically saved in browser storage:

- statuses
- comments
- attachments

Refreshing the page does **not lose progress**.

---

### Recent Suites

The home page shows **Recent Suites** allowing quick reopening of previously used suites.

Each entry shows:

- suite name
- number of files
- number of tests
- last opened time

Actions:

- Open
- Remove

Recent suites are stored locally in browser storage.

---

## Repository Structure

```text
rmh-qa-suite-runner
│
├── app/                 Next.js pages
│
├── src/lib/             Core logic
│   ├── fileDiscovery.ts
│   ├── scenarioParser.ts
│   ├── suiteBuilder.ts
│   └── indexLoader.ts
│
├── scripts/
│   └── build-test-index.js
│
├── testcases/           Markdown test cases
│
├── public/
│   └── testcase-index.json
│
└── README.md
```

---

## Test Case Format

Each test case must begin with:

```markdown
# Scenario:
```

Example:

```markdown
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

- Each `# Scenario:` represents **one test case**
- Test cases are **never merged**
- File order is preserved
- Parsing is deterministic

---

## Nested Test Case Folders

The `/testcases` directory supports nested folders.

Example:

```text
testcases/

Central Manager/
  Central Manager - Worksheets.md
  Central Manager - Items.md

Store Manager/
  Store Manager - Customers.md
  Store Manager - Items.md
```

The home page renders this structure as a **selectable tree view**.

---

## Test Case Tree Selection

The test tree supports:

- expandable folders
- folder-level selection
- file-level selection
- indeterminate folder states
- filtering by file or folder name

Selecting a folder automatically selects all test files inside it.

---

## Test Index System

To improve performance, Markdown files are preprocessed into a JSON index.

Command:

```bash
npm run build:test-index
```

This generates:

```text
public/testcase-index.json
```

The index contains:

- testId
- testCaseName
- sourceFile
- scenarioContent
- fileName

The application loads suites from this index instead of parsing Markdown files on every request.

---

## Using the Application

### 1. Start the application

```bash
npm run dev
```

### 2. Select tests

Use the **tree view** on the home page to select folders or individual test files.

### 3. Load the suite

Click **Load Selected Tests**. The Suite Runner builds the suite from the selected Markdown files.

### 4. Execute tests

Within the dashboard you can:

- mark test status
- add comments
- attach screenshots
- filter tests
- search inside the suite

### 5. Save or export progress

Options:

- **Save Progress (JSON)**
- **Export HTML**

---

## Progress Import / Export

### Import Progress

Progress files can be imported from the **Home Page** or **Suite Runner**.

Supported formats:

- JSON progress files
- HTML exported runner files

Import restores:

- suite metadata
- selected test files
- execution status
- comments
- attachments

---

### Export Progress

#### Save Progress (JSON)

Exports a JSON file containing:

- suite metadata
- selected files
- execution state
- comments
- attachments

Recommended for:

- version control
- long-term storage
- sharing with other QA engineers

---

#### Export HTML

Exports a **self-contained offline runner** including:

- full suite
- scenario content
- execution results
- comments
- attachments
- charts
- embedded execution state

The HTML runner works offline, remains editable, and can be re-imported into the application.

---

## Autosave

The application automatically stores execution state in browser storage.

Saved data includes:

- statuses
- comments
- attachments

Refreshing the page **does not lose progress**.

---

## Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Node.js

No external backend or database is required.

---

## Purpose

This tool was created to solve a core limitation of AI-driven test execution systems: **large test suites exceed AI context limits**.

By using **Markdown test definitions and deterministic UI execution**, QA engineers gain a stable workflow:

```text
Markdown Test Cases
        ↓
JSON Index
        ↓
Suite Runner
        ↓
Manual QA Execution
```
