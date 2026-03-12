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

# Scenario: Worksheet 303 Synchronization to Stores

## Business Entity
Worksheet (ID: 303)

## Business Purpose
Ensure that changes made in Worksheet 303 in Central Manager synchronize correctly to the selected stores based on the configured effective date and time so that operational data and configurations remain consistent across systems.

## Trigger
A user updates Worksheet 303 in Central Manager and the configured effective date/time for synchronization is reached.

## Preconditions
- Central and Store synchronization services are active.
- Stores are selected for worksheet synchronization.
- Effective date and time are configured for the worksheet.
- User has permission to modify worksheets.

## Required Test Data
- Worksheet ID: 303
- Effective synchronization date/time
- Selected stores

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Locate Worksheet 303.
3. Modify worksheet configuration or data.
4. Set or confirm the effective date/time for synchronization.
5. Save the worksheet.
6. Wait until the configured effective date/time or trigger synchronization manually.
7. Verify the update appears in the selected store(s).

## Expected Results
- The worksheet changes are replicated to the selected store(s) after the worksheet is approved. (Documentation: approving the worksheet causes changes to be synchronized to the stores and to come into effect on the effective date and time.)
- The updated ordering information (Min. Order, Cost, Reorder, MPQ, Purchase Tax) is applied in each selected store so that the modified values are in effect at or after the configured effective date/time. The same ordering values from the worksheet apply to all selected stores; the worksheet does not support different ordering information per store.
- In Central Manager, under **Worksheets** → **Worksheets Status** → **303: Change Item Ordering Info**, the worksheet shows a status consistent with processing or completion (e.g., no longer "Not Yet Approved" once approved and processed).
- In each selected store, the item ordering information that was changed in the worksheet is reflected for those items (e.g., on the item’s Purchase tab or equivalent ordering/purchasing fields in the store).
- Only the stores that were selected for the worksheet receive the ordering information updates; unselected stores are unchanged.

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **303: Change Item Ordering Info**, confirm the worksheet is present and its status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- **Store(s):** For at least one item that was modified in Worksheet 303, open the item in the store (e.g., Merchandising > Items > item > Purchase tab or equivalent) and confirm that the ordering fields that were updated in the worksheet (Min. Order, Cost, Reorder, MPQ, Purchase Tax) match the values set in the worksheet in Central Manager.
- **Data consistency:** Compare the modified ordering information in the worksheet in Central Manager with the same items in each selected store; the values in the store match the Central configuration for those items.

## Pass Criteria
- Worksheet updates appear correctly in the selected store(s).

## Fail Criteria
- Worksheet changes do not appear in store configuration.
- Data mismatch between Central and Store.
- Synchronization occurs incorrectly or does not occur.

## Risks / Assumptions
- Worksheet synchronization depends on system synchronization scheduling.
- Time configuration must align between Central and Store environments.

## Known Issues / Notes
- Bug 204372: Central > Worksheet synchronization issue