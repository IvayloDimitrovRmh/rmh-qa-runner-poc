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

# Scenario: Order Settings Synchronization to Active Stores

## Business Entity
Order Settings

## Business Purpose
Ensure that Order Settings configured in Central Manager synchronize correctly to all active stores so that purchasing behavior, order processing rules, and inventory replenishment logic remain consistent across the organization.

## Trigger
A user creates or updates Order Settings in Central Manager.

## Preconditions
- Central and Store synchronization services are active.
- Active stores exist in the **Store** table.
- User has permission to manage purchasing configuration.

## Required Test Data
- Order Settings configuration
- Active store records in the Store table

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Order Settings

## Execution Steps
1. Open Central Manager and navigate to Setup → Inventory/Purchasing → Order Settings.
2. Modify or configure order-related settings.
3. Save the configuration.
4. Allow synchronization to occur.
5. Verify that the configuration appears in all active stores.

## Expected Results
- Order Settings are inserted or updated in all active stores.

## Validation Checks
- Order Settings appear in store configuration.
- Configuration values match Central Manager settings.
- Settings are applied during purchase order or replenishment workflows.

## Pass Criteria
- Order Settings appear in all active stores with correct values.

## Fail Criteria
- Settings missing from one or more stores.
- Configuration mismatch between Central and Store.

## Risks / Assumptions
- Synchronization applies only to stores marked as active in the **Store** table.
- Some order settings may depend on supplier or purchasing configuration.

## Known Issues / Notes
- Actual Result observed: Pass insert/update