# Merchandising / Departments

## Metadata
Feature: Merchandising Departments  
Business Area: Merchandising > Departments  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP 1.1  
Priority: High  

---

# Scenario: Insert a new department in Central Manager

## Preconditions
- Central Manager is installed and running.
- The logged-in user has permission to create departments in Central Manager.
> **Note:** It is recommended to set up departments before entering items. Organizing items into departments and categories makes it easier to analyze inventory, pricing, and profits.

## Required Test Data
- Department Code: DEPT-001
- Department Name: General Merchandise
- Category Code 1: CAT-001
- Category Name 1: Miscellaneous
- Target Store Group: Store Group 01 *(the store group that includes Store001)*

## Navigation Path
Central Manager → Merchandising → Departments

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Departments** to open the Departments list.
4. Click **New** to create a new department.
5. On the **Department** tab, enter the following:
   - **Code:** `DEPT-001`
     > **Note:** The code must be unique and identifies the department (e.g., a number or abbreviation).
   - **Name:** `General Merchandise`
6. In the **Categories** section, click **New** to add a category to this department.
7. Enter the following for the new category:
   - **Code:** `CAT-001`
   - **Name:** `Miscellaneous`
8. Click the **Store Groups** tab.
9. Select **Store Group 01** from the list of available store groups.
   > **Note:** Only stores belonging to the selected store groups will receive this department.
10. Click **Save And Close** to save the new department.
11. The Departments list will return to focus. The new department record is now saved.

---

## Expected Results
- The new department DEPT-001 - General Merchandise is created and saved successfully in Central Manager.
- The department includes the category CAT-001 - Miscellaneous.
- The department is assigned to Store Group 01 and will be synchronized to Store001.

## Validation Checks
- Verify department DEPT-001 exists in Central Manager → Merchandising → Departments by confirming `DEPT-001` with the name `General Merchandise` appears in the Departments list.
- Verify the category CAT-001 - Miscellaneous is present under the department in Central Manager → Merchandising → Departments by opening the **DEPT-001** record and confirming the entry in the **Categories** section.
- Verify **Store Group 01** is selected on the **Store Groups** tab in Central Manager → Merchandising → Departments by opening the **DEPT-001** record and clicking the **Store Groups** tab.
- Verify department DEPT-001 is present in Store001 by logging in to Store Manager for Store001, navigating to **Merchandising → Departments**, and confirming `DEPT-001` appears in the list with the name `General Merchandise`.