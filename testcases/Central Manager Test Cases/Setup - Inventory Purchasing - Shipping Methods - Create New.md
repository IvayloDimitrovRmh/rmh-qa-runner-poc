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

# Scenario: Insert a New Shipping Method Record in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- At least one Store Group exists in Central Manager (e.g., `Store Group 01`) and contains `Store001`. To confirm, navigate to **Central Manager → Setup → Store Groups** and verify `Store Group 01` is listed and includes `Store001`.
- The user is logged into Central Manager with a role that has permissions to access Setup > Inventory/Purchasing > Shipping Methods.
- No shipping method record with Code `SHIP-UPS-001` currently exists in Central Manager. To confirm, navigate to **Central Manager → Setup → Inventory/Purchasing → Shipping Methods** and verify that `SHIP-UPS-001` does not appear in the list.

## Required Test Data
- Shipping Method Code: SHIP-UPS-001
- Shipping Method Name: TEST UPS Ground
- Store Group: Store Group 01

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Shipping Methods

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Inventory/Purchasing**.
4. Click **Shipping Methods**. The Shipping Methods list screen opens, showing all existing shipping method records.
5. Click **New**. The shipping method creation form opens.
6. Confirm you are on the **General** tab.
7. In the **Code** field, enter: `SHIP-UPS-001`
   - The code is a unique identifier for the shipping method used to identify the carrier for incoming freight.
8. In the **Name** field, enter: `TEST UPS Ground`
9. Click the **Store Groups** tab.
10. On the Store Groups tab, locate `Store Group 01` in the list of available store groups.
11. Select `Store Group 01` to assign this shipping method to the stores in that group.
12. Click **Save And Close** to save the new shipping method record and return to the Shipping Methods list.
13. On the Shipping Methods list, confirm that a record with Code `SHIP-UPS-001` and Name `TEST UPS Ground` now appears in the list.
14. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
15. Open Store Manager on `Store001`.
16. In Store Manager, navigate to **Setup → Inventory/Purchasing → Shipping Methods**.
17. Confirm that the Shipping Methods list in the store shows a record with Code `SHIP-UPS-001` and Name `TEST UPS Ground`.

## Expected Results
- The new shipping method record `SHIP-UPS-001` with Name `TEST UPS Ground` is saved in Central Manager and appears in the Shipping Methods list.
- The shipping method record is inserted into the active target store `Store001` via synchronization.
- The shipping method is available for use in purchasing and transfer operations at `Store001`.

## Validation Checks
- Verify **shipping method record SHIP-UPS-001 exists in Central Manager** in **Central Manager > Setup > Inventory/Purchasing > Shipping Methods** by confirming a record with Code `SHIP-UPS-001` and Name `TEST UPS Ground` appears in the Shipping Methods list after saving.
- Verify **Store Group assignment** in **Central Manager > Setup > Inventory/Purchasing > Shipping Methods** by opening the `SHIP-UPS-001` record, clicking the **Store Groups** tab, and confirming `Store Group 01` is selected.
- Verify **shipping method record is synchronized to target store** in **Store001 > Setup > Inventory/Purchasing > Shipping Methods** by opening the Shipping Methods list in Store Manager on `Store001` after synchronization and confirming a record with Code `SHIP-UPS-001` and Name `TEST UPS Ground` is present in the list.

> **Note:** Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.