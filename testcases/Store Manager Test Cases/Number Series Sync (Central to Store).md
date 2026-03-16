# Accounts Receivable Number Series Synchronization

## Metadata
Feature: Accounts Receivable Configuration Synchronization  
Business Area: Setup → Customer → Accounts Receivable  
Source System: Central Manager  
Target System: Stores  
Sync Direction: Central → Store  
Release: MVP V2  
Priority: [Specify Priority]

---

# Scenario: Number Series Sync from Central Manager to Store(s)

## Preconditions
- Central and Store synchronization services are active.
- Active stores exist in the Store table.
- User has permission to configure Accounts Receivable settings in Central Manager.

## Required Test Data
- Number Series configuration in Central Manager
- Active store records in the Store table

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Number Series

## Execution Steps
1. Open Central Manager and navigate to Setup → Customer → Accounts Receivable → Number Series.
2. Create a new Number Series configuration or modify an existing one.
3. Populate or modify all required Number Series fields (e.g., Code, Name, Prefix, No. of Digit, Last Used).
4. Save the configuration in Central Manager.
5. Allow synchronization to run or manually trigger synchronization.
6. In Store Manager (or via direct database query), verify that the Number Series configuration is inserted or updated in all active stores.

## Expected Results
- Number Series configuration is inserted or updated in store(s).
- Store systems reflect the configuration defined in Central Manager.

## Validation Checks
- Number Series records exist in store configuration.
- Code, name, prefix, and other configuration fields in Store(s) match those defined in Central Manager.
- No duplicate configuration records are created in Store(s).
- If any fields do not synchronize, document the discrepancy for follow-up.

---

**Note:**  
All number series attributes should be synchronized. If field-level mapping is unclear, confirm with business rules or technical leads.
