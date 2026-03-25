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

# Scenario: Insert a New Supplier in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one Store Group exists (e.g., `Store Group 01`) with at least one store assigned (e.g., `Store001`).
- The user is logged into Central Manager with a role that has the Suppliers privilege enabled under Inventory/Purchasing.
- The target store `Store001` is operational and able to receive synchronization from Central Manager.
- No existing supplier with Code `SUP-001` exists in Central Manager (to avoid duplicates).

## Required Test Data
- Supplier Code: SUP-001
- Supplier Name: TEST-SUPPLIER-001
- Address: 123 Supply Lane
- City: Chicago
- State: IL
- Zip: 60601
- Country: USA
- Contact: Jane Smith
- Telephone: 312-555-0100
- E-mail: jane.smith@testsupplier001.com
- Store Group: Store Group 01
- Target Store: Store001

## Navigation Path
Central Manager → Inventory/Purchasing → Suppliers

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Inventory/Purchasing**.
3. In the Inventory/Purchasing menu, click **Suppliers**. The Suppliers list screen opens, displaying all existing suppliers.
4. Click **New** to create a new supplier. The supplier detail form opens on the **General** tab.
5. On the **General** tab, enter the following values:
   - **Code**: `SUP-001`
   - **Name**: `TEST-SUPPLIER-001`
   - **Address**: `123 Supply Lane`
   - **City**: `Chicago`
   - **State**: `IL`
   - **Zip**: `60601`
   - **Country**: `USA`
   - **Contact**: `Jane Smith`
   - **Telephone**: `312-555-0100`
   - **E-mail**: `jane.smith@testsupplier001.com`
6. Click the **Store Groups** tab.
7. On the Store Groups tab, locate **Store Group 01** in the list and select it to assign this supplier to that store group.
8. Click **Save And Close** to save the new supplier and return to the Suppliers list.
9. In the Suppliers list, locate the row where the **Code** column shows `SUP-001` and confirm it is present.
10. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
11. Open Store Manager on `Store001`.
12. In Store Manager, navigate to **Inventory/Purchasing → Suppliers**.
13. In the Suppliers list, locate the supplier with Code `SUP-001` and confirm it is present.

## Expected Results
- The new supplier `TEST-SUPPLIER-001` with Code `SUP-001` is created in Central Manager and saved successfully.
- The supplier is synchronized to and visible in the target store `Store001`.
- The supplier does not appear in stores that are not members of `Store Group 01`.

## Validation Checks
- Verify **new supplier record is present** in **Central Manager > Inventory/Purchasing > Suppliers** by locating `SUP-001` in the Suppliers list immediately after saving.
- Verify **Code and Name values** in **Central Manager > Inventory/Purchasing > Suppliers** by reopening the `SUP-001` record and confirming the **Code** field displays `SUP-001` and the **Name** field displays `TEST-SUPPLIER-001` on the **General** tab.
- Verify **contact details are correct** in **Central Manager > Inventory/Purchasing > Suppliers** by confirming the **Contact** field shows `Jane Smith`, **Telephone** shows `312-555-0100`, and **E-mail** shows `jane.smith@testsupplier001.com` on the **General** tab of the reopened record.
- Verify **address details are correct** in **Central Manager > Inventory/Purchasing > Suppliers** by confirming **Address** shows `123 Supply Lane`, **City** shows `Chicago`, **State** shows `IL`, and **Zip** shows `60601` on the **General** tab of the reopened record.
- Verify **Store Group assignment** in **Central Manager > Inventory/Purchasing > Suppliers** by clicking the **Store Groups** tab on the reopened record and confirming **Store Group 01** is selected.
- Verify **supplier is present in target store** in **Store001 > Inventory/Purchasing > Suppliers** by locating the supplier with Code `SUP-001` in the store's Suppliers list after synchronization.
- Verify **supplier does not appear in unassigned stores** by confirming the supplier with Code `SUP-001` is absent from the Suppliers list in any store not belonging to `Store Group 01`.