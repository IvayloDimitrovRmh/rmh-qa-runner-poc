# Accounts Receivable Statement Synchronization

## Metadata
Feature: Accounts Receivable Synchronization  
Business Area: Customer → AR  
Source System: Store Manager  
Target System: Central Manager  
Sync Direction: Store → Central  
Release: MVP V2  
Priority: [Specify Priority]

---

# Scenario: AR Statement Sync from Store Manager to Central Manager

## Preconditions
- Store Manager is connected to Central Manager.
- User has access to generate AR statements in Store Manager.

## Required Test Data
- AR account(s) with open transactions
- Statement Type
- Closing Date
- Delivery Method (Print or E-Mail)
- Filter/Selection Type

## Navigation Path
Store Manager → Customer → AR → Print Statements

## Execution Steps
1. Open Store Manager and navigate to Customer → AR → Print Statements.
2. Select the Closing Date that matches the closed billing cycle.
3. Select the Delivery Method (Print or E-Mail).
4. Select Filter (Standard or Advanced) and any other required options.
5. Complete the statement generation process.
6. Ensure Store Manager is connected to Central Manager and trigger synchronization (manual or automatic, as per system setup).
7. In Central Manager (or via direct database query), verify that the AR statement data is inserted or updated accordingly.

## Expected Results
- AR statement processing in Store Manager synchronizes the statement data to Central Manager.
- The AR statement record is inserted or updated in Central, matched by relevant identifiers (e.g., account, date, statement type).

## Validation Checks
- AR statement data in Central matches the values and closing date from Store Manager.
- No duplicate or orphaned AR statement records are created in Central.
- If any fields do not synchronize, document the discrepancy for follow-up.

---

**Note:**  
Field-level mapping and Central table details are inferred from available documentation. Not all fields or table names are explicitly confirmed; confirm with business rules or technical leads if discrepancies are found.
