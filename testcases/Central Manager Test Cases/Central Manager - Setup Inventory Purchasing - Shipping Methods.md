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

# Scenario: Shipping Methods Synchronization to Selected Stores

## Preconditions
- Central and Store synchronization services are active.
- At least one Store Group exists.
- Stores belong to the assigned Store Group.
- User has permission to manage purchasing setup configuration.

## Required Test Data
- Shipping Method Name
- Shipping Method Code
- Assigned Store Group

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Shipping Methods

## Execution Steps
1. Open Central Manager and navigate to Setup → Inventory/Purchasing → Shipping Methods.
2. Create a new Shipping Method or open an existing one.
3. Enter or update the shipping method information.
4. Assign the shipping method to a Store Group.
5. Save the configuration.
6. Allow synchronization to occur.
7. Verify the shipping method appears in the assigned store(s).

## Expected Results
- Shipping Method is inserted or updated in the selected store(s).
- Shipping configuration in stores matches Central Manager.

## Validation Checks
- Shipping Method exists in store configuration.
- Shipping Method name and code match Central.
- Shipping Method is available for purchasing and transfer operations.