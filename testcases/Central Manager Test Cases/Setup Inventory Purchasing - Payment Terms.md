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

# Scenario: Payment Terms Synchronization to Selected Stores

## Preconditions
- Central and Store synchronization services are active.
- At least one Store Group exists.
- Stores belong to the assigned Store Group.
- User has permission to manage purchasing configuration.

## Required Test Data
- Payment Term Name
- Payment Term Code
- Payment duration or rule configuration
- Assigned Store Group

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Payment Terms

## Execution Steps
1. Open Central Manager and navigate to Setup → Inventory/Purchasing → Payment Terms.
2. Create a new Payment Term or open an existing one.
3. Enter or update payment term details such as name and payment conditions.
4. Assign the payment term to a Store Group.
5. Save the configuration.
6. Allow synchronization to occur.
7. Verify the payment term appears in the assigned store(s).

## Expected Results
- Payment Terms are inserted or updated in the selected store(s).
- Payment configuration in stores matches Central Manager.

## Validation Checks
- Payment Term exists in store configuration.
- Name and payment rules match Central.
- Payment Term is available for purchasing transactions.