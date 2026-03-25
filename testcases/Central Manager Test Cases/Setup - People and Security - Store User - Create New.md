# Setup / People and Security — Store Users

## Metadata
Feature: Store Users
Business Area: Setup > People and Security > Store Users
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Insert a New Store User in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one POS User Role already exists in Central Manager (e.g., `Cashier`) — user roles must be created before store users can be assigned a role.
- At least one Store Group exists (e.g., `Store Group 01`) with at least one store assigned (e.g., `Store001`).
- The user is logged into Central Manager with a role that has permissions to manage Store Users under Setup > People and Security.
- No existing store user with Login ID `1001` exists in Central Manager (to avoid duplicates).
- The target store `Store001` is operational and able to receive synchronization from Central Manager.

## Required Test Data
- Login ID: 1001
- User Name: Test Cashier 001
- Email: testcashier001@example.com
- Password: Test@1234
- Floor Limit: 500.00
- Return Limit: 100.00
- User Role (POS): Cashier
- Store Group: Store Group 01
- Target Store: Store001

## Navigation Path
Central Manager → Setup → People and Security → Store Users

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **People and Security**.
4. Click **Store Users**. The Store Users list screen opens, displaying all existing store users.
5. Click **New** to create a new store user. The store user detail form opens.
6. In the **Login ID** field, type: `1001`
7. In the **User Name** field, type: `Test Cashier 001`
8. In the **Email** field, type: `testcashier001@example.com`
9. In the **Password** field, type: `Test@1234`
10. In the **Floor Limit** field, enter: `500.00`
11. In the **Return Limit** field, enter: `100.00`
12. In the **User Roles** section, locate the **User Roles** drop-down and select `Cashier` as the POS role to assign to this user.
13. Click the **Store Groups** tab.
14. On the Store Groups tab, locate **Store Group 01** in the list and select it to assign this user to that store group.
15. Click **Save And Close** to save the new store user and return to the Store Users list.
16. In the Store Users list, locate the row where the **Login ID** column shows `1001` and confirm it is present.
17. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
18. Open Store Manager on `Store001`.
19. In Store Manager, navigate to **Setup → People and Security → Store Users**.
20. In the Store Users list, locate the user with Login ID `1001` and confirm it is present.

## Expected Results
- The new store user `Test Cashier 001` with Login ID `1001` is created in Central Manager and saved successfully.
- The store user is synchronized to and visible in the target store `Store001`.
- The user does not appear in stores that are not members of `Store Group 01`.

## Validation Checks
- Verify **new store user is present** in **Central Manager > Setup > People and Security > Store Users** by locating Login ID `1001` in the Store Users list immediately after saving.
- Verify **Login ID and User Name** in **Central Manager > Setup > People and Security > Store Users** by reopening the `1001` record and confirming **Login ID** displays `1001` and **User Name** displays `Test Cashier 001`.
- Verify **Email value** in **Central Manager > Setup > People and Security > Store Users** by confirming the **Email** field displays `testcashier001@example.com` when the record is reopened.
- Verify **Floor Limit and Return Limit** in **Central Manager > Setup > People and Security > Store Users** by confirming **Floor Limit** shows `500.00` and **Return Limit** shows `100.00` when the record is reopened.
- Verify **POS Role assignment** in **Central Manager > Setup > People and Security > Store Users** by confirming the **User Roles** drop-down shows `Cashier` when the record is reopened.
- Verify **Store Group assignment** in **Central Manager > Setup > People and Security > Store Users** by clicking the **Store Groups** tab on the reopened record and confirming **Store Group 01** is selected.
- Verify **store user is present in target store** in **Store001 > Setup > People and Security > Store Users** by locating Login ID `1001` in the store's Store Users list after synchronization.
- Verify **store user does not appear in unassigned stores** by confirming Login ID `1001` is absent from the Store Users list in any store not belonging to `Store Group 01`.

> **Note:** Actual result has been observed as Pass insert/update in the current implementation.