# Setup / People and Security — Password Policy

## Metadata
Feature: Password Policy
Business Area: Setup > People and Security > Password Policy
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Configure the Store User Password Policy in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- The user is logged into Central Manager with a role that has permissions to manage Password Policy under Setup > People and Security.
- The Password Policy form in Central Manager is accessible and currently shows default or unconfigured values.

## Required Test Data
- Password expire periodically: Enabled
- Maximum age of password (days): 90
- Show reminder (days before): 10
- Number of passwords to save: 3
- Password complexity: Enabled
- Minimum password length: 8
- Required uppercase letter: 1
- Required numeric digit: 1
- Required special character: 0
- Target Store: Store001

## Navigation Path
Central Manager → Setup → People and Security → Password Policy

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **People and Security**.
4. Click **Password Policy**. The Password Policy configuration form opens.
5. To enable password expiry, select the **Password expire periodically** checkbox.
6. In the **Maximum age of password (days)** field, enter: `90`
7. In the **Show reminder (days before)** field, enter: `10`
8. In the **Number of passwords to save** field, enter: `3`
9. To enable password complexity requirements, select the **Password complexity** checkbox.
10. In the **Minimum password length** field, enter: `8`
11. In the **Required uppercase letter** field, enter: `1`
12. In the **Required numeric digit** field, enter: `1`
13. Leave the **Required special character** field as `0` — no special character requirement for this configuration.
14. Click **Save And Close** to save the password policy and return to the Setup menu.
15. Reopen the Password Policy form by navigating back to **Setup → People and Security → Password Policy** and confirm all entered values are saved correctly.
16. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
17. Open Store Manager on `Store001`.
18. In Store Manager, navigate to **Setup → People and Security → Password Policy**.
19. Confirm the Password Policy form in the store reflects the same configuration entered in Central Manager.

## Expected Results
- The Password Policy is saved in Central Manager with all configured values.
- The Password Policy configuration is synchronized to the active target store `Store001`.
- Store users at `Store001` will be subject to the configured password expiry and complexity rules.

## Validation Checks
- Verify **Password expire periodically is enabled** in **Central Manager > Setup > People and Security > Password Policy** by confirming the **Password expire periodically** checkbox is selected when the form is reopened.
- Verify **Maximum age of password** in **Central Manager > Setup > People and Security > Password Policy** by confirming the **Maximum age of password (days)** field displays `90` when the form is reopened.
- Verify **Show reminder setting** in **Central Manager > Setup > People and Security > Password Policy** by confirming the **Show reminder (days before)** field displays `10` when the form is reopened.
- Verify **Number of passwords to save** in **Central Manager > Setup > People and Security > Password Policy** by confirming the **Number of passwords to save** field displays `3` when the form is reopened.
- Verify **Password complexity is enabled** in **Central Manager > Setup > People and Security > Password Policy** by confirming the **Password complexity** checkbox is selected when the form is reopened.
- Verify **Minimum password length** in **Central Manager > Setup > People and Security > Password Policy** by confirming the **Minimum password length** field displays `8` when the form is reopened.
- Verify **Password Policy is synchronized to target store** in **Store001 > Setup > People and Security > Password Policy** by opening the Password Policy form in Store Manager after synchronization and confirming all values match: Password expire periodically enabled, Maximum age `90`, Show reminder `10`, Number to save `3`, Password complexity enabled, Minimum length `8`, Required uppercase `1`, Required numeric `1`.

> **Note:** Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.