# Setup / Inventory/Purchasing — Payment Terms

## Metadata
Feature: Payment Terms
Business Area: Setup > Inventory/Purchasing > Payment Terms
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Update an Existing Payment Terms Record in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- A payment terms record with Code `PT-NET30-001` and Name `TEST Net 30` already exists in Central Manager and has been previously synchronized to `Store001`. To confirm, navigate to **Central Manager → Setup → Inventory/Purchasing → Payment Terms** and verify the record appears in the list. If it does not exist, execute the **Payment Terms - Create New** test case first.
- The user is logged into Central Manager with a role that has permissions to access Setup > Inventory/Purchasing > Payment Terms.

## Required Test Data
- Payment Terms Code (record to update): PT-NET30-001
- Current Name (before update): TEST Net 30
- Updated Name (after update): TEST Net 30 Days
- All other fields remain unchanged
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Payment Terms

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Inventory/Purchasing**.
4. Click **Payment Terms**. The Payment Terms list screen opens, showing all existing payment terms records.
5. In the Payment Terms list, locate the record with Code `PT-NET30-001` and Name `TEST Net 30`.
6. Select that record to highlight it, then open it for editing.
7. Confirm you are on the **General** tab.
8. Confirm the **Code** field shows `PT-NET30-001`. Do not modify this field.
9. Confirm the **Name** field currently shows `TEST Net 30`. This is the field you will update.
   - The name entered here is printed on the purchase order or transfer as the payment terms.
10. Click inside the **Name** field, clear the existing value, and type: `TEST Net 30 Days`
11. Click the **Store Groups** tab and confirm `Store Group 01` is still selected. Do not modify the store group assignment.
12. Click **Save And Close** to save the updated payment terms record and return to the Payment Terms list.
13. On the Payment Terms list, confirm the record with Code `PT-NET30-001` now shows Name `TEST Net 30 Days`.
14. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
15. Open Store Manager on `Store001`.
16. In Store Manager, navigate to **Setup → Inventory/Purchasing → Payment Terms**.
17. Confirm the Payment Terms list in the store shows the record with Code `PT-NET30-001` and Name `TEST Net 30 Days`.

## Expected Results
- The payment terms record `PT-NET30-001` in Central Manager is updated: the **Name** field now shows `TEST Net 30 Days` instead of `TEST Net 30`.
- All other fields on the record remain unchanged (Code `PT-NET30-001`, Store Group `Store Group 01`).
- The updated payment terms record is synchronized to the active target store `Store001`.
- The updated name `TEST Net 30 Days` will appear on new purchase orders and transfers printed at `Store001`.

## Validation Checks
- Verify **Name updated to TEST Net 30 Days** in **Central Manager > Setup > Inventory/Purchasing > Payment Terms** by locating the record with Code `PT-NET30-001` in the Payment Terms list after saving and confirming the Name column shows `TEST Net 30 Days`.
- Verify **no unintended field changes** in **Central Manager > Setup > Inventory/Purchasing > Payment Terms** by opening the `PT-NET30-001` record and confirming the Code field still shows `PT-NET30-001` and the Store Groups tab still shows `Store Group 01` selected.
- Verify **updated payment terms record is synchronized to target store** in **Store001 > Setup > Inventory/Purchasing > Payment Terms** by opening the Payment Terms list in Store Manager on `Store001` after synchronization and confirming the record with Code `PT-NET30-001` displays Name `TEST Net 30 Days`.

> **Note:** The Name field value is printed on purchase orders and transfers as the payment terms. Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.