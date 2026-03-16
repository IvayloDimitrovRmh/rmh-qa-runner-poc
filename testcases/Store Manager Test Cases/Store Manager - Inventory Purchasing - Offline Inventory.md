# Inventory / Purchasing

## Metadata
Feature: Inventory / Purchasing Synchronization  
Business Area: Inventory/Purchasing  
Source System: Store  
Target System: Central  
Sync Direction: Store -> Central  
Release: Unknown  
Priority: 15  

---

# Scenario: Offline Inventory Quantity Synchronization

## Preconditions
- Store is configured to allow Offline Inventory operations.
- Synchronization service between Store and Central is active.
- Inventory items exist in the system.
- The user has permissions to perform inventory adjustments.

## Required Test Data
- Existing inventory item
- Offline Inventory adjustment record
- Updated item quantity
- Store configured for synchronization

## Navigation Path
Store Manager → Inventory/Purchasing → Offline Inventory

## Execution Steps
1. Open Offline Inventory functionality in Store Manager.
2. Select or create an Offline Inventory adjustment session.
3. Add one or more inventory items.
4. Modify the item quantities.
5. Save the Offline Inventory update.
6. Allow synchronization to occur or trigger the sync service.
7. Verify the updated quantities in Central.

## Expected Results
- Quantity updates performed in Offline Inventory are synchronized to Central.
- Updated item quantities in Store match the values recorded in Central.
- No duplicate or conflicting records are created.

## Validation Checks
- Updated item quantity appears in Central.
- Quantity values match between Store and Central.
- No synchronization errors occur.

---

# Scenario: Offline Inventory Quantity Synchronization

## Preconditions
- Store is configured to allow Offline Inventory operations.
- Synchronization service between Store and Central is active.
- Inventory items exist in the system.
- The user has permissions to perform inventory adjustments.

## Required Test Data
- Existing inventory item
- Offline Inventory adjustment record
- Updated item quantity
- Store configured for synchronization

## Navigation Path
Store Manager → Inventory/Purchasing → Offline Inventory

## Execution Steps
1. Open Offline Inventory functionality in Store Manager.
2. Select or create an Offline Inventory adjustment session.
3. Add one or more inventory items.
4. Modify the item quantities.
5. Save the Offline Inventory update.
6. Allow synchronization to occur or trigger the sync service.
7. Verify the updated quantities in Central.

## Expected Results
- Quantity updates performed in Offline Inventory are synchronized to Central.
- Updated item quantities in Store match the values recorded in Central.
- No duplicate or conflicting records are created.

## Validation Checks
- Updated item quantity appears in Central.
- Quantity values match between Store and Central.
- No synchronization errors occur.

---

# Scenario: Offline Inventory Quantity Synchronization to Main Store

## Preconditions
- Store is configured for Offline Inventory operations.
- Central synchronization service is active.
- Main store configuration exists.
- Inventory items exist in the system.

## Required Test Data
- Existing inventory item
- Offline Inventory adjustment record
- Updated item quantity
- Main store configured in the system

## Navigation Path
Store Manager → Inventory/Purchasing → Offline Inventory

## Execution Steps
1. Open Offline Inventory functionality.
2. Create or select an Offline Inventory adjustment.
3. Add inventory items to the adjustment list.
4. Update item quantities for the main store.
5. Save the adjustment.
6. Allow synchronization to occur.
7. Validate the updated quantities in Central.

## Expected Results
- Quantity updates for the main store synchronize to Central.
- Inventory quantities remain consistent between Store and Central.

## Validation Checks
- Item quantity updates appear in Central.
- Quantity values match the Store adjustments.