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

# Scenario: Insert a new gasoline item in Central Manager

## Preconditions
- Central Manager is installed and running.
- At least one Department exists in Central Manager. To verify: navigate to **Setup → Merchandising → Departments**.
- At least one Category exists in Central Manager. To verify: navigate to **Setup → Merchandising → Categories**.
- The logged-in user has permission to create items in Central Manager.
> **Note:** A gasoline item is a special item type where the item quantity is recalculated when a new extended price is entered at POS.

## Required Test Data
- Item Lookup Code: TEST-GAS-001
- Item Description: Test Gasoline Item 001
- Item Type: Gasoline
- Department: Fuel
- Category: Gasoline
- Price: 3.99
- Cost: 3.00

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. Click **New** to open the item creation dialog.
5. Select **Standard Item** and click **OK**.
   > **Note:** The Item type is changed to **Gasoline** on the **General** tab after the item record opens — not in this initial dialog.
6. On the **General** tab, enter the following:
   - **Item Lookup Code:** `TEST-GAS-001`
   - **Description:** `Test Gasoline Item 001`
   - **Department:** `Fuel`
   - **Category:** `Gasoline`
   - **Price:** `3.99`
   - **Cost:** `3.00`
7. Locate the **Item type** field on the **General** tab and select **Gasoline** from the dropdown.
   > **Note:** For a gasoline item, the item quantity is recalculated when a new extended price is entered at POS.
8. Click the **Pricing** tab to confirm the price and cost values are correctly reflected.
9. Click **OK** to save the new item.
10. The Items list will return to focus. The new item record is now saved.

---

## Expected Results
- The new gasoline item TEST-GAS-001 is created and saved successfully in Central Manager with an Item type of **Gasoline**.

## Validation Checks
- Verify item TEST-GAS-001 exists in Central Manager → Merchandising → Items by searching for `TEST-GAS-001` and confirming the record is present in the Items list.
- Verify the **Item type** field is set to `Gasoline` in Central Manager → Merchandising → Items by double-clicking **TEST-GAS-001** and confirming the **Item type** field on the **General** tab reads `Gasoline`.
- Verify the **Description** field shows `Test Gasoline Item 001` in Central Manager → Merchandising → Items by opening the **TEST-GAS-001** record and checking the **General** tab.
- Verify the **Price** field shows `3.99` and the **Cost** field shows `3.00` in Central Manager → Merchandising → Items by opening the **TEST-GAS-001** record and checking the **Pricing** tab.
- Verify the **Department** is `Fuel` and the **Category** is `Gasoline` in Central Manager → Merchandising → Items by opening the **TEST-GAS-001** record and checking the **General** tab.