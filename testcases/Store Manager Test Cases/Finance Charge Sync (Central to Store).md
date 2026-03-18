# Accounts Receivable Finance Charge Synchronization

## Metadata
Feature: Accounts Receivable Configuration Synchronization  
Business Area: Setup → Customer → Accounts Receivable  
Source System: Central Manager  
Target System: Stores  
Sync Direction: Central → Store  
Release: MVP V2  
Priority: [Specify Priority]

---

# Scenario: Finance Charge Sync from Central Manager to Store(s)

## Preconditions
- Central and Store synchronization services are operational.
- Active stores exist in the Store table.
- User has permission to configure Accounts Receivable settings in Central Manager.

## Required Test Data
- Finance Charge configuration in Central Manager
- Active store records in the Store table

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Finance Charges

## Execution Steps
1. Open Central Manager and navigate to Setup → Customer → Accounts Receivable → Finance Charges.
2. Create a new Finance Charge configuration or select an existing one to update.
3. Populate or modify all required Finance Charge fields (e.g., Code, Name, Apply Charges on Fin. Charges, Min. Finance Charges, Annual Interest Rate).
4. Save the configuration in Central Manager.
5. Allow synchronization to run or trigger synchronization manually.
6. In Store Manager (or via direct database query), verify that the Finance Charge configuration is inserted or updated in all active stores.

## Expected Results
- Finance Charge configuration is inserted or updated in store(s).
- Store systems reflect the configuration defined in Central Manager.

## Validation Checks
- Finance Charge configuration exists in store systems.
- Charge identifiers, percentages, and rules in Store(s) match those configured in Central Manager.
- No duplicate configuration records are created in Store(s).
- If any fields do not synchronize, document the discrepancy for follow-up.

---

**Note:**  
All charge attributes should be synchronized. If field-level mapping is unclear, confirm with business rules or technical leads.
