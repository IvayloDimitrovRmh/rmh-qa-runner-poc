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

# Scenario: Update an existing assembly item in Central Manager

## Preconditions
- Central Manager is installed and running.
- The assembly item TEST-ASM-001 already exists in Central Manager with the following known values:
  - Assembly Lookup Code: `TEST-ASM-001`
  - Description: `Test Gaming Package`
  - Component Item 1: `COMP-CON-001` (Gaming Console), Quantity: `1`, Assembly Price: `299.99`
  - Component Item 2: `COMP-CTR-001` (Gaming Controller), Quantity: `2`, Assembly Price: `49.99`
  > **If the item does not yet exist**, create it first by navigating to **Merchandising → Items → New → Assembly Item** and entering the values above.
- The logged-in user has permission to modify items in Central Manager.

## Required Test Data
- Assembly Lookup Code: TEST-ASM-001
- Field to update: Description
- Original Description: Test Gaming Package
- Updated Description: Test Gaming Package - Updated
- Expected unchanged — Component Item 1: COMP-CON-001, Quantity: 1, Assembly Price: 299.99
- Expected unchanged — Component Item 2: COMP-CTR-001, Quantity: 2, Assembly Price: 49.99

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. Locate **TEST-ASM-001** in the Items list.
   > **Tip:** If the list is long, use the search or filter functionality to find the item by its Assembly Lookup Code.
5. Double-click **TEST-ASM-001** to open the assembly item record.
6. Locate the **Description** field and note the current value (`Test Gaming Package`).
7. Clear the **Description** field and enter `Test Gaming Package - Updated`.
8. Click **Save And Close** to save the changes.
9. The Items list will return to focus. The item record is now saved.

---

## Expected Results
- The assembly item TEST-ASM-001 is saved successfully in Central Manager with the updated description of `Test Gaming Package - Updated`.
- No component items, quantities, or assembly prices are modified as a result of this update.

## Validation Checks
- Verify the **Description** field shows `Test Gaming Package - Updated` in Central Manager → Merchandising → Items by double-clicking **TEST-ASM-001** and confirming the **Description** field reads `Test Gaming Package - Updated`.
- Verify the **Assembly Lookup Code** is unchanged in Central Manager → Merchandising → Items by opening the **TEST-ASM-001** record and confirming the **Assembly Lookup Code** field still reads `TEST-ASM-001`.
- Verify the component items, quantities, and assembly prices are unchanged in Central Manager → Merchandising → Items by opening the **TEST-ASM-001** record and confirming all of the following:
  - `COMP-CON-001` is still listed with a quantity of `1` and an assembly price of `299.99`.
  - `COMP-CTR-001` is still listed with a quantity of `2` and an assembly price of `49.99`.