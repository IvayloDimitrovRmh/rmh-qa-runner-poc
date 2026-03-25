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

# Scenario: Insert a New Sales Tax Record in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- At least one Store Group exists in Central Manager (e.g., `Store Group 01`) and contains `Store001`. To confirm, navigate to **Central Manager → Setup → Store Groups** and verify `Store Group 01` is listed and includes `Store001`.
- The user is logged into Central Manager with a role that has permissions to access Setup > Financial > Sales Taxes.
- No sales tax record with Code `TAX-GST-001` currently exists in Central Manager. To confirm, navigate to **Central Manager → Setup → Financial → Sales Taxes** and verify that `TAX-GST-001` does not appear in the list.

## Required Test Data
- Sales Tax Description: TEST General Sales Tax
- Sales Tax Code: TAX-GST-001
- Sales Tax Rate (%): 8.00
- Fixed Amount: (leave blank — percentage-based tax only)
- Minimum taxable amount: (leave blank — no minimum threshold)
- Maximum taxable amount: (leave blank — no maximum threshold)
- Store Group: Store Group 01

## Navigation Path
Central Manager → Setup → Financial → Sales Taxes

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Financial**.
4. Click **Sales Taxes**. The Sales Taxes list screen opens, showing all existing sales tax records.
5. Click **New**. The sales tax creation form opens.
6. In the **Description** field, enter: `TEST General Sales Tax`
7. In the **Code** field, enter: `TAX-GST-001`
8. In the **Sales Tax Rate (%)** field, enter: `8.00`
9. Leave the **Fixed Amount** field blank — this tax is calculated as a percentage of price, not a fixed amount.
10. Leave the **Minimum taxable amount** field blank — this tax applies to all item prices without a minimum threshold.
11. Leave the **Maximum taxable amount** field blank — this tax applies to all item prices without a maximum threshold.
12. Leave all optional calculation method checkboxes unselected:
    - Do not select **Only apply tax to portion over minimum taxable amount**
    - Do not select **Include any previous sales taxes in calculation**
    - Do not select **Use partial dollar method in sales taxes calculation**
13. Click the **Store Groups** tab.
14. On the Store Groups tab, locate `Store Group 01` in the list of available store groups.
15. Select `Store Group 01` to assign this sales tax to the stores in that group.
16. Click **Save And Close** to save the new sales tax record and return to the Sales Taxes list.
17. On the Sales Taxes list, confirm that a record with Description `TEST General Sales Tax` and Code `TAX-GST-001` now appears in the list.
18. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
19. Open Store Manager on `Store001`.
20. In Store Manager, navigate to **Setup → Financial → Sales Taxes**.
21. Confirm that the Sales Taxes list in the store shows a record with Description `TEST General Sales Tax` and Code `TAX-GST-001`.

## Expected Results
- The new sales tax record `TAX-GST-001` with Description `TEST General Sales Tax` and a rate of 8.00% is saved in Central Manager and appears in the Sales Taxes list.
- The sales tax record is inserted into the active target store `Store001` via synchronization.
- The record is available in the store for assignment to items sold at POS.

## Validation Checks
- Verify **sales tax record TAX-GST-001 exists in Central Manager** in **Central Manager > Setup > Financial > Sales Taxes** by confirming a record with Description `TEST General Sales Tax` and Code `TAX-GST-001` appears in the Sales Taxes list after saving.
- Verify **Store Group assignment** in **Central Manager > Setup > Financial > Sales Taxes** by selecting the `TAX-GST-001` record, clicking the **Store Groups** tab, and confirming `Store Group 01` is selected.
- Verify **sales tax record is synchronized to target store** in **Store001 > Setup > Financial > Sales Taxes** by opening the Sales Taxes list in Store Manager on `Store001` after synchronization and confirming a record with Description `TEST General Sales Tax` and Code `TAX-GST-001` is present in the list.

> **Note:** Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.