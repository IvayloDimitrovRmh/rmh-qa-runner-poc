# Customer / Customer Ship-To Information

## Metadata
Feature: Customer Synchronization  
Business Area: Customer Management  
Source System: Store Manager  
Target System: Central Manager  
Sync Direction: Store → Central  
Release: MVP V1  
Priority: High

---

# Scenario: Customer Ship-To Insert/Update/Delete Synchronization from Store to Central

## Preconditions
- Store Manager and Central Manager are installed and operational.
- Store Manager is configured for Central synchronization.
- The test user has privileges to edit customer Ship-To information in Store Manager.
- At least one customer exists in both Store Manager and Central Manager.

## Required Test Data
- Customer record with Ship-To information
- Ship-To address details

## Navigation Path
Store Manager → Customer → Customers → Ship-To Tab

## Execution Steps
1. Log in to Store Manager.
2. Navigate to Customer → Customers.
3. Select a customer and go to the Ship-To tab.
4. Add, modify, or remove Ship-To information for the customer.
5. Save the changes.
6. Wait for the synchronization cycle to complete between Store Manager and Central Manager.
7. In Central Manager, verify that the Ship-To information for the customer reflects the changes (insert, update, or delete).

## Expected Results
- Ship-To information changes (insert, update, or delete) are reflected correctly in Central Manager.

## Validation Checks
- Confirm the new, updated, or deleted Ship-To information appears as expected in Central Manager.
- Verify that no unintended changes occur to other customer records or Ship-To entries.

---

**Note:**  
- There is no explicit documentation confirming Store → Central Ship-To synchronization.  
- This test case is based on the requested scenario and standard RMH patterns, but may not be supported in all environments.  
- If future RMH documentation confirms or changes this workflow, update the test case accordingly.  
- Field support for upward sync may be limited; verify with RMH documentation or support.
