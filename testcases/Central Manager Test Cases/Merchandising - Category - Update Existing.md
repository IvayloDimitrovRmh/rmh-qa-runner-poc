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

# Scenario: Update an existing category in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- The category `CAT-001` with name `Miscellaneous` already exists in Central Manager, assigned to department `DEPT-001 - General Merchandise`.
- The category CAT-001 is currently assigned to **Store Group 01**, which includes Store001.
- The logged-in user has permission to modify categories in Central Manager.
- The target store Store001 is operational and able to receive synchronization from Central Manager.

## Required Test Data
- Category Code (existing): CAT-001
- Category Name (existing): Miscellaneous
- Department (existing): DEPT-001 - General Merchandise
- Updated Category Name: Miscellaneous Updated
- Store Group: Store Group 01
- Target Store: Store001

## Navigation Path
Central Manager → Merchandising → Categories

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Categories** to open the Categories list.
4. In the Categories list, locate the row where the **Code** column shows `CAT-001` and click on that row to select it.
5. Double-click **CAT-001** to open the category record. The **Category** tab is shown by default.
6. On the **Category** tab, verify the current values:
   - **Code:** `CAT-001`
   - **Name:** `Miscellaneous`
   - **Department:** `DEPT-001 - General Merchandise`
7. In the **Name** field, clear the existing value and enter `Miscellaneous Updated`.
8. Click the **Store Groups** tab and confirm that **Store Group 01** is selected. Do not change the store group assignment.
9. Click **Save And Close** to save the changes and return to the Categories list.
10. In the Categories list, locate the row for `CAT-001` and confirm the **Name** column now shows `Miscellaneous Updated`.
11. Allow time for synchronization to propagate to the store, or trigger a manual sync if required by your environment. Confirm a synchronization event is initiated for Store001.

---

## Expected Results
- The category record CAT-001 is updated successfully in Central Manager with the new name `Miscellaneous Updated`.
- The updated category data is synchronized to the target store Store001.
- The Categories list reflects the updated name immediately after saving.

## Validation Checks
- Verify the updated **Name** value in Central Manager → Merchandising → Categories by reopening the **CAT-001** record and confirming the **Name** field displays `Miscellaneous Updated` on the **Category** tab.
- Verify the **Department** assignment is unchanged in Central Manager → Merchandising → Categories by opening the **CAT-001** record and confirming the **Department** field on the **Category** tab still shows `DEPT-001 - General Merchandise`.
- Verify the **Store Group** assignment is unchanged in Central Manager → Merchandising → Categories by opening the **CAT-001** record, clicking the **Store Groups** tab, and confirming **Store Group 01** remains selected.
- Verify the updated category data is present in Store001 by logging in to Store Manager for Store001, navigating to **Merchandising → Categories**, and confirming the category with Code `CAT-001` displays the name `Miscellaneous Updated`.