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

# Scenario: Worksheet 304 Synchronization to Stores

## Business Entity
Worksheet (ID: 304)

## Business Purpose
Ensure that updates made in Worksheet 304 in Central Manager synchronize correctly to the selected stores based on the configured effective date and time so that store-level configurations and operational data remain aligned with Central.

## Trigger
A user updates Worksheet 304 in Central Manager and the configured effective date/time for synchronization is reached.

## Preconditions
- Central and Store synchronization services are active.
- One or more stores are selected for worksheet synchronization.
- Effective date and time are configured for the worksheet.
- User has permission to modify worksheets.

## Required Test Data
- Worksheet ID: 304
- Effective synchronization date/time
- Selected store(s)

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Locate Worksheet 304.
3. Modify worksheet configuration or operational data.
4. Set or confirm the effective date/time for synchronization.
5. Save the worksheet.
6. Wait until the configured effective date/time or trigger synchronization manually.
7. Verify the update appears in the selected store(s).

## Expected Results
- The worksheet changes are replicated to the selected store(s) after the worksheet is approved. (Documentation: approving the worksheet causes changes to be synchronized to the stores and to come into effect on the effective date and time.)
- The updated item prices (New Price / regular price; documentation also references formula-based pricing and MSRP in the worksheet) are applied in each selected store so that the modified values are in effect at or after the configured effective date/time. Worksheet 304 creates one worksheet for all selected stores, so the same pricing from the worksheet applies to all selected stores.
- In Central Manager, under **Worksheets** → **Worksheets Status** → **304: Change Item Prices (Regular)**, the worksheet shows a status consistent with processing or completion (e.g., no longer "Not Yet Approved" once approved and processed).
- In each selected store, the item price(s) that were changed in the worksheet are reflected for those items (e.g., on the item’s Pricing tab or equivalent in the store).
- Only the stores that were selected for the worksheet receive the price updates; unselected stores are unchanged. Optionally, Central Manager database prices may also be updated by the worksheet unless the option **Style 304 worksheet (Change Item Regular Price) does not change Central data** is selected under File | Configuration.

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **304: Change Item Prices (Regular)**, confirm the worksheet is present and its status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- **Store(s):** For at least one item that was modified in Worksheet 304, open the item in the store (e.g., Merchandising > Items > item > Pricing tab or equivalent) and confirm that the regular price (New Price) matches the value set in the worksheet in Central Manager.
- **Data consistency:** Compare the modified item prices in the worksheet in Central Manager with the same items in each selected store; the prices in the store match the Central configuration for those items.

## Pass Criteria
- Worksheet updates appear correctly in the selected store(s).

## Fail Criteria
- Worksheet changes do not appear in store configuration.
- Data mismatch between Central and Store.
- Synchronization occurs incorrectly or fails.

## Risks / Assumptions
- Worksheet synchronization relies on scheduled synchronization services.
- System time settings must align between Central and Store environments.

## Known Issues / Notes
- Bug 204372: Central > Worksheet synchronization issue