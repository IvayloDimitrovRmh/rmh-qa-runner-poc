# Accounts Receivable Payment Terms Synchronization

## Metadata
Feature: Accounts Receivable Configuration Synchronization  
Business Area: Setup → Customer → Accounts Receivable  
Source System: Central Manager  
Target System: Stores  
Sync Direction: Central → Store  
Release: MVP V2  
Priority: [Specify Priority]

---

# Scenario: Payment Terms Sync from Central Manager to Store(s)

## Preconditions
- Central and Store synchronization services are operational.
- Active stores exist in the Store table.
- User has permission to configure Accounts Receivable settings in Central Manager.

## Required Test Data
- Payment Terms configuration in Central Manager
- Active store records in the Store table

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Payment Terms

## Execution Steps
1. Open Central Manager and navigate to Setup → Customer → Accounts Receivable → Payment Terms.
2. Create a new Payment Terms configuration or select an existing one to update.
3. Populate or modify all required Payment Terms fields (e.g., Code, Name, Due After Date, Grace Period, Minimum Payment).
4. Save the configuration in Central Manager.
5. Allow synchronization to run or trigger synchronization manually.
6. In Store Manager (or via direct database query), verify that the Payment Terms configuration is inserted or updated in all active stores.

## Expected Results
- Payment Terms configuration is inserted or updated in store(s).
- Store systems reflect the configuration defined in Central Manager.

## Validation Checks
- Payment Terms configuration exists in store systems.
- Term identifiers, durations, and rules in Store(s) match those configured in Central Manager.
- No duplicate configuration records are created in Store(s).
- If any fields do not synchronize, document the discrepancy for follow-up.

---

**Note:**  
All payment term attributes should be synchronized. If field-level mapping is unclear, confirm with business rules or technical leads.
