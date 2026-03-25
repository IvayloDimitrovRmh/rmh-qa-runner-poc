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

# Scenario: Update an existing kit item in Central Manager

## Preconditions
- Central Manager is installed and running.
- The item TEST-KIT-001 already exists in Central Manager with the following known values:
  - Item Type: `Kit`
  - Description: `Test Kit Item 001`
  - Department: `General`
  - Category: `Miscellaneous`
  - Price: `39.99`
  - Cost: `20.00`
  - Component items on the **Kit** tab: `COMP-001`, `COMP-002`
  > **If the item does not yet exist**, create it first by navigating to **Merchandising → Items → New → Standard Item**, setting the **Item type** to **Kit**, and entering the values above.
- The logged-in user has permission to modify items in Central Manager.

## Required Test Data
- Item Lookup Code (Kit): TEST-KIT-001
- Field to update: Price
- Original Price: 39.99
- Updated Price: 44.99
- Expected unchanged — Item Type: Kit
- Expected unchanged — Description: Test Kit Item 001
- Expected unchanged — Department: General
- Expected unchanged — Category: Miscellaneous
- Expected unchanged — Cost: 20.00
- Expected unchanged — Component items: COMP-001, COMP-002

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. Locate **TEST-KIT-001** in the Items list.
   > **Tip:** If the list is long, use the search or filter functionality to find the item by its Item Lookup Code.
5. Double-click **TEST-KIT-001** to open the item record.
6. On the **General** tab, confirm the **Item type** field reads `Kit`.
7. Locate the **Price** field and note the current value (`39.99`).
8. Clear the **Price** field and enter `44.99`.
9. Click **OK** to save the changes.
10. The Items list will return to focus. The item record is now saved.

---

## Expected Results
- The item TEST-KIT-001 is saved successfully in Central Manager with the updated price of `44.99`.
- No other item fields or kit component assignments are modified as a result of this update.

## Validation Checks
- Verify the **Price** field shows `44.99` in Central Manager → Merchandising → Items by double-clicking **TEST-KIT-001** and confirming the **Price** field on the **General** tab reads `44.99`.
- Verify the **Item type** remains `Kit` in Central Manager → Merchandising → Items by opening the **TEST-KIT-001** record and confirming the **Item type** field on the **General** tab still reads `Kit`.
- Verify the **Description** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-KIT-001** record and confirming the **Description** field on the **General** tab still reads `Test Kit Item 001`.
- Verify the **Department** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-KIT-001** record and confirming the **Department** field on the **General** tab still reads `General`.
- Verify the **Category** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-KIT-001** record and confirming the **Category** field on the **General** tab still reads `Miscellaneous`.
- Verify the **Cost** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-KIT-001** record and confirming the **Cost** field still reads `20.00`.
- Verify the component items on the **Kit** tab are unchanged in Central Manager → Merchandising → Items by opening the **TEST-KIT-001** record, clicking the **Kit** tab, and confirming both `COMP-001` and `COMP-002` are still listed.