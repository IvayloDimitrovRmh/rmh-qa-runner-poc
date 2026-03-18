# Merchandising / Department

## Metadata
Feature: Department Insert/Update Synchronization  
Business Area: Merchandising  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central → Store  
Release: MVP 1.1  
Priority: High  

---

# Scenario: Department Insert Synchronization to Selected Stores

## Preconditions
- Central Manager is installed and operational.
- Central Server and Central Client synchronization services are running.
- At least one Store Group exists with one or more stores assigned.
- The test user has a Central Manager role with the Departments privilege enabled under Merchandising.
- The target store database is accessible and the store is online.

## Required Test Data
- Department Code (unique, e.g., DEPT-TEST-001)
- Department Name (e.g., Test Department Insert)
- Store Group (an existing group containing the target store(s))

## Navigation Path
Central Manager → Merchandising → Departments

## Execution Steps
1. Open Central Manager.
2. Click Merchandising.
3. Click Departments.
4. Click New to create a new department.
5. On the Department tab, enter the Department Code in the Code field.
6. Enter the Department Name in the Name field.
7. On the Store Groups tab, select the store group that contains the target store(s).
8. Click Save And Close.
9. Wait for the synchronization cycle to complete between Central Server and the target store(s).
10. Open Store Manager on the target store.
11. Navigate to Merchandising → Departments.
12. Verify that the newly created department appears in the department list.

## Expected Results
- The department created in Central Manager is synchronized and visible in the target store's department list.

## Validation Checks
- The department record exists in the target store's Departments list.
- The Department Code in the store matches the Code entered in Central Manager.
- The Department Name in the store matches the Name entered in Central Manager.
- The department does not appear in stores that are outside the assigned Store Group.

---

# Scenario: Department Update Synchronization to Selected Stores

## Preconditions
- Central Manager is installed and operational.
- Central Server and Central Client synchronization services are running.
- A department already exists in Central Manager and has been synchronized to the target store(s).
- The test user has a Central Manager role with the Departments privilege enabled under Merchandising.
- The target store database is accessible and the store is online.

## Required Test Data
- Existing Department Code (e.g., DEPT-TEST-001)
- Updated Department Name (e.g., Test Department Updated)
- Store Group (the same group from the insert scenario)

## Navigation Path
Central Manager → Merchandising → Departments

## Execution Steps
1. Open Central Manager.
2. Click Merchandising.
3. Click Departments.
4. Select the existing department (e.g., DEPT-TEST-001) from the list and open it for editing.
5. On the Department tab, update the Department Name to the new value.
6. Click Save And Close.
7. Wait for the synchronization cycle to complete between Central Server and the target store(s).
8. Open Store Manager on the target store.
9. Navigate to Merchandising → Departments.
10. Locate the department by its Code and verify the updated name.

## Expected Results
- The department name update made in Central Manager is synchronized and reflected in the target store's department list.

## Validation Checks
- The department record in the target store shows the updated Department Name.
- The Department Code remains unchanged in the store.
- The update is reflected only in stores within the assigned Store Group.
- Stores outside the assigned Store Group are unaffected by the update.