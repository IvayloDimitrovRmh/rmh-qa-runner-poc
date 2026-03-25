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

# Scenario: Add an alias to an existing item in Central Manager

## Preconditions
- Central Manager is installed and running.
- The item TEST-STD-001 already exists in Central Manager with the following known values:
  - Item Lookup Code: `TEST-STD-001`
  - Description: `Test Standard Item 001`
  - Item Type: `Standard`
  > **If the item does not yet exist**, create it first by navigating to **Merchandising → Items → New → Standard Item** and entering the values above.
- The alias to be added (`ALIAS-001`) is not currently assigned to any other item in Central Manager. Aliases must be unique to a specific item.
- The logged-in user has permission to modify items in Central Manager.

## Required Test Data
- Item Lookup Code: TEST-STD-001
- Alias to add: ALIAS-001
> **Note:** Aliases are alternate item lookup codes. They should be easy to remember, shorter than a standard UPC code, and must be unique to a specific item across the entire Central Manager database.

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
7. In the alias entry area, type `ALIAS-001` as the new alias for the item.
8. Click **OK** to save the changes.
9. The Items list will return to focus. The item record is now saved.

---

## Expected Results
- The alias `ALIAS-001` is added to the item record for TEST-STD-001 in Central Manager.
- The alias is available for use as an alternate lookup code for the item.

## Validation Checks
- Verify the alias `ALIAS-001` is present on the **Aliases** tab in Central Manager → Merchandising → Items by double-clicking **TEST-STD-001**, clicking the **Aliases** tab, and confirming `ALIAS-001` appears in the alias list.
- Verify the alias can be used to look up the item in Central Manager → Merchandising → Items by searching for `ALIAS-001` in the search field and confirming that **TEST-STD-001** is returned in the results.
- Verify no other item fields were unintentionally modified in Central Manager → Merchandising → Items by opening the **TEST-STD-001** record and confirming the **Description**, **Department**, **Category**, **Price**, and **Cost** fields remain unchanged on the **General** tab.