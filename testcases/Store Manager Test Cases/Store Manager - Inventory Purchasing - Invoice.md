# Inventory / Purchasing

## Metadata
Feature: Inventory / Purchasing Synchronization  
Business Area: Inventory/Purchasing  
Source System: Store  
Target System: Central  
Sync Direction: Store -> Central  
Release: Unknown  
Priority: 12  

---

# Scenario: Invoice Synchronization

## Business Entity
Invoice

## Business Purpose
Ensure that invoices created, updated, or deleted in Store are synchronized to Central so that purchasing, receiving, and financial inventory records remain consistent across locations. RMH Support exposes Store Manager documentation and broader RMH product documentation areas that can be used later to validate execution paths and terminology during test execution. :contentReference[oaicite:0]{index=0}

## Trigger
A user creates, updates, or deletes an invoice in the Store system.

## Preconditions
- Store and Central are connected and synchronization services are active.
- A valid supplier exists.
- At least one valid item exists.
- User has permission to create and modify invoices.
- Related purchasing documents, if required by the environment, already exist.

## Required Test Data
- Valid Supplier
- Existing inventory item
- Invoice number or reference
- Item quantity
- Item cost / price values
- Store configured for synchronization

## Navigation Path
Store Manager → Inventory/Purchasing → Invoice

## Execution Steps
1. Create a new Invoice in Store Manager.
2. Associate the invoice with a valid supplier.
3. Add one or more items in the Items tab with quantities and pricing data.
4. Save the invoice.
5. Update the invoice by changing at least one item-level value, quantity, or header detail.
6. Optionally delete the invoice.
7. Trigger synchronization or wait for the sync service to process the transaction.
8. Validate the corresponding invoice record in Central.

## Expected Results
- Invoice is inserted into Central after creation.
- Invoice updates in Store are reflected in Central.
- Deleting the invoice in Store removes or updates the corresponding record in Central.
- Item-level values from the Items tab are synchronized correctly to Central.

## Validation Checks
- Invoice record appears in Central.
- Supplier and invoice header details match between Store and Central.
- Item lines and quantities match between Store and Central.
- Updates made in Store are reflected in Central.
- No duplicate invoice records are created.

## Pass Criteria
- Central contains the corresponding invoice created in Store.
- Header and item-level data match between Store and Central.
- Updates and deletions are reflected correctly in Central.

## Fail Criteria
- Invoice does not appear in Central.
- Header or item-level data does not match.
- Quantity from the Items tab is not synchronized.
- Duplicate or corrupted invoice records appear.

## Risks / Assumptions
- Synchronization timing may vary based on environment and services.
- Some invoice workflows may depend on related purchasing setup in the tenant.
- Exact field behavior should be confirmed during execution against the available RMH documentation set. :contentReference[oaicite:1]{index=1}

## Known Issues / Notes
- Bug 204263: Store > Invoice: The qty from Items tab not sync to Central