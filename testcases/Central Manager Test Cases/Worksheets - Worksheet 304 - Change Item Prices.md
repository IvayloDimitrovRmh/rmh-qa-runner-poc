# Worksheets / Worksheets

## Metadata
Feature: Worksheets — TC-304  
Business Area: Worksheets > Worksheets  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V1  
Priority: High  

---

# Scenario: Update Item Regular Prices and Synchronize to Selected Stores on Effective Date and Time

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create, modify, and approve worksheets in Central Manager.
- At least one item exists in Central Manager with a regular price that can be modified. To verify: navigate to **Central Manager → Merchandising → Items** and confirm item `ITEM-304-001` exists with an **Active** status. If it does not exist, create it before running this test.
- At least one store with **Active** status exists and is able to receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.
- The **RMH Worksheet Process** service is running. To verify: click **Start**, type `Services`, open the Services window, scroll to **RMH Worksheet Process**, and confirm the status is **Running**.
- **Note:** Worksheet 304 creates one worksheet for all selected stores. It is recommended when stores have the same item pricing.

## Required Test Data
- Worksheet Title: Regular Price Update Test 304 - March 2026
- Effective Date/Time: 2026-03-26 08:00:00
- Target Store: Store001
- Item Lookup Code: ITEM-304-001
- Updated Regular Price: 14.99

## Navigation Path
Central Manager → Worksheets → Worksheets → 304: Change Item Prices (Regular)

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Worksheets**.
3. Expand **Worksheets** to reveal the list of worksheet types.
4. Click **304: Change Item Prices (Regular)**.
5. In the store selection screen, select `Store001` from the list.
   > **Note:** You can add or remove stores after the worksheet is generated while it is in a **Not Yet Approved** state.
6. Click **Next**.
7. In the **Worksheet Title** field, enter `Regular Price Update Test 304 - March 2026`.
8. In the **Effective date / time** field, enter `2026-03-26 08:00:00`.
   > **Tip:** Select a date and time that does not interfere with the operations of an open store.
9. Click **Next**.
10. Select **Add items manually** from the item selection options.
11. Select **Exclude inactive** to exclude inactive items from the worksheet.
12. Click **Next**.
13. Click **Finish**.
14. Click **OK** to confirm the worksheet has been created.
15. Double-click the generated worksheet to open its properties.
16. On the **General** tab, confirm the **Effective date / time** is set to `2026-03-26 08:00:00`. Add notes if desired.
17. On the **General** tab, click **Stores** and confirm `Store001` is in the **Selected Stores** list. Click **OK** to close the Stores dialog.
18. Click the **Contents** tab and confirm that `ITEM-304-001` is present in the list. If it is not present, click **Add Row** and add it manually.
19. In the pricing column for `ITEM-304-001`, enter `14.99` as the updated regular price.
    > **Tip:** To apply the same value to all rows in a column, right-click the value, select **Copy**, then right-click anywhere in the column and select **Paste to All Rows**.
20. Click **Approve**. The worksheet is approved and queued for processing. The price change will be synchronized to `Store001` at the configured effective date and time.
21. Click **OK** to close any confirmation prompt.

---

## Expected Results
- Worksheet 304 is approved and queued for processing for `Store001`.
- The regular price for `ITEM-304-001` is updated to `14.99` and synchronized to `Store001` at `2026-03-26 08:00:00`.

## Validation Checks
- Verify worksheet 304 processing status in Central Manager → Worksheets → Worksheets Status → **304: Change Item Prices (Regular)** by confirming the status is no longer **Not Yet Approved** after approval.
- Verify the updated regular price for `ITEM-304-001` is `14.99` in Store Manager on `Store001` → Merchandising → Items by opening the `ITEM-304-001` record, navigating to the **Pricing** tab, and confirming the regular price field shows `14.99`.
- Verify no processing errors exist for the worksheet in Central Manager → Worksheets → Worksheets Status → **304: Change Item Prices (Regular)** by confirming no error messages appear in the worksheet status screen.