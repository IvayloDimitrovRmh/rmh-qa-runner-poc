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

# Scenario: Update an existing matrix item in Central Manager

## Preconditions
- Central Manager is installed and running.
- The matrix item TEST-MTX-001 already exists in Central Manager with the following known values:
  - Matrix Lookup Code: `TEST-MTX-001`
  - Description: `Test T-Shirt Matrix`
  - Department: `Apparel`
  - Category: `T-Shirts`
  - Price: `19.99`
  - Cost: `8.00`
  - Dimension 1: `Size` with attributes `Small (S)`, `Medium (M)`, `Large (L)`
  - Dimension 2: `Color` with attributes `Red (RED)`, `Blue (BLU)`
  - Components: `Small-Red`, `Small-Blue`, `Medium-Red`, `Medium-Blue`, `Large-Red`, `Large-Blue`
  > **If the item does not yet exist**, create it first by navigating to **Merchandising → Items → New → Matrix Item** and entering the values above.
- The logged-in user has permission to modify items in Central Manager.

## Required Test Data
- Matrix Lookup Code: TEST-MTX-001
- Field to update: Price
- Original Price: 19.99
- Updated Price: 24.99
- Expected unchanged — Description: Test T-Shirt Matrix
- Expected unchanged — Department: Apparel
- Expected unchanged — Category: T-Shirts
- Expected unchanged — Cost: 8.00
- Expected unchanged — Dimension 1: Size with attributes Small (S), Medium (M), Large (L)
- Expected unchanged — Dimension 2: Color with attributes Red (RED), Blue (BLU)
- Expected unchanged — All six component combinations

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. Locate **TEST-MTX-001** in the Items list.
   > **Tip:** If the list is long, use the search or filter functionality to find the item by its Matrix Lookup Code.
5. Double-click **TEST-MTX-001** to open the matrix item record.
6. On the **General** tab, locate the **Price** field and note the current value (`19.99`).
7. Clear the **Price** field and enter `24.99`.
8. Click **Save And Close** to save the changes.
9. The Items list will return to focus. The item record is now saved.

---

## Expected Results
- The matrix item TEST-MTX-001 is saved successfully in Central Manager with the updated price of `24.99`.
- No dimensions, attributes, or component items are modified as a result of this update.

## Validation Checks
- Verify the **Price** field shows `24.99` in Central Manager → Merchandising → Items by double-clicking **TEST-MTX-001** and confirming the **Price** field on the **General** tab reads `24.99`.
- Verify the **Description** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-MTX-001** record and confirming the **Description** field on the **General** tab still reads `Test T-Shirt Matrix`.
- Verify the **Department** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-MTX-001** record and confirming the **Department** field on the **General** tab still reads `Apparel`.
- Verify the **Category** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-MTX-001** record and confirming the **Category** field on the **General** tab still reads `T-Shirts`.
- Verify the **Cost** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-MTX-001** record and confirming the **Cost** field on the **General** tab still reads `8.00`.
- Verify the dimensions and component items are unchanged in Central Manager → Merchandising → Items by opening the **TEST-MTX-001** record, clicking the **Component Item** tab, and confirming all of the following:
  - **Dimension 1** is still `Size` with attributes `Small (S)`, `Medium (M)`, and `Large (L)`.
  - **Dimension 2** is still `Color` with attributes `Red (RED)` and `Blue (BLU)`.
  - All six component combinations (`Small-Red`, `Small-Blue`, `Medium-Red`, `Medium-Blue`, `Large-Red`, `Large-Blue`) are still present.