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

# Scenario: Items - Standard Synchronization to Selected Stores

## Preconditions
- Central and Store synchronization services are active.
- At least one Store Group exists.
- A store (e.g., QA01) is assigned to the Store Group.
- User has permission to create or modify items in Central Manager.

## Required Test Data
- Item Lookup Code
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
2. Create a new Standard Item or open an existing one.
3. Enter required item information such as Lookup Code, Description, Department, Category, Price, and Cost.
4. Assign the item to a Store Group.
5. Save the item.
6. Allow synchronization to occur.
7. Verify the item exists in the assigned store(s).

## Expected Results
- Standard Item is inserted or updated in the selected store(s).
- Item data in the store matches the values configured in Central Manager.

## Validation Checks
- Item appears in the store item list.
- Lookup Code and Description match Central.
- Pricing and cost values match Central.
- Store Group assignment correctly determines which stores receive the item.