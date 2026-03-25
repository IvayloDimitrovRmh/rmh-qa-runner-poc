# Setup / Inventory-Purchasing

## Metadata
Feature: Unit of Measures  
Business Area: Setup > Inventory/Purchasing  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP 1.1  
Priority: High  

---

# Scenario: Create a New Unit of Measure and Synchronize to Active Stores

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to manage Inventory/Purchasing configuration in Central Manager.
- At least one active store exists in the system. To verify: confirm that at least one store record with an **Active** status exists in Central Manager.
- Central-to-store synchronization services are running.

## Required Test Data
- Unit of Measure Code: EA
- Unit of Measure Description: Each

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Unit of Measures

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Under **Setup**, expand the **Inventory/Purchasing** section.
4. Click **Unit of Measures** to open the Unit of Measures list.
5. Click **New**. The Unit of Measures entry form opens.
6. In the **Code** field, enter `EA`.
7. In the **Description** field, enter `Each`.
8. Click **Save And Close**. The form closes and the Unit of Measures list reappears.
9. Confirm that `EA` appears in the Unit of Measures list.
10. Allow synchronization to complete between Central Manager and the active stores.

---

## Expected Results
- Unit of Measure `EA` is saved successfully in Central Manager.
- The record with Code `EA` and description `Each` appears in the Unit of Measures list.
- The Unit of Measure `EA` is available in all active stores after synchronization.

## Validation Checks
- Verify unit of measure `EA` exists in Central Manager → Setup → Inventory/Purchasing → Unit of Measures by confirming the record `EA` appears in the Unit of Measures list.
- Verify the **Description** of unit of measure `EA` in Central Manager → Setup → Inventory/Purchasing → Unit of Measures by opening the **EA** record and confirming the **Description** field shows `Each`.