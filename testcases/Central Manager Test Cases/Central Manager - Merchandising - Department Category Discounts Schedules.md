# Merchandising

## Metadata
Feature: Merchandising Master Data Synchronization  
Business Area: Merchandising  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: Unknown  
Priority: Unknown  

---

# Scenario: Department Synchronization to Selected Stores

## Business Entity
Department

## Business Purpose
Ensure that Departments created or updated in Central Manager synchronize correctly to the selected Store Groups so that item categorization remains consistent across all stores.

## Trigger
A user creates or updates a Department in Central Manager and assigns it to one or more Store Groups.

## Preconditions
- Central and Store synchronization services are active.
- At least one Store Group exists.
- Store belongs to the assigned Store Group.
- User has permission to manage Departments.

## Required Test Data
- Department Name
- Department Code
- Assigned Store Group

## Navigation Path
Central Manager → Merchandising → Department

## Execution Steps
1. Open Central Manager and navigate to Merchandising → Department.
2. Create a new Department or open an existing one.
3. Enter or update department information.
4. Assign the department to a Store Group.
5. Save the record.
6. Allow synchronization to occur.
7. Verify the department appears in the assigned store(s).

## Expected Results
- Department is inserted or updated in the selected store(s).
- Department configuration matches the Central Manager configuration.

## Validation Checks
- Department exists in store configuration.
- Department name and code match Central.

## Pass Criteria
- Department appears in store(s) with correct data.

## Fail Criteria
- Department missing from store(s) or incorrect data.

## Risks / Assumptions
- Synchronization timing may depend on configured sync intervals.

## Known Issues / Notes
- Actual Result observed: Pass insert/update

# Merchandising

## Metadata
Feature: Merchandising Master Data Synchronization  
Business Area: Merchandising  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: Unknown  
Priority: Unknown  

---

# Scenario: Department Synchronization to Selected Stores

## Business Entity
Department

## Business Purpose
Ensure that Departments created or updated in Central Manager synchronize correctly to the selected Store Groups so that item categorization remains consistent across all stores.

## Trigger
A user creates or updates a Department in Central Manager and assigns it to one or more Store Groups.

## Preconditions
- Central and Store synchronization services are active.
- At least one Store Group exists.
- Store belongs to the assigned Store Group.
- User has permission to manage Departments.

## Required Test Data
- Department Name
- Department Code
- Assigned Store Group

## Navigation Path
Central Manager → Merchandising → Department

## Execution Steps
1. Open Central Manager and navigate to Merchandising → Department.
2. Create a new Department or open an existing one.
3. Enter or update department information.
4. Assign the department to a Store Group.
5. Save the record.
6. Allow synchronization to occur.
7. Verify the department appears in the assigned store(s).

## Expected Results
- Department is inserted or updated in the selected store(s).
- Department configuration matches the Central Manager configuration.

## Validation Checks
- Department exists in store configuration.
- Department name and code match Central.

## Pass Criteria
- Department appears in store(s) with correct data.

## Fail Criteria
- Department missing from store(s) or incorrect data.

## Risks / Assumptions
- Synchronization timing may depend on configured sync intervals.

## Known Issues / Notes
- Actual Result observed: Pass insert/update

---

# Scenario: Discount Synchronization to Selected Stores

## Business Entity
Discount

## Business Purpose
Ensure that Discounts configured in Central Manager synchronize correctly to stores so that promotional pricing and discount rules apply consistently across the system.

## Trigger
A user creates or updates a Discount in Central Manager.

## Preconditions
- Central and Store synchronization services are active.
- Discount functionality is enabled.
- Store belongs to the assigned Store Group.

## Required Test Data
- Discount Name
- Discount Type
- Discount Value
- Assigned Store Group

## Navigation Path
Central Manager → Merchandising → Discounts

## Execution Steps
1. Open Central Manager and navigate to Merchandising → Discounts.
2. Create or update a Discount rule.
3. Assign the discount to a Store Group.
4. Save the configuration.
5. Allow synchronization to occur.
6. Verify the discount exists in store configuration.

## Expected Results
- Discount is inserted or updated in the selected store(s).

## Validation Checks
- Discount rule appears in store configuration.
- Discount values match Central configuration.

## Pass Criteria
- Discount rule exists and matches Central.

## Fail Criteria
- Discount rule missing or incorrect.

## Risks / Assumptions
- Discounts may depend on item or category synchronization.

## Known Issues / Notes
- Actual Result observed: Pass insert/update

---

# Scenario: Discount Synchronization to Selected Stores

## Business Entity
Discount

## Business Purpose
Ensure that Discounts configured in Central Manager synchronize correctly to stores so that promotional pricing and discount rules apply consistently across the system.

## Trigger
A user creates or updates a Discount in Central Manager.

## Preconditions
- Central and Store synchronization services are active.
- Discount functionality is enabled.
- Store belongs to the assigned Store Group.

## Required Test Data
- Discount Name
- Discount Type
- Discount Value
- Assigned Store Group

## Navigation Path
Central Manager → Merchandising → Discounts

## Execution Steps
1. Open Central Manager and navigate to Merchandising → Discounts.
2. Create or update a Discount rule.
3. Assign the discount to a Store Group.
4. Save the configuration.
5. Allow synchronization to occur.
6. Verify the discount exists in store configuration.

## Expected Results
- Discount is inserted or updated in the selected store(s).

## Validation Checks
- Discount rule appears in store configuration.
- Discount values match Central configuration.

## Pass Criteria
- Discount rule exists and matches Central.

## Fail Criteria
- Discount rule missing or incorrect.

## Risks / Assumptions
- Discounts may depend on item or category synchronization.

## Known Issues / Notes
- Actual Result observed: Pass insert/update