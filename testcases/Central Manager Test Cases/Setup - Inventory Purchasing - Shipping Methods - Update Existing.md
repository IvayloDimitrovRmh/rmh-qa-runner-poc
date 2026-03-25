# Setup / Inventory/Purchasing — Shipping Methods

## Metadata
Feature: Shipping Methods
Business Area: Setup > Inventory/Purchasing > Shipping Methods
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Update an Existing Shipping Method Record in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- A shipping method record with Code `SHIP-UPS-001` and Name `TEST UPS Ground` already exists in Central Manager and has been previously synchronized to `Store001`. To confirm, navigate to **Central Manager → Setup → Inventory/Purchasing → Shipping Methods** and verify that the record appears in the list. If it does not exist, execute the **Shipping Methods - Create New** test case first.
- The user is logged into Central Manager with a role that has permissions to access Setup > Inventory/Purchasing > Shipping Methods.

## Required Test Data
- Shipping Method Code (record to update): SHIP-UPS-001
- Current Name (before update): TEST UPS Ground
- Updated Name (after update): TEST UPS Ground Freight
- All other fields remain unchanged
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Shipping Methods

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Inventory/Purchasing**.
4. Click **Shipping Methods**. The Shipping Methods list screen opens, showing all existing shipping method records.
5. In the Shipping Methods list, locate the record with Code `SHIP-UPS-001` and Name `TEST UPS Ground`.
6. Select that record to highlight it, then open it for editing.
7. Confirm you are on the **General** tab.
8. Confirm the **Code** field shows `SHIP-UPS-001`. Do not modify this field.
9. Confirm the **Name** field currently shows `TEST UPS Ground`. This is the field you will update.
10. Click inside the **Name** field, clear the existing value, and type: `TEST UPS Ground Freight`
11. Click the **Store Groups** tab and confirm `Store Group 01` is still selected. Do not modify the store group assignment.
12. Click **Save And Close** to save the updated shipping method record and return to the Shipping Methods list.
13. On the Shipping Methods list, confirm the record with Code `SHIP-UPS-001` now shows Name `TEST UPS Ground Freight`.
14. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
15. Open Store Manager on `Store001`.
16. In Store Manager, navigate to **Setup → Inventory/Purchasing → Shipping Methods**.
17. Confirm the Shipping Methods list in the store shows the record with Code `SHIP-UPS-001` and Name `TEST UPS Ground Freight`.

## Expected Results
- The shipping method record `SHIP-UPS-001` in Central Manager is updated: the **Name** field now shows `TEST UPS Ground Freight` instead of `TEST UPS Ground`.
- All other fields on the record remain unchanged (Code `SHIP-UPS-001`, Store Group `Store Group 01`).
- The updated shipping method record is synchronized to the active target store `Store001`.

## Validation Checks
- Verify **Name updated to TEST UPS Ground Freight** in **Central Manager > Setup > Inventory/Purchasing > Shipping Methods** by locating the record with Code `SHIP-UPS-001` in the Shipping Methods list after saving and confirming the Name column shows `TEST UPS Ground Freight`.
- Verify **no unintended field changes** in **Central Manager > Setup > Inventory/Purchasing > Shipping Methods** by opening the `SHIP-UPS-001` record and confirming the Code field still shows `SHIP-UPS-001` and the Store Groups tab still shows `Store Group 01` selected.
- Verify **updated shipping method record is synchronized to target store** in **Store001 > Setup > Inventory/Purchasing > Shipping Methods** by opening the Shipping Methods list in Store Manager on `Store001` after synchronization and confirming the record with Code `SHIP-UPS-001` displays Name `TEST UPS Ground Freight`.

> **Note:** Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.