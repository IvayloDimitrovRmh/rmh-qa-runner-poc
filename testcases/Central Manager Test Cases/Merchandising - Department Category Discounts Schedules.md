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

## Validation Checks
- Department exists in store configuration.
- Department name and code match Central.

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

## Validation Checks
- Department exists in store configuration.
- Department name and code match Central.

---

# Scenario: Discount Synchronization to Selected Stores

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

## Validation Checks
- Discount rule appears in store configuration.
- Discount values match Central configuration.

---

# Scenario: Discount Synchronization to Selected Stores

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

## Validation Checks
- Discount rule appears in store configuration.
- Discount values match Central configuration.