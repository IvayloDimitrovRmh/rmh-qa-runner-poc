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

# Scenario: Add a substitute item to an existing item in Central Manager

## Preconditions
- Central Manager is installed and running.
- The primary item TEST-STD-001 already exists in Central Manager with the following known values:
  - Item Lookup Code: `TEST-STD-001`
  - Description: `Test Standard Item 001`
  - Item Type: `Standard`
- The substitute item TEST-STD-002 already exists in Central Manager with the following known values:
  - Item Lookup Code: `TEST-STD-002`
  - Description: `Test Standard Item 002`
  - Item Type: `Standard`
  > **If either item does not yet exist**, create them first by navigating to **Merchandising → Items → New → Standard Item**.
- The logged-in user has permission to modify items in Central Manager.
> **Note:** Substitute items are similar items that a customer could purchase if the primary item is out of stock. They are configured per item in Central Manager and are visible to store staff.

## Required Test Data
- Item Lookup Code (primary item): TEST-STD-001
- Substitute Item Lookup Code: TEST-STD-002
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
7. In the substitute entry area, enter or select `TEST-STD-002` as the substitute item.
   > **Note:** Substitute items are similar items that a customer could purchase if the primary item is out of stock.
8. Click **OK** to save the changes.
9. The Items list will return to focus. The item record is now saved.

---

## Expected Results
- The substitute item TEST-STD-002 is added to the TEST-STD-001 item record in Central Manager.
- The substitute is available for reference when TEST-STD-001 is out of stock.

## Validation Checks
- Verify `TEST-STD-002` is present on the **Substitutes** tab in Central Manager → Merchandising → Items by double-clicking **TEST-STD-001**, clicking the **Substitutes** tab, and confirming `TEST-STD-002` appears in the substitute list.
- Verify the substitute item's lookup code and description are correct in Central Manager → Merchandising → Items by confirming the entry on the **Substitutes** tab shows `TEST-STD-002` with description `Test Standard Item 002`.
- Verify no other fields on the primary item were unintentionally modified in Central Manager → Merchandising → Items by opening the **TEST-STD-001** record and confirming the **Item Lookup Code** still reads `TEST-STD-001`, the **Description** still reads `Test Standard Item 001`, and the **Item type** still reads `Standard` on the **General** tab.