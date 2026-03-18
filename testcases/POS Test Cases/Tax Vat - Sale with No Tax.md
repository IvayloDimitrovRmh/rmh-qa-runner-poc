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