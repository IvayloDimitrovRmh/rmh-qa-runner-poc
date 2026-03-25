# Worksheets / Worksheets

## Metadata
Feature: Worksheets — TC-252  
Business Area: Worksheets > Worksheets  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V1  
Priority: High  

---

# Scenario: Synchronize Matrix Item Price Changes to Selected Stores on Effective Date and Time

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create, modify, and approve worksheets in Central Manager.
- At least one matrix item exists in Central Manager with at least one component that has pricing information. To verify: navigate to **Central Manager → Merchandising → Items**, locate a matrix item, and confirm it has components with pricing data.
- At least one store with **Active** status exists and is able to receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.
- The **RMH Worksheet Process** service is running. To verify: click **Start**, type `Services`, open the Services window, scroll to **RMH Worksheet Process**, and confirm the status is **Running**.

## Required Test Data
- Worksheet Title: Matrix Price Update Test 252 - March 2026
- Effective Date/Time: 2026-03-26 08:00:00
- Target Store: Store001
- Matrix Item Lookup Code: MATRIX-001
- Updated Component Price: 19.99

## Navigation Path
Central Manager → Worksheets → Worksheets → 252: Update Matrix Items Prices

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Worksheets**.
3. Expand **Worksheets** to reveal the list of worksheet types.
4. Click **252: Update Matrix Items Prices**.
5. In the store selection screen, select `Store001` from the list.
   > **Note:** Worksheet 252 creates a separate worksheet for each selected store. It is recommended when stores have different pricing for matrix items.
6. Click **Next**.
7. In the **Worksheet Title** field, enter `Matrix Price Update Test 252 - March 2026`.
8. In the **Effective date / time** field, enter `2026-03-26 08:00:00`.
   > **Tip:** Select a date and time that does not interfere with the operations of an open store.
9. Click **Next**.
10. Select **Add items manually** from the item selection options.
11. Select **Exclude inactive** to exclude inactive items from the worksheet.
12. Click **Next**.
13. In the matrix item selection screen, locate and select `MATRIX-001`.
14. Click **Next**, then click **Finish**.
15. Click **OK** to confirm the worksheet(s) have been created.
16. In the list of generated worksheets, double-click the worksheet for `Store001` to open its properties.
17. On the **General** tab, confirm the **Effective date / time** is set to `2026-03-26 08:00:00`. Add notes if desired.
18. Click the **Contents** tab and confirm that the matrix item components for `MATRIX-001` are present in the list.
19. In the pricing column for the `MATRIX-001` component, enter `19.99` as the updated price.
    > **Tip:** To apply the same value to all rows in a column, right-click the value, select **Copy**, then right-click anywhere in the column and select **Paste to All Rows**.
20. Click **Approve**. The worksheet is approved and queued for synchronization to `Store001` at the configured effective date and time.
21. Click **OK** to close any confirmation prompt.

---

## Expected Results
- Worksheet 252 is approved and queued for processing for `Store001`.
- The matrix item component price change for `MATRIX-001` to `19.99` is synchronized to `Store001` at `2026-03-26 08:00:00`.

## Validation Checks
- Verify worksheet 252 processing status in Central Manager → Worksheets → Worksheets Status → **252: Update Matrix Items Prices** by confirming the status is no longer **Not Yet Approved** after approval.
- Verify the updated component price for `MATRIX-001` is `19.99` in Store Manager on `Store001` → Merchandising → Items by opening the `MATRIX-001` matrix item record, navigating to the **Pricing** tab for the relevant component, and confirming the price field shows `19.99`.
- Verify no processing errors exist for the worksheet in Central Manager → Worksheets → Worksheets Status → **252: Update Matrix Items Prices** by confirming no error messages appear in the worksheet status screen.