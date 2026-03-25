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

# Scenario: Update an Existing Schedule in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- A schedule with Description `TEST-SCH-001 Weekday Lunch Special` already exists in Central Manager, configured with Time Increment `1 hour` and a time block set for **Monday 11:00 AM – 12:00 PM**.
- The schedule `TEST-SCH-001 Weekday Lunch Special` is currently assigned to Store Group `Store Group 01`, which includes store `Store001`.
- The user is logged into Central Manager with a role that has the Schedules privilege enabled under Merchandising.
- The target store `Store001` is operational and able to receive synchronization from Central Manager.

## Required Test Data
- Schedule Description (existing): TEST-SCH-001 Weekday Lunch Special
- Time Increment (existing): 1 hour
- Existing time block: Monday 11:00 AM – 12:00 PM
- New time block to add: Tuesday 11:00 AM – 12:00 PM
- Store Group: Store Group 01
- Target Store: Store001

## Navigation Path
Central Manager → Merchandising → Schedules

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Merchandising**.
3. In the Merchandising menu, click **Schedules**. The Schedules list screen opens, displaying all existing schedules.
4. In the Schedules list, locate the row where the **Description** column shows `TEST-SCH-001 Weekday Lunch Special`. Click on that row to select it and open the schedule record.
5. The schedule detail form opens. Verify the current values before making changes:
   - **Description**: `TEST-SCH-001 Weekday Lunch Special`
   - **Time Increment**: `1 hour`
   - **Monday 11:00 AM – 12:00 PM** block should appear as set in the time grid.
6. In the time grid, locate **Tuesday** and click the block corresponding to **11:00 AM – 12:00 PM** to select it.
7. Click **Set** to confirm this time block as active. The Tuesday 11:00 AM – 12:00 PM block should now appear highlighted or marked as set alongside the existing Monday block.
8. Click the **Store Groups** tab. Confirm that **Store Group 01** is selected. Do not change the store group assignment.
9. Click **Save And Close** to save the changes and return to the Schedules list.
10. In the Schedules list, locate the row for `TEST-SCH-001 Weekday Lunch Special` and confirm it is still present.
11. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
12. Open Store Manager on `Store001`.
13. In Store Manager, navigate to **Merchandising → Schedules**.
14. In the Schedules list, locate the schedule with Description `TEST-SCH-001 Weekday Lunch Special` and open the record.
15. Confirm the time grid shows both **Monday 11:00 AM – 12:00 PM** and **Tuesday 11:00 AM – 12:00 PM** as set.

## Expected Results
- The schedule record `TEST-SCH-001 Weekday Lunch Special` is successfully updated in Central Manager with the additional Tuesday 11:00 AM – 12:00 PM time block.
- The updated schedule data is synchronized to the target store `Store001`.
- The Description and Time Increment remain unchanged after the update.
- The Monday time block remains set and is not affected by the addition of the Tuesday block.

## Validation Checks
- Verify **Tuesday time block is set** in **Central Manager > Merchandising > Schedules** by reopening the `TEST-SCH-001 Weekday Lunch Special` record after saving and confirming the **Tuesday 11:00 AM – 12:00 PM** block is marked as set in the time grid.
- Verify **Monday time block is preserved** in **Central Manager > Merchandising > Schedules** by confirming the **Monday 11:00 AM – 12:00 PM** block remains set in the time grid when the record is reopened.
- Verify **Description is unchanged** in **Central Manager > Merchandising > Schedules** by confirming the **Description** field still displays `TEST-SCH-001 Weekday Lunch Special` when the record is reopened.
- Verify **Time Increment is unchanged** in **Central Manager > Merchandising > Schedules** by confirming the **Time Increment** field still shows **1 hour** when the record is reopened.
- Verify **Store Group assignment is unchanged** in **Central Manager > Merchandising > Schedules** by clicking the **Store Groups** tab on the reopened record and confirming **Store Group 01** remains selected after saving.
- Verify **updated schedule data in target store** in **Store001 > Merchandising > Schedules** by opening the `TEST-SCH-001 Weekday Lunch Special` record in Store Manager after synchronization and confirming both **Monday 11:00 AM – 12:00 PM** and **Tuesday 11:00 AM – 12:00 PM** blocks are set in the time grid.
- Verify **stores outside Store Group 01 are unaffected** by confirming the schedule update does not appear in any store not assigned to `Store Group 01`.