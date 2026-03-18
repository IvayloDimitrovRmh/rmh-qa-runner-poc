# Miscellaneous / Random Weight EAN

## Metadata
Feature: Miscellaneous Configuration Synchronization  
Business Area: Miscellaneous  
Source System: Central Manager  
Target System: Active Store(s)  
Sync Direction: Central → Store  
Release: MVP 1.1  
Priority: High

---

# Scenario: Random Weight EAN Configuration Synchronization

## Preconditions
- User has access to Central Manager with privileges to manage Random Weight EAN configuration.
- At least one active store exists in the 'Store' table and is available for synchronization.

## Required Test Data
- Random Weight EAN13 format selection
- List of active stores

## Navigation Path
Central Manager → Setup → Miscellaneous → Random Weight EAN

## Execution Steps
1. Log in to Central Manager.
2. Navigate to Setup → Miscellaneous → Random Weight EAN.
3. From the Random Weight EAN13 drop-down, select the desired format (None or a custom EAN-13 formatting option).
4. Click "Save and Close."
5. Wait for the synchronization cycle to complete between Central Manager and all active stores.
6. In Store Manager at an active store, verify that the Random Weight EAN configuration is present and correct.

## Expected Results
- The Random Weight EAN configuration is updated in all active store(s).

## Validation Checks
- Confirm the Random Weight EAN configuration appears in each active store with correct details.
- Verify that only active stores (as per the 'Store' table) receive the update.
- Confirm that the EAN-13 barcode format is applied as configured.

---

**Note:**  
- Random Weight EAN synchronization is inferred based on standard RMH sync patterns; explicit documentation is not available.  
- All setup steps and field names are confirmed in documentation.  
- If future RMH documentation confirms or changes this workflow, update the test case accordingly.
