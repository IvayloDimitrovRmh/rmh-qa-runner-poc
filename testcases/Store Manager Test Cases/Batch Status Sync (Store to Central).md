# Journal / Batch

## Metadata
Feature: Journal Synchronization  
Business Area: Journal Management  
Source System: Store Manager  
Target System: Central Manager  
Sync Direction: Store → Central  
Release: MVP V1  
Priority: High

---

# Scenario: Batch Status Update Synchronization from Store to Central

## Preconditions
- Store Manager and Central Manager are installed and operational.
- Store Manager is configured for Central synchronization.
- The test user has privileges to update batch information in Store Manager.
- At least one batch exists in both Store Manager and Central Manager.

## Required Test Data
- Batch record(s) in Store Manager
- Batch status values (including blind closed batch)

## Navigation Path
Store Manager → Journal → Update Batch Info

## Execution Steps
1. Log in to Store Manager.
2. Navigate to Journal → Update Batch Info.
3. Select a batch and update its status.
4. Save the changes.
5. Wait for the synchronization cycle to complete between Store Manager and Central Manager.
6. In Central Manager, verify that the batch status is updated correctly.
7. Special case: Run the Z Report for a blind closed batch in Store Manager.
8. Wait for sync and verify that the batch status is updated in Central Manager.

## Expected Results
- Batch status updates in Store Manager are synchronized to Central Manager.
- For blind closed batches, running the Z Report should also synchronize the batch status to Central Manager.

## Validation Checks
- Confirm the updated batch status appears in Central Manager for the edited batch.
- For blind closed batches, confirm that the status is updated after running the Z Report.
- Verify that no unintended changes occur to other batch records.

---

**Note:**  
- There is no explicit documentation confirming Store → Central batch status synchronization.  
- The known issue (Bug 204264) indicates that this sync may not work for blind closed batches; verify in your environment.  
- If future RMH documentation confirms or changes this workflow, update the test case accordingly.  
- Field support for upward sync may be limited; verify with RMH documentation or support.
