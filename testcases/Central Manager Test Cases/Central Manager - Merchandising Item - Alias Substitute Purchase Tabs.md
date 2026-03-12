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

## Business Entity
Item Alias

## Business Purpose
Ensure that Item Aliases configured in the Alias Tab of an item in Central Manager are synchronized correctly to the selected Store Groups so that alternate lookup codes (barcodes, supplier codes, etc.) function consistently across stores.

## Trigger
A user adds or removes an alias entry for an item in Central Manager.

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

## Expected Results
- Alias entry is added or removed in the selected store(s).
- Alias can be used to locate the item in POS.

## Validation Checks
- Alias code appears in the store item configuration.
- Alias lookup returns the correct item in POS.
- Removed aliases no longer function.

## Pass Criteria
- Alias additions or removals are synchronized correctly.

## Fail Criteria
- Alias entries do not appear or remain after deletion.
- POS lookup fails using alias.

## Risks / Assumptions
- Alias synchronization depends on item synchronization processes.

## Known Issues / Notes
- Actual Result observed: Pass insert/update

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

## Business Entity
Item Alias

## Business Purpose
Ensure that Item Aliases configured in the Alias Tab of an item in Central Manager are synchronized correctly to the selected Store Groups so that alternate lookup codes (barcodes, supplier codes, etc.) function consistently across stores.

## Trigger
A user adds or removes an alias entry for an item in Central Manager.

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

## Expected Results
- Alias entry is added or removed in the selected store(s).
- Alias can be used to locate the item in POS.

## Validation Checks
- Alias code appears in the store item configuration.
- Alias lookup returns the correct item in POS.
- Removed aliases no longer function.

## Pass Criteria
- Alias additions or removals are synchronized correctly.

## Fail Criteria
- Alias entries do not appear or remain after deletion.
- POS lookup fails using alias.

## Risks / Assumptions
- Alias synchronization depends on item synchronization processes.

## Known Issues / Notes
- Actual Result observed: Pass insert/update

---

# Scenario: Items - Purchase Tab Synchronization to Selected Stores

## Business Entity
Item Purchasing Information

## Business Purpose
Ensure that purchasing information configured in the Purchase Tab of items synchronizes correctly to stores so that ordering, supplier relationships, and replenishment operations function consistently.

## Trigger
A user adds, updates, or removes purchasing configuration in Central Manager.

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

## Expected Results
- Purchasing information is inserted or updated in the selected store(s).
- Store purchasing configuration matches Central.

## Validation Checks
- Supplier relationships appear correctly.
- Purchase cost matches Central.
- Reorder configuration is synchronized.

## Pass Criteria
- Purchasing configuration matches Central.

## Fail Criteria
- Supplier or purchasing configuration is missing or incorrect.

## Risks / Assumptions
- Purchasing configuration depends on supplier synchronization.

## Known Issues / Notes
- Actual Result observed: Pass insert/update