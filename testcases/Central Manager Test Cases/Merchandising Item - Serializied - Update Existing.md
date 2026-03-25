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

# Scenario: Update an existing serialized item in Central Manager

## Preconditions
- Central Manager is installed and running.
- The item TEST-SER-001 already exists in Central Manager with the following known values:
  - Item Type: `Serialized`
  - Description: `Test Serialized Item 001`
  - Department: `Electronics`
  - Category: `Accessories`
  - Price: `49.99`
  - Cost: `25.00`
  > **If the item does not yet exist**, create it first by navigating to **Merchandising → Items → New → Standard Item**, then setting the **Item type** to **Serialized** on the **General** tab and entering the values above.
- The logged-in user has permission to modify items in Central Manager.

## Required Test Data
- Item Lookup Code: TEST-SER-001
- Field to update: Price
- Original Price: 49.99
- Updated Price: 59.99
- Expected unchanged — Item Type: Serialized
- Expected unchanged — Description: Test Serialized Item 001
- Expected unchanged — Department: Electronics
- Expected unchanged — Category: Accessories
- Expected unchanged — Cost: 25.00

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. Locate **TEST-SER-001** in the Items list.
   > **Tip:** If the list is long, use the search or filter functionality to find the item by its Item Lookup Code.
5. Double-click **TEST-SER-001** to open the item record.
6. On the **General** tab, confirm the **Item type** field reads `Serialized`.
7. Locate the **Price** field and note the current value (`49.99`).
8. Clear the **Price** field and enter `59.99`.
9. Click **OK** to save the changes.
10. The Items list will return to focus. The item record is now saved.

---

## Expected Results
- The item TEST-SER-001 is saved successfully in Central Manager with the updated price of `59.99`.
- No other item fields are modified as a result of this update.

## Validation Checks
- Verify the **Price** field shows `59.99` in Central Manager → Merchandising → Items by double-clicking **TEST-SER-001** and confirming the **Price** field on the **General** tab reads `59.99`.
- Verify the **Item type** remains `Serialized` in Central Manager → Merchandising → Items by opening the **TEST-SER-001** record and confirming the **Item type** field on the **General** tab still reads `Serialized`.
- Verify the **Description** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-SER-001** record and confirming the **Description** field on the **General** tab still reads `Test Serialized Item 001`.
- Verify the **Department** field is unchanged in Central Manager → Merchandising �� Items by opening the **TEST-SER-001** record and confirming the **Department** field on the **General** tab still reads `Electronics`.
- Verify the **Category** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-SER-001** record and confirming the **Category** field on the **General** tab still reads `Accessories`.
- Verify the **Cost** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-SER-001** record and confirming the **Cost** field still reads `25.00`.