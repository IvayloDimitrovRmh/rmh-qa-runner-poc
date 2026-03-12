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

# Scenario: Worksheet 322 Synchronization to Stores

## Business Entity
Worksheet (ID: 322)

## Business Purpose
Ensure that updates made in Worksheet 322 in Central Manager synchronize correctly to the selected stores so that store-level configuration and operational data remain aligned with Central.

## Trigger
A user updates Worksheet 322 in Central Manager and the configured effective date/time for synchronization is reached.

## Preconditions
- Central and Store synchronization services are active.
- Worksheet 322 exists in Central Manager.
- Store(s) are selected for worksheet synchronization.
- Effective date/time for synchronization is configured.

## Required Test Data
- Worksheet ID: 322
- Effective synchronization date/time
- Selected store(s)

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to **Worksheets → Worksheets**.
2. Locate **Worksheet 322**.
3. Modify worksheet configuration or operational data.
4. Confirm the selected store(s) for synchronization.
5. Save the worksheet.
6. Wait for the effective synchronization time or trigger synchronization.
7. Verify the update appears in the selected store(s).


## Expected Results
- The worksheet changes are replicated to the selected store(s) after the worksheet is approved. (Documentation: approving the worksheet causes changes to be synchronized to the stores and to come into effect on the effective date and time.)
- The updated quantity discount (New Quantity Discount) is applied in each selected store so that the modified values are in effect at or after the configured effective date/time. Worksheet 322 creates one worksheet for all selected stores, so the same discount configuration from the worksheet applies to all selected stores.
- In Central Manager, under **Worksheets** → **Worksheets Status** → **322: Change Item Discounts**, the worksheet shows a status consistent with processing or completion (e.g., no longer "Not Yet Approved" once approved and processed).
- In each selected store, the quantity discount that was set in the worksheet is reflected for those items (e.g., the item’s quantity discount or discount pricing table in the store matches the selection made in the worksheet).
- Only the stores that were selected for the worksheet receive the discount updates; unselected stores are unchanged. If the option **Do not allow Central to override the Item Discount in Stores** is selected under File | Configuration, Central may not push item discounts to stores via item update packages; this scenario assumes the worksheet synchronization path applies.

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **322: Change Item Discounts**, confirm the worksheet is present and its status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- **Store(s):** For at least one item that was modified in Worksheet 322, open the item in the store (e.g., Merchandising > Items > item, Pricing tab or equivalent where quantity discount is configured) and confirm that the New Quantity Discount (or quantity discount pricing) matches the value or configuration set in the worksheet in Central Manager.
- **Data consistency:** Compare the quantity discount settings in the worksheet in Central Manager with the same items in each selected store; the discount configuration in the store matches the Central configuration for those items.

## Pass Criteria
- Worksheet updates appear correctly in the selected store(s).

## Fail Criteria
- Worksheet changes do not appear in store configuration.
- Data mismatch between Central and Store.
- Synchronization fails or executes incorrectly.

## Risks / Assumptions
- Worksheet synchronization relies on scheduled synchronization services.
- System clocks between Central and Store environments are synchronized.

## Known Issues / Notes
- Bug 204372: Central > Worksheet synchronization issue