# Merchandising / Discount

## Metadata
Feature: Discount Insert/Update Synchronization  
Business Area: Merchandising  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central → Store  
Release: MVP 1.1  
Priority: High  

---

# Scenario: Discount Insert Synchronization to Selected Stores

## Preconditions
- Central Manager is installed and operational.
- Central Server and Central Client synchronization services are running.
- At least one Store Group exists with one or more stores assigned.
- The test user has a Central Manager role with the Discounts privilege enabled under Merchandising.
- The target store database is accessible and the store is online.

## Required Test Data
- Discount Description (e.g., Test Discount Insert)
- Discount Type and Parameters (e.g., Mix and Match, Buy X Get Y, Percent Off, etc.)
- Store Group (an existing group containing the target store(s))

## Navigation Path
Central Manager → Merchandising → Discounts

## Execution Steps
1. Open Central Manager.
2. Click Merchandising.
3. Click Discounts.
4. Click New to create a new discount.
5. In the Description field, enter the name of the discount.
6. Select the discount type and enter the required parameters (e.g., Mix and Match, Buy X Get Y, Percent Off, etc.).
7. On the Store Groups tab, select the store group that contains the target store(s).
8. Click Save And Close.
9. Wait for the synchronization cycle to complete between Central Server and the target store(s).
10. Open Store Manager on the target store.
11. Navigate to Merchandising → Discounts.
12. Verify that the newly created discount appears in the discount list.

## Expected Results
- The discount created in Central Manager is synchronized and visible in the target store's discount list.

## Validation Checks
- The discount record exists in the target store's Discounts list.
- The Description in the store matches the Description entered in Central Manager.
- The discount type and parameters in the store match those entered in Central Manager.
- The discount does not appear in stores that are outside the assigned Store Group.

---

# Scenario: Discount Update Synchronization to Selected Stores

## Preconditions
- Central Manager is installed and operational.
- Central Server and Central Client synchronization services are running.
- A discount already exists in Central Manager and has been synchronized to the target store(s).
- The test user has a Central Manager role with the Discounts privilege enabled under Merchandising.
- The target store database is accessible and the store is online.

## Required Test Data
- Existing Discount Description (e.g., Test Discount Insert)
- Updated Discount Parameters (e.g., change type, value, or other settings)
- Store Group (the same group from the insert scenario)

## Navigation Path
Central Manager → Merchandising → Discounts

## Execution Steps
1. Open Central Manager.
2. Click Merchandising.
3. Click Discounts.
4. Select the existing discount from the list and open it for editing.
5. Update the discount parameters as required (e.g., change type, value, or other settings).
6. Click Save And Close.
7. Wait for the synchronization cycle to complete between Central Server and the target store(s).
8. Open Store Manager on the target store.
9. Navigate to Merchandising → Discounts.
10. Locate the discount by its Description and verify the updated parameters.

## Expected Results
- The discount update made in Central Manager is synchronized and reflected in the target store's discount list.

## Validation Checks
- The discount record in the target store shows the updated parameters.
- The Description remains unchanged in the store unless updated in Central Manager.
- The update is reflected only in stores within the assigned Store Group.
- Stores outside the assigned Store Group are unaffected by the update.
