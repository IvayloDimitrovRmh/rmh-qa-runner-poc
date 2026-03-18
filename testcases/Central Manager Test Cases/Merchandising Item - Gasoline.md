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

# Scenario: Items - Gasoline Item Synchronization to Selected Stores

## Preconditions
- Central and Store synchronization services are active.
- At least one Store Group exists.
- A store (e.g., QA01) belongs to the assigned Store Group.
- User has permission to create or modify items in Central Manager.
- Gasoline item type functionality is enabled in the system configuration.

## Required Test Data
- Gasoline Item Lookup Code
- Item Description
- Department
- Category
- Price
- Cost
- Assigned Store Group

## Navigation Path
Central Manager → Merchandising → Items

## Execution Steps
1. Open Central Manager and navigate to Merchandising → Items.
2. Create a new item and configure it as a Gasoline Item.
3. Enter required item information such as Lookup Code, Description, Department, Category, Price, and Cost.
4. Assign the item to a Store Group.
5. Save the item.
6. Allow synchronization to occur.
7. Verify the gasoline item appears in the assigned store(s).

## Expected Results
- Gasoline Item is inserted or updated in the selected store(s).
- Item configuration and data in the store match the values configured in Central Manager.

## Validation Checks
- Gasoline item appears in the store item list.
- Lookup Code and Description match Central.
- Pricing and cost values match Central.
- Store Group assignment correctly determines which stores receive the item.