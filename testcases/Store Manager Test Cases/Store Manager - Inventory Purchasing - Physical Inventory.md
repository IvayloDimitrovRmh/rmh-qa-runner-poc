# Inventory / Purchasing

## Metadata
Feature: Inventory / Purchasing Synchronization  
Business Area: Inventory/Purchasing  
Source System: Store  
Target System: Central  
Sync Direction: Store -> Central  
Release: Unknown  
Priority: 14  

---

# Scenario: Physical Inventory Synchronization

## Business Entity
Physical Inventory

## Business Purpose
Ensure that Physical Inventory adjustments performed in Store are synchronized correctly to Central so that inventory counts, committed quantities, and stock valuation remain accurate across the entire system.

## Trigger
A user performs a Physical Inventory count or adjustment in Store Manager.

## Preconditions
- Store and Central synchronization services are active.
- Inventory items exist in the system.
- The user has permissions to perform Physical Inventory adjustments.
- Store is configured for synchronization with Central.

## Required Test Data
- Existing inventory item
- Physical Inventory document or session
- Item quantity adjustments
- Store configured for synchronization

## Navigation Path
Store Manager → Inventory/Purchasing → Physical Inventory

## Execution Steps
1. Create or open a Physical Inventory session in Store Manager.
2. Add one or more items to the Physical Inventory list.
3. Enter new counted quantities for the items.
4. Commit the Physical Inventory adjustments.
5. Save or finalize the Physical Inventory document.
6. Allow synchronization to process or manually trigger the sync.
7. Verify the Physical Inventory updates in Central.

## Expected Results
- Physical Inventory record is inserted or updated in Central after it is committed in Store.
- Adjusted quantities are reflected correctly in Central.
- Committed quantity values match between Store and Central.
- Inventory levels remain consistent across systems.

## Validation Checks
- Physical Inventory record appears in Central.
- Adjusted item quantities match between Store and Central.
- Committed quantities are synchronized correctly.
- No duplicate or missing inventory records appear.

## Pass Criteria
- Central reflects the Physical Inventory updates performed in Store.
- Adjusted quantities and committed values match between systems.

## Fail Criteria
- Physical Inventory record does not appear in Central.
- Committed quantities differ between Store and Central.
- Inventory values are inconsistent after synchronization.

## Risks / Assumptions
- Inventory synchronization may be delayed depending on sync intervals.
- Some inventory adjustments may depend on store configuration and item settings.
- Exact field behavior should be verified against RMH documentation during test execution.

## Known Issues / Notes
- Bug 204021: Store > Physical Inventory: The new committed qty does not sync to Central