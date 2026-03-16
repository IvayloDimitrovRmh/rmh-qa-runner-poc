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

# Scenario: Items - Matrix Item Synchronization to Selected Stores

## Preconditions
- Central and Store synchronization services are active.
- At least one Store Group exists.
- A store (e.g., QA01) belongs to the assigned Store Group.
- User has permission to create or modify items in Central Manager.
- Matrix item functionality is enabled and variant attributes are configured.

## Required Test Data
- Matrix Parent Item Lookup Code
- Item Description
- Department
- Category
- Matrix attributes (e.g., Size, Color)
- Variant combinations
- Price and Cost
- Assigned Store Group

## Navigation Path
Central Manager → Merchandising → Items

## Execution Steps
1. Open Central Manager and navigate to Merchandising → Items.
2. Create a new item and configure it as a Matrix Item.
3. Define matrix attributes such as size, color, or style.
4. Generate variant combinations based on the defined attributes.
5. Enter pricing and cost values for the matrix or individual variants.
6. Assign the item to a Store Group.
7. Save the item.
8. Allow synchronization to occur.
9. Verify the matrix item and its variants appear in the assigned store(s).

## Expected Results
- Matrix Item and all variant combinations are inserted or updated in the selected store(s).
- Variant structure and attributes remain consistent with Central Manager configuration.
- Item data matches between Central and Store.

## Validation Checks
- Matrix parent item appears in the store item list.
- All variant combinations exist in the store.
- Lookup codes and descriptions match Central.
- Variant attributes (size, color, etc.) are preserved.
- Pricing and cost values match Central.