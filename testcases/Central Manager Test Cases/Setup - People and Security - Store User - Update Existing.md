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

# Scenario: Update an Existing Store User in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- A store user with Login ID `1001` and User Name `Test Cashier 001` already exists in Central Manager with the following values:
  - Email: testcashier001@example.com
  - Floor Limit: 500.00
  - Return Limit: 100.00
  - POS Role: Cashier
  - Store Group: Store Group 01
- The store user `1001` is already present in `Store001` from the prior Insert scenario.
- The user is logged into Central Manager with a role that has permissions to manage Store Users under Setup > People and Security.
- The target store `Store001` is operational and able to receive synchronization from Central Manager.

## Required Test Data
- Login ID (existing): 1001
- User Name (existing): Test Cashier 001
- Field to update: Floor Limit
- Current Floor Limit value: 500.00
- Updated Floor Limit value: 750.00
- Store Group: Store Group 01
- Target Store: Store001

## Navigation Path
Central Manager → Setup → People and Security → Store Users

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **People and Security**.
4. Click **Store Users**. The Store Users list screen opens, displaying all existing store users.
5. In the Store Users list, locate the row where the **Login ID** column shows `1001`. Click on that row to select it and open the store user record.
6. Verify the current values before making changes:
   - **Login ID**: `1001`
   - **User Name**: `Test Cashier 001`
   - **Email**: `testcashier001@example.com`
   - **Floor Limit**: `500.00`
   - **Return Limit**: `100.00`
7. In the **Floor Limit** field, clear the existing value `500.00`.
8. Type the updated value: `750.00`
9. Leave all other fields — Login ID, User Name, Email, Return Limit, Password, and POS Role — unchanged.
10. Click the **Store Groups** tab. Confirm that **Store Group 01** is selected. Do not change the store group assignment.
11. Click **Save And Close** to save the changes and return to the Store Users list.
12. In the Store Users list, locate the row for Login ID `1001` and confirm it is still present.
13. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
14. Open Store Manager on `Store001`.
15. In Store Manager, navigate to **Setup → People and Security → Store Users**.
16. In the Store Users list, locate the user with Login ID `1001` and open the record.
17. Confirm the **Floor Limit** field shows the updated value `750.00`.

## Expected Results
- The store user record `1001` is successfully updated in Central Manager with the new Floor Limit of `750.00`.
- The updated store user data is synchronized to the target store `Store001`.
- All other user fields remain unchanged after the update.

## Validation Checks
- Verify **updated Floor Limit value** in **Central Manager > Setup > People and Security > Store Users** by reopening the `1001` record after saving and confirming the **Floor Limit** field displays `750.00`.
- Verify **Login ID is unchanged** in **Central Manager > Setup > People and Security > Store Users** by confirming the **Login ID** field still displays `1001` when the record is reopened.
- Verify **User Name is unchanged** in **Central Manager > Setup > People and Security > Store Users** by confirming the **User Name** field still displays `Test Cashier 001` when the record is reopened.
- Verify **Return Limit is unchanged** in **Central Manager > Setup > People and Security > Store Users** by confirming the **Return Limit** field still shows `100.00` when the record is reopened.
- Verify **POS Role is unchanged** in **Central Manager > Setup > People and Security > Store Users** by confirming the **User Roles** drop-down still shows `Cashier` when the record is reopened.
- Verify **Store Group assignment is unchanged** in **Central Manager > Setup > People and Security > Store Users** by clicking the **Store Groups** tab on the reopened record and confirming **Store Group 01** remains selected after saving.
- Verify **updated store user data in target store** in **Store001 > Setup > People and Security > Store Users** by opening the `1001` record in Store Manager after synchronization and confirming the **Floor Limit** field displays `750.00`.

> **Note:** Actual result has been observed as Pass insert/update in the current implementation.