# Merchandising / Items

## Metadata
Feature: Item Synchronization to Store Groups  
Business Area: Merchandising > Items  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: Unknown  
Priority: Unknown  

---

# Scenario: Items - Non Inventory Item Synchronization to Selected Stores

## Business Entity
Non Inventory Item

## Business Purpose
Ensure that Non-Inventory Items created or updated in Central Manager synchronize correctly to the selected Store Groups so that services, fees, or non-stock items are available consistently across stores.

## Trigger
A user creates or updates a Non-Inventory Item in Central Manager and assigns it to one or more Store Groups.

## Preconditions
- Central and Store synchronization services are active.
- At least one Store Group exists.
- A store (e.g., QA01) belongs to the assigned Store Group.
- User has permission to create or modify items in Central Manager.

## Required Test Data
- Non-Inventory Item Lookup Code
- Item Description
- Department
- Category
- Price
- Assigned Store Group

## Navigation Path
Central Manager → Merchandising → Items

## Execution Steps
1. Open Central Manager and navigate to Merchandising → Items.
2. Create a new item and configure it as a Non-Inventory Item.
3. Enter required item information such as Lookup Code, Description, Department, Category, and Price.
4. Assign the item to a Store Group.
5. Save the item.
6. Allow synchronization to occur.
7. Verify the item appears in the assigned store(s).

## Expected Results
- Non-Inventory Item is inserted or updated in the selected store(s).
- Item data in the store matches the values configured in Central Manager.

## Validation Checks
- Item appears in the store item list.
- Lookup Code and Description match Central.
- Price matches Central configuration.
- Store Group assignment correctly determines which stores receive the item.

## Pass Criteria
- Non-Inventory Item is successfully inserted or updated in the selected store(s).
- Item data is consistent between Central and Store.

## Fail Criteria
- Item does not appear in the store.
- Item data differs between Central and Store.
- Synchronization fails or produces duplicate records.

## Risks / Assumptions
- Synchronization timing may depend on configured sync intervals.
- Store must belong to the assigned Store Group to receive the item.

## Known Issues / Notes
- Actual Result observed: Pass insert/update