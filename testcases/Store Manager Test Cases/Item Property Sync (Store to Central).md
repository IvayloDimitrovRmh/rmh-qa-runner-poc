# Merchandising / Items

## Metadata
Feature: Item Synchronization  
Business Area: Merchandising  
Source System: Store Manager  
Target System: Central Manager  
Sync Direction: Store → Central  
Release: MVP V1  
Priority: High

---

# Scenario: Item Property Edit Synchronization from Store to Central

## Preconditions
- Store Manager and Central Manager are installed and operational.
- Store Manager is configured to synchronize item data to Central Manager (if supported).
- The test user has privileges to edit item properties in Store Manager.
- At least one item exists in both Store Manager and Central Manager.

## Required Test Data
- Item Lookup Code or Identifier
- List of item properties to edit (Price, Cost, Quantity, etc.)

## Navigation Path
Store Manager → Merchandising → Items

## Execution Steps
1. Log in to Store Manager.
2. Navigate to Merchandising → Items.
3. Select an item to edit.
4. Edit one or more of the following properties: Price, Cost, Quantity, Quantity Committed, Restock Level, Reorder Point, Lower Buydown, Upper Buydown, Price A/B/C, MSRP, Buydown Quantity, Buydown Quantity Remaining, Sale Price, Sale Start Date, Sale End Date.
5. Save the changes.
6. Wait for the synchronization cycle to complete between Store Manager and Central Manager.
7. In Central Manager, verify that the updated item properties are reflected for the same item.

## Expected Results
- Changes made to item properties in Store Manager are updated in the corresponding item record in Central Manager (if upward sync is supported).

## Validation Checks
- Confirm the updated item properties appear in Central Manager for the edited item.
- Verify that only the intended properties are updated.
- Confirm that no unintended changes occur to other item fields.

---

**Note:**  
- There is no explicit documentation confirming Store → Central item property synchronization.  
- This test case is based on the requested scenario and standard RMH patterns, but may not be supported in all environments.  
- If future RMH documentation confirms or changes this workflow, update the test case accordingly.  
- Field support for upward sync may be limited; verify with RMH documentation or support.
