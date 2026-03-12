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

# Scenario: Items - Voucher Item Synchronization to Selected Stores

## Business Entity
Voucher Item

## Business Purpose
Ensure that Voucher Items created or updated in Central Manager synchronize correctly to the selected Store Groups so that voucher-based products or gift certificates are available and consistent across all participating stores.

## Trigger
A user creates or updates a Voucher Item in Central Manager and assigns it to one or more Store Groups.

## Preconditions
- Central and Store synchronization services are active.
- At least one Store Group exists.
- A store (e.g., QA01) belongs to the assigned Store Group.
- User has permission to create or modify items in Central Manager.
- Voucher functionality is enabled in the system configuration.

## Required Test Data
- Voucher Item Lookup Code
- Item Description
- Department
- Category
- Price or voucher value
- Assigned Store Group

## Navigation Path
Central Manager → Merchandising → Items

## Execution Steps
1. Open Central Manager and navigate to Merchandising → Items.
2. Create a new item and configure it as a Voucher Item.
3. Enter required item information such as Lookup Code, Description, Department, Category, and voucher value or price.
4. Assign the item to a Store Group.
5. Save the item.
6. Allow synchronization to occur.
7. Verify the voucher item appears in the assigned store(s).

## Expected Results
- Voucher Item is inserted or updated in the selected store(s).
- Item configuration remains marked as a voucher item in the store.
- Item data matches the configuration from Central Manager.

## Validation Checks
- Voucher item appears in the store item list.
- Lookup Code and Description match Central.
- Voucher configuration and value match Central.
- Store Group assignment correctly determines which stores receive the item.

## Pass Criteria
- Voucher item is successfully inserted or updated in the selected store(s).
- Item configuration and data match between Central and Store.

## Fail Criteria
- Item does not appear in the store.
- Voucher configuration is not preserved.
- Item data differs between Central and Store.
- Synchronization creates duplicate or inconsistent records.

## Risks / Assumptions
- Synchronization timing may depend on configured sync intervals.
- Store must belong to the assigned Store Group to receive the item.

## Known Issues / Notes
- Actual Result observed: Pass insert/update