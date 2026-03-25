# Inventory / Purchasing — Suppliers

## Metadata
Feature: Suppliers
Business Area: Inventory / Purchasing > Suppliers
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Update an Existing Supplier in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- A supplier with Code `SUP-001` and Name `TEST-SUPPLIER-001` already exists in Central Manager with the following values on the **General** tab:
  - Contact: Jane Smith
  - Telephone: 312-555-0100
  - E-mail: jane.smith@testsupplier001.com
- The supplier `SUP-001` is currently assigned to Store Group `Store Group 01`, which includes store `Store001`.
- The user is logged into Central Manager with a role that has the Suppliers privilege enabled under Inventory/Purchasing.
- The target store `Store001` is operational and able to receive synchronization from Central Manager.

## Required Test Data
- Supplier Code (existing): SUP-001
- Supplier Name (existing): TEST-SUPPLIER-001
- Field to update: Telephone
- Current Telephone value: 312-555-0100
- Updated Telephone value: 312-555-0199
- Store Group: Store Group 01
- Target Store: Store001

## Navigation Path
Central Manager → Inventory/Purchasing → Suppliers

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Inventory/Purchasing**.
3. In the Inventory/Purchasing menu, click **Suppliers**. The Suppliers list screen opens, displaying all existing suppliers.
4. In the Suppliers list, locate the row where the **Code** column shows `SUP-001`. Click on that row to select it and open the supplier record.
5. The supplier detail form opens on the **General** tab. Verify the current values before making changes:
   - **Code**: `SUP-001`
   - **Name**: `TEST-SUPPLIER-001`
   - **Contact**: `Jane Smith`
   - **Telephone**: `312-555-0100`
   - **E-mail**: `jane.smith@testsupplier001.com`
6. On the **General** tab, locate the **Telephone** field and clear the existing value `312-555-0100`.
7. Type the updated value: `312-555-0199`
8. Click the **Store Groups** tab. Confirm that **Store Group 01** is selected. Do not change the store group assignment.
9. Click **Save And Close** to save the changes and return to the Suppliers list.
10. In the Suppliers list, locate the row for `SUP-001` and confirm it is still present.
11. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
12. Open Store Manager on `Store001`.
13. In Store Manager, navigate to **Inventory/Purchasing → Suppliers**.
14. In the Suppliers list, locate the supplier with Code `SUP-001` and open the record.
15. Confirm the **Telephone** field on the **General** tab shows the updated value `312-555-0199`.

## Expected Results
- The supplier record `SUP-001` is successfully updated in Central Manager with the new Telephone number `312-555-0199`.
- The updated supplier data is synchronized to the target store `Store001`.
- The Code, Name, and all other fields remain unchanged after the update.

## Validation Checks
- Verify **updated Telephone value** in **Central Manager > Inventory/Purchasing > Suppliers** by reopening the `SUP-001` record after saving and confirming the **Telephone** field on the **General** tab displays `312-555-0199`.
- Verify **Code is unchanged** in **Central Manager > Inventory/Purchasing > Suppliers** by confirming the **Code** field still displays `SUP-001` when the record is reopened.
- Verify **Name is unchanged** in **Central Manager > Inventory/Purchasing > Suppliers** by confirming the **Name** field still displays `TEST-SUPPLIER-001` when the record is reopened.
- Verify **E-mail is unchanged** in **Central Manager > Inventory/Purchasing > Suppliers** by confirming the **E-mail** field still displays `jane.smith@testsupplier001.com` when the record is reopened.
- Verify **Store Group assignment is unchanged** in **Central Manager > Inventory/Purchasing > Suppliers** by clicking the **Store Groups** tab on the reopened record and confirming **Store Group 01** remains selected after saving.
- Verify **updated supplier data in target store** in **Store001 > Inventory/Purchasing > Suppliers** by opening the `SUP-001` record in Store Manager after synchronization and confirming the **Telephone** field on the **General** tab displays `312-555-0199`.
- Verify **stores outside Store Group 01 are unaffected** by confirming the supplier update does not appear in any store not assigned to `Store Group 01`.