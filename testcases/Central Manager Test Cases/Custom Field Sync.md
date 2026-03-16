# Miscellaneous / Custom Fields

## Metadata
Feature: Miscellaneous Configuration Synchronization  
Business Area: Miscellaneous  
Source System: Central Manager  
Target System: Active Store(s)  
Sync Direction: Central → Store  
Release: MVP 1.1  
Priority: High

---

# Scenario: Custom Field Insert/Update Synchronization

## Preconditions
- User has access to Central Manager with privileges to manage Custom Fields.
- At least one active store exists in the 'Store' table and is available for synchronization.

## Required Test Data
- Custom Field Label(s) (Text, Number, or Item Sub-description)
- Target entity (Customer, Supplier, or Item)
- List of active stores

## Navigation Path
Central Manager → Setup → Miscellaneous → Custom Fields

## Execution Steps
1. Log in to Central Manager.
2. Navigate to Setup → Miscellaneous → Custom Fields.
3. On the Customer, Supplier, or Item tab, enter or update field labels for the desired custom fields.
4. Click "Save and Close."
5. Wait for the synchronization cycle to complete between Central Manager and all active stores.
6. In Store Manager at an active store, verify that the custom field labels are present and correctly configured for the relevant entity.

## Expected Results
- The Custom Field configuration is inserted or updated in all active store(s).

## Validation Checks
- Confirm the Custom Field labels appear in each active store with correct details.
- Verify that the custom fields are available for the relevant entity (Customer, Supplier, or Item) in each store.
- Confirm that only active stores (as per the 'Store' table) receive the update.

---

**Note:**  
- Custom Field synchronization is inferred based on standard RMH sync patterns and field usage; explicit documentation is not available.  
- All setup steps and field names are confirmed in documentation.  
- If future RMH documentation confirms or changes this workflow, update the test case accordingly.
