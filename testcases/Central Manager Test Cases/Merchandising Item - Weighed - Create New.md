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

# Scenario: Insert a new weighed item in Central Manager

## Preconditions
- Central Manager is installed and running.
- At least one Department exists in Central Manager. To verify: navigate to **Setup → Merchandising → Departments**.
- At least one Category exists in Central Manager. To verify: navigate to **Setup → Merchandising → Categories**.
- The logged-in user has permission to create items in Central Manager.
> **Note:** A weighed item must be weighed to determine its sale price. The weight can be entered manually or using an electronic scale connected to the register. A tare weight can optionally be assigned on the **Tare Weights** tab.

## Required Test Data
- Item Lookup Code: TEST-WGH-001
- Item Description: Test Weighed Item 001
- Item Type: Weighed
- Department: Deli
- Category: Fresh Produce
- Price: 2.99
- Cost: 1.50
- Tare Weight: 0.05 *(optional — represents the weight of the container)*

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. Click **New** to open the item creation dialog.
5. Select **Standard Item** and click **OK**.
   > **Note:** The Item type is changed to **Weighed** on the **General** tab after the item record opens — not in this initial dialog.
6. On the **General** tab, enter the following:
   - **Item Lookup Code:** `TEST-WGH-001`
   - **Description:** `Test Weighed Item 001`
   - **Department:** `Deli`
   - **Category:** `Fresh Produce`
   - **Price:** `2.99`
   - **Cost:** `1.50`
7. Locate the **Item type** field on the **General** tab and select **Weighed** from the dropdown.
   > **Note:** For a weighed item, the item must be weighed to determine its sale price. The weight can be entered manually or using an electronic scale connected to the register.
8. Click the **Tare Weights** tab.
   > **Note:** This tab becomes available when the **Item type** is set to **Weighed**.
9. If a tare weight is required, enter `0.05` to account for the weight of the container. If no tare weight is needed, leave the tab as-is.
10. Click the **Pricing** tab to confirm the price and cost values are correctly reflected.
11. Click **OK** to save the new item.
12. The Items list will return to focus. The new item record is now saved.

---

## Expected Results
- The new weighed item TEST-WGH-001 is created and saved successfully in Central Manager with an Item type of **Weighed**.

## Validation Checks
- Verify item TEST-WGH-001 exists in Central Manager → Merchandising → Items by searching for `TEST-WGH-001` and confirming the record is present in the Items list.
- Verify the **Item type** field is set to `Weighed` in Central Manager → Merchandising → Items by double-clicking **TEST-WGH-001** and confirming the **Item type** field on the **General** tab reads `Weighed`.
- Verify the **Description** field shows `Test Weighed Item 001` in Central Manager → Merchandising → Items by opening the **TEST-WGH-001** record and checking the **General** tab.
- Verify the **Price** field shows `2.99` and the **Cost** field shows `1.50` in Central Manager → Merchandising → Items by opening the **TEST-WGH-001** record and checking the **Pricing** tab.
- Verify the **Department** is `Deli` and the **Category** is `Fresh Produce` in Central Manager → Merchandising → Items by opening the **TEST-WGH-001** record and checking the **General** tab.
- Verify the **Tare Weights** tab is present on the **TEST-WGH-001** record in Central Manager → Merchandising → Items by opening the record and confirming the **Tare Weights** tab is visible, indicating the item is correctly configured as a weighed item.
- Verify the tare weight entry shows `0.05` in Central Manager → Merchandising → Items by opening the **TEST-WGH-001** record, clicking the **Tare Weights** tab, and confirming the tare weight value reads `0.05` if a tare weight was entered during creation.