# Worksheets / Worksheets

## Metadata
Feature: Worksheets — TC-330  
Business Area: Worksheets > Worksheets  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V1  
Priority: High  

---

# Scenario: Initiate Inventory Transfer Between Stores Using Worksheet 330

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create, modify, and approve worksheets in Central Manager.
- At least two stores with **Active** status exist: `Store001` as the source store and `Store002` as the destination store. Confirm with your system administrator that both stores are active and able to receive synchronization before running this test.
- At least one item with **Active** status exists in `Store001`'s inventory and is available for transfer. To verify: navigate to **Central Manager → Merchandising → Items** and confirm `ITEM-330-001` exists with an **Active** status.
  > **If it does not exist**, create `ITEM-330-001` in Central Manager and synchronize it to `Store001` before running this test.
- Central-to-store synchronization services are running.
- The **RMH Worksheet Process** service is running. To verify: click **Start**, type `Services`, open the Services window, scroll to **RMH Worksheet Process**, and confirm the status is **Running**.
- Store Manager is accessible at both `Store001` (source) and `Store002` (destination) to complete the transfer out and transfer in steps after worksheet approval.
- **Note:** Worksheet 330 status will remain **In Process** in Central Manager until the transfer in is committed at `Store002`.

## Required Test Data
- Worksheet Title: QA Inventory Transfer 330 - March 2026
- Effective Date/Time: 2026-03-26 08:00:00
- Source Store: Store001
- Destination Store: Store002
- Item Lookup Code: ITEM-330-001
- Transfer Quantity: 5

## Navigation Path
Central Manager → Worksheets → Worksheets → 330: Inventory Transfer

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Worksheets**.
3. Expand **Worksheets** to reveal the list of worksheet types.
4. Click **330: Inventory Transfer** to launch the Inventory Transfer wizard.
5. In the **Move inventory from** drop-down, select `Store001` as the source store.
6. In the **Move inventory to** list, select `Store002` as the destination store.
7. Click **Next**.
8. In the **Worksheet Title** field, enter `QA Inventory Transfer 330 - March 2026`.
9. In the **Effective date / time** field, enter `2026-03-26 08:00:00`.
   > **Tip:** Select a date and time that does not interfere with the operations of an open store.
10. Click **Next**.
11. From the item inclusion options, select **Add items manually**.
12. Select **Exclude inactive** to exclude inactive items from the worksheet.
13. Click **Next**.
14. From the transfer quantity method options, select **Transfer all items at a fixed quantity to each store**.
15. Click **Next**.
16. Click **Finish**.
17. Click **OK** to confirm the worksheet has been created.
18. In the worksheet list, double-click the worksheet titled `QA Inventory Transfer 330 - March 2026` to open its properties.
19. On the **General** tab, confirm the **Effective date / time** is set to `2026-03-26 08:00:00`. Add notes if desired.
20. Click the **Contents** tab and confirm that `ITEM-330-001` appears in the item list. If it is not present, click **Add Row** and add `ITEM-330-001` manually.
21. In the transfer quantity column for `ITEM-330-001`, confirm or enter the value `5`.
    > **Tip:** To apply the same value to all rows in a column, right-click the value, select **Copy**, then right-click anywhere in the column and select **Paste to All Rows**.
22. Click **Approve**. The worksheet is approved and the inventory transfer is initiated. The changes will be synchronized to the stores at the effective date and time.
23. Click **OK** to close any confirmation prompt.
24. At the source store, open **Store Manager** on `Store001`.
    > **Note:** If the **Auto Release Order** option is configured in **Setup → Inventory/Purchasing → Order Settings** on the **Global Option** tab, the transfer out may be automatically set to **Released** status. If not, release it manually in the next step.
25. In **Store Manager** at `Store001`, locate the transfer out created by the approved worksheet and release it if it has not been automatically released.
26. Ship the transfer out at `Store001` and then commit it.
27. At the destination store, open **Store Manager** on `Store002`. After the transfer out at `Store001` is committed, a transfer in will be created at `Store002`.
28. In **Store Manager** at `Store002`, locate the transfer in and release it.
29. Receive the transfer in at `Store002` and then commit it.

---

## Expected Results
- Worksheet 330 is approved and the inventory transfer between `Store001` and `Store002` is initiated.
- After the transfer out is committed at `Store001`, a transfer in is created at `Store002`.
- After the transfer in is committed at `Store002`, item `ITEM-330-001` with a quantity of `5` is reflected in `Store002`'s inventory.
- The worksheet status transitions from **In Process** to **Completed** after the transfer in is committed at `Store002`.

## Validation Checks
- Verify worksheet 330 processing status in Central Manager → Worksheets → Worksheets Status → **330: Inventory Transfer** by confirming the status transitions from **In Process** (after approval) to **Completed** after the transfer in is committed at `Store002`.
- Verify the transferred item exists in the destination store's inventory in **Store Manager** at `Store002` → Merchandising → Items by opening the `ITEM-330-001` record and confirming the inventory quantity reflects the addition of `5` units transferred from `Store001`.
- Verify no processing errors exist for the worksheet in Central Manager → Worksheets → Worksheets Status → **330: Inventory Transfer** by confirming no error messages appear in the worksheet status screen.