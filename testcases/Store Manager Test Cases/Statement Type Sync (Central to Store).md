# Accounts Receivable Statement Type Synchronization

## Metadata
Feature: Accounts Receivable Configuration Synchronization  
Business Area: Setup → Customer → Accounts Receivable  
Source System: Central Manager  
Target System: Stores  
Sync Direction: Central → Store  
Release: MVP V2  
Priority: [Specify Priority]

---

# Scenario: Statement Type Sync from Central Manager to Store(s)

## Preconditions
- Central and Store synchronization services are active.
- Active stores exist in the Store table.
- User has permission to configure Accounts Receivable settings in Central Manager.

## Required Test Data
- Statement Type configuration in Central Manager
- Active store records in the Store table

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Statement Types

## Execution Steps
1. Open Central Manager and navigate to Setup → Customer → Accounts Receivable → Statement Types.
2. Create a new Statement Type or modify an existing one.
3. Save the configuration in Central Manager.
4. Allow synchronization to run or trigger synchronization manually.
5. In Store Manager (or via direct database query), verify that the Statement Type configuration is inserted or updated in all active stores.

## Expected Results
- Statement Type configuration is inserted or updated in store(s).
- Store systems reflect the configuration defined in Central Manager.

## Validation Checks
- Statement Type records exist in store configuration.
- Statement type identifiers and configuration fields in Store(s) match those defined in Central Manager.
- No duplicate configuration records are created in Store(s).
- If any fields do not synchronize, document the discrepancy for follow-up.

---

**Note:**  
All statement type attributes should be synchronized. If field-level mapping is unclear, confirm with business rules or technical leads.
