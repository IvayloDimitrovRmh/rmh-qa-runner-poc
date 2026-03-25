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

# Scenario: Remove purchase tab configuration from an existing item in Central Manager

## Preconditions
- Central Manager is installed and running.
- The item TEST-STD-001 already exists in Central Manager with the following known **Purchase** tab values configured:
  - Item Lookup Code: `TEST-STD-001`
  - Description: `Test Standard Item 001`
  - Item Type: `Standard`
  - Unit of Measure: `Each`
  - Purchase UOM: `Case`
  - Do Not Order: unchecked
  > **If the Purchase tab settings are not yet configured**, complete the *Configure purchase tab settings* scenario first.
- The logged-in user has permission to modify items in Central Manager.

## Required Test Data
- Item Lookup Code: TEST-STD-001
- Field to reset: Purchase UOM
- Current Purchase UOM: Case
- Reset value: *(blank — clear the field)*
- Expected unchanged — Item Lookup Code: TEST-STD-001
- Expected unchanged — Description: Test Standard Item 001
- Expected unchanged — Item Type: Standard
- Expected unchanged — Unit of Measure: Each
- Expected unchanged — Do Not Order: unchecked

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
6. Click the **Purchase** tab.
7. Locate the **Purchase UOM** field and note the current value (`Case`).
8. Clear the **Purchase UOM** field by selecting the blank option or removing the current value.
9. Click **OK** to save the changes.
10. The Items list will return to focus. The item record is now saved.

---

## Expected Results
- The **Purchase UOM** field is cleared on the TEST-STD-001 item record in Central Manager.
- No other **Purchase** tab settings or general item fields are modified as a result of this update.

## Validation Checks
- Verify the **Purchase UOM** field is blank in Central Manager → Merchandising → Items by double-clicking **TEST-STD-001**, clicking the **Purchase** tab, and confirming the **Purchase UOM** field shows no value.
- Verify the **Unit of Measure** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-STD-001** record and confirming the **Unit of Measure** field on the **Purchase** tab still reads `Each`.
- Verify the **Do Not Order** checkbox remains unchecked in Central Manager → Merchandising → Items by opening the **TEST-STD-001** record and confirming the **Do Not Order** checkbox on the **Purchase** tab is unchecked.
- Verify the **Tax Code** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-STD-001** record and confirming the **Tax Code** field on the **Purchase** tab remains blank.
- Verify no other item fields were unintentionally modified in Central Manager → Merchandising → Items by opening the **TEST-STD-001** record and confirming the **Item Lookup Code** still reads `TEST-STD-001`, the **Description** still reads `Test Standard Item 001`, and the **Item type** still reads `Standard` on the **General** tab.