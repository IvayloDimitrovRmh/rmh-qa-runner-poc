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

# Scenario: Items - Weighed Item Synchronization to Selected Stores

## Business Entity
Weighed Item

## Business Purpose
Ensure that Weighed Items configured in Central Manager synchronize correctly to selected Store Groups so that items sold by weight (e.g., produce, deli items) maintain consistent configuration across all stores.

## Trigger
A user creates or updates a Weighed Item in Central Manager and assigns it to one or more Store Groups.

## Preconditions
- Central and Store synchronization services are active.
- At least one Store Group exists.
- A store (e.g., QA01) belongs to the assigned Store Group.
- User has permission to create or modify items in Central Manager.
- Weighed item functionality is enabled in the system configuration.

## Required Test Data
- Weighed Item Lookup Code
- Item Description
- Department
- Category
- Price per weight unit
- Cost
- Assigned Store Group

## Navigation Path
Central Manager → Merchandising → Items

## Execution Steps
1. Open Central Manager and navigate to Merchandising → Items.
2. Create a new item and configure it as a Weighed Item.
3. Enter required item information such as Lookup Code, Description, Department, Category, Price per weight unit, and Cost.
4. Assign the item to a Store Group.
5. Save the item.
6. Allow synchronization to occur.
7. Verify the weighed item appears in the assigned store(s).

## Expected Results
- Weighed Item is inserted or updated in the selected store(s).
- Item configuration remains marked as weighed in the store.
- Item data matches the values configured in Central Manager.

## Validation Checks
- Weighed item appears in the store item list.
- Lookup Code and Description match Central.
- Weight-based pricing configuration is preserved.
- Pricing and cost values match Central.
- Store Group assignment correctly determines which stores receive the item.

## Pass Criteria
- Weighed item is successfully inserted or updated in the selected store(s).
- Item configuration and data match between Central and Store.

## Fail Criteria
- Item does not appear in the store.
- Weight-based configuration is not preserved.
- Item data differs between Central and Store.
- Synchronization creates duplicate or inconsistent records.

## Risks / Assumptions
- Synchronization timing may depend on configured sync intervals.
- Store must belong to the assigned Store Group to receive the item.

## Known Issues / Notes
- Actual Result observed: Pass insert/update