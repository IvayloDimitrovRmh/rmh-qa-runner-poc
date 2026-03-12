# Setup / Inventory-Purchasing

## Metadata
Feature: Inventory and Purchasing Configuration Synchronization  
Business Area: Setup > Inventory/Purchasing  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: Unknown  
Priority: Unknown  

---

# Scenario: Charges Synchronization to Selected Stores

## Business Entity
Charges

## Business Purpose
Ensure that purchasing Charges configured in Central Manager synchronize correctly to selected Store Groups so that additional costs (such as shipping, handling, or service charges) can be applied consistently during purchasing and inventory transactions across stores.

## Trigger
A user creates or updates a Charge configuration in Central Manager.

## Preconditions
- Central and Store synchronization services are active.
- At least one Store Group exists.
- Stores belong to the assigned Store Group.
- User has permission to manage purchasing configuration.

## Required Test Data
- Charge Name
- Charge Code
- Charge Type or Calculation Method
- Assigned Store Group

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Charges

## Execution Steps
1. Open Central Manager and navigate to Setup → Inventory/Purchasing → Charges.
2. Create a new Charge or open an existing one.
3. Enter or update charge information such as name, code, and calculation method.
4. Assign the charge to a Store Group.
5. Save the configuration.
6. Allow synchronization to occur.
7. Verify the charge appears in the assigned store(s).

## Expected Results
- Charge configuration is inserted or updated in the selected store(s).
- Charge settings in stores match the configuration in Central Manager.

## Validation Checks
- Charge exists in store configuration.
- Charge name and settings match Central.
- Charge is available when creating purchasing documents or transactions.

## Pass Criteria
- Charge appears in store configuration with correct data.

## Fail Criteria
- Charge missing from store configuration.
- Data mismatch between Central and Store.
- Charge unavailable during purchasing workflows.

## Risks / Assumptions
- Synchronization timing may depend on configured sync intervals.
- Charges may depend on purchasing or supplier configuration.

## Known Issues / Notes
- Actual Result observed: Pass insert/update