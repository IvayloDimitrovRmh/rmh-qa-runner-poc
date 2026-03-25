# Setup / Store

## Metadata
Feature: Store Setup — Active Store Filter
Business Area: Setup > Store
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Verify That Data Is Inserted Only Into Active Stores

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least two stores exist in Central Manager:
  - `Store001` — configured with **Active** status in the Store table.
  - `Store002` — configured with **Inactive** status in the Store table.
- Both `Store001` and `Store002` belong to the same Store Group (e.g., `Store Group 01`) to confirm that the active/inactive filter — not the Store Group assignment — controls the sync target.
- The user is logged into Central Manager with a role that has permissions to manage store records and create Departments.
- No existing department with Code `TEST-STORE-FILTER` exists in Central Manager (to ensure a clean insert that produces an observable sync event).

## Required Test Data
- Active Store: Store001
- Inactive Store: Store002
- Store Group (shared by both): Store Group 01
- Department Code (trigger entity): TEST-STORE-FILTER
- Department Name: Store Filter Test Department

## Navigation Path
Central Manager → Setup → Store

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, click **Store**. The Store list screen opens, showing all configured stores.
4. In the Store list, locate `Store001` and confirm it is set to **Active** status.
5. In the Store list, locate `Store002` and confirm it is set to **Inactive** status. If `Store002` is not already inactive, open its record and set it to **Inactive**, then save.
6. Navigate to **Merchandising → Departments** to create a new department that will serve as the observable sync trigger.
7. Click **New** to create a new department.
8. On the **Department** tab, enter the following values:
   - **Code**: `TEST-STORE-FILTER`
   - **Name**: `Store Filter Test Department`
9. Click the **Store Groups** tab. Select **Store Group 01** to assign this department to the store group that contains both `Store001` and `Store002`.
10. Click **Save And Close** to save the new department.
11. Allow time for the synchronization cycle to complete between Central Server and the stores, or trigger a manual sync if required by your environment.
12. Open Store Manager on the **active** store `Store001`.
13. In Store Manager on `Store001`, navigate to **Merchandising → Departments**.
14. Confirm that the department with Code `TEST-STORE-FILTER` is present in the list.
15. Open Store Manager on the **inactive** store `Store002` (if accessible for verification purposes).
16. In Store Manager on `Store002`, navigate to **Merchandising → Departments**.
17. Confirm that the department with Code `TEST-STORE-FILTER` is **absent** from the list.

## Expected Results
- The department `TEST-STORE-FILTER` is present in the active store `Store001` after synchronization.
- The department `TEST-STORE-FILTER` is absent from the inactive store `Store002` — no data insert occurred.
- The active status filter in the `Store` table correctly gates which stores receive synchronization.

## Validation Checks
- Verify **department is present in active store** in **Store001 > Merchandising > Departments** by locating `TEST-STORE-FILTER` in the Departments list after synchronization and confirming it is present.
- Verify **department is absent from inactive store** in **Store002 > Merchandising > Departments** by confirming `TEST-STORE-FILTER` does not appear in the Departments list — no record should exist.
- Verify **Store001 active status** in **Central Manager > Setup > Store** by confirming the `Store001` record shows Active status before the sync is triggered.
- Verify **Store002 inactive status** in **Central Manager > Setup > Store** by confirming the `Store002` record shows Inactive status before the sync is triggered.

---

> **Known Issue:** Actual behavior has been observed as Create & Update with ID=0, indicating the active status filter in the `Store` table may not be applied correctly during synchronization. If this defect is present, the department `TEST-STORE-FILTER` may incorrectly appear in `Store002` or may be written with a StoreID of 0. Document any such observation as a defect and record the actual StoreID found in the target store database if database access is available.