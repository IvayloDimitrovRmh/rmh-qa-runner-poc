# People and Security / Time Clock

## Metadata
Feature: People and Security Synchronization  
Business Area: People and Security  
Source System: Store Manager  
Target System: Central Manager  
Sync Direction: Store → Central  
Release: MVP V1  
Priority: High

---

# Scenario: Time Clock Configuration Insert/Update Synchronization from Store to Central

## Preconditions
- Store Manager and Central Manager are installed and operational.
- Store Manager is configured for Central synchronization.
- The test user has privileges to configure Time Clock settings in Store Manager.

## Required Test Data
- Time Clock configuration settings

## Navigation Path
Store Manager → Setup → People and Security → Time Clock

## Execution Steps
1. Log in to Store Manager.
2. Navigate to Setup → People and Security → Time Clock.
3. Create or update Time Clock configuration settings as required.
4. Save the changes.
5. Wait for the synchronization cycle to complete between Store Manager and Central Manager.
6. In Central Manager, verify that the Time Clock configuration is inserted or updated as expected.

## Expected Results
- Time Clock configuration changes in Store Manager are inserted or updated in Central Manager.

## Validation Checks
- Confirm the Time Clock configuration appears in Central Manager with correct details.
- Verify that no unintended changes occur to other configuration settings.

---

**Note:**  
- There is no explicit documentation confirming Store → Central Time Clock configuration synchronization.  
- This test case is based on the requested scenario and standard RMH patterns, but may not be supported in all environments.  
- If future RMH documentation confirms or changes this workflow, update the test case accordingly.  
- Field support for upward sync may be limited; verify with RMH documentation or support.
