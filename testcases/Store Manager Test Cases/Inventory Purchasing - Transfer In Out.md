# Inventory / Purchasing

## Metadata
Feature: Inventory / Purchasing Synchronization  
Business Area: Inventory/Purchasing  
Source System: Store  
Target System: Central  
Sync Direction: Store -> Central  
Release: Unknown  
Priority: 1  

---

# Scenario: Transfer IN - Standard

## Preconditions
- Store Manager is connected to Central.
- Synchronization service is active.
- At least one valid item exists.
- Inventory locations are configured.

## Required Test Data
- Existing inventory item
- Valid quantity
- Receiving store

## Navigation Path
Store Manager → Inventory/Purchasing → Transfers → Transfer IN

## Execution Steps
1. Create a standard Transfer IN transaction in Store Manager.
2. Add one or more inventory items with quantities.
3. Save the transaction.
4. Modify the transaction (change quantity or item).
5. Optionally delete the transfer record.

## Expected Results
- Transfer IN record is inserted into Central.
- Updates in Store Manager are reflected in Central.
- Deletion of the transfer removes or updates the corresponding record in Central.

## Validation Checks
- Transfer record appears in Central.
- Item quantities match between Store and Central.
- No duplicate records are created.

---

# Scenario: Transfer IN - Inter Store

## Preconditions
- Two stores configured in the system.
- Inter-store transfer permissions enabled.
- Synchronization service running.

## Required Test Data
- Source store
- Destination store
- Inventory items

## Navigation Path
Store Manager → Inventory/Purchasing → Transfers → Transfer IN

## Execution Steps
1. Create an inter-store Transfer IN transaction.
2. Select the originating store.
3. Add items and quantities.
4. Save the transaction.
5. Modify or delete the transaction if necessary.

## Expected Results
- Transfer IN is inserted into Central.
- Updates and deletions synchronize to Central.

## Validation Checks
- Transfer IN record exists in Central.
- Item data matches between Store and Central.

---

# Scenario: Transfer IN - Inter Store End-to-End Flow (Fully Shipped)

## Preconditions
- Two stores configured for inter-store transfers.
- Inventory items exist in the source store.

## Required Test Data
- Source store inventory
- Destination store
- Transfer order

## Navigation Path
Store Manager → Inventory/Purchasing → Transfers

## Execution Steps
1. Create a Transfer OUT transaction from the source store.
2. Ship the items completely.
3. Receive the items at the destination store using Transfer IN.
4. Allow synchronization to occur.

## Expected Results
- Transfer IN is inserted into Central.
- A matching Transfer OUT record is created for the other store.
- Cost flows from Transfer OUT to Transfer IN.

## Validation Checks
- Transfer records match between stores.
- Cost values are consistent.
- Central contains both transaction records.

---

# Scenario: Transfer IN - Inter Store End-to-End Flow (Partially Shipped)

## Preconditions
- Source store has sufficient inventory.
- Destination store configured for receiving transfers.

## Required Test Data
- Partial shipment quantities
- Inter-store transfer configuration

## Navigation Path
Store Manager → Inventory/Purchasing → Transfers

## Execution Steps
1. Create an inter-store Transfer OUT transaction.
2. Ship only part of the ordered quantity.
3. Receive the partial shipment at the destination store.
4. Allow synchronization to occur.

## Expected Results
- Transfer IN record appears in Central.
- A matching Transfer OUT record exists for the originating store.
- Cost flows from Transfer OUT to Transfer IN.

## Validation Checks
- Quantities match partial shipment values.
- Transfer records exist in Central.
- Cost calculations remain accurate.

---

# Scenario: Transfer OUT - Standard

## Preconditions
- Inventory items exist.
- Store synchronization is active.

## Required Test Data
- Inventory item
- Transfer quantity

## Navigation Path
Store Manager → Inventory/Purchasing → Transfers → Transfer OUT

## Execution Steps
1. Create a standard Transfer OUT transaction.
2. Add items and quantities.
3. Save the transaction.
4. Update or delete the transaction.

## Expected Results
Transfer OUT transactions are inserted, updated, or deleted in Central.

## Validation Checks
- Transfer OUT record exists in Central.
- Data consistency between Store and Central.

---

# Scenario: Transfer OUT - Inter Store

## Preconditions
- Two stores configured.
- Inter-store transfer enabled.

## Required Test Data
- Source store
- Destination store
- Inventory item

## Navigation Path
Store Manager → Inventory/Purchasing → Transfers → Transfer OUT

## Execution Steps
1. Create an inter-store Transfer OUT transaction.
2. Select destination store.
3. Add items and quantities.
4. Save the transaction.

## Expected Results
Transfer OUT transactions synchronize to Central.

## Validation Checks
- Transfer record exists in Central.
- Item quantities match.

---

# Scenario: Transfer OUT - Supplier

## Preconditions
- Supplier exists in the system.
- Inventory items available.

## Required Test Data
- Supplier
- Inventory item

## Navigation Path
Store Manager → Inventory/Purchasing → Transfers → Transfer OUT

## Execution Steps
1. Create a Transfer OUT transaction for a supplier.
2. Add items and quantities.
3. Save the transaction.
4. Modify or delete the transaction.

## Expected Results
Transfer OUT transactions synchronize with Central.

## Validation Checks
- Supplier transfer record exists in Central.
- Item data matches.

---

# Scenario: Transfer OUT - Inter Store End-to-End Flow (Fully Shipped)

## Execution Steps
1. Create a Transfer OUT from Store A.
2. Ship all items.
3. Receive items in Store B.
4. Synchronize with Central.

## Expected Results
- Transfer OUT inserted into Central.
- Matching Transfer IN created at the other store.
- Cost flows from Transfer OUT to Transfer IN.

## Validation Checks
- Both transfer records exist in Central.
- Costs match between transfers.

---

# Scenario: Transfer OUT - Inter Store End-to-End Flow (Partially Shipped)

## Execution Steps
1. Create Transfer OUT from Store A.
2. Ship partial quantity.
3. Receive partial quantity in Store B.
4. Allow synchronization.

## Expected Results
- Transfer OUT inserted into Central.
- Matching Transfer IN created.
- Cost flows correctly.

## Validation Checks
- Partial quantities match across systems.
- Cost calculations remain consistent.