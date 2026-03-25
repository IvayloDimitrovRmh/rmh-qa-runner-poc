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

# Scenario: Insert a New Item Tax Record in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- At least one Sales Tax record exists in Central Manager. To confirm, navigate to **Central Manager → Setup → Financial → Sales Taxes** and verify at least one record is listed. This is required because the item tax record must reference at least one existing sales tax. If no Sales Tax records exist, create one before running this test.
- The user is logged into Central Manager with a role that has permissions to access Setup > Financial > Item Taxes.
- No item tax record with Code `TAX-FOOD-001` currently exists in Central Manager. To confirm, navigate to **Central Manager → Setup → Financial → Item Taxes** and verify that `TAX-FOOD-001` does not appear in the list.

## Required Test Data
- Item Tax Description: TEST Item Tax Food
- Item Tax Code: TAX-FOOD-001
- Computation method: Standard (no special computation checkbox selected — tax calculated on standard item price)
- Applicable Sales Tax: Use the first available Sales Tax record visible in the Sales Taxes list at Central Manager → Setup → Financial → Sales Taxes
- On Receipt: Enabled
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Financial → Item Taxes

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Financial**.
4. Click **Item Taxes**. The Item Taxes list screen opens, showing all existing item tax records.
5. Click **New**. The item tax creation form opens.
6. In the **Description** field, enter: `TEST Item Tax Food`
7. In the **Code** field, enter: `TAX-FOOD-001`
8. Leave all computation method checkboxes unselected:
   - Do not select **Compute tax on (Price-Cost) instead of Price**
   - Do not select **Compute tax on Cost instead of Price**
   - Do not select **Compute tax on Item Weight instead of Price**
   - This means the tax will be calculated on the standard item price.
9. In the **Apply individual taxes in the following order** section, locate the first available Sales Tax record from the sales tax list.
10. Select that Sales Tax record to add it to the applicable taxes for this item tax type.
11. Select the **On Receipt** checkbox for that sales tax entry to ensure the tax is displayed on the POS receipt.
12. Click **Save And Close** to save the new item tax record and return to the Item Taxes list.
13. On the Item Taxes list, confirm that a record with Description `TEST Item Tax Food` and Code `TAX-FOOD-001` now appears in the list.
14. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
15. Open Store Manager on `Store001`.
16. In Store Manager, navigate to **Setup → Financial → Item Taxes**.
17. Confirm that the Item Taxes list in the store shows a record with Description `TEST Item Tax Food` and Code `TAX-FOOD-001`.

## Expected Results
- The new item tax record `TAX-FOOD-001` with Description `TEST Item Tax Food` is saved in Central Manager and appears in the Item Taxes list.
- The item tax record is inserted into the active target store `Store001` via synchronization.
- The record is available in the store for assignment to items that require this tax type at POS.

## Validation Checks
- Verify **item tax record TAX-FOOD-001 exists in Central Manager** in **Central Manager > Setup > Financial > Item Taxes** by confirming a record with Description `TEST Item Tax Food` and Code `TAX-FOOD-001` appears in the Item Taxes list after saving.
- Verify **item tax record is synchronized to target store** in **Store001 > Setup > Financial > Item Taxes** by opening the Item Taxes list in Store Manager on `Store001` after synchronization and confirming a record with Description `TEST Item Tax Food` and Code `TAX-FOOD-001` is present in the list.

> **Note:** Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.