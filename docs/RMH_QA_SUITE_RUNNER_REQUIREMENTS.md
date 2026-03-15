# RMH QA Suite Runner
## Functional and Technical Requirements + Development Plan

---

# 1. Project Overview

The RMH QA Suite Runner is an internal QA tool that allows QA engineers to execute manual test cases stored as Markdown files.

The system replaces a previous AI-based test execution POC that relied on LLMs to execute test cases directly. That approach failed due to context size limitations and hallucination risks when suites became large.

The new system must be deterministic, lightweight, and independent from AI runtime execution.

AI may still be used to generate or update Markdown test cases, but the execution runner must remain deterministic.

---

# 2. Core Concept

Test cases are authored as Markdown files and stored in a Git repository.

The runner application must:

1. read Markdown files
2. convert them into structured JSON
3. load them in a web UI
4. allow QA engineers to execute them manually
5. store execution progress locally
6. allow exporting execution reports

---

# 3. Goals

The system must:

- Execute large suites reliably
- Avoid AI context limitations
- Allow deterministic manual execution
- Support grouping test cases via folders
- Support filtering and searching
- Allow saving execution state
- Allow exporting execution reports
- Be simple enough to run locally

---

# 4. Non Goals

The system will NOT:

- execute tests automatically
- depend on AI execution
- require a database
- require backend infrastructure
- require cloud hosting

The tool should run as a static web application.

---

# 5. Repository Structure

Example structure:

rmh-qa-suite-runner/

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

docs/
    RMH_QA_SUITE_RUNNER_REQUIREMENTS.md

---

# 6. Markdown Test Case Format

Markdown files contain one or more test scenarios.

Each test scenario is defined by:

# Scenario: Scenario Name

Test description

Steps

Expected result

---

# 7. Scenario Parsing Rules

Parsing rules:

A new test case begins at the exact marker:

# Scenario:

Each scenario becomes exactly one test case.

Scenario order must be preserved.

---

# 8. JSON Test Index

Markdown files must be converted into a JSON index.

Purpose:

- faster loading
- deterministic structure
- easier filtering
- no Markdown parsing in browser

Example JSON entry:

{
  "testId": "T01",
  "testCaseName": "Create Worksheet",
  "sourceFile": "Central Manager - Worksheets - 251.md",
  "fileName": "Central Manager - Worksheets - 251.md",
  "scenarioContent": "...",
  "folder": "Central Manager"
}

---

# 9. Test Index Generation

A script must generate the index.

Example command:

npm run build:test-index

The script must:

1. scan /testcases
2. recursively discover .md files
3. parse scenarios
4. generate deterministic IDs
5. produce:

public/testcase-index.json

---

# 10. Suite Selection

The UI must allow loading test cases by:

Option 1 — Folder selection

User selects a folder.

Example:

Central Manager

All testcases inside the folder are loaded.

Option 2 — Filename filter

User searches by filename.

Example:

Items

Matches:

Central Manager - Items.md
Store Manager - Items.md

---

# 11. Test Execution UI

The UI must display test cases as cards.

Each card shows:

- Test ID
- Test name
- Scenario content
- Source file

Each test must support execution fields:

Status dropdown:

NOT RUN
PASS
FAIL
BLOCKED

Optional fields:

Comment
Attachment
Screenshot

---

# 12. Screenshot Support

Users must be able to attach screenshots.

Screenshot options:

- upload image file
- convert to base64
- store in execution state

Optional optimization:

- resize images
- compress images

---

# 13. Execution Summary

A dashboard must show:

Total tests
Passed
Failed
Blocked
Not run

Counts must update dynamically.

---

# 14. Search Inside Suite

Search must work across:

- test ID
- test name
- scenario content
- source file

Search must be case insensitive.

---

# 15. Execution State

Execution state is stored in browser.

Storage methods:

React state
localStorage

Example structure:

ExecutionState {

  testId
  status
  comment
  attachment
  screenshot

}

---

# 16. Autosave

Execution progress must autosave in localStorage.

---

# 17. Export Execution Progress

Users must be able to export progress.

Export format:

suite-progress-YYYY-MM-DD.json

Example:

{
  suiteName,
  exportedAt,
  executionState
}

---

# 18. Import Execution Progress

Users must be able to import progress JSON.

Import rules:

- merge execution state
- ignore unknown test IDs
- update UI immediately

---

# 19. Execution Report

Users must be able to generate a report.

Supported formats:

JSON
HTML

HTML report should contain:

- suite name
- execution date
- summary
- test results

---

# 20. UI Technology

The runner should use:

React
Next.js
TypeScript

Styling options:

Bootstrap
or
Tailwind

---

# 21. Static Deployment

The system must support static export.

Possible hosting options:

- local filesystem
- GitHub Pages
- Vercel
- internal server

No backend services required.

---

# 22. Performance Requirements

The runner must support suites of 1000+ test cases without noticeable slowdown.

---

# 23. Development Plan

The development plan has two parts:

1. evaluate existing implementation
2. refactor or extend features

---

# 24. Phase 1 — Analyze Existing Version

Tasks:

- review current architecture
- identify implemented modules
- identify missing requirements
- identify refactoring needs

Modules to inspect:

fileDiscovery
scenarioParser
suiteBuilder
indexLoader

Questions to answer:

- are test IDs deterministic
- is folder structure supported
- is parsing reliable
- is filtering implemented
- is execution state stored correctly

---

# 25. Phase 2 — Refactor

Possible refactoring areas:

- test index generation
- state management
- scenario parsing
- folder filtering
- UI components

Goals:

- simplify architecture
- ensure deterministic behavior
- improve maintainability

---

# 26. Phase 3 — UI Improvements

Implement:

- suite selector
- folder navigation
- filtering
- execution summary
- test card UI
- search inside suite

---

# 27. Phase 4 — Execution Features

Implement:

- status dropdown
- comment field
- attachment support
- screenshot upload

---

# 28. Phase 5 — State Management

Implement:

- autosave
- localStorage persistence
- session restore

---

# 29. Phase 6 — Import / Export

Implement:

- export JSON progress
- import JSON progress
- merge logic

---

# 30. Phase 7 — Reporting

Implement:

- HTML report generation
- JSON report export

---

# 31. Phase 8 — Performance Optimization

Optimize:

- loading speed
- rendering large suites
- search performance

Possible improvement:

virtualized list rendering

---

# 32. Phase 9 — Final Cleanup

Remove development artifacts:

.cursor
eslint dependencies
unused libraries

---

# 33. Future Improvements

Possible future features:

- test tagging
- test prioritization
- test history
- cloud report storage
- Jira integration
- screenshot gallery
- keyboard shortcuts

---

# 34. Success Criteria

The project is successful if:

- QA engineers can execute large suites reliably
- execution progress can be saved and restored
- reports can be exported
- the system works without AI runtime execution

---

## Tree View Suite Selection

The application must provide a tree view representing the `/testcases` folder structure.

Requirements:
- folders must be expandable/collapsible
- folders must have checkboxes
- files must have checkboxes
- selecting a folder selects all descendant files and folders
- unselecting a folder deselects all descendants
- parent folders must show indeterminate state when only part of their children is selected
- users must be able to select any combination of folders and files to build a custom suite
- suite loading must use the selected files as the source of test cases

---

# End of Requirements Document