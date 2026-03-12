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

## Business Entity
Transfer In

## Business Purpose
Ensure that standard Transfer IN transactions created or modified in Store Manager synchronize correctly to Central so that inventory adjustments remain consistent across locations.

## Trigger
User creates, updates, or deletes a standard Transfer IN transaction in Store Manager.

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

## Pass Criteria
Transfer IN records created, updated, or deleted in Store are correctly synchronized to Central.

## Fail Criteria
Transfer records do not appear or contain mismatched data in Central.

## Risks / Assumptions
Synchronization services must be operational.

## Known Issues / Notes
Actual Result: Insert/Delete/update into Central.

---

# Scenario: Transfer IN - Inter Store

## Business Entity
Transfer In

## Business Purpose
Validate that inter-store Transfer IN transactions synchronize correctly to Central.

## Trigger
User creates, updates, or deletes an inter-store Transfer IN transaction.

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

## Pass Criteria
Inter-store Transfer IN records synchronize correctly.

## Fail Criteria
Transfer IN records do not appear or contain incorrect data.

## Risks / Assumptions
Inter-store synchronization must be enabled.

## Known Issues / Notes
Actual Result: Insert/Delete/update into Central.

---

# Scenario: Transfer IN - Inter Store End-to-End Flow (Fully Shipped)

## Business Entity
Transfer In / Transfer Out

## Business Purpose
Validate the complete inter-store transfer process where goods are fully shipped from one store and received by another.

## Trigger
An inter-store transfer is created and fully shipped between two stores.

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

## Pass Criteria
Both Transfer OUT and Transfer IN transactions are synchronized correctly and cost data flows correctly.

## Fail Criteria
Missing transfer records or incorrect cost propagation.

## Risks / Assumptions
Cost calculation settings must be consistent across stores.

## Known Issues / Notes
Expected behavior from screenshot:  
Transfer IN inserted into Central and matching Transfer OUT created at the other store.

---

# Scenario: Transfer IN - Inter Store End-to-End Flow (Partially Shipped)

## Business Entity
Transfer In / Transfer Out

## Business Purpose
Ensure partial shipment inter-store transfers synchronize correctly.

## Trigger
A Transfer OUT is partially shipped and received by another store.

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

## Pass Criteria
Partial shipment transfers synchronize correctly.

## Fail Criteria
Partial shipment data does not match between systems.

## Risks / Assumptions
Partial transfer functionality must be enabled.

## Known Issues / Notes
Expected behavior from screenshot:  
Transfer IN inserted into Central and matching Transfer OUT created at other store.

---

# Scenario: Transfer OUT - Standard

## Business Entity
Transfer Out

## Business Purpose
Verify that standard Transfer OUT transactions synchronize correctly to Central.

## Trigger
User creates or modifies a Transfer OUT transaction.

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

## Pass Criteria
Transfer OUT records synchronize correctly.

## Fail Criteria
Records missing or inconsistent in Central.

## Known Issues / Notes
Actual Result: Insert/Delete/update into Central.

---

# Scenario: Transfer OUT - Inter Store

## Business Entity
Transfer Out

## Business Purpose
Validate synchronization of inter-store Transfer OUT transactions.

## Trigger
User creates or modifies an inter-store Transfer OUT.

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

## Pass Criteria
Inter-store Transfer OUT records synchronize correctly.

## Fail Criteria
Central does not reflect transfer.

## Known Issues / Notes
Actual Result: Insert/Delete/update into Central.

---

# Scenario: Transfer OUT - Supplier

## Business Entity
Transfer Out

## Business Purpose
Verify that supplier Transfer OUT transactions synchronize correctly.

## Trigger
User creates or updates a supplier Transfer OUT transaction.

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

## Pass Criteria
Supplier transfers synchronize correctly.

## Fail Criteria
Missing or incorrect records in Central.

## Known Issues / Notes
Actual Result: Insert/Delete/update into Central.

---

# Scenario: Transfer OUT - Inter Store End-to-End Flow (Fully Shipped)

## Business Entity
Transfer Out / Transfer In

## Business Purpose
Validate that a full shipment inter-store Transfer OUT creates a matching Transfer IN in Central.

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

## Pass Criteria
Full shipment transfers synchronize correctly.

## Fail Criteria
Missing or mismatched transfer records.

---

# Scenario: Transfer OUT - Inter Store End-to-End Flow (Partially Shipped)

## Business Entity
Transfer Out / Transfer In

## Business Purpose
Validate that partially shipped inter-store transfers synchronize correctly.

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

## Pass Criteria
Partial transfer shipments synchronize correctly.

## Fail Criteria
Central contains incorrect transfer quantities or costs.