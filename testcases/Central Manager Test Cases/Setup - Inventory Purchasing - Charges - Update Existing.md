# Setup / Inventory-Purchasing

## Metadata
Feature: Charges  
Business Area: Setup > Inventory/Purchasing  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP 1.1  
Priority: High  

---

# Scenario: Update an existing charge and synchronize to selected stores

## Preconditions
- The charge `CHG-DEL-001` with description `TEST Delivery Fee` already exists in Central Manager. To verify: navigate to **Central Manager → Setup → Inventory/Purchasing → Charges** and confirm `CHG-DEL-001` appears in the list.
  > **If it does not exist**, complete the *Create New Charge* scenario first.
- The logged-in user has permission to manage Inventory/Purchasing configuration in Central Manager.
- Central-to-store synchronization services are running.

## Required Test Data
- Charge Code: CHG-DEL-001
- Current Charge Description: TEST Delivery Fee
- Updated Charge Description: TEST Delivery Fee Updated
- Extended Description: Supplier delivery fee for incoming freight *(unchanged)*
- Store Group: Store Group 01 *(unchanged)*

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Charges

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Under **Setup**, expand the **Inventory/Purchasing** section.
4. Click **Charges** to open the Charges list.
5. In the Charges list, locate the record with Code `CHG-DEL-001`.
6. Double-click **CHG-DEL-001** to open the record. The Charges entry form opens.
7. On the **General** tab, locate the **Description** field. It currently shows `TEST Delivery Fee`.
8. Clear the current value in the **Description** field and enter `TEST Delivery Fee Updated`.
9. Click **Save And Close**. The form closes and the Charges list reappears.
10. Allow synchronization to complete between Central Manager and the assigned stores.

---

## Expected Results
- Charge `CHG-DEL-001` is updated successfully in Central Manager.
- The **Description** field for `CHG-DEL-001` now shows `TEST Delivery Fee Updated` in the Charges list.
- The updated charge description is synchronized to the stores belonging to **Store Group 01**.

## Validation Checks
- Verify the updated **Description** in Central Manager → Setup → Inventory/Purchasing → Charges by opening the **CHG-DEL-001** record and confirming the **Description** field shows `TEST Delivery Fee Updated`.
- Verify the **Ext. Description** field is unchanged in Central Manager → Setup → Inventory/Purchasing → Charges by opening the **CHG-DEL-001** record and confirming the **Ext. Description** field still shows `Supplier delivery fee for incoming freight`.
- Verify the **Store Groups** assignment is unchanged in Central Manager → Setup → Inventory/Purchasing → Charges by opening the **CHG-DEL-001** record, clicking the **Store Groups** tab, and confirming **Store Group 01** is still selected.