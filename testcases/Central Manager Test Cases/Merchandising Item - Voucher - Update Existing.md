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

# Scenario: Update an existing voucher item in Central Manager

## Preconditions
- Central Manager is installed and running.
- The item TEST-VCH-001 already exists in Central Manager with the following known values:
  - Item Type: `Voucher`
  - Description: `Test Gift Card 001`
  - Department: `Services`
  - Category: `Gift Cards`
  - Price: `25.00`
  - Cost: `0.00`
  - Linked Tender: `Gift Card`
  - Voucher Numbering: `Auto generated`
  - Number Format: `GC-######`
  - Voucher can be reused: `Yes`
  > **If the item does not yet exist**, create it first by navigating to **Merchandising → Items → New → Standard Item**, then setting the **Item type** to **Voucher** on the **General** tab, configuring the **Voucher** tab, and entering the values above.
- The logged-in user has permission to modify items in Central Manager.

## Required Test Data
- Item Lookup Code: TEST-VCH-001
- Field to update: Price
- Original Price: 25.00
- Updated Price: 50.00
- Expected unchanged — Item Type: Voucher
- Expected unchanged — Description: Test Gift Card 001
- Expected unchanged — Department: Services
- Expected unchanged — Category: Gift Cards
- Expected unchanged — Cost: 0.00
- Expected unchanged — Linked Tender: Gift Card
- Expected unchanged — Voucher Numbering: Auto generated
- Expected unchanged — Number Format: GC-######
- Expected unchanged — Voucher can be reused: Yes

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items** to open the Items list.
4. Locate **TEST-VCH-001** in the Items list.
   > **Tip:** If the list is long, use the search or filter functionality to find the item by its Item Lookup Code.
5. Double-click **TEST-VCH-001** to open the item record.
6. On the **General** tab, confirm the **Item type** field reads `Voucher`.
7. Locate the **Price** field and note the current value (`25.00`).
8. Clear the **Price** field and enter `50.00`.
9. Click **OK** to save the changes.
10. The Items list will return to focus. The item record is now saved.

---

## Expected Results
- The item TEST-VCH-001 is saved successfully in Central Manager with the updated price of `50.00`.
- No other item fields or voucher configuration settings are modified as a result of this update.

## Validation Checks
- Verify the **Price** field shows `50.00` in Central Manager → Merchandising → Items by double-clicking **TEST-VCH-001** and confirming the **Price** field on the **Pricing** tab reads `50.00`.
- Verify the **Item type** remains `Voucher` in Central Manager → Merchandising → Items by opening the **TEST-VCH-001** record and confirming the **Item type** field on the **General** tab still reads `Voucher`.
- Verify the **Description** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-VCH-001** record and confirming the **Description** field on the **General** tab still reads `Test Gift Card 001`.
- Verify the **Department** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-VCH-001** record and confirming the **Department** field on the **General** tab still reads `Services`.
- Verify the **Category** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-VCH-001** record and confirming the **Category** field on the **General** tab still reads `Gift Cards`.
- Verify the **Cost** field is unchanged in Central Manager → Merchandising → Items by opening the **TEST-VCH-001** record and confirming the **Cost** field on the **Pricing** tab still reads `0.00`.
- Verify the **Voucher** tab settings are unchanged in Central Manager → Merchandising → Items by opening the **TEST-VCH-001** record, clicking the **Voucher** tab, and confirming all of the following:
  - **Linked tender** still shows `Gift Card`.
  - **Auto generated** numbering is still selected.
  - **Number format** still shows `GC-######`.
  - **Voucher can be reused** is still selected.