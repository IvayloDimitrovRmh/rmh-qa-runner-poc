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

# Scenario: Worksheet 340 Synchronization to Stores

## Business Entity
Worksheet (ID: 340)

## Business Purpose
Ensure that Worksheet 340 created or modified in Central Manager is synchronized and inserted into the selected store(s) so that store operations and configuration remain aligned with Central.

## Trigger
A user creates or modifies Worksheet 340 in Central Manager and the configured effective date/time for synchronization is reached.

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

## Expected Results
- After the worksheet is approved, the purchase order(s) are synchronized to the stores. (Documentation: approving the worksheet causes changes to be synchronized to the stores and to come into effect on the effective date and time.)
- **Purchase order(s) are created at the applicable store(s)** (the store(s) selected for the worksheet, per the inventory delivery option: individual POs per store, master PO delivered to each store, or deliver to one store for later disbursement). The purchase order(s) contain the items and order information (e.g., Order Number, Item Description, Quantity, Price, Extended, Purchase Tax) defined in the worksheet and must be **released** in Store Manager. Optionally, if **Auto Release Order** is enabled (Setup | Inventory/Purchasing | Order Setting | Global Option), the purchase order(s) may be automatically set to **Released** status in the store(s).
- In Central Manager, under **Worksheets** → **Worksheets Status** → **340: PO Planner**, the worksheet is present. Once approved, the worksheet status will not change until the purchase order is received at the store.
- The purchase order(s) in the store(s) reflect the worksheet data: items, quantities, pricing, and PO details (e.g., Requisitioner, Ship via, Date required, Terms) as configured in Central Manager. Only the store(s) selected for the worksheet receive the purchase order(s).

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **340: PO Planner**, confirm the worksheet is present and has been approved (not "Not Yet Approved"). Note that worksheet status does not change until the purchase order is received at the store.
- **Store(s):** In Store Manager, confirm **purchase order(s)** exist that correspond to the worksheet (e.g., same items, quantities, and order information as on the worksheet Contents tab). Confirm the purchase order(s) can be released (and, when applicable, received). If Auto Release Order is enabled, confirm the PO(s) are in Released status.
- **Data consistency:** Compare the items, quantities, and order information in the worksheet in Central Manager with the purchase order(s) in each applicable store; the store PO(s) match the Central worksheet configuration.

## Pass Criteria
- Worksheet is successfully inserted into the selected store(s).

## Fail Criteria
- Worksheet does not appear in the store(s).
- Data mismatch between Central and Store.
- Synchronization fails or executes incorrectly.

## Risks / Assumptions
- Worksheet synchronization depends on active Central-to-Store synchronization services.
- System time between Central and Store environments is aligned.

## Known Issues / Notes
- Bug 204372: Central > Worksheet synchronization issue