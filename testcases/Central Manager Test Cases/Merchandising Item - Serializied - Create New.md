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

# Scenario: Insert a new serialized item in Central Manager

## Preconditions
- Central Manager is installed and running.
- At least one Department exists in Central Manager. To verify: navigate to **Setup → Merchandising → Departments**.
- At least one Category exists in Central Manager. To verify: navigate to **Setup → Merchandising → Categories**.
- The logged-in user has permission to create items in Central Manager.
> **Note:** A serialized item is associated with a unique serial number, which Store Manager uses to track purchases. This is distinct from a Standard item.

## Required Test Data
- Item Lookup Code: TEST-SER-001
- Item Description: Test Serialized Item 001
- Item Type: Serialized
- Department: Electronics
- Category: Accessories
- Price: 49.99
- Cost: 25.00

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. Click **New** to open the item creation dialog.
5. Select **Standard Item** and click **OK**.
   > **Note:** The item type selection (Standard vs Serialized) is made on the **General** tab after the item record opens — not in this initial dialog.
6. On the **General** tab, enter the following:
   - **Item Lookup Code:** `TEST-SER-001`
   - **Description:** `Test Serialized Item 001`
   - **Department:** `Electronics`
   - **Category:** `Accessories`
   - **Price:** `49.99`
   - **Cost:** `25.00`
7. Locate the **Item type** field on the **General** tab and select **Serialized** from the dropdown.
   > **Note:** A serialized item is associated with a unique serial number that Store Manager uses to track purchases.
8. Click the **Serial** tab to review serial number management options.
   > **Note:** No serial numbers need to be added at this stage — this tab is available for managing serial numbers once the item is in use.
9. Click **OK** to save the new item.
10. The Items list will return to focus. The new item record is now saved.

---

## Expected Results
- The new serialized item TEST-SER-001 is created and saved successfully in Central Manager with an Item type of **Serialized**.

## Validation Checks
- Verify item TEST-SER-001 exists in Central Manager → Merchandising → Items by searching for `TEST-SER-001` and confirming the record is present in the Items list.
- Verify the **Item type** field is set to `Serialized` in Central Manager → Merchandising → Items by double-clicking **TEST-SER-001** and confirming the **Item type** field on the **General** tab reads `Serialized`.
- Verify the **Description** field shows `Test Serialized Item 001` in Central Manager → Merchandising → Items by opening the **TEST-SER-001** record and checking the **General** tab.
- Verify the **Price** field shows `49.99` and the **Cost** field shows `25.00` in Central Manager → Merchandising → Items by opening the **TEST-SER-001** record and checking the **General** tab.
- Verify the **Department** is `Electronics` and the **Category** is `Accessories` in Central Manager → Merchandising → Items by opening the **TEST-SER-001** record and checking the **General** tab.
- Verify the **Serial** tab is present on the **TEST-SER-001** record in Central Manager → Merchandising → Items by opening the record and confirming the **Serial** tab is visible, indicating the item is correctly configured as a serialized item.