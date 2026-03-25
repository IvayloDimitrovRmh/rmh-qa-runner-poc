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

# Scenario: Insert a new assembly item in Central Manager

## Preconditions
- Central Manager is installed and running.
- At least one Department exists in Central Manager. To verify: navigate to **Setup → Merchandising → Departments**.
- At least one Category exists in Central Manager. To verify: navigate to **Setup → Merchandising → Categories**.
- The following component items already exist in Central Manager and are available in the Items list:
  - `COMP-CON-001` — a standard item representing a gaming console.
  - `COMP-CTR-001` — a standard item representing a controller.
- The logged-in user has permission to create items in Central Manager.
> **Note:** An assembly item is composed of items bundled together and sold under a separate lookup code. When a customer purchases an assembly item, the in-stock quantity of the individual assembly components is updated in the store database. The cashier can add or remove components and adjust quantities and prices at POS.

## Required Test Data
- Assembly Lookup Code: TEST-ASM-001
- Assembly Description: Test Gaming Package
- Component Item 1 Lookup Code: COMP-CON-001
- Component Item 1 Description: Gaming Console
- Component Item 1 Assembly Price: 299.99
- Component Item 1 Quantity: 1
- Component Item 2 Lookup Code: COMP-CTR-001
- Component Item 2 Description: Gaming Controller
- Component Item 2 Assembly Price: 49.99
- Component Item 2 Quantity: 2

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. Click **New** to open the item creation dialog.
5. Select **Assembly Item** and click **OK**.
6. In the **Assembly Lookup Code** field, enter `TEST-ASM-001`.
7. In the **Description** field, enter `Test Gaming Package`.
8. Click **Add** to add the first component item.
9. Select **Select an existing item to add** and click **OK**.
10. Search for `COMP-CON-001`, select it, and click **OK**.
11. Click **Use Component Price** to display the **Price** column in the quantity table.
12. In the **Price** column for **COMP-CON-001**, enter `299.99`.
13. In the quantity table, confirm the quantity for **COMP-CON-001** is set to `1`.
14. Click **Add** again to add the second component item.
15. Select **Select an existing item to add** and click **OK**.
16. Search for `COMP-CTR-001`, select it, and click **OK**.
17. In the **Price** column for **COMP-CTR-001**, enter `49.99`.
18. In the quantity table, set the quantity for **COMP-CTR-001** to `2`.
19. Click **Save And Close** to save the new assembly item.
20. The Items list will return to focus. The new item record is now saved.

---

## Expected Results
- The new assembly item TEST-ASM-001 is created and saved successfully in Central Manager with two component items: COMP-CON-001 (qty `1`, price `299.99`) and COMP-CTR-001 (qty `2`, price `49.99`).

## Validation Checks
- Verify assembly item TEST-ASM-001 exists in Central Manager → Merchandising → Items by searching for `TEST-ASM-001` and confirming the record is present in the Items list.
- Verify the **Description** field shows `Test Gaming Package` in Central Manager → Merchandising → Items by opening the **TEST-ASM-001** record.
- Verify `COMP-CON-001` is listed as a component with a quantity of `1` and an assembly price of `299.99` in Central Manager → Merchandising → Items by opening the **TEST-ASM-001** record and reviewing the component list.
- Verify `COMP-CTR-001` is listed as a component with a quantity of `2` and an assembly price of `49.99` in Central Manager → Merchandising → Items by opening the **TEST-ASM-001** record and reviewing the component list.
- Verify both component items are present and correctly configured in Central Manager → Merchandising → Items by opening the **TEST-ASM-001** record and confirming the quantity table shows `COMP-CON-001 (qty 1, price 299.99)` and `COMP-CTR-001 (qty 2, price 49.99)`.