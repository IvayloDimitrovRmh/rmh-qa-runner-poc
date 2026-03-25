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

# Scenario: Insert a New Sales Representative in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one Store Group exists (e.g., `Store Group 01`) with at least one store assigned (e.g., `Store001`).
- The user is logged into Central Manager with a role that has permissions to manage Sales Representatives under Setup > People and Security.
- No existing sales representative with ID `SR-001` exists in Central Manager (to avoid duplicates).
- The target store `Store001` is operational and able to receive synchronization from Central Manager.

## Required Test Data
- Sales Representative Name: Jane TEST-SR-001
- Sales Representative ID: SR-001
- Telephone: 312-555-0200
- E-mail: jane.testsr001@example.com
- Commission Type: Percent of Sale
- Percent of Sale: 5.00
- Store Group: Store Group 01
- Target Store: Store001

## Navigation Path
Central Manager → Setup → People and Security → Sales Representatives

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **People and Security**.
4. Click **Sales Representatives**. The Sales Representatives list screen opens, displaying all existing representatives.
5. Click **New** to create a new sales representative. The sales representative detail form opens.
6. In the **Name** field, type: `Jane TEST-SR-001`
7. In the **ID** field, type: `SR-001`
8. In the **Telephone** field, type: `312-555-0200`
9. In the **E-mail** field, type: `jane.testsr001@example.com`
10. In the **Percent of Sale** field, enter: `5.00` to assign a commission of 5% of each sale amount.
11. Leave the **Fixed Amount** and **Percent of Profit** fields blank — only one commission type is being configured.
12. Click the **Store Groups** tab.
13. On the Store Groups tab, locate **Store Group 01** in the list and select it to assign this sales representative to that store group.
14. Click **Save And Close** to save the new sales representative and return to the Sales Representatives list.
15. In the Sales Representatives list, locate the row where the **ID** column shows `SR-001` and confirm it is present.
16. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
17. Open Store Manager on `Store001`.
18. In Store Manager, navigate to **Setup → People and Security → Sales Representatives**.
19. In the Sales Representatives list, locate the representative with ID `SR-001` and confirm it is present.

## Expected Results
- The new sales representative `Jane TEST-SR-001` with ID `SR-001` is created in Central Manager and saved successfully.
- The sales representative is synchronized to and visible in the target store `Store001`.
- The representative does not appear in stores that are not members of `Store Group 01`.

## Validation Checks
- Verify **new sales representative is present** in **Central Manager > Setup > People and Security > Sales Representatives** by locating ID `SR-001` in the Sales Representatives list immediately after saving.
- Verify **Name and ID values** in **Central Manager > Setup > People and Security > Sales Representatives** by reopening the `SR-001` record and confirming **Name** displays `Jane TEST-SR-001` and **ID** displays `SR-001`.
- Verify **contact details** in **Central Manager > Setup > People and Security > Sales Representatives** by confirming **Telephone** shows `312-555-0200` and **E-mail** shows `jane.testsr001@example.com` when the record is reopened.
- Verify **commission configuration** in **Central Manager > Setup > People and Security > Sales Representatives** by confirming **Percent of Sale** shows `5.00` and **Fixed Amount** and **Percent of Profit** are blank when the record is reopened.
- Verify **Store Group assignment** in **Central Manager > Setup > People and Security > Sales Representatives** by clicking the **Store Groups** tab on the reopened record and confirming **Store Group 01** is selected.
- Verify **sales representative is present in target store** in **Store001 > Setup > People and Security > Sales Representatives** by locating ID `SR-001` in the store's Sales Representatives list after synchronization.
- Verify **sales representative does not appear in unassigned stores** by confirming ID `SR-001` is absent from the Sales Representatives list in any store not belonging to `Store Group 01`.

> **Note:** Actual result has been observed as Pass insert/update in the current implementation.