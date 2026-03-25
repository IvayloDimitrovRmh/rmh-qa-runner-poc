# Setup / People and Security — POS User Roles

## Metadata
Feature: POS User Roles
Business Area: Setup > People and Security > POS User Roles
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Update an Existing POS User Role in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- A POS User Role with Code `ROLE-CSH-001` and Role Name `TEST Regular Cashier` already exists in Central Manager with the following permissions enabled:
  - Allowed to perform Closeouts: Yes
  - Allowed to generate Z & ZZ Reports: Yes
  - Allowed to view and edit all customers: Yes
  - Allowed to enter Opening Amounts: Yes
  - Allowed to enter Closing Amounts: Yes
  - Over/Short Limit: No Limit
- The role `ROLE-CSH-001` is already present in `Store001` from the prior Insert scenario.
- The user is logged into Central Manager with a role that has permissions to manage POS User Roles under Setup > People and Security.
- The target store `Store001` is operational and able to receive synchronization from Central Manager.

## Required Test Data
- Role Code (existing): ROLE-CSH-001
- Role Name (existing): TEST Regular Cashier
- Permission to add: Allowed to perform No Sales
- Permission state before update: unchecked (not enabled)
- Permission state after update: checked (enabled)
- Target Store: Store001

## Navigation Path
Central Manager → Setup → People and Security → POS User Roles

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **People and Security**.
4. Click **POS User Roles**. The POS User Roles list screen opens, displaying all existing roles.
5. In the POS User Roles list, locate the row where the **Code** column shows `ROLE-CSH-001`. Click on that row to select it and open the role record.
6. Verify the current state before making changes:
   - **Code**: `ROLE-CSH-001`
   - **Role name**: `TEST Regular Cashier`
   - **Allowed to perform Closeouts**: checked
   - **Allowed to generate Z & ZZ Reports**: checked
   - **Allowed to view and edit all customers**: checked
   - **Allowed to enter Opening Amounts**: checked
   - **Allowed to enter Closing Amounts**: checked
   - **Allowed to perform No Sales**: unchecked
7. In the privileges list, locate the checkbox for **Allowed to perform No Sales** and select it to enable this permission.
8. Confirm that all previously enabled permissions remain checked and have not been altered.
9. Confirm the **Over/Short Limits** setting remains set to **No Limit**.
10. Click **Save And Close** to save the changes and return to the POS User Roles list. The updated role is automatically synchronized to the applicable store groups on save.
11. In the POS User Roles list, locate the row for `ROLE-CSH-001` and confirm it is still present.
12. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
13. Open Store Manager on `Store001`.
14. In Store Manager, navigate to **Setup → People and Security → POS User Roles**.
15. In the POS User Roles list, locate the role with Code `ROLE-CSH-001` and open the record.
16. Confirm the **Allowed to perform No Sales** checkbox is now selected (enabled) in the store.

## Expected Results
- The POS User Role `ROLE-CSH-001` is successfully updated in Central Manager with the **Allowed to perform No Sales** permission enabled.
- The updated role is synchronized to the target store `Store001`.
- All previously configured permissions remain enabled and unchanged after the update.

## Validation Checks
- Verify **Allowed to perform No Sales is now enabled** in **Central Manager > Setup > People and Security > POS User Roles** by reopening the `ROLE-CSH-001` record after saving and confirming the **Allowed to perform No Sales** checkbox is selected.
- Verify **previously enabled permissions are unchanged** in **Central Manager > Setup > People and Security > POS User Roles** by confirming all five original permissions (Closeouts, Z & ZZ Reports, All Customers, Opening Amounts, Closing Amounts) remain checked when the record is reopened.
- Verify **Code and Role Name are unchanged** in **Central Manager > Setup > People and Security > POS User Roles** by confirming **Code** still shows `ROLE-CSH-001` and **Role name** still shows `TEST Regular Cashier`.
- Verify **Over/Short Limit is unchanged** in **Central Manager > Setup > People and Security > POS User Roles** by confirming **No Limit** remains selected in the Over/Short Limits section.
- Verify **updated role is present in target store** in **Store001 > Setup > People and Security > POS User Roles** by opening the `ROLE-CSH-001` record in Store Manager after synchronization and confirming the **Allowed to perform No Sales** checkbox is selected.

> **Note:** POS User Roles are a prerequisite dependency for Store Users. Changes to a role affect all store users assigned to that role. Actual result has been observed as Pass insert/update in the current implementation.