# Setup / Inventory/Purchasing — Purchasers

## Metadata
Feature: Purchasers
Business Area: Setup > Inventory/Purchasing > Purchasers
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Insert a New Purchaser Record in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- At least one Store Group exists in Central Manager (e.g., `Store Group 01`) and contains `Store001`. To confirm, navigate to **Central Manager → Setup → Store Groups** and verify `Store Group 01` is listed and includes `Store001`.
- The user is logged into Central Manager with a role that has permissions to access Setup > Inventory/Purchasing > Purchasers.
- No purchaser record with Code `PUR-001` currently exists in Central Manager. To confirm, navigate to **Central Manager → Setup → Inventory/Purchasing → Purchasers** and verify that `PUR-001` does not appear in the list.

## Required Test Data
- Purchaser Code: PUR-001
- Purchaser Name: TEST Purchaser 001
- Telephone: 312-555-0200
- E-mail Address: purchaser001@test.example.com
- Store Group: Store Group 01

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Purchasers

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Inventory/Purchasing**.
4. Click **Purchasers**. The Purchasers list screen opens, showing all existing purchaser records.
5. Click **New**. The purchaser creation form opens.
6. Confirm you are on the **General** tab.
7. In the **Code** field, enter: `PUR-001`
   - The code is a unique identifier for this purchaser. It can be used to search for purchase orders assigned to this person.
8. In the **Name** field, enter: `TEST Purchaser 001`
9. In the **Telephone** field, enter: `312-555-0200`
10. In the **E-mail Address** field, enter: `purchaser001@test.example.com`
11. Click the **Store Groups** tab.
12. On the Store Groups tab, locate `Store Group 01` in the list of available store groups.
13. Select `Store Group 01` to assign this purchaser to the stores in that group.
14. Click **Save And Close** to save the new purchaser record and return to the Purchasers list.
15. On the Purchasers list, confirm that a record with Code `PUR-001` and Name `TEST Purchaser 001` now appears in the list.
16. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
17. Open Store Manager on `Store001`.
18. In Store Manager, navigate to **Setup → Inventory/Purchasing → Purchasers**.
19. Confirm that the Purchasers list in the store shows a record with Code `PUR-001` and Name `TEST Purchaser 001`.

## Expected Results
- The new purchaser record `PUR-001` with Name `TEST Purchaser 001` is saved in Central Manager and appears in the Purchasers list.
- The purchaser record is inserted into the active target store `Store001` via synchronization.
- The purchaser `TEST Purchaser 001` is available for selection in the Purchaser field when creating purchase orders at `Store001`.

## Validation Checks
- Verify **purchaser record PUR-001 exists in Central Manager** in **Central Manager > Setup > Inventory/Purchasing > Purchasers** by confirming a record with Code `PUR-001` and Name `TEST Purchaser 001` appears in the Purchasers list after saving.
- Verify **purchaser field values are correct** in **Central Manager > Setup > Inventory/Purchasing > Purchasers** by opening the `PUR-001` record and confirming: Code `PUR-001`, Name `TEST Purchaser 001`, Telephone `312-555-0200`, E-mail Address `purchaser001@test.example.com`, Store Groups tab shows `Store Group 01` selected.
- Verify **purchaser record is synchronized to target store** in **Store001 > Setup > Inventory/Purchasing > Purchasers** by opening the Purchasers list in Store Manager on `Store001` after synchronization and confirming a record with Code `PUR-001` and Name `TEST Purchaser 001` is present in the list.

> **Note:** Purchasers can be selected from the Purchaser field on purchase orders, making it easier to search for specific purchase orders and generate purchase order reports by purchaser. Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.