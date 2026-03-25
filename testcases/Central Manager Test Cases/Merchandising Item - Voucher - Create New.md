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

# Scenario: Insert a new voucher item in Central Manager

## Preconditions
- Central Manager is installed and running.
- At least one Department exists in Central Manager. To verify: navigate to **Setup → Merchandising → Departments**.
- At least one Category exists in Central Manager. To verify: navigate to **Setup → Merchandising → Categories**.
- A voucher tender type exists in Central Manager. To verify: navigate to **Setup → Financial → Tender Types** and confirm a tender type designated for voucher redemption is present (e.g., `Gift Card`).
  > **Note:** All vouchers must be linked to a tender type so they can be redeemed at point-of-sale. If no voucher tender type exists, create one before proceeding.
- The logged-in user has permission to create items in Central Manager.
> **Note:** A voucher item is a gift certificate or gift card sold by the store. It is not tracked in inventory in the same way as a standard item.

## Required Test Data
- Item Lookup Code: TEST-VCH-001
- Item Description: Test Gift Card 001
- Item Type: Voucher
- Department: Services
- Category: Gift Cards
- Price: 25.00
- Cost: 0.00
- Linked Tender Type: Gift Card
- Voucher Numbering: Auto generated
- Number Format: GC-######
- Voucher can be reused: Yes

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. Click **New** to open the item creation dialog.
5. Select **Standard Item** and click **OK**.
   > **Note:** The Item type is changed to **Voucher** on the **General** tab after the item record opens — not in this initial dialog.
6. On the **General** tab, enter the following:
   - **Item Lookup Code:** `TEST-VCH-001`
   - **Description:** `Test Gift Card 001`
   - **Department:** `Services`
   - **Category:** `Gift Cards`
   - **Price:** `25.00`
   - **Cost:** `0.00`
7. Locate the **Item type** field on the **General** tab and select **Voucher** from the dropdown.
   > **Note:** A voucher item is a gift certificate or gift card sold by the store.
8. Click the **Voucher** tab to configure voucher-specific options.
9. In the **Linked tender** field, select **Gift Card** from the dropdown.
   > **Note:** All vouchers must be linked to a tender type so they can be redeemed at POS.
10. Under voucher numbering, select **Auto generated**.
11. In the **Number format** field, enter `GC-######`.
    > **Note:** This format will be used to automatically generate a unique voucher number each time the item is sold at POS.
12. Select **Voucher can be reused** to allow the gift card balance to be reloaded after initial purchase.
13. Click the **Pricing** tab to confirm the price and cost values are correctly reflected.
14. Click **OK** to save the new item.
15. The Items list will return to focus. The new item record is now saved.

---

## Expected Results
- The new voucher item TEST-VCH-001 is created and saved successfully in Central Manager with an Item type of **Voucher** and the correct voucher configuration.

## Validation Checks
- Verify item TEST-VCH-001 exists in Central Manager → Merchandising → Items by searching for `TEST-VCH-001` and confirming the record is present in the Items list.
- Verify the **Item type** field is set to `Voucher` in Central Manager → Merchandising → Items by double-clicking **TEST-VCH-001** and confirming the **Item type** field on the **General** tab reads `Voucher`.
- Verify the **Description** field shows `Test Gift Card 001` in Central Manager → Merchandising → Items by opening the **TEST-VCH-001** record and checking the **General** tab.
- Verify the **Price** field shows `25.00` and the **Cost** field shows `0.00` in Central Manager → Merchandising → Items by opening the **TEST-VCH-001** record and checking the **Pricing** tab.
- Verify the **Department** is `Services` and the **Category** is `Gift Cards` in Central Manager → Merchandising → Items by opening the **TEST-VCH-001** record and checking the **General** tab.
- Verify the **Linked tender** field shows `Gift Card` in Central Manager → Merchandising → Items by opening the **TEST-VCH-001** record and clicking the **Voucher** tab.
- Verify the **Auto generated** numbering option is selected and the **Number format** field shows `GC-######` in Central Manager → Merchandising → Items by opening the **TEST-VCH-001** record and checking the **Voucher** tab.
- Verify the **Voucher can be reused** option is selected in Central Manager → Merchandising → Items by opening the **TEST-VCH-001** record and checking the **Voucher** tab.