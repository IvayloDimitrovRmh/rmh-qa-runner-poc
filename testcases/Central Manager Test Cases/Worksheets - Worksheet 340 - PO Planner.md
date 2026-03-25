# Worksheets / Worksheets

## Metadata
Feature: Worksheets — TC-340  
Business Area: Worksheets > Worksheets  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V1  
Priority: High  

---

# Scenario: Initiate Purchase Orders for Selected Stores Using Worksheet 340

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create, modify, and approve worksheets in Central Manager.
- At least one item with **Active** status exists in Central Manager that can be included in a purchase order. To verify: navigate to **Central Manager → Merchandising → Items** and confirm `ITEM-340-001` exists with an **Active** status.
  > **If it does not exist**, create `ITEM-340-001` in Central Manager before running this test.
- The supplier `SUPP-340-001` is configured as the primary supplier for `ITEM-340-001`. To verify: open the `ITEM-340-001` record in **Central Manager → Merchandising → Items**, navigate to the **Suppliers** tab, and confirm `SUPP-340-001` is listed as the primary supplier.
- At least one store with **Active** status exists that can receive purchase orders (e.g., `Store001`).
- Central-to-store synchronization services are running.
- The **RMH Worksheet Process** service is running. To verify: click **Start**, type `Services`, open the Services window, scroll to **RMH Worksheet Process**, and confirm the status is **Running**.
- Store Manager is accessible at `Store001` to release the purchase order after worksheet approval.
- **Note:** Worksheet 340 creates individual purchase orders for each selected store when the **Create individual POs for each store** delivery method is used.

## Required Test Data
- Worksheet Title: QA PO Planner 340 - March 2026
- Effective Date/Time: 2026-03-26 08:00:00
- Target Store: Store001
- Inventory Delivery Method: Create individual POs for each store
- Item Lookup Code: ITEM-340-001
- Order Quantity: 10
- Supplier: SUPP-340-001

## Navigation Path
Central Manager → Worksheets → Worksheets → 340: PO Planner

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Worksheets**.
3. Expand **Worksheets** to reveal the list of worksheet types.
4. Click **340: PO Planner** to launch the PO Planner wizard.
5. Under **Inventory delivery**, select **Create individual POs for each store**.
   > **Note:** This creates individual purchase orders for the selected store(s), with inventory delivered to each store separately.
6. From the store list, select `Store001`. You may also click **All** to include all available stores.
7. Click **Next**.
8. In the **Worksheet Title** field, enter `QA PO Planner 340 - March 2026`.
9. In the **Effective date / time** field, enter `2026-03-26 08:00:00`.
   > **Tip:** Select a date and time that does not interfere with the operations of an open store.
10. Click **Next**.
11. From the item inclusion options, select **Add items manually**.
12. Select **Exclude inactive** to exclude inactive items from the worksheet.
13. Click **Next**.
14. Under **Order method**, select **Order all items at a fixed quantity**.
15. Under **Supplier selection**, select **Order from primary supplier**.
16. Click **Next**.
17. Click **Finish**.
18. Click **OK** to confirm the worksheet has been created.
19. In the worksheet list, double-click the worksheet titled `QA PO Planner 340 - March 2026` to open its properties.
20. On the **General** tab, confirm the **Effective date / time** is set to `2026-03-26 08:00:00`. Add notes if desired.
21. Click the **Contents** tab and confirm that `ITEM-340-001` appears in the item list. If it is not present, click **Add Row** and add `ITEM-340-001` manually.
22. In the order quantity column for `ITEM-340-001`, confirm or enter the value `10`.
    > **Tip:** To apply the same value to all rows in a column, right-click the value, select **Copy**, then right-click anywhere in the column and select **Paste to All Rows**.
23. Click **Approve**. The worksheet is approved and queued for processing. The purchase order will be created at `Store001` at the configured effective date and time.
24. Click **OK** to close any confirmation prompt.
25. At `Store001`, open **Store Manager**.
    > **Note:** If the **Auto Release Order** option is configured in **Setup → Inventory/Purchasing → Order Settings** on the **Global Option** tab, the purchase order may be automatically set to **Released** status. If not, release it manually in the next step.
26. In **Store Manager** at `Store001`, locate the purchase order created by the approved worksheet and release it if it has not been automatically released.

---

## Expected Results
- Worksheet 340 is approved and the purchase order is inserted into `Store001` at `2026-03-26 08:00:00`.
- The purchase order for `ITEM-340-001` with a quantity of `10` is available in **Store Manager** at `Store001` and is ready to be released and processed.

## Validation Checks
- Verify worksheet 340 processing status in Central Manager → Worksheets → Worksheets Status → **340: PO Planner** by confirming the status is no longer **Not Yet Approved** after the worksheet is approved.
- Verify the purchase order was inserted at `Store001` in **Store Manager** at `Store001` by locating the purchase order record created by worksheet `QA PO Planner 340 - March 2026` and confirming it exists with `ITEM-340-001` and an order quantity of `10`.
- Verify no processing errors exist for the worksheet in Central Manager → Worksheets → Worksheets Status → **340: PO Planner** by confirming no error messages appear in the worksheet status screen.