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

# Scenario: Update an Existing Unit of Measure and Synchronize to Active Stores

## Preconditions
- The Unit of Measure `EA` with description `Each` already exists in Central Manager. To verify: navigate to **Central Manager → Setup → Inventory/Purchasing → Unit of Measures** and confirm the record `EA` appears in the list.
  > **If it does not exist**, complete the *Create New Unit of Measure* scenario first.
- The logged-in user has permission to manage Inventory/Purchasing configuration in Central Manager.
- At least one active store exists in the system.
- Central-to-store synchronization services are running.

## Required Test Data
- Unit of Measure Code: EA
- Current Unit of Measure Description: Each
- Updated Unit of Measure Description: Each Unit

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Unit of Measures

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Under **Setup**, expand the **Inventory/Purchasing** section.
4. Click **Unit of Measures** to open the Unit of Measures list.
5. In the Unit of Measures list, locate the record with Code `EA`.
6. Double-click **EA** to open the record. The Unit of Measures entry form opens.
7. Locate the **Description** field. It currently shows `Each`.
8. Clear the current value in the **Description** field and enter `Each Unit`.
9. Click **Save And Close**. The form closes and the Unit of Measures list reappears.
10. Allow synchronization to complete between Central Manager and the active stores.

---

## Expected Results
- Unit of Measure `EA` is updated successfully in Central Manager.
- The **Description** for `EA` now shows `Each Unit` in the Unit of Measures list.
- The updated Unit of Measure is synchronized to all active stores.

## Validation Checks
- Verify the updated **Description** of unit of measure `EA` in Central Manager → Setup → Inventory/Purchasing → Unit of Measures by opening the **EA** record and confirming the **Description** field shows `Each Unit`.