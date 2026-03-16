# Merchandising / Schedule

## Metadata
Feature: Schedule Insert/Update Synchronization  
Business Area: Merchandising  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central → Store  
Release: MVP 1.1  
Priority: High  

---

# Scenario: Schedule Insert Synchronization to Selected Stores

## Preconditions
- Central Manager is installed and operational.
- Central Server and Central Client synchronization services are running.
- At least one Store Group exists with one or more stores assigned.
- The test user has a Central Manager role with the Schedules privilege enabled under Merchandising.
- The target store database is accessible and the store is online.

## Required Test Data
- Schedule Description (e.g., Test Schedule Insert)
- Time Increment (e.g., 15 minutes, 30 minutes, 1 hour)
- Time blocks (e.g., Monday 11:00 am to 11:15 am)
- Store Group (an existing group containing the target store(s))

## Navigation Path
Central Manager → Merchandising → Schedules

## Execution Steps
1. Open Central Manager.
2. Click Merchandising.
3. Click Schedules.
4. Click New to create a new schedule.
5. In the Description field, enter the name of the schedule.
6. Select the Time Increment for the schedule.
7. Select the desired time blocks when the schedule should be in effect and click Set. Repeat as needed.
8. On the Store Groups tab, select the store group that contains the target store(s).
9. Click Save And Close.
10. Wait for the synchronization cycle to complete between Central Server and the target store(s).
11. Open Store Manager on the target store.
12. Navigate to Merchandising → Schedules.
13. Verify that the newly created schedule appears in the schedule list.

## Expected Results
- The schedule created in Central Manager is synchronized and visible in the target store's schedule list.

## Validation Checks
- The schedule record exists in the target store's Schedules list.
- The Description in the store matches the Description entered in Central Manager.
- The Time Increment and time blocks in the store match those entered in Central Manager.
- The schedule does not appear in stores that are outside the assigned Store Group.

---

# Scenario: Schedule Update Synchronization to Selected Stores

## Preconditions
- Central Manager is installed and operational.
- Central Server and Central Client synchronization services are running.
- A schedule already exists in Central Manager and has been synchronized to the target store(s).
- The test user has a Central Manager role with the Schedules privilege enabled under Merchandising.
- The target store database is accessible and the store is online.

## Required Test Data
- Existing Schedule Description (e.g., Test Schedule Insert)
- Updated Time Increment or time blocks (as needed)
- Store Group (the same group from the insert scenario)

## Navigation Path
Central Manager → Merchandising → Schedules

## Execution Steps
1. Open Central Manager.
2. Click Merchandising.
3. Click Schedules.
4. Select the existing schedule from the list and open it for editing.
5. Update the Description, Time Increment, or time blocks as required.
6. Click Save And Close.
7. Wait for the synchronization cycle to complete between Central Server and the target store(s).
8. Open Store Manager on the target store.
9. Navigate to Merchandising → Schedules.
10. Locate the schedule by its Description and verify the updated parameters.

## Expected Results
- The schedule update made in Central Manager is synchronized and reflected in the target store's schedule list.

## Validation Checks
- The schedule record in the target store shows the updated parameters.
- The Description remains unchanged in the store unless updated in Central Manager.
- The update is reflected only in stores within the assigned Store Group.
- Stores outside the assigned Store Group are unaffected by the update.
