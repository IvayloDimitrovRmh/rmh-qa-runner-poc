# Setup / Inventory/Purchasing — Shipping Carriers

## Metadata
Feature: Shipping Carriers
Business Area: Setup > Inventory/Purchasing > Shipping Carriers
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Update an Existing Shipping Carrier Record in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- A shipping carrier record with Code `CARR-UPS-001` and Name `TEST UPS` already exists in Central Manager and has been previously synchronized to `Store001`. To confirm, navigate to **Central Manager → Setup → Inventory/Purchasing → Shipping Carriers** and verify that the record appears in the list. If it does not exist, execute the **Shipping Carriers - Create New** test case first.
- The user is logged into Central Manager with a role that has permissions to access Setup > Inventory/Purchasing > Shipping Carriers.

## Required Test Data
- Shipping Carrier Code (record to update): CARR-UPS-001
- Current Name (before update): TEST UPS
- Updated Name (after update): TEST UPS Express
- All other fields remain unchanged
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Shipping Carriers

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Inventory/Purchasing**.
4. Click **Shipping Carriers**. The Shipping Carriers list screen opens, showing all existing shipping carrier records.
5. In the Shipping Carriers list, locate the record with Code `CARR-UPS-001` and Name `TEST UPS`.
6. Select that record to highlight it, then open it for editing using the available edit control on the screen.
7. Confirm the **Code** field shows `CARR-UPS-001`. Do not modify this field.
8. Confirm the **Name** field currently shows `TEST UPS`. This is the field you will update.
9. Click inside the **Name** field, clear the existing value, and type: `TEST UPS Express`
10. Do not modify the store group assignment or any other fields.
11. Save the updated record using the available save control (e.g., **Save And Close**) to return to the Shipping Carriers list.
12. On the Shipping Carriers list, confirm the record with Code `CARR-UPS-001` now shows Name `TEST UPS Express`.
13. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
14. Open Store Manager on `Store001`.
15. In Store Manager, navigate to **Setup → Inventory/Purchasing → Shipping Carriers**.
16. Confirm the Shipping Carriers list in the store shows the record with Code `CARR-UPS-001` and Name `TEST UPS Express`.

## Expected Results
- The shipping carrier record `CARR-UPS-001` in Central Manager is updated: the **Name** field now shows `TEST UPS Express` instead of `TEST UPS`.
- All other fields on the record remain unchanged (Code `CARR-UPS-001`, store group assignment).
- The updated shipping carrier record is synchronized to the active target store `Store001`.

## Validation Checks
- Verify **Name updated to TEST UPS Express** in **Central Manager > Setup > Inventory/Purchasing > Shipping Carriers** by locating the record with Code `CARR-UPS-001` in the Shipping Carriers list after saving and confirming the Name column shows `TEST UPS Express`.
- Verify **no unintended field changes** in **Central Manager > Setup > Inventory/Purchasing > Shipping Carriers** by opening the `CARR-UPS-001` record and confirming the Code field still shows `CARR-UPS-001` and the store group assignment remains unchanged.
- Verify **updated shipping carrier record is synchronized to target store** in **Store001 > Setup > Inventory/Purchasing > Shipping Carriers** by opening the Shipping Carriers list in Store Manager on `Store001` after synchronization and confirming the record with Code `CARR-UPS-001` displays Name `TEST UPS Express`.

> **Note:** Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.