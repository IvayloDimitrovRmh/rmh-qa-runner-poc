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

# Scenario: Unit of Measures Synchronization to Active Stores

## Preconditions
- Central and Store synchronization services are active.
- Active stores exist in the **Store** table.
- User has permission to manage inventory configuration.

## Required Test Data
- Unit of Measure Name
- Unit Code
- Conversion configuration (if applicable)

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Unit of Measures

## Execution Steps
1. Open Central Manager and navigate to Setup → Inventory/Purchasing → Unit of Measures.
2. Create a new Unit of Measure or update an existing one.
3. Configure the unit name, code, and any conversion rules if applicable.
4. Save the configuration.
5. Allow synchronization to occur.
6. Verify the unit appears in all active stores.

## Expected Results
- Unit of Measure is inserted or updated in all active stores.

## Validation Checks
- Unit exists in store configuration.
- Unit name and code match Central Manager.
- Unit is available for item configuration and purchasing transactions.