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

# Scenario: Worksheet 321 Synchronization to Stores

## Business Entity
Worksheet (ID: 321)

## Business Purpose
Ensure that updates made to Worksheet 321 in Central Manager synchronize correctly to the selected stores so store-level operational data and configuration remain consistent with Central.

## Trigger
A user modifies Worksheet 321 in Central Manager and the configured effective synchronization date/time is reached.

## Preconditions
- Central and Store synchronization services are running.
- Worksheet 321 exists in Central Manager.
- One or more stores are selected for synchronization.
- Effective date/time for synchronization is configured.

## Required Test Data
- Worksheet ID: 321
- Selected store(s)
- Effective synchronization date/time

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Locate Worksheet 321.
3. Modify worksheet configuration or operational values.
4. Confirm the selected store(s) for synchronization.
5. Save the worksheet.
6. Wait for the configured effective date/time or trigger synchronization manually.
7. Verify the worksheet changes appear in the selected store(s).

## Expected Results
- The worksheet changes are replicated to the selected store(s) after the worksheet is approved. (Documentation: approving the worksheet causes changes to be synchronized to the stores and to come into effect on the effective date and time.)
- The updated block sales configuration (Block Sales Type, Block Sales Reason, Block Sales Schedule, Block Sales Start Date, Block Sales End Date) is applied in each selected store so that the modified values are in effect at or after the configured effective date/time. Worksheet 321 creates one worksheet for all selected stores, so the same block sales settings from the worksheet apply to all selected stores.
- In Central Manager, under **Worksheets** → **Worksheets Status** → **321: Change Item Block Sales**, the worksheet shows a status consistent with processing or completion (e.g., no longer "Not Yet Approved" once approved and processed).
- In each selected store, the block sales settings that were set in the worksheet are reflected for those items (e.g., the item shows block sales for this item with the configured type, reason, schedule, and start/end date as defined in the worksheet).
- Only the stores that were selected for the worksheet receive the block sales updates; unselected stores are unchanged. If the option **Do not allow Central to override the Item Block Sales in Stores** is selected under File | Configuration, Central may not push block sales to stores via item update packages; this scenario assumes the worksheet synchronization path applies.

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **321: Change Item Block Sales**, confirm the worksheet is present and its status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- **Store(s):** For at least one item that was modified in Worksheet 321, open the item in the store (e.g., Merchandising > Items > item, or the screen where block sales is configured) and confirm that Block Sales Type, Block Sales Reason, Block Sales Schedule, Block Sales Start Date, and Block Sales End Date match the values set in the worksheet in Central Manager.
- **Data consistency:** Compare the block sales settings in the worksheet in Central Manager with the same items in each selected store; the block sales configuration in the store matches the Central configuration for those items.

## Pass Criteria
- Worksheet updates are successfully inserted or updated in the store(s).

## Fail Criteria
- Worksheet changes do not appear in store(s).
- Data mismatch between Central and Store.
- Synchronization fails or occurs incorrectly.

## Risks / Assumptions
- Worksheet synchronization relies on active communication between Central and Store.
- System time between Central and Store environments is synchronized.

## Known Issues / Notes
- Bug 204372: Central > Worksheet synchronization issue