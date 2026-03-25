# Worksheets / Worksheets

## Metadata
Feature: Worksheets — TC-351  
Business Area: Worksheets > Worksheets  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V1  
Priority: High  

---

# Scenario: Update Item Prices and Cost and Synchronize to Selected Stores on Effective Date and Time

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create, modify, and approve worksheets in Central Manager.
- At least one item with **Active** status exists in Central Manager with a regular price and cost value that can be updated. To verify: navigate to **Central Manager → Merchandising → Items** and confirm `ITEM-351-001` exists with an **Active** status and a regular price already assigned.
  > **If it does not exist**, create `ITEM-351-001` in Central Manager before running this test.
- At least one store with **Active** status exists and is able to receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.
- The **RMH Worksheet Process** service is running. To verify: click **Start**, type `Services`, open the Services window, scroll to **RMH Worksheet Process**, and confirm the status is **Running**.
- **Note:** Worksheet 351 creates one worksheet for all selected stores and is recommended when stores share the same pricing and cost information.

## Required Test Data
- Worksheet Title: QA Price Cost Update 351 - March 2026
- Effective Date/Time: 2026-03-26 08:00:00
- Target Store: Store001
- Item Lookup Code: ITEM-351-001
- Updated Regular Price: 19.99
- Updated Cost: 12.00

## Navigation Path
Central Manager → Worksheets → Worksheets → 351: Update Inventory - Item Prices Cost (Regular)

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Worksheets**.
3. Expand **Worksheets** to reveal the list of worksheet types.
4. Click **351: Update Inventory - Item Prices Cost (Regular)**.
5. From the store list, select `Store001`. You may also click **All** to include all available stores.
   > **Note:** You can add or remove stores after the worksheet is generated while the worksheet is in a **Not Yet Approved** state.
6. Click **Next**.
7. In the **Worksheet Title** field, enter `QA Price Cost Update 351 - March 2026`.
8. In the **Effective date / time** field, enter `2026-03-26 08:00:00`.
   > **Tip:** Select a date and time that does not interfere with the operations of an open store.
9. Click **Next**.
10. From the item inclusion options, select **Add items manually**.
11. Select **Exclude inactive** to exclude inactive items from the worksheet.
12. Click **Next**.
13. Click **Finish**.
14. Click **OK** to confirm the worksheet has been created.
15. Double-click the worksheet titled `QA Price Cost Update 351 - March 2026` to open its properties.
16. On the **General** tab, confirm the **Effective date / time** is set to `2026-03-26 08:00:00`. Add notes if desired.
17. If you need to adjust which stores receive the update, click **Stores** and add or remove stores from the **Selected Stores** list, then click **OK**.
18. Click the **Contents** tab and confirm that `ITEM-351-001` appears in the item list. If it is not present, click **Add Row** and add `ITEM-351-001` manually.
19. In the regular price column for `ITEM-351-001`, enter `19.99`.
    > **Tip:** To apply the same value to all rows in a column, right-click the value, select **Copy**, then right-click anywhere in the column and select **Paste to All Rows**.
20. In the cost column for `ITEM-351-001`, enter `12.00`.
21. Click **Approve**. The worksheet is approved and queued for processing. The updated regular price and cost will be synchronized to `Store001` at `2026-03-26 08:00:00`.
22. Click **OK** to close any confirmation prompt.

---

## Expected Results
- Worksheet 351 is approved and queued for processing for `Store001`.
- The regular price of `ITEM-351-001` is updated to `19.99` and the cost is updated to `12.00` in `Store001` at `2026-03-26 08:00:00`.

## Validation Checks
- Verify worksheet 351 processing status in Central Manager → Worksheets → Worksheets Status → **351: Update Inventory - Item Prices Cost (Regular)** by confirming the status is no longer **Not Yet Approved** after approval.
- Verify the updated regular price for `ITEM-351-001` in Store Manager on `Store001` → Merchandising → Items by opening the `ITEM-351-001` record, navigating to the **Pricing** tab, and confirming the **Regular Price** field shows `19.99`.
- Verify the updated cost for `ITEM-351-001` in Store Manager on `Store001` → Merchandising → Items by opening the `ITEM-351-001` record, navigating to the **Pricing** tab, and confirming the **Cost** field shows `12.00`.
- Verify no processing errors exist for the worksheet in Central Manager → Worksheets → Worksheets Status → **351: Update Inventory - Item Prices Cost (Regular)** by confirming no error messages appear in the worksheet status screen.