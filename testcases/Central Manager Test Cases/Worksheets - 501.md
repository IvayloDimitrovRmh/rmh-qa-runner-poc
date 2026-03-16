# Worksheets

## Metadata
Feature: Worksheet Synchronization  
Business Area: Worksheets > Worksheets  
Source System: Store(s)  
Target System: Central  
Sync Direction: Store -> Central  
Release: MVP 1.1   
Priority: Unknown  

---

# Scenario: Worksheet 501 Request Inventory from Stores Synchronization

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

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **501: Request Full Inventory Count**, confirm the worksheet is present and its status indicates that processing has completed (e.g., not "Not Yet Approved" after approval; processing finished so store data has been pulled to Central).
- **Store quantities in Central:** After Worksheet 501 has completed processing, run **Task 190 - Reconcile Inventory** (Wizards → Task 190), select the store, and confirm that item quantities from the store are available for review (e.g., store quantities and any differences with Central are shown; New Central Qty. column is populated or can be edited). After committing Task 190, confirm that the Central Manager database has been updated with the item quantities in the New Central Qty. column so that Central inventory records reflect the store data.
- **Data consistency:** For the selected store(s), the quantities that were in the store at the time of the request are reflected in the reconciliation data in Central (Task 190); after Task 190 Commit, the Central database quantities match the committed New Central Qty. values for the reconciled store.