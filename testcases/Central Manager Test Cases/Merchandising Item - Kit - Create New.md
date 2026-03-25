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

# Scenario: Insert a new kit item in Central Manager

## Preconditions
- Central Manager is installed and running.
- At least one Department exists in Central Manager. To verify: navigate to **Setup → Merchandising → Departments**.
- At least one Category exists in Central Manager. To verify: navigate to **Setup → Merchandising → Categories**.
- The following two component items already exist in Central Manager and are available in the Items list:
  - `COMP-001` — a standard item that will be included in the kit.
  - `COMP-002` — a standard item that will be included in the kit.
- The logged-in user has permission to create items in Central Manager.
> **Note:** A kit item contains other items bundled together and sold as one item. When a customer purchases a kit item, the in-stock quantity of the individual components does not change. The cashier cannot change the quantity, price, or taxes of individual kit components at POS.

## Required Test Data
- Item Lookup Code (Kit): TEST-KIT-001
- Item Description (Kit): Test Kit Item 001
- Item Type: Kit
- Department: General
- Category: Miscellaneous
- Price: 39.99
- Cost: 20.00
- Component Item Lookup Code 1: COMP-001
- Component Item Lookup Code 2: COMP-002

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. Click **New** to open the item creation dialog.
5. Select **Standard Item** and click **OK**.
   > **Note:** The Item type is changed to **Kit** on the **General** tab after the item record opens — not in this initial dialog.
6. On the **General** tab, enter the following:
   - **Item Lookup Code:** `TEST-KIT-001`
   - **Description:** `Test Kit Item 001`
   - **Department:** `General`
   - **Category:** `Miscellaneous`
   - **Price:** `39.99`
   - **Cost:** `20.00`
7. Locate the **Item type** field on the **General** tab and select **Kit** from the dropdown.
8. Click the **Kit** tab to add component items to the kit.
9. Click **New** on the **Kit** tab.
10. In the **Find** field, enter `COMP-001`, select the item from the list, and click **OK**.
11. Click **New** again on the **Kit** tab.
12. In the **Find** field, enter `COMP-002`, select the item from the list, and click **OK**.
13. Confirm both **COMP-001** and **COMP-002** are listed on the **Kit** tab.
14. Click **OK** to save the new kit item.
15. The Items list will return to focus. The new item record is now saved.

---

## Expected Results
- The new kit item TEST-KIT-001 is created and saved successfully in Central Manager with an Item type of **Kit** and two component items: COMP-001 and COMP-002.

## Validation Checks
- Verify item TEST-KIT-001 exists in Central Manager → Merchandising → Items by searching for `TEST-KIT-001` and confirming the record is present in the Items list.
- Verify the **Item type** field is set to `Kit` in Central Manager → Merchandising → Items by double-clicking **TEST-KIT-001** and confirming the **Item type** field on the **General** tab reads `Kit`.
- Verify the **Description** field shows `Test Kit Item 001` in Central Manager → Merchandising → Items by opening the **TEST-KIT-001** record and checking the **General** tab.
- Verify the **Price** field shows `39.99` and the **Cost** field shows `20.00` in Central Manager → Merchandising → Items by opening the **TEST-KIT-001** record and checking the **General** tab.
- Verify the **Department** is `General` and the **Category** is `Miscellaneous` in Central Manager → Merchandising → Items by opening the **TEST-KIT-001** record and checking the **General** tab.
- Verify both component items are listed on the **Kit** tab in Central Manager → Merchandising → Items by opening the **TEST-KIT-001** record, clicking the **Kit** tab, and confirming both `COMP-001` and `COMP-002` appear in the component list.