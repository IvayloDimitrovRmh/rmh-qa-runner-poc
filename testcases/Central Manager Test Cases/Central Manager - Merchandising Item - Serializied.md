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

# Scenario: Items - Serialized Item Synchronization to Selected Stores

## Business Entity
Serialized Item

## Business Purpose
Ensure that Serialized Items created or updated in Central Manager are synchronized correctly to the selected Store Groups so that serialized inventory tracking and product catalog data remain consistent across all participating stores.

## Trigger
A user creates or updates a Serialized Item in Central Manager and assigns it to one or more Store Groups.

## Preconditions
- Central and Store synchronization services are active.
- At least one Store Group exists.
- A store (e.g., QA01) belongs to the assigned Store Group.
- User has permission to create or modify items in Central Manager.
- Serialized item functionality is enabled in the system configuration.

## Required Test Data
- Serialized Item Lookup Code
- Item Description
- Department
- Category
- Price
- Cost
- Serialization tracking enabled
- Assigned Store Group

## Navigation Path
Central Manager → Merchandising → Items

## Execution Steps
1. Open Central Manager and navigate to Merchandising → Items.
2. Create a new Serialized Item or open an existing one configured as Serialized.
3. Enter required item information such as Lookup Code, Description, Department, Category, Price, and Cost.
4. Ensure the item type is configured as Serialized.
5. Assign the item to a Store Group.
6. Save the item.
7. Allow synchronization to occur.
8. Verify the item appears in the assigned store(s).

## Expected Results
- Serialized Item is inserted or updated in the selected store(s).
- Item configuration remains marked as serialized in the store.
- Item data in the store matches the values configured in Central Manager.

## Validation Checks
- Item appears in the store item list.
- Lookup Code and Description match Central.
- Serialized item configuration is preserved.
- Pricing and cost values match Central.
- Store Group assignment correctly determines which stores receive the item.

## Pass Criteria
- Serialized item is successfully inserted or updated in the selected store(s).
- Item configuration and data match between Central and Store.

## Fail Criteria
- Item does not appear in the store.
- Serialized configuration is not preserved.
- Item data differs between Central and Store.
- Synchronization creates duplicate records.

## Risks / Assumptions
- Synchronization timing may depend on sync interval configuration.
- Store must belong to the assigned Store Group to receive the item.

## Known Issues / Notes
- Actual Result observed: Pass insert/update