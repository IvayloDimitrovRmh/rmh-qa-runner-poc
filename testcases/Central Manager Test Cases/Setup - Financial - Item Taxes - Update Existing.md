# Setup / Financial — Item Taxes

## Metadata
Feature: Item Taxes
Business Area: Setup > Financial > Item Taxes
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Update an Existing Item Tax Record in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- An item tax record with Code `TAX-FOOD-001` and Description `TEST Item Tax Food` already exists in Central Manager and has been previously synchronized to `Store001`. To confirm, navigate to **Central Manager → Setup → Financial → Item Taxes** and verify the record appears in the list. If it does not exist, execute the **Item Taxes - Create New** test case first.
- The user is logged into Central Manager with a role that has permissions to access Setup > Financial > Item Taxes.

## Required Test Data
- Item Tax Code (record to update): TAX-FOOD-001
- Current Description (before update): TEST Item Tax Food
- Updated Description (after update): TEST Item Tax Food Updated
- All other fields remain unchanged
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Financial → Item Taxes

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Financial**.
4. Click **Item Taxes**. The Item Taxes list screen opens, showing all existing item tax records.
5. In the Item Taxes list, locate the record with Code `TAX-FOOD-001` and Description `TEST Item Tax Food`.
6. Select that record to highlight it, then click **Edit**. The item tax edit form opens, showing the current field values.
7. Confirm the **Description** field currently shows `TEST Item Tax Food`. This is the field you will update.
8. Confirm the **Code** field shows `TAX-FOOD-001`. Do not modify this field.
9. Click inside the **Description** field, clear the existing value, and type: `TEST Item Tax Food Updated`
10. Do not modify any other fields. All computation method checkboxes and the applicable sales taxes assignment should remain unchanged.
11. Click **Save And Close** to save the updated item tax record and return to the Item Taxes list.
12. On the Item Taxes list, confirm the record with Code `TAX-FOOD-001` now shows Description `TEST Item Tax Food Updated`.
13. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
14. Open Store Manager on `Store001`.
15. In Store Manager, navigate to **Setup → Financial → Item Taxes**.
16. Confirm that the Item Taxes list in the store shows the record with Code `TAX-FOOD-001` and Description `TEST Item Tax Food Updated`.

## Expected Results
- The item tax record `TAX-FOOD-001` in Central Manager is updated: the **Description** field now shows `TEST Item Tax Food Updated` instead of `TEST Item Tax Food`.
- All other fields on the record remain unchanged.
- The updated item tax record is synchronized to the active target store `Store001`.

## Validation Checks
- Verify **Description updated to TEST Item Tax Food Updated** in **Central Manager > Setup > Financial > Item Taxes** by locating the record with Code `TAX-FOOD-001` in the Item Taxes list after saving and confirming the Description column shows `TEST Item Tax Food Updated`.
- Verify **no unintended field changes** in **Central Manager > Setup > Financial > Item Taxes** by selecting the `TAX-FOOD-001` record, clicking Edit, and confirming all other fields (Code, computation method checkboxes, applicable sales taxes) remain unchanged from their prior values.
- Verify **updated item tax record is synchronized to target store** in **Store001 > Setup > Financial > Item Taxes** by opening the Item Taxes list in Store Manager on `Store001` after synchronization and confirming the record with Code `TAX-FOOD-001` displays Description `TEST Item Tax Food Updated`.

> **Note:** Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.