# Supplier Synchronization to Store Groups

## Metadata

Feature: Supplier Synchronization to Store Groups  
Business Area: Inventory/Purchasing  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: MVP 1.1  
Priority: Unknown  

---

# Scenario: Insert or Update Suppliers in Selected Stores

## Preconditions

- Supplier record exists in Central.
- Store Group configuration includes the selected store(s).
- Synchronization service is active.

## Action

Create or modify supplier information in Central.

## Expected Synchronization Behavior

- Insert new supplier record into selected store(s).
- Update existing supplier record in selected store(s).
- Matching key: Supplier identifier.

## Validation Points

- Supplier identifier matches between Central and Store.
- Supplier details synchronized correctly.
- Supplier record appears only in the intended store group.