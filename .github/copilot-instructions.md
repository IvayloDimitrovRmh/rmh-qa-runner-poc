# RMH QA Suite Runner – Copilot Instructions

This repository contains the RMH QA Suite Runner.

The project is a deterministic manual QA execution tool for test cases stored as Markdown files.

Copilot must follow these rules when generating or modifying code.

---

## Core Architecture

Test cases are written as Markdown files.

Markdown files are parsed into a deterministic JSON index using a build script.

The web application loads test cases from this JSON index rather than parsing Markdown at runtime.

Architecture pipeline:

Markdown Test Cases  
→ Index Builder Script  
→ JSON Test Index  
→ Suite Runner UI  
→ Manual QA Execution

---

## Deterministic System Requirement

The runner must remain deterministic.

The application must never rely on AI execution during runtime.

AI may only be used to generate or update Markdown test cases outside the runner.

The runner itself must operate entirely on structured JSON data.

---

## Markdown Scenario Parsing Rules

Markdown files may contain multiple test scenarios.

Each test scenario begins with the exact marker:

# Scenario:

Each scenario becomes exactly one test case.

Scenario order must always be preserved.

---

## JSON Test Index

Markdown files must be converted into a JSON index.

The JSON index is stored at:

public/testcase-index.json

The index must contain deterministic test IDs and structured metadata for each scenario.

The runner loads test cases from this index for performance and reliability.

---

## Build Script

The build script:

scripts/build-test-index.js

Must:

1. scan the /testcases directory recursively
2. discover all .md files
3. parse scenarios
4. generate deterministic test IDs
5. output the JSON index

Command:

npm run build:test-index

---

## UI Requirements

The UI must allow QA engineers to:

- select test suites via folder or file
- execute tests manually
- assign execution status
- add comments
- attach screenshots
- search within suites
- filter test cases
- export execution reports
- import saved execution progress

Execution status options:

NOT RUN  
PASS  
FAIL  
BLOCKED

---

## Execution State

Execution state must be stored locally in the browser.

Use:

localStorage

Execution progress must automatically save.

Refreshing the page must not lose execution state.

---

## Export and Import

Users must be able to export execution progress.

Supported formats:

JSON  
HTML

The HTML export must generate a self-contained offline execution report.

---

## Performance

The runner must support suites containing 1000+ test cases.

Rendering and search must remain responsive.

---

## Technology Stack

React  
Next.js  
TypeScript  
Tailwind CSS  

The application must remain compatible with static export.

No backend services should be introduced.

---

## Non Goals

The system must NOT:

- execute tests automatically
- depend on AI runtime execution
- require a backend
- require a database
- require cloud infrastructure

The application should remain lightweight and runnable locally.

---

## Code Quality

When modifying the codebase Copilot should prioritize:

deterministic behavior  
maintainable architecture  
clear component separation  
performance for large suites

---

## Architectural Reference

When working on repository structure, data flow, parsing behavior, state management, import/export behavior, or major refactoring decisions, consult:

docs/ARCHITECTURE.md

Use this document as the architectural source of truth for how the system is designed.