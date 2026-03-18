# Accounts Receivable Accounting Default Synchronization

## Metadata
Feature: Accounts Receivable Configuration Synchronization  
Business Area: Setup → Customer → Accounts Receivable  
Source System: Central Manager  
Target System: Stores  
Sync Direction: Central → Store  
Release: MVP V2  
Priority: [Specify Priority]

---

# Scenario: Accounting Default Sync from Central Manager to Store(s)

## Preconditions
- Central and Store synchronization services are operational.
- Active stores exist in the Store table.
- User has permission to configure Accounts Receivable settings in Central Manager.

## Required Test Data
- Accounting Default configuration in Central Manager
- Active store records in the Store table

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Accounting Defaults

## Execution Steps
1. Open Central Manager and navigate to Setup → Customer → Accounts Receivable → Accounting Defaults.
2. Create a new Accounting Default configuration or modify an existing one.
3. Populate or modify all required Accounting Default fields.
4. Save the configuration in Central Manager.
5. Allow synchronization to run or trigger synchronization manually.
6. In Store Manager (or via direct database query), verify that the Accounting Default configuration is inserted or updated in all active stores.

## Expected Results
- Accounting Default configuration is inserted or updated in store(s).
- Store systems reflect the accounting configuration defined in Central Manager.

## Validation Checks
- Accounting Default records exist in store configuration.
- Default account mappings and posting rules in Store(s) match those defined in Central Manager.
- No duplicate configuration records are created in Store(s).
- If any fields do not synchronize, document the discrepancy for follow-up.

---

**Note:**  
All accounting default attributes should be synchronized. If field-level mapping is unclear, confirm with business rules or technical leads.
