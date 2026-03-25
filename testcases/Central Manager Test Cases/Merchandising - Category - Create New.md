# Merchandising / Categories

## Metadata
Feature: Merchandising Categories  
Business Area: Merchandising > Categories  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP 1.1  
Priority: High  

---

# Scenario: Insert a new category in Central Manager

## Preconditions
- Central Manager is installed and running.
- The department DEPT-001 - General Merchandise already exists in Central Manager. To verify: navigate to **Merchandising → Departments** and confirm `DEPT-001` is present.
  > **If the department does not exist**, create it first by navigating to **Merchandising → Departments → New**, entering Code `DEPT-001` and Name `General Merchandise`, and clicking **Save And Close**.
- At least one store group (Store Group 01) is configured and includes Store001.
- The logged-in user has permission to create categories in Central Manager.
> **Note:** It is recommended to set up categories to help organize items for inventory, pricing, and profit analysis.

## Required Test Data
- Category Code: CAT-001
- Category Name: Miscellaneous
- Department: DEPT-001 - General Merchandise
- Target Store Group: Store Group 01

## Navigation Path
Central Manager → Merchandising → Categories

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Categories** to open the Categories list.
4. Click **New** to create a new category.
5. On the **Category** tab, enter the following:
   - **Code:** `CAT-001`
     > **Note:** The code must be unique and identifies the category (e.g., a number or abbreviation).
   - **Name:** `Miscellaneous`
   - **Department:** select `DEPT-001 - General Merchandise` from the dropdown.
6. Click the **Store Groups** tab.
7. Select **Store Group 01** from the list of available store groups.
   > **Note:** Only stores belonging to the selected store groups will receive this category.
8. Click **Save And Close** to save the new category.
9. The Categories list will return to focus. The new category record is now saved.

---

## Expected Results
- The new category CAT-001 - Miscellaneous is created and saved successfully in Central Manager, assigned to department DEPT-001 - General Merchandise.
- The category is assigned to Store Group 01 and will be synchronized to Store001.

## Validation Checks
- Verify category CAT-001 exists in Central Manager → Merchandising → Categories by confirming `CAT-001` with the name `Miscellaneous` appears in the Categories list.
- Verify the **Department** field is correctly assigned in Central Manager → Merchandising → Categories by opening the **CAT-001** record, clicking the **Category** tab, and confirming the **Department** field shows `DEPT-001 - General Merchandise`.
- Verify **Store Group 01** is selected in Central Manager → Merchandising → Categories by opening the **CAT-001** record, clicking the **Store Groups** tab, and confirming **Store Group 01** is selected.
- Verify category CAT-001 is present in Store001 by logging in to Store Manager for Store001, navigating to **Merchandising → Categories**, and confirming `CAT-001` appears in the list with the name `Miscellaneous`.