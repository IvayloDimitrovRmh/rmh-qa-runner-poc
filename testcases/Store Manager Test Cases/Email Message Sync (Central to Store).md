# Accounts Receivable Email Message Synchronization

## Metadata
Feature: Accounts Receivable Configuration Synchronization  
Business Area: Setup → Customer → Accounts Receivable  
Source System: Central Manager  
Target System: Stores  
Sync Direction: Central → Store  
Release: MVP V2  
Priority: [Specify Priority]

---

# Scenario: AR Email Message Sync from Central Manager to Store(s)

## Preconditions
- Central and Store synchronization services are operational.
- Active stores exist in the Store table.
- User has permission to configure Accounts Receivable settings in Central Manager.

## Required Test Data
- AR Email Message template configuration in Central Manager
- Active store records in the Store table

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Email Message

## Execution Steps
1. Open Central Manager and navigate to Setup → Customer → Accounts Receivable → Email Message.
2. Create a new AR Email Message template or modify an existing one.
3. Save the configuration in Central Manager.
4. Allow synchronization to run or manually trigger synchronization.
5. In Store Manager (or via direct database query), verify that the AR Email Message configuration is inserted or updated in all active stores.

## Expected Results
- AR Email Message configuration is inserted or updated in store(s).
- Store systems reflect the configuration defined in Central Manager.

## Validation Checks
- Email Message records exist in store configuration.
- Template content and identifiers in Store(s) match those defined in Central Manager.
- No duplicate configuration records are created in Store(s).
- If any fields do not synchronize, document the discrepancy for follow-up.

---

**Note:**  
All email message attributes should be synchronized. If field-level mapping is unclear, confirm with business rules or technical leads.
