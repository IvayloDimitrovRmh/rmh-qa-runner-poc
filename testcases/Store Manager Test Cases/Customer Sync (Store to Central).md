# Customer / Customers

## Metadata
Feature: Customer Synchronization  
Business Area: Customer Management  
Source System: Store Manager  
Target System: Central Manager  
Sync Direction: Store → Central  
Release: MVP V1  
Priority: High

---

# Scenario: Customer Insert/Update Synchronization from Store to Central

## Preconditions
- Store Manager and Central Manager are installed and operational.
- Store Manager is configured for Central synchronization.
- The test user has privileges to create and edit customers in Store Manager.

## Required Test Data
- Customer Name
- Customer Contact Information
- Existing customer record (for update scenario)

## Navigation Path
Store Manager → Customer → Customers

## Execution Steps
1. Log in to Store Manager.
2. Navigate to Customer → Customers.
3. To test insert: Create a new customer with required details and save.
4. To test update: Select an existing customer, edit one or more fields, and save.
5. Wait for the synchronization cycle to complete between Store Manager and Central Manager.
6. In Central Manager, verify that the new or updated customer record is present and correct.

## Expected Results
- New customer records are inserted into Central Manager.
- Updates to existing customers in Store Manager are synchronized to Central Manager.

## Validation Checks
- Confirm the new customer appears in Central Manager with correct details.
- Confirm that updates to existing customers are reflected in Central Manager.
- Verify that no unintended changes occur to other customer records.

---

**Note:**  
- Insert sync from Store Manager to Central Manager is confirmed in documentation.  
- Update sync is implied but not explicitly documented; verify in your environment.  
- Sync from Central to other stores is not automatic and requires "Lookup Online" in POS.  
- If future RMH documentation confirms or changes this workflow, update the test case accordingly.
