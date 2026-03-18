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

# Scenario: Worksheet 340 Synchronization to Stores

## Preconditions
- Central and Store synchronization services are active.
- Worksheet 340 exists in Central Manager.
- Store(s) are selected for worksheet synchronization.
- Effective date/time is configured.

## Required Test Data
- Worksheet ID: 340
- Selected store(s)
- Effective synchronization date/time

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to **Worksheets → Worksheets**.
2. Create or modify **Worksheet 340**.
3. Configure the store(s) that should receive the worksheet update.
4. Set or verify the effective synchronization date/time.
5. Save the worksheet.
6. Wait for the synchronization trigger or execute synchronization.
7. Verify that the worksheet record is inserted into the selected store(s).

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **340: PO Planner**, confirm the worksheet is present and has been approved (not "Not Yet Approved"). Note that worksheet status does not change until the purchase order is received at the store.
- **Store(s):** In Store Manager, confirm **purchase order(s)** exist that correspond to the worksheet (e.g., same items, quantities, and order information as on the worksheet Contents tab). Confirm the purchase order(s) can be released (and, when applicable, received). If Auto Release Order is enabled, confirm the PO(s) are in Released status.
- **Data consistency:** Compare the items, quantities, and order information in the worksheet in Central Manager with the purchase order(s) in each applicable store; the store PO(s) match the Central worksheet configuration.