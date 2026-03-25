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

# Scenario: Update an existing gasoline item in Central Manager

## Preconditions
- Central Manager is installed and running.
- The item TEST-GAS-001 already exists in Central Manager with the following known values:
  - Item Type: `Gasoline`
  - Description: `Test Gasoline Item 001`
  - Department: `Fuel`
  - Category: `Gasoline`
  - Price: `3.99`
  - Cost: `3.00`
  > **If the item does not yet exist**, create it first by navigating to **Merchandising → Items → New → Standard Item**, then setting the **Item type** to **Gasoline** on the **General** tab and entering the values above.
- The logged-in user has permission to modify items in Central Manager.

## Required Test Data
- Item Lookup Code: TEST-GAS-001
- Field to update: Price
- Original Price: 3.99
- Updated Price: 4.49
- Expected unchanged — Item Type: Gasoline
- Expected unchanged — Description: Test Gasoline Item 001
- Expected unchanged — Department: Fuel
- Expected unchanged — Category: Gasoline
- Expected unchanged — Cost: 3.00

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. Locate **TEST-GAS-001** in the Items list.
   > **Tip:** If the list is long, use the search or filter functionality to find the item by its Item Lookup Code.
5. Double-click **TEST-GAS-001** to open the item record.
6. On the **General** tab, confirm the **Item type** field reads `Gasoline`.
7. Locate the **Price** field and note the current value (`3.99`).
8. Clear the **Price** field and enter `4.49`.
9. Click **OK** to save the changes.
10. The Items list will return to focus. The item record is now saved.

---

## Expected Results
- The item TEST-GAS-001 is saved successfully in Central Manager with the updated price of `4.49`.
- No other item fields are modified as a result of this update.

## Validation Checks
- Verify the **Price** field shows `4.49` in Central Manager → Merchandising → Items by double-clicking **TEST-GAS-001** and confirming the **Price** field on the **Pricing** tab reads `4.49`.
- Verify the **Item type** remains `Gasoline` in Central Manager → Merchandising → Items by opening the **TEST-GAS-001** record and confirming the **Item type** field on the **General** tab still reads `Gasoline`.
- Verify the **Description** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-GAS-001** record and confirming the **Description** field on the **General** tab still reads `Test Gasoline Item 001`.
- Verify the **Department** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-GAS-001** record and confirming the **Department** field on the **General** tab still reads `Fuel`.
- Verify the **Category** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-GAS-001** record and confirming the **Category** field on the **General** tab still reads `Gasoline`.
- Verify the **Cost** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-GAS-001** record and confirming the **Cost** field on the **Pricing** tab still reads `3.00`.