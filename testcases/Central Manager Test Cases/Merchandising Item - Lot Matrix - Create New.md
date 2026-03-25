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

# Scenario: Insert a new lot matrix item in Central Manager

## Preconditions
- Central Manager is installed and running.
- At least one Department exists in Central Manager. To verify: navigate to **Setup → Merchandising → Departments**.
- At least one Category exists in Central Manager. To verify: navigate to **Setup → Merchandising → Categories**.
- The following component items already exist in Central Manager and are available in the Items list:
  - `BEER-SINGLE` — a standard item representing a single unit.
  - `BEER-6PK` — a standard item representing a 6-pack.
  - `BEER-12PK` — a standard item representing a 12-pack.
- The logged-in user has permission to create items in Central Manager.
> **Note:** A lot matrix item is composed of items packaged in different quantities with different prices based on the quantity purchased (e.g., a can of beer sold individually, or in 6-pack or 12-pack quantities).

## Required Test Data
- Lot Matrix Lookup Code: TEST-LOT-001
- Lot Matrix Description: Test Beer Lot Matrix
- Component Item 1 Lookup Code: BEER-SINGLE
- Component Item 1 Quantity: 1
- Component Item 2 Lookup Code: BEER-6PK
- Component Item 2 Quantity: 6
- Component Item 3 Lookup Code: BEER-12PK
- Component Item 3 Quantity: 12

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. Click **New** to open the item creation dialog.
5. Select **Lot Matrix Item** and click **OK**.
6. In the **Lot Matrix Lookup Code** field, enter `TEST-LOT-001`.
7. In the **Description** field, enter `Test Beer Lot Matrix`.
8. Click **Add** to add the first component item.
9. Select **Select an existing item to add** and click **OK**.
10. Search for `BEER-SINGLE`, select it, and click **OK**.
11. In the quantity table, confirm the quantity for **BEER-SINGLE** is set to `1`.
12. Click **Add** again to add the second component item.
13. Select **Select an existing item to add** and click **OK**.
14. Search for `BEER-6PK`, select it, and click **OK**.
15. In the quantity table, set the quantity for **BEER-6PK** to `6`.
16. Click **Add** again to add the third component item.
17. Select **Select an existing item to add** and click **OK**.
18. Search for `BEER-12PK`, select it, and click **OK**.
19. In the quantity table, set the quantity for **BEER-12PK** to `12`.
20. Click **Save And Close** to save the new lot matrix item.
21. The Items list will return to focus. The new item record is now saved.

---

## Expected Results
- The new lot matrix item TEST-LOT-001 is created and saved successfully in Central Manager with three component items: BEER-SINGLE (qty `1`), BEER-6PK (qty `6`), and BEER-12PK (qty `12`).

## Validation Checks
- Verify lot matrix item TEST-LOT-001 exists in Central Manager → Merchandising → Items by searching for `TEST-LOT-001` and confirming the record is present in the Items list.
- Verify the **Description** field shows `Test Beer Lot Matrix` in Central Manager → Merchandising → Items by opening the **TEST-LOT-001** record.
- Verify `BEER-SINGLE` is listed as a component with a quantity of `1` in Central Manager → Merchandising → Items by opening the **TEST-LOT-001** record and confirming the quantity table shows `BEER-SINGLE` with quantity `1`.
- Verify `BEER-6PK` is listed as a component with a quantity of `6` in Central Manager → Merchandising → Items by opening the **TEST-LOT-001** record and confirming the quantity table shows `BEER-6PK` with quantity `6`.
- Verify `BEER-12PK` is listed as a component with a quantity of `12` in Central Manager → Merchandising → Items by opening the **TEST-LOT-001** record and confirming the quantity table shows `BEER-12PK` with quantity `12`.
- Verify all three component items are present and correctly configured in Central Manager → Merchandising → Items by opening the **TEST-LOT-001** record and confirming the quantity table contains exactly three entries: `BEER-SINGLE (1)`, `BEER-6PK (6)`, and `BEER-12PK (12)`.