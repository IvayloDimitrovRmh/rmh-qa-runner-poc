# People and Security / Sales Representative

## Metadata
Feature: People and Security Synchronization  
Business Area: People and Security  
Source System: Store Manager  
Target System: Central Manager  
Sync Direction: Store → Central  
Release: MVP V1  
Priority: High

---

# Scenario: Sales Representative Insert/Update Synchronization from Store to Central

## Preconditions
- Store Manager and Central Manager are installed and operational.
- Store Manager is configured for Central synchronization.
- The test user has privileges to create and edit Sales Representatives in Store Manager.

## Required Test Data
- Sales Representative Name
- ID Number
- Commission arrangements (if applicable)

## Navigation Path
Store Manager → Setup → People and Security → Sales Representative

## Execution Steps
1. Log in to Store Manager.
2. Navigate to Setup → People and Security → Sales Representative.
3. To test insert: Click "New" and enter required details, then save.
4. To test update: Select an existing Sales Representative, edit one or more fields, and save.
5. Wait for the synchronization cycle to complete between Store Manager and Central Manager.
6. In Central Manager, verify that the new or updated Sales Representative record is present and correct.

## Expected Results
- Sales Representative records are inserted or updated correctly in Central Manager.

## Validation Checks
- Confirm the new or updated Sales Representative appears in Central Manager with correct details.
- Verify that no unintended changes occur to other Sales Representative records.

---

**Note:**  
- There is no explicit documentation confirming Store → Central Sales Representative synchronization.  
- This test case is based on the requested scenario and standard RMH patterns, but may not be supported in all environments.  
- If future RMH documentation confirms or changes this workflow, update the test case accordingly.  
- Field support for upward sync may be limited; verify with RMH documentation or support.
