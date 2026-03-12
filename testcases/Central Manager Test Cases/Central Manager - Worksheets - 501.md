# Worksheets

## Metadata
Feature: Worksheet Synchronization  
Business Area: Worksheets > Worksheets  
Source System: Store(s)  
Target System: Central  
Sync Direction: Store -> Central  
Release: Unknown  
Priority: Unknown  

---

# Scenario: Worksheet 501 Request Inventory from Stores Synchronization

## Business Entity
Worksheet (ID: 501)

## Business Purpose
Ensure that when inventory is requested from selected stores through Worksheet 501, the resulting inventory updates synchronize back to Central so that Central maintains accurate and consolidated inventory data across stores.

## Trigger
A user initiates an inventory request from selected stores using Worksheet 501 and the configured effective date/time for synchronization is reached.

## Preconditions
- Central and Store synchronization services are active.
- Worksheet 501 exists in Central Manager.
- One or more stores are selected for the inventory request.
- Effective date/time for synchronization is configured.
- Stores have inventory data available to respond to the request.

## Required Test Data
- Worksheet ID: 501
- Selected store(s)
- Effective synchronization date/time
- Inventory items available in store(s)

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Locate Worksheet 501.
3. Configure the worksheet to request inventory from the selected store(s).
4. Set or confirm the effective synchronization date/time.
5. Save the worksheet.
6. Allow synchronization to run or trigger it manually.
7. Verify that the requested inventory data from the store(s) is synchronized back to Central.

## Expected Results
- After the worksheet is approved and processed, **store quantities are pulled into the Central Manager database** (Documentation: you must approve and process Worksheet 501 to pull store quantities into the Central Manager database.)
- The requested inventory data from the selected store(s) is synchronized to Central so that Central has the store quantity data available for reconciliation. The worksheet is typically run after stores complete their physical inventory counts.
- In Central Manager, under **Worksheets** → **Worksheets Status** → **501: Request Full Inventory Count**, the worksheet shows a status consistent with processing or completion (e.g., no longer "Not Yet Approved" after approval; processing completes so that store data has been received). Note: processing can take hours; processing Worksheet 501 locks down item management functions in Central until the worksheet is processed.
- When Worksheet 501 has finished processing, **Task 190: Reconcile Inventory** can be run to reconcile store quantities with the quantities in the Central Manager database (review differences, edit New Central Qty. as required, and Commit to update the Central database with the reconciled quantities). Central inventory records can then reflect the updated quantities from the store(s) after Task 190 is committed.
- Only the store(s) selected for the worksheet contribute their inventory data to Central; no duplicate or inconsistent inventory records are created for items when the workflow is followed correctly.

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **501: Request Full Inventory Count**, confirm the worksheet is present and its status indicates that processing has completed (e.g., not "Not Yet Approved" after approval; processing finished so store data has been pulled to Central).
- **Store quantities in Central:** After Worksheet 501 has completed processing, run **Task 190 - Reconcile Inventory** (Wizards → Task 190), select the store, and confirm that item quantities from the store are available for review (e.g., store quantities and any differences with Central are shown; New Central Qty. column is populated or can be edited). After committing Task 190, confirm that the Central Manager database has been updated with the item quantities in the New Central Qty. column so that Central inventory records reflect the store data.
- **Data consistency:** For the selected store(s), the quantities that were in the store at the time of the request are reflected in the reconciliation data in Central (Task 190); after Task 190 Commit, the Central database quantities match the committed New Central Qty. values for the reconciled store.

## Pass Criteria
- Inventory request results are successfully synchronized to Central.

## Fail Criteria
- Inventory data does not appear in Central.
- Data mismatch between Store and Central inventory records.
- Synchronization fails or occurs incorrectly.

## Risks / Assumptions
- Inventory synchronization depends on active communication between Store and Central services.
- Store systems must have available inventory data to respond to the request.

## Known Issues / Notes
- Bug 204372: Central > Worksheet synchronization issue