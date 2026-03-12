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

# Scenario: Worksheet 261 Synchronization to Stores

## Business Entity
Worksheet (ID: 261)

## Business Purpose
Ensure that changes made in Worksheet 261 in Central Manager synchronize correctly to the selected stores based on the configured effective date and time so that operational data and configuration updates remain consistent across systems.

## Trigger
A user modifies Worksheet 261 in Central Manager and the effective synchronization date/time is reached.

## Preconditions
- Central and Store synchronization services are active.
- Stores are selected for worksheet synchronization.
- Effective date/time is configured for worksheet updates.
- User has permission to modify worksheets.

## Required Test Data
- Worksheet ID: 261
- Effective synchronization date/time
- Selected store(s)

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Locate Worksheet 261.
3. Modify worksheet configuration or data.
4. Set or confirm the effective date/time for synchronization.
5. Save the worksheet.
6. Wait until the configured effective date/time or trigger synchronization manually.
7. Verify the update appears in the selected store(s).

## Expected Results
- The worksheet changes are replicated to the selected store(s) after the worksheet is approved. (Documentation: approving the worksheet causes items to be downloaded to the stores and to be added to inventory on the effective date and time.)
- **New items:** Items that were added to the worksheet are inserted into each selected store’s database; the new items appear in the store (e.g., in Merchandising > Items or equivalent) with all item properties as defined in Central Manager.
- **Existing items:** For items that already exist in the store, all item properties (e.g., description, pricing, cost, attributes, extended properties) are updated from Central Manager; store item quantities are not overridden by Central quantities.
- In Central Manager, under **Worksheets** → **Worksheets Status** → **261: Download Items**, the worksheet shows a status consistent with processing or completion (e.g., no longer unapproved once approved and processed).
- Only the stores that were selected for the worksheet receive the item additions or property updates; unselected stores are unchanged.

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **261: Download Items**, confirm the worksheet is present and its status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- **Store(s) – new items:** For at least one item that was in the worksheet as a new item, confirm the item exists in the store (e.g., Merchandising > Items); confirm key properties (e.g., description, lookup code, price, cost) match the Central Manager definition for that item.
- **Store(s) – existing items:** For at least one item that already existed in the store and was in the worksheet, confirm that item properties (other than quantity) have been updated to match Central Manager (e.g., description, pricing, cost); confirm that the store’s on-hand or quantity value was not overwritten by Central.
- **Data consistency:** Item properties in the store for the worksheet’s items match the properties defined in Central Manager for those items (excluding quantity for existing items).

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