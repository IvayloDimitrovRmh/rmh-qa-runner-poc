# Merchandising / Items

## Metadata
Feature: Merchandising Items  
Business Area: Merchandising > Items  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP 1.1  
Priority: High  

---

# Scenario: Configure purchase tab settings on an existing item in Central Manager

## Preconditions
- Central Manager is installed and running.
- The item TEST-STD-001 already exists in Central Manager with the following known values:
  - Item Lookup Code: `TEST-STD-001`
  - Description: `Test Standard Item 001`
  - Item Type: `Standard`
  > **If the item does not yet exist**, create it first by navigating to **Merchandising → Items → New → Standard Item** and entering the values above.
- A Unit of Measure is configured in Central Manager. To verify: navigate to **File → Configuration → Unit of Measure**.
- The logged-in user has permission to modify items in Central Manager.
> **Note:** The **Purchase** tab manages purchasing and reordering settings for the item, including tax code for purchase orders, unit of measure, and whether the item should be excluded from ordering.

## Required Test Data
- Item Lookup Code: TEST-STD-001
- Tax Code: *(leave blank — stores typically purchase items tax free)*
- Unit of Measure: Each
- Purchase Unit of Measure (Purchase UOM): Case
- Do Not Order: No *(leave unchecked — item is orderable)*
- Expected unchanged — Item Lookup Code: TEST-STD-001
- Expected unchanged — Description: Test Standard Item 001
- Expected unchanged — Item Type: Standard

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. Locate **TEST-STD-001** in the Items list.
   > **Tip:** If the list is long, use the search or filter functionality to find the item by its Item Lookup Code.
5. Double-click **TEST-STD-001** to open the item record.
6. Click the **Purchase** tab.
7. In the **Unit of Measure** field, select `Each` from the dropdown.
   > **Note:** This defines how the item is counted or measured in a purchase order.
8. In the **Purchase UOM** field, select `Case`.
   > **Note:** This is the unit of measure to use specifically in purchase orders for this item.
9. Leave the **Tax Code** field blank.
   > **Note:** In the U.S. and Canada, stores typically purchase items tax free and collect tax from the customer at point of sale.
10. Leave the **Do Not Order** checkbox unchecked to confirm the item remains orderable.
11. Click **OK** to save the changes.
12. The Items list will return to focus. The item record is now saved.

---

## Expected Results
- The **Purchase** tab settings for TEST-STD-001 are saved successfully in Central Manager with **Unit of Measure** set to `Each` and **Purchase UOM** set to `Case`.
- The **Do Not Order** flag remains unchecked.
- No other item fields are modified as a result of this update.

## Validation Checks
- Verify the **Unit of Measure** field shows `Each` in Central Manager → Merchandising → Items by double-clicking **TEST-STD-001**, clicking the **Purchase** tab, and confirming the **Unit of Measure** field reads `Each`.
- Verify the **Purchase UOM** field shows `Case` in Central Manager → Merchandising → Items by opening the **TEST-STD-001** record and confirming the **Purchase UOM** field on the **Purchase** tab reads `Case`.
- Verify the **Do Not Order** checkbox is unchecked in Central Manager → Merchandising → Items by opening the **TEST-STD-001** record and confirming the **Do Not Order** checkbox on the **Purchase** tab is unchecked, indicating the item remains available for ordering.
- Verify the **Tax Code** field is blank in Central Manager → Merchandising → Items by opening the **TEST-STD-001** record and confirming the **Tax Code** field on the **Purchase** tab contains no value.
- Verify no other item fields were unintentionally modified in Central Manager → Merchandising → Items by opening the **TEST-STD-001** record and confirming the **Item Lookup Code** still reads `TEST-STD-001`, the **Description** still reads `Test Standard Item 001`, and the **Item type** still reads `Standard` on the **General** tab.