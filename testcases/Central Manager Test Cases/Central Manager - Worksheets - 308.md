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

# Scenario: Worksheet 308 Synchronization to Stores

## Business Entity
Worksheet (ID: 308)

## Business Purpose
Ensure that changes made in Worksheet 308 in Central Manager synchronize correctly to the selected stores based on the configured effective date and time so that operational data and store configuration remain aligned with Central.

## Trigger
A user updates Worksheet 308 in Central Manager and the configured effective date/time for synchronization is reached.

## Preconditions
- Central and Store synchronization services are active.
- Stores are selected for worksheet synchronization.
- Effective date/time is configured for worksheet updates.
- User has permission to modify worksheets.

## Required Test Data
- Worksheet ID: 308
- Effective synchronization date/time
- Selected store(s)

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Locate Worksheet 308.
3. Modify worksheet configuration or operational data.
4. Set or confirm the effective date/time for synchronization.
5. Save the worksheet.
6. Wait until the configured effective date/time or trigger synchronization manually.
7. Verify the update appears in the selected store(s).

## Expected Results
- The worksheet changes are replicated to the selected store(s) after the worksheet is approved. (Documentation: approving the worksheet causes changes to be synchronized to the stores and to come into effect on the effective date and time.)
- The updated restocking information (Reorder Point and Restock Level; documentation also references New Reorder Point and New Restock Level) is applied in each selected store so that the modified values are in effect at or after the configured effective date/time. Restock Level must be greater than Reorder Point.
- Worksheet 308 can create one worksheet for all selected stores or one worksheet per store if **Create individual worksheet per store** was selected when the worksheet was generated.
- If the option **Style 308 worksheet (Change Item Restocking Info) uses current data in Central database** is not selected (File | Configuration | Options), the worksheet is used to change Reorder Point and Restock Level values for the selected stores. If that option is selected, the worksheet synchronizes the current Reorder Point and Restock Level from the selected stores with Central Manager (opposite direction); for this scenario, assume the worksheet is used to push changes to stores.
- In Central Manager, under **Worksheets** → **Worksheets Status** → **308: Change Item Restocking Info**, the worksheet shows a status consistent with processing or completion (e.g., no longer "Not Yet Approved" once approved and processed).
- In each selected store, the Reorder Point and Restock Level that were changed in the worksheet are reflected for those items (e.g., on the item’s Inventory tab or Ordering Guidance / restocking fields in the store).
- Only the stores that were selected for the worksheet receive the restocking information updates; unselected stores are unchanged.

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **308: Change Item Restocking Info**, confirm the worksheet is present and its status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- **Store(s):** For at least one item that was modified in Worksheet 308, open the item in the store (e.g., Merchandising > Items > item > Inventory tab or equivalent) and confirm that Reorder Point and Restock Level match the values set in the worksheet in Central Manager, and that Restock Level is greater than Reorder Point.
- **Data consistency:** Compare the Reorder Point and Restock Level values in the worksheet in Central Manager with the same items in each selected store; the values in the store match the Central configuration for those items.

## Pass Criteria
- Worksheet updates appear correctly in the selected store(s).

## Fail Criteria
- Worksheet changes do not appear in store configuration.
- Data mismatch between Central and Store.
- Synchronization occurs incorrectly or fails.

## Risks / Assumptions
- Worksheet synchronization depends on scheduled synchronization services.
- Time configuration must align between Central and Store environments.

## Known Issues / Notes
- Bug 204372: Central > Worksheet synchronization issue