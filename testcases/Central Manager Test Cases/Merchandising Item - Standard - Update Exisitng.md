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

# Scenario: Update an existing standard item in Central Manager

## Preconditions
- Central Manager is installed and running.
- The item TEST-STD-001 already exists in Central Manager with the following known values:
  - Description: `Test Standard Item 001`
  - Department: `General`
  - Category: `Miscellaneous`
  - Price: `19.99`
  - Cost: `10.00`
  > **If the item does not yet exist**, create it first by navigating to **Merchandising → Items → New → Standard Item** and entering the values above.
- The logged-in user has permission to modify items in Central Manager.

## Required Test Data
- Item Lookup Code: TEST-STD-001
- Field to update: Price
- Original Price: 19.99
- Updated Price: 24.99
- Expected unchanged — Description: Test Standard Item 001
- Expected unchanged — Department: General
- Expected unchanged — Category: Miscellaneous
- Expected unchanged — Cost: 10.00

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. In the Items list, locate **TEST-STD-001**.
   > **Tip:** If the list is long, use the search or filter functionality to find the item by its Item Lookup Code.
5. Double-click **TEST-STD-001** to open the item record.
6. On the **General** tab, locate the **Price** field and note the current value (`19.99`).
7. Clear the **Price** field and enter `24.99`.
8. Click **OK** to save the changes.
9. The Items list will return to focus. The item record is now saved.

---

## Expected Results
- The item TEST-STD-001 is saved successfully in Central Manager with the updated price of `24.99`.
- No other item fields are modified as a result of this update.

## Validation Checks
- Verify the **Price** field shows `24.99` in Central Manager → Merchandising → Items by double-clicking **TEST-STD-001** in the Items list, navigating to the **General** tab, and confirming the **Price** field reads `24.99`.
- Verify the **Description** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-STD-001** record and confirming the **Description** field on the **General** tab still reads `Test Standard Item 001`.
- Verify the **Department** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-STD-001** record and confirming the **Department** field on the **General** tab still reads `General`.
- Verify the **Category** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-STD-001** record and confirming the **Category** field on the **General** tab still reads `Miscellaneous`.
- Verify the **Cost** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-STD-001** record and confirming the **Cost** field still reads `10.00`.