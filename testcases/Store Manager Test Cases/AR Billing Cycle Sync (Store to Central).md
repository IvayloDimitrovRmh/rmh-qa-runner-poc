# Accounts Receivable Billing Cycle Synchronization

## Metadata
Feature: Accounts Receivable Synchronization  
Business Area: Customer → AR  
Source System: Store Manager  
Target System: Central Manager  
Sync Direction: Store → Central  
Release: MVP V2  
Priority: [Specify Priority]

---

# Scenario: AR Billing Cycle Sync from Store Manager to Central Manager

## Preconditions
- Store Manager is connected to Central Manager.
- User has access to close billing cycles in Store Manager.

## Required Test Data
- AR account(s) with open transactions
- Closing Date
- Reference (optional)
- Filter/Selection Type

## Navigation Path
Store Manager → Customer → AR → Close Billing Cycle

## Execution Steps
1. Open Store Manager and navigate to Customer → AR → Close Billing Cycle.
2. Select the desired Closing Date.
3. (Optional) Enter a Reference.
4. Select Filter (Standard or Advanced) and Selection Type as required.
5. Complete the Close Billing Cycle operation.
6. Ensure Store Manager is connected to Central Manager and trigger synchronization (manual or automatic, as per system setup).
7. In Central Manager (or via direct database query), verify that the billing cycle data is inserted or updated accordingly.

## Expected Results
- Billing cycle closure in Store Manager synchronizes the billing cycle data to Central Manager.
- The billing cycle record is inserted or updated in Central, matched by relevant identifiers (e.g., account, date).

## Validation Checks
- Billing cycle data in Central matches the values and closing date from Store Manager.
- No duplicate or orphaned billing cycle records are created in Central.
- If any fields do not synchronize, document the discrepancy for follow-up.

---

**Note:**  
Field-level mapping and Central table details are inferred from available documentation. Not all fields or table names are explicitly confirmed; confirm with business rules or technical leads if discrepancies are found.
