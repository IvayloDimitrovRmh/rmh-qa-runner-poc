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

# Scenario: Remove an alias from an existing item in Central Manager

## Preconditions
- Central Manager is installed and running.
- The item TEST-STD-001 already exists in Central Manager with the following known values:
  - Item Lookup Code: `TEST-STD-001`
  - Description: `Test Standard Item 001`
  - Item Type: `Standard`
  - Existing alias on the **Aliases** tab: `ALIAS-001`
  > **If the alias ALIAS-001 does not yet exist on the item**, add it first by navigating to **Merchandising → Items**, opening **TEST-STD-001**, clicking the **Aliases** tab, and entering `ALIAS-001`.
- The logged-in user has permission to modify items in Central Manager.

## Required Test Data
- Item Lookup Code: TEST-STD-001
- Alias to remove: ALIAS-001
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
6. Click the **Aliases** tab.
7. Locate `ALIAS-001` in the alias list.
8. Select `ALIAS-001` and delete it using the available delete or remove control.
9. Click **OK** to save the changes.
10. The Items list will return to focus. The item record is now saved.

---

## Expected Results
- The alias `ALIAS-001` is removed from the item record for TEST-STD-001 in Central Manager.
- The alias is no longer available as an alternate lookup code for the item.

## Validation Checks
- Verify the alias `ALIAS-001` is no longer present on the **Aliases** tab in Central Manager → Merchandising → Items by double-clicking **TEST-STD-001**, clicking the **Aliases** tab, and confirming `ALIAS-001` does not appear in the alias list.
- Verify the alias can no longer be used to look up the item in Central Manager → Merchandising → Items by searching for `ALIAS-001` in the search field and confirming that no item is returned.
- Verify no other item fields were unintentionally modified in Central Manager → Merchandising → Items by opening the **TEST-STD-001** record and confirming the **Item Lookup Code** still reads `TEST-STD-001`, the **Description** still reads `Test Standard Item 001`, and the **Item type** still reads `Standard` on the **General** tab.