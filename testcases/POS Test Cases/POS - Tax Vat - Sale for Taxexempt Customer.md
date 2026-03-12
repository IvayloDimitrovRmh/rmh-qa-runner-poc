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