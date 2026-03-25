# Worksheets / Worksheets

## Metadata
Feature: Worksheets — TC-261  
Business Area: Worksheets > Worksheets  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V1  
Priority: High  

---

# Scenario: Download Items to Selected Stores on Effective Date and Time

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create, modify, and approve worksheets in Central Manager.
- At least one item exists in Central Manager that will be included in the worksheet. To verify: navigate to **Central Manager → Merchandising → Items** and confirm item `ITEM-261-001` exists with an **Active** status. If it does not exist, create it before running this test.
- At least one store with **Active** status exists and is able to receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.
- The **RMH Worksheet Process** service is running. To verify: click **Start**, type `Services`, open the Services window, scroll to **RMH Worksheet Process**, and confirm the status is **Running**.
- **Important:** Worksheet 261 does not override store item quantities for existing items. It updates all other item properties with values from Central Manager.

## Required Test Data
- Worksheet Title: Item Download Test 261 - March 2026
- Effective Date/Time: 2026-03-26 08:00:00
- Target Store: Store001
- Item Lookup Code: ITEM-261-001

## Navigation Path
Central Manager → Worksheets → Worksheets → 261: Download Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Worksheets**.
3. Expand **Worksheets** to reveal the list of worksheet types.
4. Click **261: Download Items**.
5. In the store selection screen, select `Store001` from the list.
   > **Note:** Worksheet 261 creates a separate worksheet for each selected store.
6. Click **Next**.
7. In the **Worksheet Title** field, enter `Item Download Test 261 - March 2026`.
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
17. Click the **Contents** tab and confirm that `ITEM-261-001` is present in the list. If it is not present, click **Add Row** and add it manually.
18. Confirm the item properties shown for `ITEM-261-001` are accurate and match the Central Manager item definition.
19. Click **Approve**. The worksheet is approved and queued for processing. The item will be downloaded to `Store001` at the configured effective date and time.
20. Click **OK** to close any confirmation prompt.

---

## Expected Results
- Worksheet 261 is approved and queued for processing for `Store001`.
- Item `ITEM-261-001` is inserted into or updated in `Store001` at `2026-03-26 08:00:00`.
- All item properties for `ITEM-261-001` in the store match the Central Manager definition. Store item quantity is not overwritten.

## Validation Checks
- Verify worksheet 261 processing status in Central Manager → Worksheets → Worksheets Status → **261: Download Items** by confirming the status is no longer **Not Yet Approved** after approval.
- Verify item `ITEM-261-001` exists in Store Manager on `Store001` → Merchandising → Items by locating the item record and confirming it appears in the list.
- Verify item properties for `ITEM-261-001` in Store Manager on `Store001` → Merchandising → Items by opening the `ITEM-261-001` record and confirming that item properties (such as description and pricing) match the values defined in Central Manager.
- Verify no processing errors exist for the worksheet in Central Manager → Worksheets → Worksheets Status → **261: Download Items** by confirming no error messages appear in the worksheet status screen.