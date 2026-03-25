# Worksheets / Worksheets

## Metadata
Feature: Worksheets — TC-320  
Business Area: Worksheets > Worksheets  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V1  
Priority: High  

---

# Scenario: Adjust Item Sales Tax and Synchronize to Selected Stores on Effective Date and Time

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create, modify, and approve worksheets in Central Manager.
- At least one item exists in Central Manager that can have its sales tax assignment modified. To verify: navigate to **Central Manager → Merchandising → Items** and confirm item `ITEM-320-001` exists with an **Active** status. If it does not exist, create it before running this test.
- At least one sales tax record exists in Central Manager that can be applied to items. To verify: navigate to **Central Manager → Setup → Financial → Sales Taxes** and confirm sales tax `TAX-GST-001` exists. If it does not exist, create it before running this test.
- At least one store with **Active** status exists and is able to receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.
- The **RMH Worksheet Process** service is running. To verify: click **Start**, type `Services`, open the Services window, scroll to **RMH Worksheet Process**, and confirm the status is **Running**.
- **Note:** Worksheet 320 creates a separate worksheet for each selected store.

## Required Test Data
- Worksheet Title: Sales Tax Adjustment Test 320 - March 2026
- Effective Date/Time: 2026-03-26 08:00:00
- Target Store: Store001
- Item Lookup Code: ITEM-320-001
- Sales Tax to Apply: TAX-GST-001

## Navigation Path
Central Manager → Worksheets → Worksheets → 320: Adjust Item Sales Tax

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Worksheets**.
3. Expand **Worksheets** to reveal the list of worksheet types.
4. Click **320: Adjust Item Sales Tax**.
5. In the store selection screen, select `Store001` from the list.
   > **Note:** Worksheet 320 creates a separate worksheet for each selected store.
6. Click **Next**.
7. In the **Worksheet Title** field, enter `Sales Tax Adjustment Test 320 - March 2026`.
8. In the **Effective date / time** field, enter `2026-03-26 08:00:00`.
   > **Tip:** Select a date and time that does not interfere with the operations of an open store.
9. Click **Next**.
10. Select **Add items manually** from the item selection options.
11. Select **Exclude inactive** to exclude inactive items from the worksheet.
12. Click **Next**.
13. Click **Finish**.
14. Click **OK** to confirm the worksheet(s) have been created.
15. In the list of generated worksheets, double-click the worksheet for `Store001` to open its properties.
16. On the **General** tab, confirm the **Effective date / time** is set to `2026-03-26 08:00:00`. Add notes if desired.
17. Click the **Contents** tab and confirm that `ITEM-320-001` is present in the list. If it is not present, click **Add Row** and add it manually.
18. In the sales tax column for `ITEM-320-001`, select `TAX-GST-001` from the available options.
    > **Tip:** To apply the same value to all rows in a column, right-click the value, select **Copy**, then right-click anywhere in the column and select **Paste to All Rows**.
19. Click **Approve**. The worksheet is approved and queued for processing. The sales tax assignment change will be synchronized to `Store001` at the configured effective date and time.
20. Click **OK** to close any confirmation prompt.

---

## Expected Results
- Worksheet 320 is approved and queued for processing for `Store001`.
- The sales tax assignment for `ITEM-320-001` is updated to `TAX-GST-001` in `Store001` at `2026-03-26 08:00:00`.

## Validation Checks
- Verify worksheet 320 processing status in Central Manager → Worksheets → Worksheets Status → **320: Adjust Item Sales Tax** by confirming the status is no longer **Not Yet Approved** after approval.
- Verify the updated sales tax assignment for `ITEM-320-001` in Store Manager on `Store001` → Merchandising → Items by opening the `ITEM-320-001` record and confirming the sales tax field shows `TAX-GST-001`.
- Verify no processing errors exist for the worksheet in Central Manager → Worksheets → Worksheets Status → **320: Adjust Item Sales Tax** by confirming no error messages appear in the worksheet status screen.