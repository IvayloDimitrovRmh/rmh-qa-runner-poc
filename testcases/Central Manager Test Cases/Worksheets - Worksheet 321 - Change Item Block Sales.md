# Worksheets / Worksheets

## Metadata
Feature: Worksheets — TC-321  
Business Area: Worksheets > Worksheets  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V1  
Priority: High  

---

# Scenario: Block Item Sales and Synchronize to Selected Stores on Effective Date and Time

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create, modify, and approve worksheets in Central Manager.
- At least one item exists in Central Manager that can have block sales applied. To verify: navigate to **Central Manager → Merchandising → Items** and confirm item `ITEM-321-001` exists with an **Active** status. If it does not exist, create it before running this test.
- At least one store with **Active** status exists and is able to receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.
- The **RMH Worksheet Process** service is running. To verify: click **Start**, type `Services`, open the Services window, scroll to **RMH Worksheet Process**, and confirm the status is **Running**.
- **Note:** Worksheet 321 creates one worksheet for all selected stores.

## Required Test Data
- Worksheet Title: Block Sales Test 321 - March 2026
- Effective Date/Time: 2026-03-26 08:00:00
- Target Store: Store001
- Item Lookup Code: ITEM-321-001
- Block Sales Type: Period-based (block for a specific date range)
- Block Sales Reason: QA Test Product Recall
- Block Sales Schedule: (not applicable — leave blank for period-based block)
- Block Sales Start Date: 2026-03-26
- Block Sales End Date: 2026-04-26

## Navigation Path
Central Manager → Worksheets → Worksheets → 321: Change Item Block Sales

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Worksheets**.
3. Expand **Worksheets** to reveal the list of worksheet types.
4. Click **321: Change Item Block Sales**.
5. In the store selection screen, select `Store001` from the list.
   > **Note:** Worksheet 321 creates one worksheet for all selected stores.
6. Click **Next**.
7. In the **Worksheet Title** field, enter `Block Sales Test 321 - March 2026`.
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
17. Click the **Contents** tab and confirm that `ITEM-321-001` is present in the list. If it is not present, click **Add Row** and add it manually.
18. In the **Block Sales Type** column for `ITEM-321-001`, select the period-based option (block for a specific date range).
19. In the **Block Sales Reason** column for `ITEM-321-001`, enter `QA Test Product Recall`.
20. Leave the **Block Sales Schedule** column blank — it is not applicable for a period-based block.
21. In the **Block Sales Start Date** column for `ITEM-321-001`, enter `2026-03-26`.
22. In the **Block Sales End Date** column for `ITEM-321-001`, enter `2026-04-26`.
    > **Tip:** To apply the same value to all rows in a column, right-click the value, select **Copy**, then right-click anywhere in the column and select **Paste to All Rows**.
23. Click **Approve**. The worksheet is approved and queued for processing. The block sales settings will be synchronized to `Store001` at the configured effective date and time.
24. Click **OK** to close any confirmation prompt.

---

## Expected Results
- Worksheet 321 is approved and queued for processing for `Store001`.
- Item `ITEM-321-001` has block sales applied in `Store001` at `2026-03-26 08:00:00`, blocking sales from `2026-03-26` to `2026-04-26`.

## Validation Checks
- Verify worksheet 321 processing status in Central Manager → Worksheets → Worksheets Status → **321: Change Item Block Sales** by confirming the status is no longer **Not Yet Approved** after approval.
- Verify the block sales settings for `ITEM-321-001` in Store Manager on `Store001` → Merchandising → Items by opening the `ITEM-321-001` record, navigating to the **Options** tab, and confirming the **Block Sales** section shows the block is active with reason `QA Test Product Recall`, start date `2026-03-26`, and end date `2026-04-26`.
- Verify no processing errors exist for the worksheet in Central Manager → Worksheets → Worksheets Status → **321: Change Item Block Sales** by confirming no error messages appear in the worksheet status screen.