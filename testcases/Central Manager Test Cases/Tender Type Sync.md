# Merchandising / Tender Types

## Metadata
Feature: Financial Configuration Synchronization  
Business Area: Merchandising  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central → Store  
Release: MVP 1.1  
Priority: High

---

# Scenario: Tender Type Insert/Update Synchronization

## Preconditions
- User has access to Central Manager with privileges to manage Tender Types.
- At least one store is configured and available for synchronization.

## Required Test Data
- Tender Type Description
- Tender Code
- Currency
- Store Group or specific stores for sync

## Navigation Path
Central Manager → Setup → Financial → Tender Types

## Execution Steps
1. Log in to Central Manager.
2. Navigate to Setup → Financial → Tender Types.
3. Click "New" to create a new Tender Type, or select an existing Tender Type and click "Edit" to update.
4. Enter or modify the required fields (Description, Tender Code, Tender Type, Currency, etc.).
5. On the Store Groups tab, select the store group(s) that use the tender type.
6. Click "Save and Close."
7. Wait for the synchronization cycle to complete between Central Manager and the target store(s).
8. In Store Manager at the target store, verify that the Tender Type record reflects the changes.

## Expected Results
- The Tender Type configuration is inserted or updated in the selected store(s).

## Validation Checks
- Confirm the Tender Type appears in the target store(s) with correct details.
- Verify that the Tender Type is only available in stores within the assigned store group(s).
- Confirm that all configured fields (Description, Code, Currency, etc.) match the Central Manager configuration.

---

**Note:**  
- Tender Type synchronization is inferred based on standard RMH sync patterns and store group assignment; explicit documentation is not available.  
- All setup steps and field names are confirmed in documentation.  
- If future RMH documentation confirms or changes this workflow, update the test case accordingly.
