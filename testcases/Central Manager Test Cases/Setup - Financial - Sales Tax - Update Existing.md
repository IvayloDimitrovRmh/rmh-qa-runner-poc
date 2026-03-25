# Setup / Financial — Sales Taxes

## Metadata
Feature: Sales Taxes
Business Area: Setup > Financial > Sales Taxes
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Update an Existing Sales Tax Record in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- A sales tax record with Code `TAX-GST-001` and Description `TEST General Sales Tax` already exists in Central Manager with a Sales Tax Rate of `8.00%` and has been previously synchronized to `Store001`. To confirm, navigate to **Central Manager → Setup → Financial → Sales Taxes** and verify the record appears in the list. If it does not exist, execute the **Sales Tax - Create New** test case first.
- The user is logged into Central Manager with a role that has permissions to access Setup > Financial > Sales Taxes.

## Required Test Data
- Sales Tax Code (record to update): TAX-GST-001
- Current Sales Tax Rate (before update): 8.00
- Updated Sales Tax Rate (after update): 10.00
- All other fields remain unchanged
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Financial → Sales Taxes

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Financial**.
4. Click **Sales Taxes**. The Sales Taxes list screen opens, showing all existing sales tax records.
5. In the Sales Taxes list, locate the record with Code `TAX-GST-001` and Description `TEST General Sales Tax`.
6. Select that record to highlight it, then open it for editing.
7. Confirm the **Description** field shows `TEST General Sales Tax`. Do not modify this field.
8. Confirm the **Code** field shows `TAX-GST-001`. Do not modify this field.
9. Confirm the **Sales Tax Rate (%)** field currently shows `8.00`. This is the field you will update.
10. Click inside the **Sales Tax Rate (%)** field, clear the existing value, and type: `10.00`
11. Confirm the **Fixed Amount** field remains blank. Do not modify this field.
12. Confirm all optional calculation method checkboxes remain unselected. Do not modify them.
13. Click the **Store Groups** tab and confirm `Store Group 01` is still selected. Do not modify the store group assignment.
14. Click **Save And Close** to save the updated sales tax record and return to the Sales Taxes list.
15. On the Sales Taxes list, confirm the record with Code `TAX-GST-001` is still present with Description `TEST General Sales Tax`.
16. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
17. Open Store Manager on `Store001`.
18. In Store Manager, navigate to **Setup → Financial → Sales Taxes**.
19. Confirm the Sales Taxes list in the store shows the record with Code `TAX-GST-001` and that the updated rate is reflected.

## Expected Results
- The sales tax record `TAX-GST-001` in Central Manager is updated: the **Sales Tax Rate (%)** field now shows `10.00` instead of `8.00`.
- All other fields on the record remain unchanged (Description, Code, Fixed Amount, Store Group assignment).
- The updated sales tax record is synchronized to the active target store `Store001`.

## Validation Checks
- Verify **Sales Tax Rate updated to 10.00** in **Central Manager > Setup > Financial > Sales Taxes** by opening the `TAX-GST-001` record after saving and confirming the **Sales Tax Rate (%)** field displays `10.00`.
- Verify **no unintended field changes** in **Central Manager > Setup > Financial > Sales Taxes** by opening the `TAX-GST-001` record and confirming all other fields remain unchanged: Description `TEST General Sales Tax`, Code `TAX-GST-001`, Fixed Amount blank, Store Groups tab shows `Store Group 01` selected.
- Verify **updated sales tax record is synchronized to target store** in **Store001 > Setup > Financial > Sales Taxes** by opening the Sales Taxes list in Store Manager on `Store001` after synchronization and confirming the record with Code `TAX-GST-001` is present and reflects the updated rate of `10.00`.

> **Note:** Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.