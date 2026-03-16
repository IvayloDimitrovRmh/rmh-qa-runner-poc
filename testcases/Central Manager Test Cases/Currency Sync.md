# Merchandising / Currencies

## Metadata
Feature: Financial Configuration Synchronization  
Business Area: Merchandising  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central → Store  
Release: MVP 1.1  
Priority: High

---

# Scenario: Currency Insert/Update Synchronization with Dependency Validation

## Preconditions
- User has access to Central Manager with privileges to manage Currencies, Tender Types, and Suppliers.
- At least one store is configured and available for synchronization.

## Required Test Data
- Currency Description
- Currency Code
- Conversion Rate / Exchange Rate
- Store(s) for sync
- At least one Tender Type and one Supplier referencing the Currency

## Navigation Path
Central Manager → Setup → Financial → Currencies

## Execution Steps
1. Log in to Central Manager.
2. Navigate to Setup → Financial → Currencies.
3. Click "New" to create a new Currency, or select an existing Currency and click "Edit" to update.
4. Enter or modify the required fields (Description, Code, Conversion Rate, Exchange Rate, Locale).
5. Click "Save and Close."
6. Navigate to Setup → Financial → Tender Types.
7. Create or update a Tender Type and assign the new Currency.
8. Navigate to Inventory/Purchasing → Suppliers.
9. Create or update a Supplier and assign the new Currency.
10. Wait for the synchronization cycle to complete between Central Manager and the target store(s).
11. In Store Manager at the target store, verify that the Currency, Tender Type, and Supplier records reflect the changes.

## Expected Results
- The Currency configuration is inserted or updated in the selected store(s).
- Tender Types and Suppliers in the store(s) reference the correct Currency as configured in Central Manager.

## Validation Checks
- Confirm the Currency appears in the target store(s) with correct details.
- Confirm that Tender Types and Suppliers in the store(s) reference the correct Currency.
- Verify that no orphaned references or dependency errors exist for Tender Types or Suppliers.

---

**Note:**  
- Currency synchronization is inferred based on standard RMH sync patterns and field relationships; explicit documentation is not available.  
- Dependencies with Tender Types and Suppliers are confirmed in documentation.  
- If future RMH documentation confirms or changes this workflow, update the test case accordingly.
