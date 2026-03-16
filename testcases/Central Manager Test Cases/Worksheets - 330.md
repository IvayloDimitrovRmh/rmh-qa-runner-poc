# Worksheets

## Metadata
Feature: Worksheet Synchronization  
Business Area: Worksheets > Worksheets  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: MVP 1.1   
Priority: Unknown  

---

# Scenario: Worksheet 330 Synchronization to Stores

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

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **330: Inventory Transfer**, confirm the worksheet is present and its status indicates processing (e.g., In Process until transfer in is committed in destination; not "Not Yet Approved" after approval).
- **Source store:** In Store Manager, confirm a **transfer out** exists that corresponds to the worksheet (e.g., same items and quantities as on the worksheet Contents tab). Confirm the transfer out can be released, shipped, and committed.
- **Destination store:** After the transfer out is committed at the source store, in Store Manager at the destination store confirm a **transfer in** exists that corresponds to the worksheet (e.g., same items and quantities). Confirm the transfer in can be released, received, and committed.
- **Data consistency:** Compare the items and transfer quantities in the worksheet in Central Manager with the transfer out (source) and transfer in (destination); the store transfer records match the Central worksheet configuration.