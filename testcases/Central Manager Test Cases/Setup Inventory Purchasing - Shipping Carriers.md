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

# Scenario: Shipping Carriers Synchronization to Selected Stores

## Preconditions
- Central and Store synchronization services are active.
- At least one Store Group exists.
- Stores belong to the assigned Store Group.
- User has permission to manage purchasing setup configuration.

## Required Test Data
- Shipping Carrier Name
- Shipping Carrier Code
- Assigned Store Group

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Shipping Carriers

## Execution Steps
1. Open Central Manager and navigate to Setup → Inventory/Purchasing → Shipping Carriers.
2. Create a new Shipping Carrier or open an existing one.
3. Enter or update carrier information.
4. Assign the carrier to a Store Group.
5. Save the configuration.
6. Allow synchronization to occur.
7. Verify the carrier appears in the assigned store(s).

## Expected Results
- Shipping Carrier is inserted or updated in the selected store(s).
- Carrier configuration in stores matches Central Manager.

## Validation Checks
- Shipping Carrier exists in store configuration.
- Carrier name and code match Central.
- Carrier is available for purchasing, receiving, and transfer workflows.