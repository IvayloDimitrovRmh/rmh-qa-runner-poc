# TAX/VAT

## Metadata

Feature: TAX/VAT  
Business Area: TAX/VAT  
Source System: POS  
Target System: Central  
Sync Direction: Store -> Central  
Release: TBD  
Priority: 8

---

# Scenario: Sale with TAX

## Business Entity

Sale transaction (with tax applied)

## Business Purpose

Process sales where tax is applied according to configured tax rules and ensure the transaction with correct tax calculation is synchronized to Central for accurate financial reporting, tax compliance, and reconciliation.

## Trigger

User completes a sale in POS where tax is applied to taxable items in the transaction.

## Preconditions

- POS is operational and cashier is logged in
- Items are available to sell and have been added to transaction
- Tax configuration/rules are in place and applicable:
  - Tax schedules are configured in Store Manager (File | Configuration | Sales Tax)
  - Items have "Item is taxable" checkbox selected (Merchandising | Items | General tab)
  - Items have tax schedule assigned in "Item tax" field (Merchandising | Items | General tab)
  - Method of Taxation is configured: Tax-Exclusive (US/Canada) or VAT/Tax-Inclusive (Europe)
- Customer is **not** tax-exempt (or no customer assigned to transaction)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Complete a sale in POS with tax applied:**

**Scenario A: Sale with local item tax (pick-up in store)**
1. Add taxable items to transaction (scan or enter Item Lookup Codes)
2. Items have "Item is taxable" selected and "Item tax" field populated (configured in Store Manager)
3. POS automatically calculates tax based on "Item tax" schedule assigned to each item
4. Transaction screen displays:
   - **Subtotal** (sum of item prices before tax)
   - **Tax** (calculated tax amount)
   - **Total** (subtotal + tax for Tax-Exclusive; or subtotal for Tax-Inclusive with tax shown separately)
5. Tap **Transaction | Tender Sale** or press **F12**
6. On the Tender screen, verify:
   - **Subtotal** amount
   - **Tax** line shows calculated tax amount (e.g., "Tax: $2.50")
   - **Total** amount (subtotal + tax)
7. Enter payment amount and complete tender
8. Receipt prints showing subtotal, tax breakdown, and total
9. Transaction is recorded with calculated tax and synced to Central

**Scenario B: Sale with destination tax (shipping to customer)**
1. Tap **Customers | Lookup Customer** or press **F7** and select customer
2. Customer has shipping address configured (Customer | Shipping tab)
3. If destination tax is enabled (File | Configuration | Sales Tax | "If shipping to the customer..."), tap **Customers | Select Shipping Address**
4. Select customer's shipping address from list
5. Shipping address displays in Customer pane at top of POS screen
6. Add taxable items to transaction
7. POS calculates tax based on **shipping address** (destination jurisdiction), not billing address or store location
8. Transaction screen displays subtotal, tax (based on destination), and total
9. Tap **Transaction | Tender Sale** or press **F12**
10. On the Tender screen, verify tax calculated for destination jurisdiction
11. Enter payment amount and complete tender
12. Transaction is recorded with destination tax and synced to Central

**Note:** Destination tax feature available starting with release 3.50.11

## Expected Synchronization Behavior

- Insert: Insert the sale transaction in Store database and sync/insert the corresponding transaction in Central database
- Update: Not applicable (sale creates new transaction; not updated)
- Delete: Not applicable (sales are not deleted; voids create reversing transactions)
- Matching key: Transaction number (unique identifier from Store to Central); Store ID + Transaction number

## Expected Result in Source System

- Sale transaction is created/visible in POS (Store database)
- Tax is calculated and applied in POS based on:
  - **Tax-Exclusive (US/Canada):** Tax added to item prices; Total = Subtotal + Tax
  - **Tax-Inclusive (VAT/Europe):** Tax included in item prices; Total = Subtotal (tax shown separately for reporting)
- Tax amount displays on transaction screen (e.g., "Tax: $2.50")
- Transaction appears in Journal (Transaction | Receipt | Journal) with tax details
- Transaction is visible in Store Manager (Journal | Transactions) showing tax amount
- Receipt shows:
  - Subtotal (pre-tax amount for Tax-Exclusive; total amount for Tax-Inclusive)
  - Tax breakdown by tax schedule (if multiple tax rates apply)
  - Total amount
- Inventory is adjusted (items subtracted from on-hand quantity)
- Tender amounts are recorded (customer pays Total including tax)

## Expected Result in Target System

- Sale transaction is created/visible in Central database after sync
- Tax amount and calculation are reflected in Central (matches Store)
- Transaction syncs automatically via Central Client
- Transaction is available for Central Manager reporting
- Tax reports show transaction with correct tax amount
- Tax compliance reports include transaction for tax remittance calculations

## Validation Points

- Verify sale transaction exists in POS with calculated tax
- Verify sale transaction exists in Store Manager (Journal | Transactions)
- Verify sale transaction exists in Central after sync
- Verify tax amount matches between POS, Store Manager, and Central
- Verify tax calculation is correct:
  - Tax-Exclusive: Tax = Subtotal × Tax Rate; Total = Subtotal + Tax
  - Tax-Inclusive: Tax = Total - (Total ÷ (1 + Tax Rate)); Total already includes tax
- Verify tax breakdown by tax schedule (if multiple rates apply, e.g., state + local tax)
- Verify destination tax (if shipping to customer): Tax based on shipping address, not store location
- Mapping validation: Transaction fields (Store ID, Transaction number, line items, **subtotal, tax amount, tax schedules applied**, total, tender amounts, timestamp) map correctly from Store to Central
- Duplicate prevention: No duplicate sale in Central for the same Transaction number

## Negative / Edge Case Coverage

- **Tax calculation error/mismatch:** If tax amount seems incorrect, verify:
  - Items have correct tax schedule assigned in "Item tax" field
  - Tax schedules have correct tax rates configured (File | Configuration | Sales Tax)
  - Tax calculation method (Tax-Exclusive vs. Tax-Inclusive) is correctly configured
  - If destination tax is enabled, verify shipping address is selected before tender
- **Multiple tax schedules in one transaction:** If items have different tax schedules (e.g., food items at 2%, general items at 8%), POS calculates tax per item and shows combined total; verify tax breakdown on receipt
- **Mixed taxable and non-taxable items:** Transaction can include both; POS calculates tax only on taxable items; verify correct calculation
- **Destination tax without shipping address selected:** If destination tax is enabled but cashier forgets to select shipping address, POS defaults to local item tax; starting with release 3.50.11, this behavior is documented
- **Tax rounding:** POS rounds tax amounts according to jurisdiction rules (typically to nearest cent); verify rounding is consistent across POS, Store Manager, and Central
- **Tax-inclusive price changes:** For Tax-Inclusive (VAT) systems, if tax rate changes, item prices should be adjusted to maintain same pre-tax profit margin; verify price updates
- **Tax schedule changes mid-transaction:** If tax schedule is changed in Store Manager while transaction is in progress in POS, POS uses tax schedule active at time of tender
- **POS offline then sync later:** Sale with tax created locally in Store database, then synced to Central when connectivity is restored; tax calculation remains consistent
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify sale appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Sale sync is idempotent; repeated sync does not create duplicates in Central
- **Tax compliance reporting:** Transactions with tax must be accurately reported for tax remittance; verify tax reports include all taxable sales
- **Consistency Checker:** If sale transaction fails to sync, run Consistency Checker to synchronize missing sale records to Central

## Known Issues / Notes

- Video link: https://somup.com/cOnZo8WplF
- Reference: RMH documentation - [Setting up sales tax rules](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-sales-tax-rules.md)
- Reference: RMH documentation - [Working with taxes](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/transactions-working-with-taxes.md)
- **Tax calculation methods:**
  - **Tax-Exclusive (US/Canada):** Tax added to item prices; Total = Subtotal + Tax
  - **Tax-Inclusive (VAT/Europe):** Tax included in item prices; Total = Subtotal (tax shown separately)
- **Tax configuration:** Store Manager (File | Configuration | Sales Tax) controls:
  - Method of Taxation (Tax-Exclusive or VAT/Tax-Inclusive)
  - Tax Schedule Basis (local item tax or destination tax)
  - Tax schedules (tax rates and jurisdictions)
- **Item tax assignment:** Each taxable item has:
  - "Item is taxable" checkbox selected (General tab)
  - "Item tax" field populated with tax schedule (General tab)
- **Local item tax (default):** POS applies tax schedule assigned in "Item tax" field; used for items picked up in store
- **Destination tax (shipping):** Starting with release 3.50.11:
  - Enable: File | Configuration | Sales Tax | "If shipping to the customer, select the value..."
  - POS calculates tax based on **shipping address**, not billing address or store location
  - Cashier must select shipping address (Customers | Select Shipping Address) before tender
  - Shipping address displays in Customer pane in POS
  - If shipping address not selected, POS defaults to local item tax
- **Clear Shipping Address:** Starting with release 3.50.11, button available (Customers menu) to remove shipping address from transaction
- **Tax breakdown on receipt:** Receipt can show tax breakdown by tax schedule (e.g., "State Tax: $1.50, Local Tax: $1.00")
- **Multiple tax rates:** Transaction can include items with different tax rates; POS calculates per-item tax and sums for total
- **Tax rounding:** POS rounds tax to nearest cent (or jurisdiction-specific rounding rules)
- **Tax compliance:** Accurate tax calculation is critical for compliance; verify tax configuration matches jurisdiction requirements
- **Tax reports:** Central Manager provides tax reports for remittance and compliance purposes
- **Item tax field visibility:** Starting with release 3.50.11, "Item tax" and "Item is taxable" fields are persistently visible in item configuration (previously conditional)
