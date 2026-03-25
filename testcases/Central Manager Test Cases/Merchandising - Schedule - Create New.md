# Merchandising / Schedules

## Metadata
Feature: Merchandising Schedules
Business Area: Merchandising > Schedules
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Insert a New Schedule in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one Store Group exists (e.g., `Store Group 01`) with at least one store assigned (e.g., `Store001`).
- The user is logged into Central Manager with a role that has the Schedules privilege enabled under Merchandising.
- The target store `Store001` is operational and able to receive synchronization from Central Manager.
- No existing schedule with Description `TEST-SCH-001 Weekday Lunch Special` exists in Central Manager (to avoid duplicates).

## Required Test Data
- Schedule Description: TEST-SCH-001 Weekday Lunch Special
- Time Increment: 1 hour
- Time Block Day: Monday
- Time Block Start: 11:00 AM
- Time Block End: 12:00 PM
- Store Group: Store Group 01
- Target Store: Store001

## Navigation Path
Central Manager → Merchandising → Schedules

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Merchandising**.
3. In the Merchandising menu, click **Schedules**. The Schedules list screen opens, displaying all existing schedules.
4. Click **New** to create a new schedule. The schedule detail form opens.
5. In the **Description** field, type: `TEST-SCH-001 Weekday Lunch Special`
6. In the **Time Increment** field, select **1 hour** from the dropdown list.
7. In the time grid that appears, locate **Monday** and click the block corresponding to **11:00 AM – 12:00 PM** to select it.
8. Click **Set** to confirm this time block as active for the schedule. The selected block should appear highlighted or marked as set.
9. Click the **Store Groups** tab.
10. On the Store Groups tab, locate **Store Group 01** in the list and select it to assign this schedule to that store group.
11. Click **Save And Close** to save the new schedule and return to the Schedules list.
12. In the Schedules list, locate the row where the **Description** column shows `TEST-SCH-001 Weekday Lunch Special` and confirm it is present.
13. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
14. Open Store Manager on `Store001`.
15. In Store Manager, navigate to **Merchandising → Schedules**.
16. In the Schedules list, locate the schedule with Description `TEST-SCH-001 Weekday Lunch Special` and confirm it is present.

## Expected Results
- The new schedule `TEST-SCH-001 Weekday Lunch Special` is created in Central Manager and saved successfully.
- The schedule is synchronized to and visible in the target store `Store001`.
- The schedule does not appear in stores that are not members of `Store Group 01`.

## Validation Checks
- Verify **new schedule record is present** in **Central Manager > Merchandising > Schedules** by locating `TEST-SCH-001 Weekday Lunch Special` in the Schedules list immediately after saving.
- Verify **Description value** in **Central Manager > Merchandising > Schedules** by reopening the schedule record and confirming the **Description** field displays `TEST-SCH-001 Weekday Lunch Special`.
- Verify **Time Increment is correct** in **Central Manager > Merchandising > Schedules** by confirming the **Time Increment** field shows **1 hour** when the record is reopened.
- Verify **time block is set** in **Central Manager > Merchandising > Schedules** by confirming the **Monday 11:00 AM – 12:00 PM** block is marked as set in the time grid when the record is reopened.
- Verify **Store Group assignment** in **Central Manager > Merchandising > Schedules** by clicking the **Store Groups** tab on the reopened record and confirming **Store Group 01** is selected.
- Verify **schedule is present in target store** in **Store001 > Merchandising > Schedules** by locating the schedule with Description `TEST-SCH-001 Weekday Lunch Special` in the store's Schedules list after synchronization.
- Verify **schedule does not appear in unassigned stores** by confirming the schedule with Description `TEST-SCH-001 Weekday Lunch Special` is absent from the Schedules list in any store not belonging to `Store Group 01`.