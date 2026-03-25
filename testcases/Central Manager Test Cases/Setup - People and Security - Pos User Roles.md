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

# Scenario: Insert a New POS User Role in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one Store Group exists (e.g., `Store Group 01`) with at least one store assigned (e.g., `Store001`).
- The user is logged into Central Manager with a role that has permissions to manage POS User Roles under Setup > People and Security.
- No existing POS User Role with Code `ROLE-CSH-001` exists in Central Manager (to avoid duplicates).
- The target store `Store001` is operational and able to receive synchronization from Central Manager.

## Required Test Data
- Role Code: ROLE-CSH-001
- Role Name: TEST Regular Cashier
- Permissions to enable:
  - Allowed to perform Closeouts: Yes
  - Allowed to generate Z & ZZ Reports: Yes
  - Allowed to view and edit all customers: Yes
  - Allowed to enter Opening Amounts: Yes
  - Allowed to enter Closing Amounts: Yes
- Over/Short Limit: No Limit
- Target Store: Store001

## Navigation Path
Central Manager → Setup → People and Security → POS User Roles

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **People and Security**.
4. Click **POS User Roles**. The POS User Roles list screen opens, displaying all existing roles.
5. Click **New** to create a new POS User Role. The role detail form opens.
6. In the **Code** field, type: `ROLE-CSH-001`
7. In the **Role name** field, type: `TEST Regular Cashier`
8. In the privileges list, locate and select the checkbox for each of the following permissions:
   - **Allowed to perform Closeouts**
   - **Allowed to generate Z & ZZ Reports**
   - **Allowed to view and edit all customers**
   - **Allowed to enter Opening Amounts**
   - **Allowed to enter Closing Amounts**
9. In the **Over/Short Limits** section, select **No Limit**.
10. Click **Save And Close** to save the new POS User Role and return to the POS User Roles list. The role is automatically synchronized to the applicable store groups on save.
11. In the POS User Roles list, locate the row where the **Code** column shows `ROLE-CSH-001` and confirm it is present.
12. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
13. Open Store Manager on `Store001`.
14. In Store Manager, navigate to **Setup → People and Security → POS User Roles**.
15. In the POS User Roles list, locate the role with Code `ROLE-CSH-001` and confirm it is present.

## Expected Results
- The new POS User Role `TEST Regular Cashier` with Code `ROLE-CSH-001` is created in Central Manager and saved successfully.
- The role is synchronized to and visible in the target store `Store001`.
- The role is available as an assignable POS role when creating or updating store users in `Store001`.

## Validation Checks
- Verify **new POS User Role is present** in **Central Manager > Setup > People and Security > POS User Roles** by locating `ROLE-CSH-001` in the POS User Roles list immediately after saving.
- Verify **Code and Role Name** in **Central Manager > Setup > People and Security > POS User Roles** by reopening the `ROLE-CSH-001` record and confirming **Code** displays `ROLE-CSH-001` and **Role name** displays `TEST Regular Cashier`.
- Verify **enabled permissions** in **Central Manager > Setup > People and Security > POS User Roles** by confirming the following checkboxes are selected when the record is reopened: Allowed to perform Closeouts, Allowed to generate Z & ZZ Reports, Allowed to view and edit all customers, Allowed to enter Opening Amounts, Allowed to enter Closing Amounts.
- Verify **Over/Short Limit setting** in **Central Manager > Setup > People and Security > POS User Roles** by confirming **No Limit** is selected in the Over/Short Limits section when the record is reopened.
- Verify **POS User Role is present in target store** in **Store001 > Setup > People and Security > POS User Roles** by locating `ROLE-CSH-001` in the store's POS User Roles list after synchronization.

> **Note:** POS User Roles are a prerequisite dependency for Store Users. Roles must be created and synchronized before store users can be assigned a POS role. Actual result has been observed as Pass insert/update in the current implementation.