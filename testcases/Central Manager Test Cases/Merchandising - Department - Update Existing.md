# Merchandising / Departments

## Metadata
Feature: Merchandising Departments  
Business Area: Merchandising > Departments  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP 1.1  
Priority: Unknown  

---

# Scenario: Update an existing department in Central Manager

## Preconditions
- Central Manager is configured and operational.
- The department DEPT-001 already exists in Central Manager with a known Department Code.
- At least one store is available to receive synchronization.
- The logged-in user has permission to modify departments in Central Manager.

## Required Test Data
- Department Code: DEPT-001
- Field to update: Name
- Original Name: *[To be provided]*
- Updated Name: *[To be provided]*
- Target Store(s): *[To be provided]*

## Navigation Path
Central Manager → Merchandising → Departments

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Departments** to open the Departments list.
4. Locate the existing department using the Department Code `DEPT-001`.
   > **Tip:** If the list is long, use the search or filter functionality to find the department by its Department Code.
5. Double-click **DEPT-001** to open the department record.
6. On the **Department** tab, modify the required field(s) with the updated value(s).
7. Click **Save And Close** to save the changes.
8. Confirm the updated department is synchronized to the selected store(s).

---

## Expected Results
- The department changes are saved successfully in Central Manager.
- The updated department data is synchronized to the selected store(s).

## Validation Checks
- Verify the updated field values are visible in Central Manager → Merchandising → Departments by reopening the **DEPT-001** record and confirming the changes on the **Department** tab.
- Verify the updated department data is present in the selected store(s) by inspecting the department record in each target store after synchronization has completed.