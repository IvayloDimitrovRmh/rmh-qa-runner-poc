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

# Scenario: Insert a new matrix item in Central Manager

## Preconditions
- Central Manager is installed and running.
- At least one Department exists in Central Manager. To verify: navigate to **Setup → Merchandising → Departments**.
- At least one Category exists in Central Manager. To verify: navigate to **Setup → Merchandising → Categories**.
- The logged-in user has permission to create items in Central Manager.
> **Note:** A matrix item is composed of items that are essentially the same (e.g., t-shirts) but vary in one or two ways such as size or color. You can define up to three dimensions (e.g., Size, Color) with multiple attributes per dimension (e.g., S, M, L, XL).

## Required Test Data
- Matrix Lookup Code: TEST-MTX-001
- Matrix Description: Test T-Shirt Matrix
- Department: Apparel
- Category: T-Shirts
- Price: 19.99
- Cost: 8.00
- Dimension 1 Name: Size
- Dimension 1 Attributes and Codes:
  - Small → S
  - Medium → M
  - Large → L
- Dimension 2 Name: Color
- Dimension 2 Attributes and Codes:
  - Red → RED
  - Blue → BLU

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. Click **New** to open the item creation dialog.
5. Select **Matrix Item** and click **OK**.
6. On the **General** tab, enter the following:
   - **Matrix Lookup Code:** `TEST-MTX-001`
   - **Description:** `Test T-Shirt Matrix`
   - **Department:** `Apparel`
   - **Category:** `T-Shirts`
   - **Price:** `19.99`
   - **Cost:** `8.00`
7. Click the **Component Item** tab.
8. In the **Dimension for component items** section, enter `Size` in the **Dimension 1** field.
9. In the **Attributes and Codes** area below **Dimension 1**, add the following entries:
   - Attribute: `Small`, Code: `S`
   - Attribute: `Medium`, Code: `M`
   - Attribute: `Large`, Code: `L`
10. Enter `Color` in the **Dimension 2** field.
11. In the **Attributes and Codes** area below **Dimension 2**, add the following entries:
    - Attribute: `Red`, Code: `RED`
    - Attribute: `Blue`, Code: `BLU`
12. Click **Create Components** to automatically generate a component for each dimension/attribute combination (e.g., Small-Red, Small-Blue, Medium-Red, etc.).
13. Click **Yes** and then **OK** to confirm component creation.
14. Click the **Quantity View** tab and review the generated components to confirm all expected combinations are present.
15. Click **Save And Close** to save the new matrix item.
16. The Items list will return to focus. The new matrix item record is now saved.

---

## Expected Results
- The new matrix item TEST-MTX-001 is created and saved successfully in Central Manager with two dimensions (**Size** and **Color**) and six component combinations: Small-Red, Small-Blue, Medium-Red, Medium-Blue, Large-Red, and Large-Blue.

## Validation Checks
- Verify matrix item TEST-MTX-001 exists in Central Manager → Merchandising → Items by searching for `TEST-MTX-001` and confirming the record is present in the Items list.
- Verify the **Description** field shows `Test T-Shirt Matrix` in Central Manager → Merchandising → Items by opening the **TEST-MTX-001** record and checking the **General** tab.
- Verify the **Price** field shows `19.99` and the **Cost** field shows `8.00` in Central Manager → Merchandising → Items by opening the **TEST-MTX-001** record and checking the **General** tab.
- Verify the **Department** is `Apparel` and the **Category** is `T-Shirts` in Central Manager → Merchandising → Items by opening the **TEST-MTX-001** record and checking the **General** tab.
- Verify **Dimension 1** is named `Size` with attributes `Small (S)`, `Medium (M)`, and `Large (L)` in Central Manager → Merchandising → Items by opening the **TEST-MTX-001** record and checking the **Component Item** tab.
- Verify **Dimension 2** is named `Color` with attributes `Red (RED)` and `Blue (BLU)` in Central Manager → Merchandising → Items by opening the **TEST-MTX-001** record and checking the **Component Item** tab.
- Verify all six component combinations (Small-Red, Small-Blue, Medium-Red, Medium-Blue, Large-Red, Large-Blue) were created in Central Manager → Merchandising → Items by opening the **TEST-MTX-001** record and reviewing the component list on the **Component Item** tab or the **Quantity View** tab.