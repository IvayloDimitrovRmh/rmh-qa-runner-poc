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

# Scenario: Insert a New Shipping Carrier Record in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- At least one Store Group exists in Central Manager (e.g., `Store Group 01`) and contains `Store001`. To confirm, navigate to **Central Manager → Setup → Store Groups** and verify `Store Group 01` is listed and includes `Store001`.
- The user is logged into Central Manager with a role that has permissions to access Setup > Inventory/Purchasing > Shipping Carriers.
- No shipping carrier record with Code `CARR-UPS-001` currently exists in Central Manager. To confirm, navigate to **Central Manager → Setup → Inventory/Purchasing → Shipping Carriers** and verify that `CARR-UPS-001` does not appear in the list.

## Required Test Data
- Shipping Carrier Code: CARR-UPS-001
- Shipping Carrier Name: TEST UPS
- Store Group: Store Group 01

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Shipping Carriers

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Inventory/Purchasing**.
4. Click **Shipping Carriers**. The Shipping Carriers list screen opens, showing all existing shipping carrier records.
5. Click **New**. The shipping carrier creation form opens.
6. In the **Code** field, enter: `CARR-UPS-001`
   - The code is a unique identifier for this shipping carrier.
7. In the **Name** field, enter: `TEST UPS`
8. Assign the carrier to `Store Group 01` using the available store group assignment controls on the form.
9. Save the record using the available save control (e.g., **Save And Close**) to return to the Shipping Carriers list.
10. On the Shipping Carriers list, confirm that a record with Code `CARR-UPS-001` and Name `TEST UPS` now appears in the list.
11. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
12. Open Store Manager on `Store001`.
13. In Store Manager, navigate to **Setup → Inventory/Purchasing → Shipping Carriers**.
14. Confirm that the Shipping Carriers list in the store shows a record with Code `CARR-UPS-001` and Name `TEST UPS`.

## Expected Results
- The new shipping carrier record `CARR-UPS-001` with Name `TEST UPS` is saved in Central Manager and appears in the Shipping Carriers list.
- The shipping carrier record is inserted into the active target store `Store001` via synchronization.
- The carrier `TEST UPS` is available for selection on customer accounts and register default shipping configuration at `Store001`.

## Validation Checks
- Verify **shipping carrier record CARR-UPS-001 exists in Central Manager** in **Central Manager > Setup > Inventory/Purchasing > Shipping Carriers** by confirming a record with Code `CARR-UPS-001` and Name `TEST UPS` appears in the Shipping Carriers list after saving.
- Verify **shipping carrier record is synchronized to target store** in **Store001 > Setup > Inventory/Purchasing > Shipping Carriers** by opening the Shipping Carriers list in Store Manager on `Store001` after synchronization and confirming a record with Code `CARR-UPS-001` and Name `TEST UPS` is present in the list.

> **Note:** Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.