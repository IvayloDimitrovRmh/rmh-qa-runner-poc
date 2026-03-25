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

# Scenario: Insert a new non-inventory item in Central Manager

## Preconditions
- Central Manager is installed and running.
- At least one Department exists in Central Manager. To verify: navigate to **Setup → Merchandising → Departments**.
- At least one Category exists in Central Manager. To verify: navigate to **Setup → Merchandising → Categories**.
- The logged-in user has permission to create items in Central Manager.
> **Note:** A non-inventory item is not tracked in stock. The on-hand quantity for a non-inventory item is always zero. Common examples include shipping charges and labor hours.

## Required Test Data
- Item Lookup Code: TEST-NI-001
- Item Description: Test Non-Inventory Item 001
- Item Type: Non-Inventory
- Department: Services
- Category: Charges
- Price: 5.00
- Cost: 0.00

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. Click **New** to open the item creation dialog.
5. Select **Standard Item** and click **OK**.
   > **Note:** The Item type is changed to **Non-Inventory** on the **General** tab after the item record opens — not in this initial dialog.
6. On the **General** tab, enter the following:
   - **Item Lookup Code:** `TEST-NI-001`
   - **Description:** `Test Non-Inventory Item 001`
   - **Department:** `Services`
   - **Category:** `Charges`
   - **Price:** `5.00`
   - **Cost:** `0.00`
7. Locate the **Item type** field on the **General** tab and select **Non-Inventory** from the dropdown.
   > **Note:** Non-inventory items are not tracked in stock. The on-hand quantity will always remain zero for this item type.
8. Click the **Pricing** tab to confirm the price and cost values are correctly reflected.
9. Click the **Inventory** tab and confirm the **On Hand** quantity shows `0` — this is expected for non-inventory items and cannot be edited.
10. Click **OK** to save the new item.
11. The Items list will return to focus. The new item record is now saved.

---

## Expected Results
- The new non-inventory item TEST-NI-001 is created and saved successfully in Central Manager with an Item type of **Non-Inventory**.
- The on-hand quantity for the item is `0` and is not tracked.

## Validation Checks
- Verify item TEST-NI-001 exists in Central Manager → Merchandising → Items by searching for `TEST-NI-001` and confirming the record is present in the Items list.
- Verify the **Item type** field is set to `Non-Inventory` in Central Manager → Merchandising → Items by double-clicking **TEST-NI-001** and confirming the **Item type** field on the **General** tab reads `Non-Inventory`.
- Verify the **Description** field shows `Test Non-Inventory Item 001` in Central Manager → Merchandising → Items by opening the **TEST-NI-001** record and checking the **General** tab.
- Verify the **Price** field shows `5.00` and the **Cost** field shows `0.00` in Central Manager → Merchandising → Items by opening the **TEST-NI-001** record and checking the **Pricing** tab.
- Verify the **Department** is `Services` and the **Category** is `Charges` in Central Manager → Merchandising → Items by opening the **TEST-NI-001** record and checking the **General** tab.
- Verify the **On Hand** quantity shows `0` in Central Manager → Merchandising → Items by opening the **TEST-NI-001** record, clicking the **Inventory** tab, and confirming the **On Hand** field reads `0`, indicating the item is correctly configured as a non-inventory item that is not tracked in stock.