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

# Scenario: Items - Assembly Item Synchronization to Selected Stores

## Business Entity
Assembly Item

## Business Purpose
Ensure that Assembly Items created or updated in Central Manager synchronize correctly to the selected Store Groups so that items built from component inventory are consistently configured and available across stores.

## Trigger
A user creates or updates an Assembly Item in Central Manager and assigns it to one or more Store Groups.

## Preconditions
- Central and Store synchronization services are active.
- At least one Store Group exists.
- A store (e.g., QA01) belongs to the assigned Store Group.
- User has permission to create or modify items in Central Manager.
- Component items required for the assembly already exist in the system.

## Required Test Data
- Assembly Item Lookup Code
- Item Description
- Department
- Category
- Price
- Cost
- Component Items and quantities
- Assigned Store Group

## Navigation Path
Central Manager → Merchandising → Items

## Execution Steps
1. Open Central Manager and navigate to Merchandising → Items.
2. Create a new item and configure it as an Assembly Item.
3. Enter required item information such as Lookup Code, Description, Department, Category, Price, and Cost.
4. Add component items and define quantities for the assembly structure.
5. Assign the item to a Store Group.
6. Save the item.
7. Allow synchronization to occur.
8. Verify the assembly item appears in the assigned store(s).

## Expected Results
- Assembly Item is inserted or updated in the selected store(s).
- Assembly structure and component items are preserved in the store.
- Item data matches the configuration from Central Manager.

## Validation Checks
- Assembly item appears in the store item list.
- Lookup Code and Description match Central.
- Component items and quantities match Central configuration.
- Pricing and cost values match Central.
- Store Group assignment correctly determines which stores receive the item.

## Pass Criteria
- Assembly item is successfully inserted or updated in the selected store(s).
- Assembly structure and item data match between Central and Store.

## Fail Criteria
- Assembly item does not appear in the store.
- Component items are missing or incorrect.
- Item data differs between Central and Store.
- Synchronization produces duplicate or incomplete records.

## Risks / Assumptions
- Component items must already exist and be synchronized before creating the assembly item.
- Synchronization timing may depend on configured sync intervals.
- Store must belong to the assigned Store Group to receive the item.

## Known Issues / Notes
- Actual Result observed: Pass insert/update