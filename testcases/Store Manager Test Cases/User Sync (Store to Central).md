# People and Security / Users

## Metadata
Feature: People and Security Synchronization  
Business Area: People and Security  
Source System: Store Manager  
Target System: Central Manager  
Sync Direction: Store → Central  
Release: MVP V1  
Priority: High

---

# Scenario: User Insert/Update/Delete Synchronization from Store to Central

## Preconditions
- Store Manager and Central Manager are installed and operational.
- Store Manager is configured for Central synchronization.
- The test user has privileges to create, edit, and delete users in Store Manager.

## Required Test Data
- User Login ID
- User Name
- User Role(s)
- Store Group(s)

## Navigation Path
Store Manager → Setup → People and Security → Users

## Execution Steps
1. Log in to Store Manager.
2. Navigate to Setup → People and Security → Users.
3. To test insert: Click "New," enter required details, and save.
4. To test update: Select an existing user, edit one or more fields, and save.
5. To test delete: Select an existing user and delete the record.
6. Wait for the synchronization cycle to complete between Store Manager and Central Manager.
7. In Central Manager, verify that the new or updated user record is present and correct.
8. For deletion, verify whether the user record is removed or deactivated in Central Manager.

## Expected Results
- User records are inserted or updated correctly in Central Manager.
- Deletion behavior is validated for synchronization consistency (may not propagate as a delete).

## Validation Checks
- Confirm the new or updated user appears in Central Manager with correct details.
- For deletion, confirm whether the user is removed, deactivated, or remains unchanged in Central Manager.
- Verify that no unintended changes occur to other user records.

---

**Note:**  
- Insert and update sync from Store Manager to Central Manager are confirmed in documentation.  
- Deletion behavior is not explicitly documented; validate in your environment.  
- If future RMH documentation confirms or changes this workflow, update the test case accordingly.
