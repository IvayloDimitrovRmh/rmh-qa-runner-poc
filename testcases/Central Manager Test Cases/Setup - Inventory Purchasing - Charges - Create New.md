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

# Scenario: Create a new charge and synchronize to selected stores

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to manage Inventory/Purchasing configuration in Central Manager.
- At least one Store Group exists. To verify: navigate to **Central Manager → Setup → Store Groups**.
- At least one store belongs to that Store Group and is active.
- Central-to-store synchronization services are running.

## Required Test Data
- Charge Code: CHG-DEL-001
- Charge Description: TEST Delivery Fee
- Extended Description: Supplier delivery fee for incoming freight
- Tax Code: *(leave blank — no tax applicable to this charge)*
- Store Group: Store Group 01

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Charges

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Under **Setup**, expand the **Inventory/Purchasing** section.
4. Click **Charges** to open the Charges list.
5. Click **New**. The Charges entry form opens with the **General** tab active.
6. In the **Code** field, enter `CHG-DEL-001`.
7. In the **Description** field, enter `TEST Delivery Fee`.
8. In the **Ext. Description** field, enter `Supplier delivery fee for incoming freight`.
9. Leave the **Tax Code** field blank. No tax code is required for this charge.
10. Click the **Store Groups** tab.
11. In the Store Groups list, locate **Store Group 01** and select it by checking the corresponding checkbox.
12. Click **Save And Close**. The form closes and the Charges list reappears.
13. Confirm that `CHG-DEL-001` appears in the Charges list.
14. Allow synchronization to complete between Central Manager and the assigned stores.

---

## Expected Results
- Charge `CHG-DEL-001` is saved successfully in Central Manager.
- The charge record with Code `CHG-DEL-001` and description `TEST Delivery Fee` appears in the Charges list.
- The charge is available in the stores belonging to **Store Group 01** after synchronization.

## Validation Checks
- Verify charge `CHG-DEL-001` exists in Central Manager → Setup → Inventory/Purchasing → Charges by confirming the record `CHG-DEL-001` appears in the Charges list.
- Verify the **Description** field value in Central Manager → Setup → Inventory/Purchasing → Charges by opening the **CHG-DEL-001** record and confirming the **Description** field shows `TEST Delivery Fee`.
- Verify the **Ext. Description** field value in Central Manager → Setup → Inventory/Purchasing → Charges by opening the **CHG-DEL-001** record and confirming the **Ext. Description** field shows `Supplier delivery fee for incoming freight`.
- Verify the **Store Groups** assignment in Central Manager → Setup → Inventory/Purchasing → Charges by opening the **CHG-DEL-001** record, clicking the **Store Groups** tab, and confirming **Store Group 01** is selected.