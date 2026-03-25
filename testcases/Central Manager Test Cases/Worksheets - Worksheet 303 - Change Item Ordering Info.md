# Worksheets / Worksheets

## Metadata
Feature: Worksheets — TC-303  
Business Area: Worksheets > Worksheets  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V1  
Priority: High  

---

# Scenario: Update Item Ordering Information and Synchronize to Selected Stores on Effective Date and Time

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create, modify, and approve worksheets in Central Manager.
- At least one item exists in Central Manager with ordering information that can be modified. To verify: navigate to **Central Manager → Merchandising → Items** and confirm item `ITEM-303-001` exists with an **Active** status. If it does not exist, create it before running this test.
- At least one store with **Active** status exists and is able to receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.
- The **RMH Worksheet Process** service is running. To verify: click **Start**, type `Services`, open the Services window, scroll to **RMH Worksheet Process**, and confirm the status is **Running**.
- **Note:** Worksheet 303 creates one worksheet for all selected stores (unlike some other worksheet types that create a separate worksheet per store).

## Required Test Data
- Worksheet Title: Ordering Info Update Test 303 - March 2026
- Effective Date/Time: 2026-03-26 08:00:00
- Target Store: Store001
- Item Lookup Code: ITEM-303-001
- Updated Reorder Point: 10

## Navigation Path
Central Manager → Worksheets → Worksheets → 303: Change Item Ordering Info

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Worksheets**.
3. Expand **Worksheets** to reveal the list of worksheet types.
4. Click **303: Change Item Ordering Info**.
5. In the store selection screen, select `Store001` from the list.
   > **Note:** You can add or remove stores after the worksheet is generated while it is in a **Not Yet Approved** state.
6. Click **Next**.
7. In the **Worksheet Title** field, enter `Ordering Info Update Test 303 - March 2026`.
8. In the **Effective date / time** field, enter `2026-03-26 08:00:00`.
   > **Tip:** Select a date and time that does not interfere with the operations of an open store.
9. Click **Next**.
10. Select **Add items manually** from the item selection options.
11. Select **Exclude Inactive** to exclude inactive items from the worksheet.
12. Click **Next**.
13. Click **Finish**.
14. Click **OK** to confirm the worksheet has been created.
15. Double-click the generated worksheet to open its properties.
16. On the **General** tab, confirm the **Effective date / time** is set to `2026-03-26 08:00:00`. Add notes if desired.
17. On the **General** tab, click **Stores** and confirm `Store001` is in the **Selected Stores** list. Click **OK** to close the Stores dialog.
18. Click the **Contents** tab and confirm that `ITEM-303-001` is present in the list. If it is not present, click **Add Row** and add it manually.
    > **Note:** If `ITEM-303-001` is ordered from more than one supplier, a separate line will appear for each supplier. Update the correct line.
19. In the ordering information column for `ITEM-303-001`, enter `10` as the updated Reorder Point value.
    > **Tip:** To apply the same value to all rows in a column, right-click the value, select **Copy**, then right-click anywhere in the column and select **Paste to All Rows**.
20. Click **Approve**. The worksheet is approved and queued for processing. The ordering information changes will be synchronized to `Store001` at the configured effective date and time.
21. Click **OK** to close any confirmation prompt.

---

## Expected Results
- Worksheet 303 is approved and queued for processing for `Store001`.
- The ordering information change for `ITEM-303-001` (Reorder Point set to `10`) is synchronized to `Store001` at `2026-03-26 08:00:00`.

## Validation Checks
- Verify worksheet 303 processing status in Central Manager → Worksheets → Worksheets Status → **303: Change Item Ordering Info** by confirming the status is no longer **Not Yet Approved** after approval.
- Verify the updated ordering information for `ITEM-303-001` in Store Manager on `Store001` → Merchandising → Items by opening the `ITEM-303-001` record, navigating to the ordering or purchasing tab, and confirming the Reorder Point field shows `10`.
- Verify no processing errors exist for the worksheet in Central Manager → Worksheets → Worksheets Status → **303: Change Item Ordering Info** by confirming no error messages appear in the worksheet status screen.