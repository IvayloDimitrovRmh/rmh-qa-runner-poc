# Worksheets

## Metadata
Feature: Worksheet Synchronization  
Business Area: Worksheets > Worksheets  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: Unknown  
Priority: Unknown  

---

# Scenario: Worksheet 351 Synchronization to Stores

## Business Entity
Worksheet (ID: 351)

## Business Purpose
Ensure that updates made to Worksheet 351 in Central Manager synchronize correctly to the selected store(s) so that store-level configuration and operational data remain consistent with Central.

## Trigger
A user updates Worksheet 351 in Central Manager and the configured effective date/time for synchronization is reached.

## Preconditions
- Central and Store synchronization services are active.
- Worksheet 351 exists in Central Manager.
- Store(s) are selected for worksheet synchronization.
- Effective date/time for synchronization is configured.

## Required Test Data
- Worksheet ID: 351
- Selected store(s)
- Effective synchronization date/time

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Locate Worksheet 351.
3. Modify worksheet configuration or operational values.
4. Ensure the correct store(s) are selected for synchronization.
5. Save the worksheet.
6. Wait for the effective date/time or trigger synchronization manually.
7. Verify the worksheet updates appear in the selected store(s).

## Expected Results
- The worksheet changes are replicated to the selected store(s) after the worksheet is approved. (Documentation: approving the worksheet causes changes to be synchronized to the stores and to come into effect on the effective date and time.)
- The updated item pricing and cost (e.g., Price; Price A, B, C; MSRP; Sale Price; Sale Start Date; Sale End Date; Lower Bound; Upper Bound; Buydown Price; Buydown Quantity) is applied in each selected store so that the modified values are in effect at or after the configured effective date/time. Worksheet 351 creates one worksheet for all selected stores, so the same pricing and cost from the worksheet applies to all selected stores. It is recommended when stores have the same pricing and cost information for items.
- In Central Manager, under **Worksheets** → **Worksheets Status** → **351: Update Inventory - Item Prices Cost (Regular)**, the worksheet shows a status consistent with processing or completion (e.g., no longer "Not Yet Approved" once approved and processed).
- In each selected store, the item pricing and cost that were changed in the worksheet are reflected for those items (e.g., on the item’s Pricing tab and cost-related fields in the store).
- Only the stores that were selected for the worksheet receive the price and cost updates; unselected stores are unchanged. Optionally, the Central Manager database may also be updated by the worksheet unless the option **Style 351 worksheet (Update Inventory - Change Item Prices, Cost (Regular)) does not change Central data** is selected under File | Configuration.

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **351: Update Inventory - Item Prices Cost (Regular)**, confirm the worksheet is present and its status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- **Store(s):** For at least one item that was modified in Worksheet 351, open the item in the store (e.g., Merchandising > Items > item > Pricing tab and cost-related fields) and confirm that the price, cost, and any other pricing-related fields that were updated in the worksheet (e.g., Price, Price A/B/C, MSRP, Sale Price, Sale Start/End Date, Buydown) match the values set in the worksheet in Central Manager.
- **Data consistency:** Compare the modified item pricing and cost values in the worksheet in Central Manager with the same items in each selected store; the values in the store match the Central configuration for those items.

## Pass Criteria
- Worksheet updates are successfully applied to the selected store(s).

## Fail Criteria
- Worksheet updates do not appear in store(s).
- Data mismatch between Central and Store.
- Synchronization fails or occurs incorrectly.

## Risks / Assumptions
- Worksheet synchronization depends on active Central-to-Store synchronization services.
- System clocks between Central and Store environments are aligned.

## Known Issues / Notes
- Bug 204372: Central > Worksheet synchronization issue