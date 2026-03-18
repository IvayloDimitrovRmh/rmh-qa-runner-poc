# Merchandising / Category

## Metadata
Feature: Category Insert/Update Synchronization  
Business Area: Merchandising  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central → Store  
Release: MVP 1.1  
Priority: High  

---

# Scenario: Category Insert Synchronization to Selected Stores

## Preconditions
- Central Manager is installed and operational.
- Central Server and Central Client synchronization services are running.
- At least one Store Group exists with one or more stores assigned.
- At least one Department exists in Central Manager.
- The test user has a Central Manager role with the Categories privilege enabled under Merchandising.
- The target store database is accessible and the store is online.

## Required Test Data
- Category Code (unique, e.g., CAT-TEST-001)
- Category Name (e.g., Test Category Insert)
- Department (an existing department)
- Store Group (an existing group containing the target store(s))

## Navigation Path
Central Manager → Merchandising → Categories

## Execution Steps
1. Open Central Manager.
2. Click Merchandising.
3. Click Categories.
4. Click New to create a new category.
5. On the Category tab, enter the Category Code in the Code field.
6. Enter the Category Name in the Name field.
7. Select the Department that the category belongs to.
8. On the Store Groups tab, select the store group that contains the target store(s).
9. Click Save And Close.
10. Wait for the synchronization cycle to complete between Central Server and the target store(s).
11. Open Store Manager on the target store.
12. Navigate to Merchandising → Categories.
13. Verify that the newly created category appears in the category list.

## Expected Results
- The category created in Central Manager is synchronized and visible in the target store's category list.

## Validation Checks
- The category record exists in the target store's Categories list.
- The Category Code in the store matches the Code entered in Central Manager.
- The Category Name in the store matches the Name entered in Central Manager.
- The Department assignment in the store matches the Department selected in Central Manager.
- The category does not appear in stores that are outside the assigned Store Group.

---

# Scenario: Category Update Synchronization to Selected Stores

## Preconditions
- Central Manager is installed and operational.
- Central Server and Central Client synchronization services are running.
- A category already exists in Central Manager and has been synchronized to the target store(s).
- The test user has a Central Manager role with the Categories privilege enabled under Merchandising.
- The target store database is accessible and the store is online.

## Required Test Data
- Existing Category Code (e.g., CAT-TEST-001)
- Updated Category Name (e.g., Test Category Updated)
- Department (the same or a different department, as needed)
- Store Group (the same group from the insert scenario)

## Navigation Path
Central Manager → Merchandising → Categories

## Execution Steps
1. Open Central Manager.
2. Click Merchandising.
3. Click Categories.
4. Select the existing category (e.g., CAT-TEST-001) from the list and open it for editing.
5. On the Category tab, update the Category Name to the new value.
6. (Optional) Change the Department assignment if required.
7. Click Save And Close.
8. Wait for the synchronization cycle to complete between Central Server and the target store(s).
9. Open Store Manager on the target store.
10. Navigate to Merchandising → Categories.
11. Locate the category by its Code and verify the updated name and department.

## Expected Results
- The category update made in Central Manager is synchronized and reflected in the target store's category list.

## Validation Checks
- The category record in the target store shows the updated Category Name.
- The Category Code remains unchanged in the store.
- The Department assignment matches the update (if changed).
- The update is reflected only in stores within the assigned Store Group.
- Stores outside the assigned Store Group are unaffected by the update.