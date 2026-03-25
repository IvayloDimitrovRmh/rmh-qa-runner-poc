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

# Scenario: Update an Existing Purchaser Record in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- A purchaser record with Code `PUR-001` and Name `TEST Purchaser 001` already exists in Central Manager with Telephone `312-555-0200` and E-mail Address `purchaser001@test.example.com`, and has been previously synchronized to `Store001`. To confirm, navigate to **Central Manager → Setup → Inventory/Purchasing → Purchasers** and verify the record appears in the list. If it does not exist, execute the **Purchasers - Create New** test case first.
- The user is logged into Central Manager with a role that has permissions to access Setup > Inventory/Purchasing > Purchasers.

## Required Test Data
- Purchaser Code (record to update): PUR-001
- Current Telephone (before update): 312-555-0200
- Updated Telephone (after update): 312-555-0299
- All other fields remain unchanged
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Purchasers

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Inventory/Purchasing**.
4. Click **Purchasers**. The Purchasers list screen opens, showing all existing purchaser records.
5. In the Purchasers list, locate the record with Code `PUR-001` and Name `TEST Purchaser 001`.
6. Select that record to highlight it, then open it for editing.
7. Confirm you are on the **General** tab.
8. Confirm the **Code** field shows `PUR-001`. Do not modify this field.
9. Confirm the **Name** field shows `TEST Purchaser 001`. Do not modify this field.
10. Confirm the **Telephone** field currently shows `312-555-0200`. This is the field you will update.
11. Click inside the **Telephone** field, clear the existing value, and type: `312-555-0299`
12. Confirm the **E-mail Address** field still shows `purchaser001@test.example.com`. Do not modify this field.
13. Click the **Store Groups** tab and confirm `Store Group 01` is still selected. Do not modify the store group assignment.
14. Click **Save And Close** to save the updated purchaser record and return to the Purchasers list.
15. On the Purchasers list, confirm the record with Code `PUR-001` and Name `TEST Purchaser 001` is still present.
16. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
17. Open Store Manager on `Store001`.
18. In Store Manager, navigate to **Setup → Inventory/Purchasing → Purchasers**.
19. Confirm the Purchasers list in the store shows the record with Code `PUR-001` and that the record is present after the update.

## Expected Results
- The purchaser record `PUR-001` in Central Manager is updated: the **Telephone** field now shows `312-555-0299` instead of `312-555-0200`.
- All other fields on the record remain unchanged (Code `PUR-001`, Name `TEST Purchaser 001`, E-mail Address `purchaser001@test.example.com`, Store Group `Store Group 01`).
- The updated purchaser record is synchronized to the active target store `Store001`.

## Validation Checks
- Verify **Telephone updated to 312-555-0299** in **Central Manager > Setup > Inventory/Purchasing > Purchasers** by opening the `PUR-001` record after saving and confirming the **Telephone** field displays `312-555-0299`.
- Verify **no unintended field changes** in **Central Manager > Setup > Inventory/Purchasing > Purchasers** by confirming all other fields remain unchanged: Code `PUR-001`, Name `TEST Purchaser 001`, E-mail Address `purchaser001@test.example.com`, Store Groups tab shows `Store Group 01` selected.
- Verify **updated purchaser record is synchronized to target store** in **Store001 > Setup > Inventory/Purchasing > Purchasers** by opening the Purchasers list in Store Manager on `Store001` after synchronization and confirming the record with Code `PUR-001` and Name `TEST Purchaser 001` is present in the list.

> **Note:** Purchasers can be selected from the Purchaser field on purchase orders, making it easier to search for specific purchase orders and generate purchase order reports by purchaser. Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.