# Inventory / Purchasing Synchronization

## Metadata
Feature: Inventory / Purchasing Synchronization  
Business Area: Inventory/Purchasing  
Source System: Store  
Target System: Central  
Sync Direction: Store -> Central  
Release: Unknown  
Priority: 1  

---

# Scenario: Purchase Order - Store / Customer Synchronization

## Preconditions
- Store and Central are connected and synchronization services are active.
- Required suppliers, items, and stores exist in the system.
- User has permission to create and modify purchase orders.

## Required Test Data
- Existing Item with valid cost
- Valid Supplier
- Store configured for synchronization
- Customer record (if purchase order is customer-related)

## Navigation Path
Store Manager → Inventory/Purchasing → Purchase Orders

## Execution Steps
1. Create a new Purchase Order in Store Manager and associate it with a Store or Customer.
2. Add at least one item to the purchase order.
3. Save the purchase order.
4. Update the purchase order by modifying quantities or item details.
5. Optionally delete the purchase order.
6. Trigger synchronization or wait for the sync service to run.

## Expected Results
- Purchase Order is inserted into Central after creation.
- Purchase Order updates in Store are reflected in Central.
- Deleting the Purchase Order in Store removes or updates the corresponding record in Central.

## Validation Checks
- Purchase Order appears in Central with the correct data.
- Item quantities and supplier references match between Store and Central.
- Updates to the purchase order are reflected in Central.
- No duplicate records are created.

---

# Scenario: Purchase Order - Update Item Cost Synchronization

## Preconditions
- Existing purchase order in Store.
- Items with defined costs.
- Store and Central synchronization enabled.

## Required Test Data
- Existing Purchase Order
- Item included in the purchase order
- Updated cost value

## Navigation Path
Store Manager → Inventory/Purchasing → Purchase Orders

## Execution Steps
1. Open an existing Purchase Order in Store Manager.
2. Modify the cost of an item in the purchase order.
3. Save the changes.
4. Allow synchronization to run.

## Expected Results
- Updated item cost is synchronized to Central.
- Central reflects the updated cost within the corresponding purchase order.

## Validation Checks
- Item cost in Central matches the updated value from Store.
- No additional purchase order records are created.

---

# Scenario: Purchase Order - Update Supplier Cost and Tax Rate Synchronization

## Preconditions
- Supplier configured in the system.
- Purchase order referencing the supplier exists.
- Synchronization between Store and Central is enabled.

## Required Test Data
- Existing Purchase Order
- Supplier with cost and tax rate fields

## Navigation Path
Store Manager → Inventory/Purchasing → Purchase Orders

## Execution Steps
1. Open an existing Purchase Order in Store Manager.
2. Update the supplier cost for one or more items.
3. Modify the tax rate if applicable.
4. Save the purchase order.
5. Allow synchronization to occur.

## Expected Results
- Updated supplier cost and tax rate values are reflected in Central.

## Validation Checks
- Supplier cost values match between Store and Central.
- Tax rates remain consistent after synchronization.

## Pass Criteria
- Supplier cost and tax rate updates appear correctly in Central.

---

# Scenario: Purchase Order - Update Item Price Synchronization

## Preconditions
- Existing purchase order in Store.
- Items included with defined pricing.

## Required Test Data
- Purchase Order with items
- Updated item price value

## Navigation Path
Store Manager → Inventory/Purchasing → Purchase Orders

## Execution Steps
1. Open an existing Purchase Order in Store Manager.
2. Modify the price of one or more items.
3. Save the purchase order.
4. Allow synchronization to occur.

## Expected Results
- Updated item price is reflected in Central.

## Validation Checks
- Item price matches between Store and Central.
- No duplicate records are created.