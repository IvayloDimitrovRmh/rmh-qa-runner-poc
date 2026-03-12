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

# Scenario: Worksheet 320 Synchronization to Stores

## Business Entity
Worksheet (ID: 320)

## Business Purpose
Ensure that changes made in Worksheet 320 in Central Manager synchronize correctly to the selected stores so store-level data reflects the latest configuration and operational updates.

## Trigger
A user modifies Worksheet 320 in Central Manager and the effective synchronization date/time is reached.

## Preconditions
- Central and Store synchronization services are operational.
- Worksheet 320 exists in Central.
- Store(s) are selected for synchronization.
- Effective date/time for worksheet synchronization is configured.

## Required Test Data
- Worksheet ID: 320
- Selected store(s)
- Effective synchronization date/time

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Locate Worksheet 320.
3. Modify worksheet configuration or operational values.
4. Ensure store(s) are selected for synchronization.
5. Save the worksheet.
6. Wait until the effective date/time or trigger synchronization.
7. Verify the worksheet changes appear in the selected store(s).

## Expected Results
- The worksheet changes are replicated to the selected store(s) after the worksheet is approved. (Documentation: approving the worksheet causes changes to be synchronized to the stores and to come into effect on the effective date and time.)
- The updated item sales tax selection (Sales Tax column) is applied in each selected store so that the modified values are in effect at or after the configured effective date/time. Worksheet 320 creates a separate worksheet for each store, so each store can have different sales tax assignments per item if different worksheets were configured per store.
- In Central Manager, under **Worksheets** → **Worksheets Status** → **320: Adjust Item Sales Tax**, the worksheet(s) show a status consistent with processing or completion (e.g., no longer "Not Yet Approved" once approved and processed).
- In each selected store, the sales tax that was set for each item in the worksheet is reflected for those items (e.g., the item’s sales tax or item tax assignment in the store matches the selection made in the worksheet).
- Only the stores that were selected for the worksheet receive the sales tax updates; unselected stores are unchanged.

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **320: Adjust Item Sales Tax**, confirm the worksheet(s) are present and their status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- **Store(s):** For at least one item that was modified in Worksheet 320, open the item in the store (e.g., Merchandising > Items > item, or the screen where item tax / sales tax is assigned) and confirm that the sales tax (or item tax) assigned to the item matches the selection made in the worksheet in Central Manager.
- **Data consistency:** Compare the sales tax selections in the worksheet in Central Manager with the same items in each selected store; the sales tax configuration in the store matches the Central configuration for those items.

## Pass Criteria
- Worksheet updates are correctly inserted or updated in the store(s).

## Fail Criteria
- Worksheet changes do not appear in store(s).
- Data mismatch between Central and Store.
- Synchronization process fails or executes incorrectly.

## Risks / Assumptions
- Worksheet synchronization relies on active sync services between Central and Store.
- System clocks between Central and Store environments are aligned.

## Known Issues / Notes
- Bug 204372: Central > Worksheet synchronization issue