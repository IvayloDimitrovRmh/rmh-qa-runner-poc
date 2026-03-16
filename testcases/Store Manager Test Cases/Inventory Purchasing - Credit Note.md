# Inventory / Purchasing

## Metadata
Feature: Inventory / Purchasing Synchronization  
Business Area: Inventory/Purchasing  
Source System: Store  
Target System: Central  
Sync Direction: Store -> Central  
Release: Unknown  
Priority: 13  

---

# Scenario: Credit Note Synchronization

## Preconditions
- Store and Central synchronization services are active.
- Supplier records exist.
- Items exist in the inventory catalog.
- User has permissions to create and modify Credit Notes.
- Store is configured for synchronization with Central.

## Required Test Data
- Valid Supplier
- Existing inventory item
- Credit Note reference number
- Item quantities
- Item cost or credit values
- Store configured for synchronization

## Navigation Path
Store Manager → Inventory/Purchasing → Credit Notes

## Execution Steps
1. Create a new Credit Note in Store Manager.
2. Select a valid supplier associated with the credit.
3. Add one or more items to the Credit Note using the Items tab.
4. Enter item quantities and relevant pricing or cost adjustments.
5. Save the Credit Note.
6. Modify the Credit Note by changing quantities, item values, or header information.
7. Optionally delete the Credit Note.
8. Allow synchronization to occur or manually trigger the sync process.
9. Verify the Credit Note record in Central.

## Expected Results
- Credit Note is inserted into Central when created in Store.
- Updates to the Credit Note in Store synchronize to Central.
- Deleting the Credit Note in Store removes or updates the corresponding record in Central.
- Item-level data, including quantities from the Items tab, is synchronized correctly.

## Validation Checks
- Credit Note record exists in Central.
- Supplier and Credit Note header information match between Store and Central.
- Item lines and quantities match between systems.
- Updates are reflected accurately after synchronization.
- No duplicate Credit Note records are created.