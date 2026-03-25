# Worksheets / Worksheets

## Metadata
Feature: Worksheets — TC-322  
Business Area: Worksheets > Worksheets  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V1  
Priority: High  

---

# Scenario: Change Item Discounts and Synchronize to Selected Stores on Effective Date and Time

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create, modify, and approve worksheets in Central Manager.
- At least one item exists in Central Manager that can have a discount assigned. To verify: navigate to **Central Manager → Merchandising → Items** and confirm item `ITEM-322-001` exists with an **Active** status. If it does not exist, create it before running this test.
- At least one quantity discount record exists in Central Manager. To verify: navigate to **Central Manager → Merchandising → Discounts** and confirm discount `DISC-QTY-001` exists. If it does not exist, create it before running this test.
- At least one store with **Active** status exists and is able to receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.
- The **RMH Worksheet Process** service is running. To verify: click **Start**, type `Services`, open the Services window, scroll to **RMH Worksheet Process**, and confirm the status is **Running**.
- **Note:** Worksheet 322 creates one worksheet for all selected stores.

## Required Test Data
- Worksheet Title: Discount Change Test 322 - March 2026
- Effective Date/Time: 2026-03-26 08:00:00
- Target Store: Store001
- Item Lookup Code: ITEM-322-001
- New Quantity Discount: DISC-QTY-001

## Navigation Path
Central Manager → Worksheets → Worksheets → 322: Change Item Discounts

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Worksheets**.
3. Expand **Worksheets** to reveal the list of worksheet types.
4. Click **322: Change Item Discounts**.
5. In the store selection screen, select `Store001` from the list.
   > **Note:** Worksheet 322 creates one worksheet for all selected stores.
6. Click **Next**.
7. In the **Worksheet Title** field, enter `Discount Change Test 322 - March 2026`.
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
17. Click the **Contents** tab and confirm that `ITEM-322-001` is present in the list. If it is not present, click **Add Row** and add it manually.
18. In the **New Quantity Discount** column for `ITEM-322-001`, select `DISC-QTY-001` from the available options.
    > **Tip:** To apply the same value to all rows in a column, right-click the value, select **Copy**, then right-click anywhere in the column and select **Paste to All Rows**.
19. Click **Approve**. The worksheet is approved and queued for processing. The discount assignment change will be synchronized to `Store001` at the configured effective date and time.
20. Click **OK** to close any confirmation prompt.

---

## Expected Results
- Worksheet 322 is approved and queued for processing for `Store001`.
- The quantity discount `DISC-QTY-001` is assigned to `ITEM-322-001` in `Store001` at `2026-03-26 08:00:00`.

## Validation Checks
- Verify worksheet 322 processing status in Central Manager → Worksheets → Worksheets Status → **322: Change Item Discounts** by confirming the status is no longer **Not Yet Approved** after approval.
- Verify the updated discount assignment for `ITEM-322-001` in Store Manager on `Store001` → Merchandising → Items by opening the `ITEM-322-001` record, navigating to the **Discounts** tab, and confirming the discount field shows `DISC-QTY-001`.
- Verify no processing errors exist for the worksheet in Central Manager → Worksheets → Worksheets Status → **322: Change Item Discounts** by confirming no error messages appear in the worksheet status screen.