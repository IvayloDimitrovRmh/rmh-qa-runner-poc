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

# Scenario: Worksheet 252 Synchronization to Stores

## Business Entity
Worksheet (ID: 252)

## Business Purpose
Ensure that changes made in Worksheet 252 in Central Manager synchronize correctly to the selected stores based on the configured effective date and time so that operational data and configurations remain consistent across systems.

## Trigger
A user updates Worksheet 252 in Central Manager and the configured effective date/time for synchronization is reached.

## Preconditions
- Central and Store synchronization services are active.
- Stores are selected for worksheet synchronization.
- Effective date and time are configured for the worksheet.
- User has permission to modify worksheets.

## Required Test Data
- Worksheet ID: 252
- Effective synchronization date/time
- Selected stores

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Locate Worksheet 252.
3. Modify worksheet data or configuration.
4. Set or confirm the effective date/time for synchronization.
5. Save the worksheet.
6. Wait until the effective date/time or trigger synchronization.
7. Verify the update appears in the selected store(s).

## Expected Results
- The worksheet changes are replicated to the selected store(s) after the worksheet is approved. (Documentation: approving the worksheet causes changes to be synchronized to the stores and to come into effect on the effective date and time.)
- The updated matrix item component pricing and cost (e.g., Price; Price A, B, C; MSRP; Sale Price; Sale Start Date; Sale End Date; Lower Bound; Upper Bound; Buydown Price; Buydown Quantity) is applied in each selected store so that the modified values are in effect at or after the configured effective date/time.
- In Central Manager, under **Worksheets** → **Worksheets Status** → **252: Update Matrix Items Prices**, the worksheet shows a status consistent with processing or completion (e.g., no longer "Not Yet Approved" once approved and processed).
- In each selected store, the matrix item component pricing and cost information that was changed in the worksheet is reflected for those components (e.g., on the component items’ Pricing tab or equivalent store item data).
- Only the stores that were selected for the worksheet receive the updates; unselected stores are unchanged.

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **252: Update Matrix Items Prices**, confirm the worksheet is present and its status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- **Store(s):** For at least one matrix item component that was modified in Worksheet 252, open the component item in the store (e.g., Merchandising > Items or Item Matrices / component item, Pricing tab) and confirm that the price, cost, and any other pricing-related fields that were updated in the worksheet (e.g., Price, Price A/B/C, MSRP, Sale Price, Sale Start/End Date, Buydown) match the values set in the worksheet in Central Manager.
- **Data consistency:** Compare the modified matrix component pricing and cost values in the worksheet in Central Manager with the same matrix components in each selected store; the values in the store match the Central configuration for those components.

## Pass Criteria
- Worksheet updates appear correctly in the selected store(s).

## Fail Criteria
- Worksheet changes do not appear in store configuration.
- Data mismatch between Central and Store.
- Synchronization occurs at the wrong time or does not occur.

## Risks / Assumptions
- Worksheet synchronization depends on the synchronization scheduler and timing configuration.
- Timezone configuration must match between Central and Store environments.

## Known Issues / Notes
- Bug 204372: Central > Worksheet synchronization issue