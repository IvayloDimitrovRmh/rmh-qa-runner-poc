# Setup / People and Security — Sales Representatives

## Metadata
Feature: Sales Representatives
Business Area: Setup > People and Security > Sales Representatives
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Update an Existing Sales Representative in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- A sales representative with ID `SR-001` and Name `Jane TEST-SR-001` already exists in Central Manager with the following values:
  - Telephone: 312-555-0200
  - E-mail: jane.testsr001@example.com
  - Percent of Sale: 5.00
  - Store Group: Store Group 01
- The sales representative `SR-001` is already present in `Store001` from the prior Insert scenario.
- The user is logged into Central Manager with a role that has permissions to manage Sales Representatives under Setup > People and Security.
- The target store `Store001` is operational and able to receive synchronization from Central Manager.

## Required Test Data
- Sales Representative ID (existing): SR-001
- Sales Representative Name (existing): Jane TEST-SR-001
- Field to update: Percent of Sale
- Current Percent of Sale value: 5.00
- Updated Percent of Sale value: 7.50
- Store Group: Store Group 01
- Target Store: Store001

## Navigation Path
Central Manager → Setup → People and Security → Sales Representatives

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **People and Security**.
4. Click **Sales Representatives**. The Sales Representatives list screen opens, displaying all existing representatives.
5. In the Sales Representatives list, locate the row where the **ID** column shows `SR-001`. Click on that row to select it and open the sales representative record.
6. Verify the current values before making changes:
   - **Name**: `Jane TEST-SR-001`
   - **ID**: `SR-001`
   - **Telephone**: `312-555-0200`
   - **E-mail**: `jane.testsr001@example.com`
   - **Percent of Sale**: `5.00`
7. In the **Percent of Sale** field, clear the existing value `5.00`.
8. Type the updated value: `7.50`
9. Leave all other fields — Name, ID, Telephone, E-mail, Fixed Amount, and Percent of Profit — unchanged.
10. Click the **Store Groups** tab. Confirm that **Store Group 01** is selected. Do not change the store group assignment.
11. Click **Save And Close** to save the changes and return to the Sales Representatives list.
12. In the Sales Representatives list, locate the row for ID `SR-001` and confirm it is still present.
13. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
14. Open Store Manager on `Store001`.
15. In Store Manager, navigate to **Setup → People and Security → Sales Representatives**.
16. In the Sales Representatives list, locate the representative with ID `SR-001` and open the record.
17. Confirm the **Percent of Sale** field shows the updated value `7.50`.

## Expected Results
- The sales representative record `SR-001` is successfully updated in Central Manager with the new Percent of Sale commission of `7.50`.
- The updated sales representative data is synchronized to the target store `Store001`.
- All other fields remain unchanged after the update.

## Validation Checks
- Verify **updated Percent of Sale value** in **Central Manager > Setup > People and Security > Sales Representatives** by reopening the `SR-001` record after saving and confirming the **Percent of Sale** field displays `7.50`.
- Verify **Name is unchanged** in **Central Manager > Setup > People and Security > Sales Representatives** by confirming the **Name** field still displays `Jane TEST-SR-001` when the record is reopened.
- Verify **ID is unchanged** in **Central Manager > Setup > People and Security > Sales Representatives** by confirming the **ID** field still displays `SR-001` when the record is reopened.
- Verify **Telephone is unchanged** in **Central Manager > Setup > People and Security > Sales Representatives** by confirming the **Telephone** field still shows `312-555-0200` when the record is reopened.
- Verify **E-mail is unchanged** in **Central Manager > Setup > People and Security > Sales Representatives** by confirming the **E-mail** field still shows `jane.testsr001@example.com` when the record is reopened.
- Verify **Store Group assignment is unchanged** in **Central Manager > Setup > People and Security > Sales Representatives** by clicking the **Store Groups** tab on the reopened record and confirming **Store Group 01** remains selected after saving.
- Verify **updated sales representative data in target store** in **Store001 > Setup > People and Security > Sales Representatives** by opening the `SR-001` record in Store Manager after synchronization and confirming the **Percent of Sale** field displays `7.50`.

> **Note:** Actual result has been observed as Pass insert/update in the current implementation.