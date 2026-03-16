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

# Scenario: Purchasers Synchronization to Selected Stores

## Preconditions
- Central and Store synchronization services are active.
- At least one Store Group exists.
- Stores belong to the assigned Store Group.
- User has permission to manage purchasing configuration.

## Required Test Data
- Purchaser Name
- Purchaser ID or Code
- Assigned Store Group

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Purchasers

## Execution Steps
1. Open Central Manager and navigate to Setup → Inventory/Purchasing → Purchasers.
2. Create a new Purchaser or open an existing one.
3. Enter or update purchaser information such as name and identifier.
4. Assign the purchaser to a Store Group.
5. Save the configuration.
6. Allow synchronization to occur.
7. Verify the purchaser appears in the assigned store(s).

## Expected Results
- Purchaser is inserted or updated in the selected store(s).
- Purchaser configuration in stores matches Central Manager.

## Validation Checks
- Purchaser exists in store configuration.
- Purchaser name and identifier match Central.
- Purchaser is available when creating purchasing documents.