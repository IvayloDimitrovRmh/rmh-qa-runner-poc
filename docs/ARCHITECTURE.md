# RMH QA Suite Runner — Architecture Documentation

---

# 1. System Purpose

The **RMH QA Suite Runner** is an internal QA execution tool designed to allow QA engineers to execute manual test cases stored as Markdown files.

The system replaces an earlier AI-based test execution proof-of-concept that attempted to execute tests directly using LLM prompts. That approach proved unreliable due to context limitations and hallucination risks when processing large test suites.

The new architecture prioritizes:

* deterministic execution
* lightweight design
* local operation
* static deployment compatibility
* reliable handling of large test suites

AI may still be used to **generate or update Markdown test cases**, but the **execution runner itself must remain completely deterministic**.

---

# 2. High-Level System Pipeline

The RMH QA Suite Runner follows a deterministic pipeline that converts Markdown test cases into structured data used by the execution UI.

```
Markdown Test Cases
        ↓
Index Builder Script
        ↓
JSON Test Index
        ↓
Suite Runner UI
        ↓
Manual QA Execution
        ↓
Execution State Storage
        ↓
Export / Import
```

### Step 1 — Markdown Test Cases

Test cases are authored as Markdown files and stored in the repository under:

```
/testcases
```

Markdown files may contain multiple test scenarios.

---

### Step 2 — Index Builder Script

A Node.js script scans all Markdown files and extracts test scenarios.

Location:

```
scripts/build-test-index.js
```

The script generates a deterministic JSON index containing all test cases.

Command:

```
npm run build:test-index
```

Output:

```
public/testcase-index.json
```

---

### Step 3 — JSON Test Index

The JSON index acts as the runtime data source for the application.

Benefits:

* fast loading
* deterministic structure
* no Markdown parsing in the browser
* simplified filtering and search

The application always loads test cases from this JSON index.

---

### Step 4 — Suite Runner UI

The web UI allows QA engineers to:

* select test cases
* execute them manually
* track execution results
* attach screenshots
* add comments

Execution happens entirely in the browser.

---

### Step 5 — Execution State

Execution progress is stored locally in the browser.

Storage mechanisms:

* React state
* localStorage

Execution state includes:

* test status
* comments
* attachments
* screenshots

Autosave ensures progress is not lost on refresh.

---

### Step 6 — Export / Import

Execution progress can be exported and re-imported.

Supported formats:

* JSON progress export
* HTML offline runner export

Exports allow sharing test execution results or continuing work later.

---

# 3. Repository Structure

Example repository structure:

```
rmh-qa-suite-runner/

.github/
    copilot-instructions.md

docs/
    RMH_QA_SUITE_RUNNER_REQUIREMENTS.md
    ARCHITECTURE.md

app/
src/
scripts/

testcases/
    Central Manager/
        Central Manager - Worksheets - 251.md
        Central Manager - Worksheets - 252.md

    Store Manager/
        Store Manager - Items.md

public/
    testcase-index.json
```

### Folder Responsibilities

**app/**
Next.js pages and routing.

**src/lib/**
Core application logic including:

* scenario parsing
* suite building
* index loading
* execution state utilities

**scripts/**
Build scripts used during development.

**testcases/**
Markdown test case library.

**public/**
Generated runtime assets.

**docs/**
Project documentation.

---

# 4. Core Modules

The system relies on several core modules.

### scenarioParser

Responsible for extracting test scenarios from Markdown files.

Responsibilities:

* detect scenario boundaries
* preserve scenario order
* extract scenario content

---

### fileDiscovery

Scans the `/testcases` directory recursively and identifies Markdown files.

Responsibilities:

* detect `.md` files
* capture folder structure
* pass files to the parser

---

### suiteBuilder

Builds execution suites from selected test cases.

Responsibilities:

* combine selected files
* flatten scenarios into test cases
* generate execution-ready structures

---

### indexLoader

Loads the generated JSON index into the application.

Responsibilities:

* read `testcase-index.json`
* expose data to UI components
* provide filtering and searching

---

# 5. Data Models

### Test Index Entry

Example structure:

```
{
  "testId": "T01",
  "testCaseName": "Create Worksheet",
  "sourceFile": "Central Manager - Worksheets - 251.md",
  "fileName": "Central Manager - Worksheets - 251.md",
  "scenarioContent": "...",
  "folder": "Central Manager"
}
```

---

### Execution State

Execution state is stored per test case.

Example structure:

```
ExecutionState {
  testId
  status
  comment
  attachment
  screenshot
}
```

---

### Recent Suite Object

Stored in browser localStorage.

Example structure:

```
{
  suiteTitle,
  selectedFiles,
  testCount,
  timestamp,
  sourceType
}
```

---

# 6. Markdown Parsing Rules

Test cases are extracted using strict parsing rules.

A new test case begins when the parser finds:

```
# Scenario:
```

Rules:

* each scenario becomes one test case
* scenarios are not merged
* scenario order must be preserved
* parsing must remain deterministic

---

# 7. Suite Selection Architecture

The UI supports building suites from selected test cases.

Two selection methods exist.

### Folder Selection

Users can select an entire folder.

All test cases inside the folder are included.

---

### File Selection

Users can select individual Markdown files.

The application loads scenarios only from the selected files.

---

### Tree View

The application provides a tree representation of the `/testcases` folder.

Features:

* expandable folders
* folder-level checkboxes
* file-level checkboxes
* checkbox propagation
* indeterminate states

This allows users to build custom suites.

---

# 8. Execution UI Architecture

Each test case is rendered as a test card.

Displayed fields:

* Test ID
* Scenario name
* Scenario content
* Source file

Execution controls:

Status dropdown:

```
NOT RUN
PASS
FAIL
BLOCKED
```

Optional fields:

* comment
* screenshot
* attachment

---

# 9. Attachment Handling

Users may attach screenshots to test results.

Attachments are stored as Base64 data inside execution state.

Possible optimizations include:

* image compression
* resizing large images

Attachments are preserved during export and import.

---

# 10. Execution State Management

Execution progress is automatically saved.

State includes:

* test status
* comments
* attachments

State is persisted using:

```
localStorage
```

Autosave prevents data loss when refreshing the page.

---

# 11. Export / Import Architecture

Two export types are supported.

### JSON Export

Used to save progress.

Example:

```
suite-progress-YYYY-MM-DD.json
```

Contains:

* suite metadata
* execution state
* selected files

---

### HTML Export

Generates a self-contained offline report.

The HTML report includes:

* suite metadata
* test results
* attachments
* execution summary

The report can later be imported back into the application.

---

# 12. Performance Principles

The system must support large suites.

Key principles:

* no Markdown parsing in the browser
* load test cases from JSON index
* avoid unnecessary recomputation
* ensure responsive search and filtering
* support suites with 1000+ test cases

Potential future optimization:

* virtualized list rendering

---

# 13. System Constraints

The architecture intentionally avoids complex infrastructure.

The system must not require:

* backend services
* databases
* cloud hosting
* AI runtime execution

The application must remain compatible with static deployment.

---

# 14. Technology Stack

Core technologies:

* React
* Next.js
* TypeScript
* Tailwind CSS

The application must remain compatible with static builds.

---

# 15. Refactoring Safety Rules

When modifying the architecture:

* do not break deterministic scenario parsing
* do not move Markdown parsing into browser runtime
* maintain compatibility with existing export formats
* preserve deterministic test ID generation
* avoid introducing backend dependencies

---

# 16. Architectural Goals

The RMH QA Suite Runner prioritizes:

* deterministic behavior
* reliability
* maintainability
* scalability for large test suites
* simplicity of deployment

The architecture must remain lightweight and predictable so QA engineers can run large suites reliably without infrastructure dependencies.

---

# End of Architecture Document