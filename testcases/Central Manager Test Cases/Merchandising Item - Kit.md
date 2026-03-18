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

# Scenario: Items - Kit Item Synchronization to Selected Stores

## Preconditions
- Central and Store synchronization services are active.
- At least one Store Group exists.
- A store (e.g., QA01) belongs to the assigned Store Group.
- User has permission to create or modify items in Central Manager.
- Component items exist that can be included in the Kit.

## Required Test Data
- Kit Item Lookup Code
- Item Description
- Department
- Category
- Price
- Cost
- Component Items for the kit
- Assigned Store Group

## Navigation Path
Central Manager → Merchandising → Items

## Execution Steps
1. Open Central Manager and navigate to Merchandising → Items.
2. Create a new item and configure it as a Kit Item.
3. Enter required item details such as Lookup Code, Description, Department, Category, Price, and Cost.
4. Add component items that will form the kit.
5. Assign the kit item to a Store Group.
6. Save the item.
7. Allow synchronization to occur.
8. Verify the kit item appears in the assigned store(s).

## Expected Results
- Kit Item is inserted or updated in the selected store(s).
- The kit structure and component items are preserved in the store.
- Item data matches the configuration from Central Manager.

## Validation Checks
- Kit item appears in the store item list.
- Lookup Code and Description match Central.
- Component items within the kit match Central configuration.
- Pricing and cost values match Central.
- Store Group assignment correctly determines which stores receive the item.