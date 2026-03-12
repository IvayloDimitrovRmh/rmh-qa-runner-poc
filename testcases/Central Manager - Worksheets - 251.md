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

# Scenario: Worksheet 251 Synchronization to Stores

## Business Entity
Worksheet (ID: 251)

## Business Purpose
Ensure that changes made in Worksheet 251 in Central Manager synchronize correctly to the selected stores based on the configured effective date and time, so that operational data and configurations remain consistent across the system.

## Trigger
A user updates Worksheet 251 in Central Manager and the effective date/time for synchronization is reached.

## Preconditions
- Central and Store synchronization services are active.
- Stores are selected for worksheet synchronization.
- Effective date and time for the worksheet synchronization are configured.
- User has permission to modify worksheets.

## Required Test Data
- Worksheet ID: 251
- Effective date and time for synchronization
- Selected stores

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Locate Worksheet 251.
3. Modify worksheet data or configuration.
4. Set or confirm the effective date/time for synchronization.
5. Save the worksheet.
6. Wait until the effective date/time or trigger synchronization.
7. Verify the update appears in the selected store(s).

## Expected Results
- The worksheet changes are replicated to the selected store(s) after the worksheet is approved. (Documentation: approving the worksheet causes changes to be synchronized to the stores and to come into effect on the effective date and time.)
- The updated item pricing (or other editable columns maintained by Worksheet 251: Update Inventory - Item Prices) is applied in each selected store so that the modified values are in effect at or after the configured effective date/time.
- In Central Manager, under **Worksheets** → **Worksheets Status** → **251: Update Inventory - Item Prices**, the worksheet shows a status consistent with processing or completion (e.g., no longer "Not Yet Approved" once approved and processed).
- In each selected store, the item pricing information that was changed in the worksheet is reflected for those items (e.g., in the store’s item data or Merchandising > Items so that price/cost or other updated fields match the worksheet).
- Only the stores that were selected for the worksheet receive the updates; unselected stores are unchanged.

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **251: Update Inventory - Item Prices**, confirm the worksheet is present and its status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- **Store(s):** For at least one item that was modified in Worksheet 251, open the item in the store (e.g., Merchandising > Items or equivalent) and confirm that the price (and any other pricing-related fields that were updated in the worksheet) matches the value set in the worksheet in Central Manager.
- **Data consistency:** Compare the modified item pricing values in the worksheet in Central Manager with the same items in each selected store; the values in the store match the Central configuration for those items.

## Pass Criteria
- Worksheet updates appear correctly in the selected store(s).

## Fail Criteria
- Worksheet changes do not appear in the store.
- Data mismatch between Central and Store.
- Synchronization does not occur at the scheduled time.

## Risks / Assumptions
- Worksheet synchronization depends on scheduled synchronization services.
- Time configuration must match system timezone settings.

## Known Issues / Notes
- Bug 204372: Central > Worksheet synchronization issue