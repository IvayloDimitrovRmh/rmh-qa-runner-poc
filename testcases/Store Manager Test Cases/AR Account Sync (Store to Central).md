# Accounts Receivable Account Synchronization

## Metadata
Feature: Accounts Receivable Synchronization  
Business Area: Customer → AR  
Source System: Store Manager  
Target System: Central Manager  
Sync Direction: Store → Central  
Release: MVP V2  
Priority: [Specify Priority]

---

# Scenario: AR Account Sync from Store Manager to Central Manager

## Preconditions
- Store Manager is connected to Central Manager.
- User has access to create or update AR accounts in Store Manager.

## Required Test Data
- AR Account Number / Identifier
- Customer information
- Account Group (if applicable)
- Payment Terms
- Finance and contact details

## Navigation Path
Store Manager → Customer → AR → Accounts

## Execution Steps
1. Open Store Manager and navigate to Customer → AR → Accounts.
2. Create a new AR account or select an existing account to update.
3. Populate or modify all required AR account fields (e.g., Account Number, Customer, Account Group, Payment Terms, Finance details).
4. Save the AR account in Store Manager.
5. Ensure Store Manager is connected to Central Manager and trigger synchronization (manual or automatic, as per system setup).
6. In Central Manager (or via direct database query), verify that the AR account record is inserted or updated accordingly.

## Expected Results
- AR account records created or updated in Store Manager are synchronized to Central Manager.
- The AR account record is inserted or updated in Central, matched by account identifier.

## Validation Checks
- AR account identifier matches between Store Manager and Central Manager.
- All updated AR account fields in Central match the values entered in Store Manager.
- No duplicate or orphaned AR account records are created in Central.
- If any fields do not synchronize, document the discrepancy for follow-up.

---

**Note:**  
Field-level mapping and Central table details are inferred from available documentation. Not all fields or table names are explicitly confirmed; confirm with business rules or technical leads if discrepancies are found.
