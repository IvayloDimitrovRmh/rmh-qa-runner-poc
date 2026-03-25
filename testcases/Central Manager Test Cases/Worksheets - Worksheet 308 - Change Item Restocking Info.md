# Worksheets / Worksheets

## Metadata
Feature: Worksheets — TC-308  
Business Area: Worksheets > Worksheets  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V1  
Priority: High  

---

# Scenario: Update Item Restocking Information and Synchronize to Selected Stores on Effective Date and Time

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create, modify, and approve worksheets in Central Manager.
- At least one item exists in Central Manager with restocking information that can be modified. To verify: navigate to **Central Manager → Merchandising → Items** and confirm item `ITEM-308-001` exists with an **Active** status. If it does not exist, create it before running this test.
- At least one store with **Active** status exists and is able to receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.
- The **RMH Worksheet Process** service is running. To verify: click **Start**, type `Services`, open the Services window, scroll to **RMH Worksheet Process**, and confirm the status is **Running**.
- **Note:** Worksheet 308 creates one worksheet for all selected stores by default. An option to create one worksheet per store is available at the store selection step.
- **Important:** The Restock Level value must be greater than the Reorder Point value.

## Required Test Data
- Worksheet Title: Restocking Info Update Test 308 - March 2026
- Effective Date/Time: 2026-03-26 08:00:00
- Target Store: Store001
- Item Lookup Code: ITEM-308-001
- Updated Reorder Point: 5
- Updated Restock Level: 15

## Navigation Path
Central Manager → Worksheets → Worksheets → 308: Change Item Restocking Info

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Worksheets**.
3. Expand **Worksheets** to reveal the list of worksheet types.
4. Click **308: Change Item Restocking Info**.
5. In the store selection screen, select `Store001` from the list.
   > **Note:** You can add or remove stores after the worksheet is generated while it is in a **Not Yet Approved** state.
6. Leave the **Create individual worksheet per store** checkbox unselected. One worksheet will be created for all selected stores.
7. Click **Next**.
8. In the **Worksheet Title** field, enter `Restocking Info Update Test 308 - March 2026`.
9. In the **Effective date / time** field, enter `2026-03-26 08:00:00`.
   > **Tip:** Select a date and time that does not interfere with the operations of an open store.
10. Click **Next**.
11. Select **Add items manually** from the item selection options.
12. Select **Exclude inactive** to exclude inactive items from the worksheet.
13. Click **Next**.
14. Click **Finish**.
15. Click **OK** to confirm the worksheet has been created.
16. Double-click the generated worksheet to open its properties.
17. On the **General** tab, confirm the **Effective date / time** is set to `2026-03-26 08:00:00`. Add notes if desired.
18. On the **General** tab, click **Stores** and confirm `Store001` is in the **Selected Stores** list. Click **OK** to close the Stores dialog.
19. Click the **Contents** tab and confirm that `ITEM-308-001` is present in the list. If it is not present, click **Add Row** and add it manually.
20. In the **Reorder Point** column for `ITEM-308-001`, enter `5`.
21. In the **Restock Level** column for `ITEM-308-001`, enter `15`.
    > **Important:** The Restock Level value (`15`) must be greater than the Reorder Point value (`5`).
    > **Tip:** To apply the same value to all rows in a column, right-click the value, select **Copy**, then right-click anywhere in the column and select **Paste to All Rows**.
22. Click **Approve**. The worksheet is approved and queued for processing. The restocking information changes will be synchronized to `Store001` at the configured effective date and time.
23. Click **OK** to close any confirmation prompt.

---

## Expected Results
- Worksheet 308 is approved and queued for processing for `Store001`.
- The Reorder Point for `ITEM-308-001` is updated to `5` and the Restock Level is updated to `15` in `Store001` at `2026-03-26 08:00:00`.

## Validation Checks
- Verify worksheet 308 processing status in Central Manager → Worksheets → Worksheets Status → **308: Change Item Restocking Info** by confirming the status is no longer **Not Yet Approved** after approval.
- Verify the updated Reorder Point for `ITEM-308-001` is `5` in Store Manager on `Store001` → Merchandising → Items by opening the `ITEM-308-001` record, navigating to the ordering or restocking tab, and confirming the Reorder Point field shows `5`.
- Verify the updated Restock Level for `ITEM-308-001` is `15` in Store Manager on `Store001` → Merchandising → Items by opening the `ITEM-308-001` record, navigating to the ordering or restocking tab, and confirming the Restock Level field shows `15`.
- Verify no processing errors exist for the worksheet in Central Manager → Worksheets → Worksheets Status → **308: Change Item Restocking Info** by confirming no error messages appear in the worksheet status screen.