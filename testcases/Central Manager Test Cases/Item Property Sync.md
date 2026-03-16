# Miscellaneous / Item Properties

## Metadata
Feature: Miscellaneous Configuration Synchronization  
Business Area: Miscellaneous  
Source System: Central Manager  
Target System: Active Store(s)  
Sync Direction: Central → Store  
Release: MVP 1.1  
Priority: High

---

# Scenario: Item Property Insert/Update Synchronization

## Preconditions
- User has access to Central Manager with privileges to manage Item Properties.
- At least one active store exists in the 'Store' table and is available for synchronization.

## Required Test Data
- Item Property Name/Label
- Property Type (if applicable)
- List of active stores

## Navigation Path
Central Manager → Setup → Miscellaneous → Item Properties

## Execution Steps
1. Log in to Central Manager.
2. Navigate to Setup → Miscellaneous → Item Properties.
3. Create a new Item Property or select an existing one to update.
4. Enter or modify the required fields (e.g., Name, Type, etc.).
5. Click "Save and Close."
6. Wait for the synchronization cycle to complete between Central Manager and all active stores.
7. In Store Manager at an active store, verify that the Item Property configuration is present and correct.

## Expected Results
- The Item Property configuration is inserted or updated in all active store(s).

## Validation Checks
- Confirm the Item Property appears in each active store with correct details.
- Verify that the property is available for items in each store.
- Confirm that only active stores (as per the 'Store' table) receive the update.