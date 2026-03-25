# Setup / People and Security — Manager User Roles

## Metadata
Feature: Manager User Roles
Business Area: Setup > People and Security > Manager User Roles
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Update an Existing Manager User Role in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- A Manager User Role with Code `MGR-ROLE-001` and Name `TEST Store Manager` already exists in Central Manager with the following privileges enabled:
  - Merchandising > Items: Yes
  - Merchandising > Departments: Yes
  - Merchandising > Discounts: Yes
  - Inventory/Purchasing > Purchase Orders: Yes
  - Reports > Active Reports: Yes
- The role `MGR-ROLE-001` is already present in `Store001` from the prior Insert scenario.
- The user is logged into Central Manager with a role that has permissions to manage Manager User Roles under Setup > People and Security.
- The target store `Store001` is operational and able to receive synchronization from Central Manager.

## Required Test Data
- Role Code (existing): MGR-ROLE-001
- Role Name (existing): TEST Store Manager
- Privilege to add: Inventory/Purchasing > Suppliers
- Privilege state before update: unchecked (not enabled)
- Privilege state after update: checked (enabled)
- Target Store: Store001

## Navigation Path
Central Manager → Setup → People and Security → Manager User Roles

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **People and Security**.
4. Click **Manager User Roles**. The Manager User Roles list screen opens, displaying all existing roles.
5. In the Manager User Roles list, locate the row where the **Code** column shows `MGR-ROLE-001`. Click on that row to select it and open the role record.
6. Verify the current state before making changes:
   - **Code**: `MGR-ROLE-001`
   - **Name**: `TEST Store Manager`
   - **Merchandising > Items**: checked
   - **Merchandising > Departments**: checked
   - **Merchandising > Discounts**: checked
   - **Inventory/Purchasing > Purchase Orders**: checked
   - **Inventory/Purchasing > Suppliers**: unchecked
   - **Reports > Active Reports**: checked
7. Expand the **Privileges** section if not already expanded.
8. Under the **Inventory/Purchasing** privilege group, locate **Suppliers** and select its checkbox to enable this privilege.
9. Confirm that all previously enabled privileges remain checked and have not been altered.
10. Click **Save And Close** to save the changes and return to the Manager User Roles list. The updated role is automatically synchronized to the applicable store groups on save.
11. In the Manager User Roles list, locate the row for `MGR-ROLE-001` and confirm it is still present.
12. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
13. Open Store Manager on `Store001`.
14. In Store Manager, navigate to **Setup → People and Security → Manager User Roles**.
15. In the Manager User Roles list, locate the role with Code `MGR-ROLE-001` and open the record.
16. Confirm the **Inventory/Purchasing > Suppliers** privilege checkbox is now selected (enabled) in the store.

## Expected Results
- The Manager User Role `MGR-ROLE-001` is successfully updated in Central Manager with the **Inventory/Purchasing > Suppliers** privilege enabled.
- The updated role is synchronized to the target store `Store001`.
- All previously configured privileges remain enabled and unchanged after the update.

## Validation Checks
- Verify **Suppliers privilege is now enabled** in **Central Manager > Setup > People and Security > Manager User Roles** by reopening the `MGR-ROLE-001` record after saving and confirming the **Suppliers** checkbox under **Inventory/Purchasing** is selected.
- Verify **previously enabled privileges are unchanged** in **Central Manager > Setup > People and Security > Manager User Roles** by confirming all five original privileges (Items, Departments, Discounts, Purchase Orders, Active Reports) remain checked when the record is reopened.
- Verify **Code and Name are unchanged** in **Central Manager > Setup > People and Security > Manager User Roles** by confirming **Code** still shows `MGR-ROLE-001` and **Name** still shows `TEST Store Manager`.
- Verify **updated role is present in target store** in **Store001 > Setup > People and Security > Manager User Roles** by opening the `MGR-ROLE-001` record in Store Manager after synchronization and confirming the **Suppliers** privilege under **Inventory/Purchasing** is selected.

> **Note:** Manager User Roles are a prerequisite dependency for Store Users with manager access. Changes to a role affect all store users assigned to that role. Actual result has been observed as Pass insert/update in the current implementation.