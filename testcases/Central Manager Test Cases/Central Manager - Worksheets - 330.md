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

# Scenario: Worksheet 330 Synchronization to Stores

## Business Entity
Worksheet (ID: 330)

## Business Purpose
Ensure that Worksheet 330 created or modified in Central Manager is inserted into the selected store(s) so store-level configuration and operational data remain synchronized with Central.

## Trigger
A user creates or updates Worksheet 330 in Central Manager and the configured effective date/time for synchronization is reached.

## Preconditions
- Central and Store synchronization services are operational.
- Worksheet 330 exists in Central Manager.
- One or more stores are selected for synchronization.
- Effective date/time for synchronization is configured.

## Required Test Data
- Worksheet ID: 330
- Selected store(s)
- Effective synchronization date/time

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Create or modify Worksheet 330.
3. Configure the selected store(s) for synchronization.
4. Set or confirm the effective date/time.
5. Save the worksheet.
6. Wait for the synchronization trigger or run synchronization manually.
7. Verify that the worksheet record is inserted in the selected store(s).

## Expected Results
- After the worksheet is approved, the transfer is synchronized to the stores. (Documentation: approving the worksheet causes changes to be synchronized to the stores and to come into effect on the effective date and time.)
- A **transfer out** is created in the **source store** (the store selected in "Move inventory from"). The transfer out contains the items and transfer quantities defined in the worksheet and must be released, shipped, and committed in Store Manager. Optionally, if **Auto Release Order** is enabled (Setup | Inventory/Purchasing | Order Setting | Global Option), the transfer out may be automatically set to Released status in the source store.
- When the transfer out is **committed** in the source store, a **transfer in** is created in the **destination store** (each store selected in "Move inventory to"). The transfer in must be released, received, and committed in Store Manager at the destination store.
- In Central Manager, under **Worksheets** → **Worksheets Status** → **330: Inventory Transfer**, the worksheet is present and its status is **In Process** until the transfer in is committed in the destination store; after the transfer in is committed, the worksheet can reach a completed or acknowledged state.
- The transfer out in the source store and the transfer in the destination store reflect the worksheet data: items, quantities (Quantity Transfer), and transfer-out details (e.g., Requisitioner, Ship via, Date required) as configured in Central Manager. Only the source and destination stores involved in the worksheet receive the transfer records.

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **330: Inventory Transfer**, confirm the worksheet is present and its status indicates processing (e.g., In Process until transfer in is committed in destination; not "Not Yet Approved" after approval).
- **Source store:** In Store Manager, confirm a **transfer out** exists that corresponds to the worksheet (e.g., same items and quantities as on the worksheet Contents tab). Confirm the transfer out can be released, shipped, and committed.
- **Destination store:** After the transfer out is committed at the source store, in Store Manager at the destination store confirm a **transfer in** exists that corresponds to the worksheet (e.g., same items and quantities). Confirm the transfer in can be released, received, and committed.
- **Data consistency:** Compare the items and transfer quantities in the worksheet in Central Manager with the transfer out (source) and transfer in (destination); the store transfer records match the Central worksheet configuration.

## Pass Criteria
- Worksheet is successfully inserted into the selected store(s).

## Fail Criteria
- Worksheet record does not appear in the store(s).
- Data mismatch between Central and Store.
- Synchronization fails or occurs incorrectly.

## Risks / Assumptions
- Synchronization relies on active communication between Central and Store services.
- System clocks between Central and Store environments are synchronized.

## Known Issues / Notes
- Bug 204372: Central > Worksheet synchronization issue