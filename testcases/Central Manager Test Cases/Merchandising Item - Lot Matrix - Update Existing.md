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

# Scenario: Update an existing lot matrix item in Central Manager

## Preconditions
- Central Manager is installed and running.
- The lot matrix item TEST-LOT-001 already exists in Central Manager with the following known values:
  - Lot Matrix Lookup Code: `TEST-LOT-001`
  - Description: `Test Beer Lot Matrix`
  - Component Item 1: `BEER-SINGLE`, Quantity: `1`
  - Component Item 2: `BEER-6PK`, Quantity: `6`
  - Component Item 3: `BEER-12PK`, Quantity: `12`
  > **If the item does not yet exist**, create it first by navigating to **Merchandising → Items → New → Lot Matrix Item** and entering the values above.
- The logged-in user has permission to modify items in Central Manager.

## Required Test Data
- Lot Matrix Lookup Code: TEST-LOT-001
- Field to update: Description
- Original Description: Test Beer Lot Matrix
- Updated Description: Test Beer Lot Matrix - Updated
- Expected unchanged — Component Item 1: BEER-SINGLE, Quantity: 1
- Expected unchanged — Component Item 2: BEER-6PK, Quantity: 6
- Expected unchanged — Component Item 3: BEER-12PK, Quantity: 12

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. Locate **TEST-LOT-001** in the Items list.
   > **Tip:** If the list is long, use the search or filter functionality to find the item by its Lot Matrix Lookup Code.
5. Double-click **TEST-LOT-001** to open the lot matrix item record.
6. Locate the **Description** field and note the current value (`Test Beer Lot Matrix`).
7. Clear the **Description** field and enter `Test Beer Lot Matrix - Updated`.
8. Click **Save And Close** to save the changes.
9. The Items list will return to focus. The item record is now saved.

---

## Expected Results
- The lot matrix item TEST-LOT-001 is saved successfully in Central Manager with the updated description of `Test Beer Lot Matrix - Updated`.
- No component items or lot quantities are modified as a result of this update.

## Validation Checks
- Verify the **Description** field shows `Test Beer Lot Matrix - Updated` in Central Manager → Merchandising → Items by double-clicking **TEST-LOT-001** and confirming the **Description** field reads `Test Beer Lot Matrix - Updated`.
- Verify the **Lot Matrix Lookup Code** is unchanged in Central Manager → Merchandising → Items by opening the **TEST-LOT-001** record and confirming the **Lot Matrix Lookup Code** field still reads `TEST-LOT-001`.
- Verify the component items and lot quantities are unchanged in Central Manager → Merchandising → Items by opening the **TEST-LOT-001** record and confirming all of the following:
  - `BEER-SINGLE` is still listed with a quantity of `1`.
  - `BEER-6PK` is still listed with a quantity of `6`.
  - `BEER-12PK` is still listed with a quantity of `12`.