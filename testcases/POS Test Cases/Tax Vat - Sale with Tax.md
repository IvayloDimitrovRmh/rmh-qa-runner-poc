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