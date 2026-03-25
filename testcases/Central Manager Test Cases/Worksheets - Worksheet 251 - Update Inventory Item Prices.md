# Worksheets / Worksheets

## Metadata
Feature: Worksheet Synchronization  
Business Area: Worksheets > Worksheets  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V1  
Priority: High  

---

# Scenario: Synchronize Worksheet Changes to Selected Stores on Effective Date/Time

## Preconditions
- Central Manager is installed and running.
- At least one store is configured and connected to Central Manager.
- The RMH Worksheet Process service is running. To verify: click Start, type Services, open the Services window, scroll to RMH Worksheet Process, and confirm the status is Running.
- At least one item exists in Central Manager with pricing information that can be modified.
- The logged-in user has permission to create, modify, and approve worksheets.
- **Note:** Worksheet 251 creates a separate worksheet per store — it is recommended when stores have different pricing for items.

## Required Test Data
- Worksheet Title: Price Update Test 251 - March 2026
- Worksheet ID: 251
- Effective Date/Time: 2026-03-22 08:00:00
- Target Store(s): Store001
- Item Lookup Code: ITEM-001
- New Regular Price: 9.99

## Navigation Path
Central Manager → Worksheets → Worksheets → 251: Update Inventory - Item Prices

---

## Execution Steps
1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Worksheets**.
3. Expand **Worksheets** to reveal the list of worksheet types.
4. Click **251: Update Inventory - Item Prices**.
5. In the store selection screen, select **Store001** from the list.
   > **Note:** A separate worksheet will be created for each selected store. You can add or remove stores after the worksheet is generated while it is in a **Not Yet Approved** state.
6. Click **Next**.
7. In the **Worksheet Title** field, enter `Price Update Test 251 - March 2026`.
8. In the **Effective date / time** field, enter `2026-03-22 08:00:00`.
   > **Tip:** Choose a date and time that does not interfere with an open store's operations.
9. Click **Next**.
10. Select **Add items manually** from the item selection options.
11. Select **Exclude inactive** to exclude any inactive items from the worksheet.
12. Click **Next**, then click **Finish**.
13. Click **OK** to confirm the worksheet(s) have been created.
14. In the list of generated worksheets, double-click the worksheet for **Store001** to open its properties.
15. On the **General** tab, confirm the **Effective date / time** is set to `2026-03-22 08:00:00`. Add notes if desired.
16. Click the **Contents** tab and confirm that **ITEM-001** is present in the list. If not, use **Add Row** to add the item manually.
17. In the pricing column for **ITEM-001**, enter `9.99` as the new price.
    > **Tip:** To apply the same value to all rows in a column, right-click the value, select **Copy**, then right-click anywhere in the column and select **Paste to All Rows**.
18. Click **Approve** to approve the worksheet for processing.
19. The worksheet will be synchronized to **Store001** and the changes will come into effect at the configured effective date/time.

## Expected Results
- Worksheet 251 is approved and queued for processing for Store001.
- The item price change for ITEM-001 to $9.99 is synchronized to Store001 at 2026-03-22 08:00:00.

## Validation Checks
- Verify the worksheet status reflects successful processing in Central Manager → Worksheets → Worksheets Status → 251: Update Inventory - Item Prices by confirming the status is no longer **Not Yet Approved**.
- Verify the updated price for ITEM-001 is 9.99 in Store Manager → Merchandising → Items by selecting ITEM-001, opening the **Pricing** tab, and confirming the price field shows `9.99`.
- Verify no processing errors exist for the worksheet in Central Manager → Worksheets → Worksheets Status → 251: Update Inventory - Item Prices by confirming the RMH Worksheet Process service is running and no error messages appear in the worksheet status screen.