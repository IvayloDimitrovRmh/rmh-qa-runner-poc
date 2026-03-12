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

# Scenario: Sale for TAX exempt customer

## Business Entity

Sale transaction (tax-exempt customer)

## Business Purpose

Process sales for tax-exempt customers (government agencies, non-profits, resellers with exemption certificates) and ensure the exemption is correctly applied and synchronized to Central for compliance, audit, and reporting purposes.

## Trigger

User completes a sale in POS for a customer who is marked as tax-exempt.

## Preconditions

- POS is operational and cashier is logged in
- Items are available to sell (items may be normally taxable)
- Customer exists and is marked as tax-exempt:
  - Customer has "Exempt from taxes" checkbox **selected** in customer profile (Customer | Options tab in Store Manager or POS)
  - Customer may have Tax ID Number recorded (Customer | Options tab) for compliance/audit purposes
- Tax exemption configuration/rules are in place:
  - Store has tax schedules configured (File | Configuration | Sales Tax)
  - Items may be taxable (have "Item is taxable" selected and "Item tax" assigned)
  - Customer tax-exempt status overrides item tax configuration
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Complete a sale in POS for a tax-exempt customer:**
1. Tap **Customers | Lookup Customer** or press **F7**
2. On the customer lookup screen, search for tax-exempt customer by name, phone, or customer ID and press **Enter**
3. Select the customer (customer has "Exempt from taxes" checkbox selected in profile)
4. Customer information displays in Customer pane at top of POS screen
5. Add items to transaction (scan or enter Item Lookup Codes)
   - Items may be normally taxable (have "Item is taxable" selected and "Item tax" assigned)
6. POS automatically applies tax exemption because customer is tax-exempt:
   - Transaction screen shows **Tax: $0.00** (no tax calculated)
   - Tax-exempt indicator may appear on screen (depending on POS configuration)
7. Transaction screen displays:
   - **Subtotal** (sum of item prices)
   - **Tax: $0.00** (tax exemption applied)
   - **Total** (equals Subtotal since no tax added)
8. Tap **Transaction | Tender Sale** or press **F12**
9. On the Tender screen, verify:
   - **Subtotal** amount
   - **Tax** line shows **$0.00** or "Tax Exempt"
   - **Total** amount (equals Subtotal)
10. Enter payment amount and complete tender
11. Receipt prints showing:
    - Customer name (tax-exempt customer)
    - Subtotal
    - Tax: $0.00 or "Tax Exempt"
    - Total (equals Subtotal)
    - (Optional) Customer Tax ID Number (if configured in receipt template)
12. Transaction is recorded with tax exemption status and synced to Central

## Expected Synchronization Behavior

- Insert: Insert the sale transaction in Store database and sync/insert the corresponding transaction in Central database
- Update: Not applicable (sale creates new transaction; not updated)
- Delete: Not applicable (sales are not deleted; voids create reversing transactions)
- Matching key: Transaction number (unique identifier from Store to Central); Store ID + Transaction number

## Expected Result in Source System

- Sale transaction is created/visible in POS (Store database)
- Tax exemption is applied; tax amount is **$0.00** in POS
- Customer tax-exempt status is recorded with transaction
- Customer Tax ID Number (if provided in customer profile) is captured with transaction
- Transaction appears in Journal (Transaction | Receipt | Journal) with tax-exempt indicator
- Transaction is visible in Store Manager (Journal | Transactions) showing:
  - Tax amount: $0.00
  - Customer: tax-exempt customer name
  - Tax-exempt flag/indicator
- Receipt shows:
  - Customer name
  - Tax: $0.00 or "Tax Exempt"
  - (Optional) Customer Tax ID Number
- Inventory is adjusted (items subtracted from on-hand quantity)
- Tender amounts are recorded (customer pays Subtotal only, no tax)

## Expected Result in Target System

- Sale transaction is created/visible in Central database after sync
- Tax exemption status/amount is reflected in Central (tax = $0.00, tax-exempt flag set)
- Customer association is preserved (tax-exempt customer linked to transaction)
- Customer Tax ID Number (if provided) is captured in Central
- Transaction syncs automatically via Central Client
- Transaction is available for Central Manager reporting
- Tax compliance reports show transaction as tax-exempt sale (separate category from taxable sales)
- Audit reports include customer name and Tax ID Number for compliance verification

## Validation Points

- Verify sale transaction exists in POS with zero tax
- Verify customer tax-exempt status is applied (Tax: $0.00)
- Verify sale transaction exists in Store Manager (Journal | Transactions)
- Verify sale transaction exists in Central after sync
- Verify tax exemption is correctly applied and consistent between POS, Store Manager, and Central
- Verify customer name and Tax ID Number are captured with transaction
- Verify transaction total equals subtotal (no tax added)
- Verify tax-exempt indicator/flag is set in all systems
- Mapping validation: Transaction fields (Store ID, Transaction number, customer ID, customer name, **tax-exempt flag, tax amount = $0.00**, customer Tax ID Number, line items, tender amounts, timestamp) map correctly from Store to Central
- Duplicate prevention: No duplicate sale in Central for the same Transaction number

## Negative / Edge Case Coverage

- **Tax exemption not applied when it should be:** If tax appears on transaction for tax-exempt customer, verify:
  - Customer profile has "Exempt from taxes" checkbox **selected** (Customer | Options tab)
  - Correct customer was selected in POS (verify customer name in Customer pane)
  - Customer profile synced to Store database (if customer created/updated in Central, sync may be pending)
- **Tax-exempt customer record missing/invalid:** If customer is not found or profile is incomplete:
  - Create new customer profile with "Exempt from taxes" selected
  - Or manually remove tax from transaction (requires "Allowed to change tax status" permission) and select tax-exempt reason code
- **Tax ID Number missing:** If customer is tax-exempt but Tax ID Number is not recorded:
  - Update customer profile (Customer | Options tab | Tax ID Number field)
  - Some jurisdictions require Tax ID Number for audit purposes; verify compliance requirements
- **Tax-exempt status changed mid-transaction:** If customer profile is updated to add/remove tax exemption while transaction is in progress:
  - POS uses customer status at time transaction was started
  - To apply updated status, clear customer and re-select customer
- **Mixed taxable and tax-exempt items:** Some jurisdictions have items that are **always taxable** even for tax-exempt customers (e.g., prepared food, alcohol):
  - Verify jurisdiction-specific rules
  - RMH applies tax exemption to all items; store may need custom logic for always-taxable items
- **Tax-exempt customer with shipping:** If tax-exempt customer has items shipped:
  - Tax exemption applies regardless of destination
  - Verify shipping address does not override tax-exempt status
- **Employee discount + tax exemption:** If customer is both employee (discount) and tax-exempt:
  - POS applies both: employee discount on price, tax exemption on tax
  - Verify both are applied correctly
- **POS offline then sync later:** Sale for tax-exempt customer created locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify sale appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Sale sync is idempotent; repeated sync does not create duplicates in Central
- **Tax compliance and audit:** Tax-exempt sales must be properly documented with customer name and Tax ID Number for compliance:
  - Verify customer profile has Tax ID Number recorded
  - Verify tax-exempt sales are reported separately in tax compliance reports
  - Maintain records of tax exemption certificates (outside RMH system)
- **Consistency Checker:** If sale transaction fails to sync, run Consistency Checker to synchronize missing sale records to Central

## Known Issues / Notes

- Video link: https://somup.com/cOnZoRWpls
- Reference: RMH documentation - [Adding customer profiles](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/customers-adding.md)
- Reference: RMH documentation - [Setting up customer accounts](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_UG_Topics/setting-up-customer-accounts.md)
- Reference: RMH documentation - [Setting up sales tax rules](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-sales-tax-rules.md)
- **Tax-exempt customer configuration:**
  - Store Manager or Central Manager: Customer | Customers | Options tab
  - Select "Exempt from taxes" checkbox (or "Customer is exempt from taxes")
  - (Optional) Enter Tax ID Number for compliance/audit
- **Tax exemption applies automatically:** When tax-exempt customer is selected in POS, tax exemption is applied automatically to all items (no manual tax removal needed)
- **Common tax-exempt customer types:**
  - Government agencies (federal, state, local)
  - Non-profit organizations (with 501(c)(3) status or equivalent)
  - Resellers (with valid resale certificate)
  - Educational institutions
  - Religious organizations
  - Diplomatic personnel
- **Tax ID Number:** Customer profile can record Tax ID Number (e.g., EIN, resale certificate number) for audit purposes
- **Tax exemption certificate:** Store should maintain physical/digital copies of tax exemption certificates outside RMH system (compliance requirement in many jurisdictions)
- **Receipt shows tax-exempt:** Receipt template can display "Tax Exempt" indicator and customer Tax ID Number
- **Tax compliance reporting:** Tax-exempt sales must be reported separately from taxable sales for tax remittance purposes
- **Audit trail:** Each tax-exempt sale records customer name and Tax ID Number for compliance verification
- **Employee discount compatibility:** Tax-exempt customers can also receive employee discounts or other discounts; both are applied independently
- **Always-taxable items:** Some jurisdictions have items that are taxable even for tax-exempt customers (e.g., prepared food, restaurant meals, alcohol, tobacco); RMH applies blanket tax exemption; store may need custom logic for jurisdiction-specific rules
- **Tax-exempt indicator:** POS and receipt can show "Tax Exempt" or similar indicator to clarify zero tax amount
- **Compliance best practices:**
  - Record customer Tax ID Number in customer profile
  - Maintain tax exemption certificates on file
  - Review tax-exempt sales regularly for compliance
  - Train cashiers to verify tax-exempt status and request exemption certificates as needed
  - Separate tax-exempt sales in tax compliance reports
