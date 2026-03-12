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

# Scenario: Sale with NO TAX

## Business Entity

Sale transaction (no tax applied)

## Business Purpose

Process sales where no tax is applied (due to tax-exempt items, tax-exempt customers, or tax removal) and ensure the transaction with zero tax is synchronized to Central for accurate reporting, compliance, and reconciliation.

## Trigger

User completes a sale in POS where no tax is applied to the transaction.

## Preconditions

- POS is operational and cashier is logged in
- Items are available to sell and have been added to transaction
- Tax configuration allows/results in no tax for the sale due to one of the following:
  - **Item is not taxable:** "Item is taxable" checkbox is **not** selected on item (General tab in Item window)
  - **Customer is tax-exempt:** Customer assigned to transaction has "Exempt from taxes" selected (Customer | Options tab)
  - **Tax removed by cashier:** Cashier manually removed tax using Taxes menu (requires "Allowed to change tax status" permission)
  - **No tax configured:** Store has no tax schedules configured in File | Configuration | Sales Tax
- User has permission to remove tax (if manually removed): "Allowed to change tax status" permission is enabled (Setup | People & Security | Users | General tab | POS User Roles)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Complete a sale in POS with no tax applied:**

**Scenario A: Sale with non-taxable items**
1. Add items to transaction (scan or enter Item Lookup Codes)
2. Items added have "Item is taxable" checkbox **not** selected (configured in Store Manager | Merchandising | Items | General tab)
3. Transaction screen shows tax amount as $0.00
4. Tap **Transaction | Tender Sale** or press **F12**
5. On the Tender screen, verify **Tax** line shows $0.00
6. Enter payment amount and complete tender
7. Transaction is recorded with zero tax and synced to Central

**Scenario B: Sale for tax-exempt customer**
1. Tap **Customers | Lookup Customer** or press **F7** and select tax-exempt customer
2. Customer has "Exempt from taxes" selected (Customer | Options tab in Store Manager or POS)
3. Add items to transaction
4. POS automatically applies tax exemption; transaction screen shows tax amount as $0.00
5. Tap **Transaction | Tender Sale** or press **F12**
6. On the Tender screen, verify **Tax** line shows $0.00 with tax-exempt indicator
7. Enter payment amount and complete tender
8. Transaction is recorded with zero tax and synced to Central

**Scenario C: Tax manually removed by cashier**
1. Add items to transaction (items that would normally be taxable)
2. To remove tax for entire transaction, do one of the following:
   - Tap **Taxes | Transaction Tax | No Tax**
   - Tap **Taxes | Transaction Tax | Tax On/Off**
3. If prompted for reason code, select appropriate reason (e.g., "Tax exempt government purchase", "Resale exemption") and tap **OK**
4. Transaction screen shows tax amount as $0.00
5. Reason code (if selected) displays below transaction details
6. Tap **Transaction | Tender Sale** or press **F12**
7. On the Tender screen, verify **Tax** line shows $0.00
8. Enter payment amount and complete tender
9. Transaction is recorded with zero tax and synced to Central

## Expected Synchronization Behavior

- Insert: Insert the sale transaction in Store database and sync/insert the corresponding transaction in Central database
- Update: Not applicable (sale creates new transaction; not updated)
- Delete: Not applicable (sales are not deleted; voids create reversing transactions)
- Matching key: Transaction number (unique identifier from Store to Central); Store ID + Transaction number

## Expected Result in Source System

- Sale transaction is created/visible in POS (Store database)
- Tax amount is **$0.00** or **zero** in POS transaction screen
- Transaction appears in Journal (Transaction | Receipt | Journal) with zero tax
- Transaction is visible in Store Manager (Journal | Transactions) showing tax amount as zero
- If tax removed manually, reason code (if provided) is captured with transaction
- If tax-exempt customer, customer tax-exempt status is recorded with transaction
- Receipt shows tax amount as $0.00 or "Tax Exempt" (depending on receipt template)
- Inventory is adjusted (items subtracted from on-hand quantity)
- Tender amounts are recorded (sale total equals subtotal since no tax added)

## Expected Result in Target System

- Sale transaction is created/visible in Central database after sync
- Tax amount is **zero** in Central (matches Store)
- Transaction syncs automatically via Central Client
- Transaction is available for Central Manager reporting
- Tax reports show transaction with zero tax
- If tax-exempt customer, tax exemption status is preserved in Central
- If tax removed with reason code, reason code is captured in Central

## Validation Points

- Verify sale transaction exists in POS with zero tax
- Verify sale transaction exists in Store Manager (Journal | Transactions)
- Verify sale transaction exists in Central after sync
- Verify tax amount is zero/not applied in POS, Store Manager, and Central (all consistent)
- Verify reason code (if tax manually removed) is captured in all systems
- Verify customer tax-exempt status (if applicable) is preserved
- Verify transaction total equals subtotal (no tax added)
- Mapping validation: Transaction fields (Store ID, Transaction number, line items, **tax amount = $0.00**, reason code, customer tax-exempt flag, tender amounts, timestamp) map correctly from Store to Central
- Duplicate prevention: No duplicate sale in Central for the same Transaction number

## Negative / Edge Case Coverage

- **Tax expected but not applied (configuration error):** If items should be taxable but tax is zero, verify:
  - "Item is taxable" checkbox is selected on items (Merchandising | Items | General tab)
  - Item has tax schedule assigned in "Item tax" field (Merchandising | Items | General tab)
  - Store has tax schedules configured (File | Configuration | Sales Tax)
  - If issue persists, check tax configuration in Store Manager
- **Tax removed without permission:** If user does not have "Allowed to change tax status" permission, POS prevents manual tax removal; verify permission enforcement
- **Tax removed without reason code:** If reason code is required (File | Configuration | Store Rules | Reason Code Options), cashier must select reason before tax removal completes
- **Mixed taxable and non-taxable items:** Transaction can include both taxable and non-taxable items; POS calculates tax only on taxable items; verify correct tax calculation
- **Tax-exempt customer with taxable override:** If tax-exempt customer purchases items marked as "always taxable" (e.g., alcohol in some jurisdictions), POS may still apply tax; verify jurisdiction-specific rules
- **Tax removal for specific items only:** Cashier can remove tax for specific items (Taxes | Current Item Tax | Current Item Tax On/Off) rather than entire transaction; verify item-level tax removal
- **POS offline then sync later:** Sale with zero tax created locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify sale appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Sale sync is idempotent; repeated sync does not create duplicates in Central
- **Tax compliance reporting:** Zero-tax transactions must be included in tax compliance reports; verify reporting accurately reflects tax-exempt and non-taxable sales
- **Audit trail:** Tax removal with reason code provides audit trail; verify reason codes are captured for compliance
- **Consistency Checker:** If sale transaction fails to sync, run Consistency Checker to synchronize missing sale records to Central

## Known Issues / Notes

- Video link: https://somup.com/cOnZoHWpXl
- Reference: RMH documentation - [Working with taxes](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/transactions-working-with-taxes.md)
- Reference: RMH documentation - [Setting up sales tax rules](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-sales-tax-rules.md)
- Reference: RMH documentation - [Adding customer profiles](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/customers-adding.md)
- **Three scenarios for no tax:**
  1. **Non-taxable items:** "Item is taxable" checkbox not selected on items
  2. **Tax-exempt customer:** Customer has "Exempt from taxes" selected
  3. **Tax manually removed:** Cashier removes tax using Taxes menu
- **Non-taxable items:** Configured in Store Manager (Merchandising | Items | General tab | clear "Item is taxable" checkbox)
- **Tax-exempt customers:** Configured in Store Manager or POS (Customer | Options tab | select "Exempt from taxes")
- **Permission required for manual tax removal:** "Allowed to change tax status" (Setup | People & Security | Users | General tab)
- **Reason codes optional:** Store can configure reason codes for tax removal (File | Configuration | Store Rules | Reason Code Options)
- **Tax removal methods:**
  - **Entire transaction:** Taxes | Transaction Tax | No Tax
  - **Specific item:** Taxes | Current Item Tax | Current Item Tax On/Off
- **Tax-exempt indicator:** Receipt can show "Tax Exempt" or $0.00 tax (depending on receipt template)
- **Tax compliance:** Zero-tax transactions must be properly documented and reported for compliance purposes
- **Common no-tax scenarios:**
  - Non-taxable items (groceries in some jurisdictions, prescription drugs, etc.)
  - Tax-exempt customers (government agencies, non-profits, resellers with exemption certificates)
  - Tax-free zones or jurisdictions
  - Tax holidays (temporary tax exemptions)
- **Tax configuration:** Store Manager (File | Configuration | Sales Tax) controls tax calculation method and schedules
- **Item tax field:** Starting with release 3.50.11, "Item tax" and "Item is taxable" fields are persistently visible in item configuration
- **Tax audit trail:** Transactions with tax removal include reason code for audit purposes
