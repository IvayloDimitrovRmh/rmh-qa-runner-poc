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