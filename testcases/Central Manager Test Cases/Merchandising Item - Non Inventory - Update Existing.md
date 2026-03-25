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

# Scenario: Update an existing non-inventory item in Central Manager

## Preconditions
- Central Manager is installed and running.
- The item TEST-NI-001 already exists in Central Manager with the following known values:
  - Item Type: `Non-Inventory`
  - Description: `Test Non-Inventory Item 001`
  - Department: `Services`
  - Category: `Charges`
  - Price: `5.00`
  - Cost: `0.00`
  - On Hand quantity: `0` *(non-inventory items are never tracked in stock)*
  > **If the item does not yet exist**, create it first by navigating to **Merchandising → Items → New → Standard Item**, then setting the **Item type** to **Non-Inventory** on the **General** tab and entering the values above.
- The logged-in user has permission to modify items in Central Manager.

## Required Test Data
- Item Lookup Code: TEST-NI-001
- Field to update: Price
- Original Price: 5.00
- Updated Price: 7.50
- Expected unchanged — Item Type: Non-Inventory
- Expected unchanged — Description: Test Non-Inventory Item 001
- Expected unchanged — Department: Services
- Expected unchanged — Category: Charges
- Expected unchanged — Cost: 0.00
- Expected unchanged — On Hand quantity: 0

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. Locate **TEST-NI-001** in the Items list.
   > **Tip:** If the list is long, use the search or filter functionality to find the item by its Item Lookup Code.
5. Double-click **TEST-NI-001** to open the item record.
6. On the **General** tab, confirm the **Item type** field reads `Non-Inventory`.
7. Locate the **Price** field and note the current value (`5.00`).
8. Clear the **Price** field and enter `7.50`.
9. Click **OK** to save the changes.
10. The Items list will return to focus. The item record is now saved.

---

## Expected Results
- The item TEST-NI-001 is saved successfully in Central Manager with the updated price of `7.50`.
- No other item fields are modified as a result of this update.
- The on-hand quantity remains `0` as non-inventory items are never tracked in stock.

## Validation Checks
- Verify the **Price** field shows `7.50` in Central Manager → Merchandising → Items by double-clicking **TEST-NI-001** and confirming the **Price** field on the **Pricing** tab reads `7.50`.
- Verify the **Item type** remains `Non-Inventory` in Central Manager → Merchandising → Items by opening the **TEST-NI-001** record and confirming the **Item type** field on the **General** tab still reads `Non-Inventory`.
- Verify the **Description** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-NI-001** record and confirming the **Description** field on the **General** tab still reads `Test Non-Inventory Item 001`.
- Verify the **Department** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-NI-001** record and confirming the **Department** field on the **General** tab still reads `Services`.
- Verify the **Category** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-NI-001** record and confirming the **Category** field on the **General** tab still reads `Charges`.
- Verify the **Cost** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-NI-001** record and confirming the **Cost** field on the **Pricing** tab still reads `0.00`.
- Verify the **On Hand** quantity remains `0` in Central Manager → Merchandising → Items by opening the **TEST-NI-001** record, clicking the **Inventory** tab, and confirming the **On Hand** field still reads `0`, indicating non-inventory items remain untracked in stock after the update.