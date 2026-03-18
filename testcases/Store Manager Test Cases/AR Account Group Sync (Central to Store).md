# Accounts Receivable Account Group Synchronization

## Metadata
Feature: Accounts Receivable Configuration Synchronization  
Business Area: Setup → Customer → Accounts Receivable  
Source System: Central Manager  
Target System: Stores  
Sync Direction: Central → Store  
Release: MVP V2  
Priority: [Specify Priority]

---

# Scenario: AR Account Group Sync from Central Manager to Store(s)

## Preconditions
- Central and Store synchronization services are operational.
- Active stores exist in the Store table.
- User has permission to modify Accounts Receivable configuration in Central Manager.

## Required Test Data
- AR Account Group configuration in Central Manager
- Active store records in the Store table

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Account Groups

## Execution Steps
1. Open Central Manager and navigate to Setup → Customer → Accounts Receivable → Account Groups.
2. Create a new AR Account Group or select an existing group to update.
3. Populate or modify all required Account Group fields.
4. Save the configuration in Central Manager.
5. Allow synchronization to run or trigger synchronization manually.
6. In Store Manager (or via direct database query), verify that the AR Account Group configuration is inserted or updated in all active stores.

## Expected Results
- AR Account Group configuration is inserted or updated in store(s).
- Store systems reflect the configuration defined in Central Manager.

## Validation Checks
- Account Group records exist in the store configuration.
- Data values for each Account Group in Store(s) match those configured in Central Manager.
- No duplicate configuration records are created in Store(s).
- If any fields do not synchronize, document the discrepancy for follow-up.

---

**Note:**  
All group attributes should be synchronized. If field-level mapping is unclear, confirm with business rules or technical leads.
