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

# Scenario: Update an Existing Password Policy Configuration in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- A Password Policy configuration already exists in Central Manager with the following values prior to this test:
  - Password expire periodically: Enabled
  - Maximum age of password (days): 90
  - Show reminder (days before): 10
  - Number of passwords to save: 3
  - Password complexity: Enabled
  - Minimum password length: 8
  - Required uppercase letter: 1
  - Required numeric digit: 1
  - Required special character: 0
- To verify this precondition before executing the test, navigate to **Central Manager → Setup → People and Security → Password Policy** and confirm the above values are present. If the policy does not yet exist, execute the **Password Policy - Create New** test case first.
- The user is logged into Central Manager with a role that has permissions to manage Password Policy under Setup > People and Security.

## Required Test Data
- Field to update: Maximum age of password (days)
- Existing value (before update): 90
- Updated value (after update): 60
- All other fields remain unchanged
- Target Store: Store001

## Navigation Path
Central Manager → Setup → People and Security → Password Policy

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **People and Security**.
4. Click **Password Policy**. The Password Policy configuration form opens, showing the existing values.
5. Confirm the **Password expire periodically** checkbox is currently selected.
6. Confirm the **Maximum age of password (days)** field currently shows `90`. This is the value you will update.
7. Click inside the **Maximum age of password (days)** field and clear the existing value.
8. Type `60` in the **Maximum age of password (days)** field.
9. Do not modify any other fields. All remaining fields should retain their existing values:
   - Show reminder (days before): `10`
   - Number of passwords to save: `3`
   - Password complexity: Enabled
   - Minimum password length: `8`
   - Required uppercase letter: `1`
   - Required numeric digit: `1`
   - Required special character: `0`
10. Click **Save And Close** to save the updated password policy and return to the Setup menu.
11. Reopen the Password Policy form by navigating back to **Setup → People and Security → Password Policy** and confirm all values are saved correctly, particularly that **Maximum age of password (days)** now shows `60`.
12. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
13. Open Store Manager on `Store001`.
14. In Store Manager, navigate to **Setup → People and Security → Password Policy**.
15. Confirm the Password Policy form in the store reflects the updated configuration, with **Maximum age of password (days)** showing `60`.

## Expected Results
- The Password Policy in Central Manager is updated: the **Maximum age of password (days)** field now shows `60` instead of `90`.
- All other password policy fields remain unchanged from their prior values.
- The updated Password Policy configuration is synchronized to the active target store `Store001`.
- Store users at `Store001` will be subject to the updated 60-day password expiry rule.

## Validation Checks
- Verify **Maximum age of password updated to 60** in **Central Manager > Setup > People and Security > Password Policy** by reopening the Password Policy form after saving and confirming the **Maximum age of password (days)** field displays `60`.
- Verify **no unintended field changes** in **Central Manager > Setup > People and Security > Password Policy** by confirming all other fields retain their prior values: Password expire periodically enabled, Show reminder `10`, Number of passwords to save `3`, Password complexity enabled, Minimum password length `8`, Required uppercase `1`, Required numeric `1`, Required special character `0`.
- Verify **updated Password Policy is synchronized to target store** in **Store001 > Setup > People and Security > Password Policy** by opening the Password Policy form in Store Manager after synchronization and confirming the **Maximum age of password (days)** field displays `60` and all other fields match the values above.

> **Note:** Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.