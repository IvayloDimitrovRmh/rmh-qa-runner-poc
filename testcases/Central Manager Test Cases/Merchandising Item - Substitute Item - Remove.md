# Merchandising / Items

## Metadata
Feature: Merchandising Items  
Business Area: Merchandising > Items  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP 1.1  
Priority: High  

---

# Scenario: Remove a substitute item from an existing item in Central Manager

## Preconditions
- Central Manager is installed and running.
- The primary item TEST-STD-001 already exists in Central Manager with the following known values:
  - Item Lookup Code: `TEST-STD-001`
  - Description: `Test Standard Item 001`
  - Item Type: `Standard`
  - Existing substitute on the **Substitutes** tab: `TEST-STD-002`
  > **If the substitute TEST-STD-002 is not yet configured on TEST-STD-001**, add it first by navigating to **Merchandising → Items**, opening **TEST-STD-001**, clicking the **Substitutes** tab, and entering `TEST-STD-002`.
- The logged-in user has permission to modify items in Central Manager.

## Required Test Data
- Item Lookup Code (primary item): TEST-STD-001
- Substitute Item Lookup Code to remove: TEST-STD-002
- Expected unchanged — Item Lookup Code: TEST-STD-001
- Expected unchanged — Description: Test Standard Item 001
- Expected unchanged — Item Type: Standard

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. Locate **TEST-STD-001** in the Items list.
   > **Tip:** If the list is long, use the search or filter functionality to find the item by its Item Lookup Code.
5. Double-click **TEST-STD-001** to open the item record.
6. Click the **Substitutes** tab.
7. Confirm that `TEST-STD-002` is listed in the substitute list.
8. Select `TEST-STD-002` and delete it using the available delete or remove control.
9. Click **OK** to save the changes.
10. The Items list will return to focus. The item record is now saved.

---

## Expected Results
- The substitute item TEST-STD-002 is removed from the TEST-STD-001 item record in Central Manager.
- The **Substitutes** tab no longer contains any entries for `TEST-STD-002`.

## Validation Checks
- Verify `TEST-STD-002` is no longer present on the **Substitutes** tab in Central Manager → Merchandising → Items by double-clicking **TEST-STD-001**, clicking the **Substitutes** tab, and confirming `TEST-STD-002` does not appear in the substitute list.
- Verify the **Item Lookup Code** is unchanged in Central Manager → Merchandising → Items by opening the **TEST-STD-001** record and confirming the **Item Lookup Code** field on the **General** tab still reads `TEST-STD-001`.
- Verify the **Description** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-STD-001** record and confirming the **Description** field on the **General** tab still reads `Test Standard Item 001`.
- Verify the **Item type** is unchanged in Central Manager → Merchandising → Items by opening the **TEST-STD-001** record and confirming the **Item type** field on the **General** tab still reads `Standard`.
- Verify no other substitutes were unintentionally removed in Central Manager → Merchandising → Items by opening the **TEST-STD-001** record, clicking the **Substitutes** tab, and confirming the tab shows only the expected remaining entries (if any).