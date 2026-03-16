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

# Scenario: Items - Alias Tab Synchronization to Selected Stores

## Preconditions
- Central and Store synchronization services are active.
- Item exists in Central Manager.
- At least one Store Group exists.
- Store belongs to the assigned Store Group.

## Required Test Data
- Existing Item Lookup Code
- Alias Code (alternate barcode or identifier)
- Assigned Store Group

## Navigation Path
Central Manager → Merchandising → Items → Alias Tab

## Execution Steps
1. Open Central Manager and navigate to Merchandising → Items.
2. Open an existing item.
3. Navigate to the Alias Tab.
4. Add or remove an alias entry.
5. Save the item.
6. Allow synchronization to occur.
7. Verify the alias exists or is removed in the assigned store(s).

## Validation Checks
- Alias code appears in the store item configuration.
- Alias lookup returns the correct item in POS.
- Removed aliases no longer function.

---

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

# Scenario: Items - Alias Tab Synchronization to Selected Stores

## Preconditions
- Central and Store synchronization services are active.
- Item exists in Central Manager.
- At least one Store Group exists.
- Store belongs to the assigned Store Group.

## Required Test Data
- Existing Item Lookup Code
- Alias Code (alternate barcode or identifier)
- Assigned Store Group

## Navigation Path
Central Manager → Merchandising → Items → Alias Tab

## Execution Steps
1. Open Central Manager and navigate to Merchandising → Items.
2. Open an existing item.
3. Navigate to the Alias Tab.
4. Add or remove an alias entry.
5. Save the item.
6. Allow synchronization to occur.
7. Verify the alias exists or is removed in the assigned store(s).

## Validation Checks
- Alias code appears in the store item configuration.
- Alias lookup returns the correct item in POS.
- Removed aliases no longer function.

---

# Scenario: Items - Purchase Tab Synchronization to Selected Stores

## Preconditions
- Central and Store synchronization services are active.
- Item exists.
- Supplier exists.
- Store belongs to the assigned Store Group.

## Required Test Data
- Item Lookup Code
- Supplier
- Purchase Cost
- Reorder settings
- Assigned Store Group

## Navigation Path
Central Manager → Merchandising → Items → Purchase Tab

## Execution Steps
1. Open Central Manager and navigate to Merchandising → Items.
2. Open an existing item.
3. Navigate to the Purchase Tab.
4. Add or update supplier and purchasing configuration.
5. Save the item.
6. Allow synchronization to occur.
7. Verify purchasing configuration in the assigned store(s).

## Validation Checks
- Supplier relationships appear correctly.
- Purchase cost matches Central.
- Reorder configuration is synchronized.