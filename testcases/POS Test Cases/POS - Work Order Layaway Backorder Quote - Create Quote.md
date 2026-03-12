# Work Order/Layaway/BackOrder/Quote

## Metadata

Feature: Work Order/Layaway/BackOrder/Quote  
Business Area: Work Order/Layaway/BackOrder/Quote  
Source System: POS  
Target System: Central  
Sync Direction: Store -> Central  
Release: TBD  
Priority: 5

---

# Scenario: Create Quote

## Preconditions

- POS is operational and cashier is logged in
- Quote configuration exists in Store Manager:
  - Expiration period configured (File | Configuration | Ordering rules | Quote | Expiration days)
  - (Optional) Customer selection requirement configured (File | Configuration | Store Rules | Customer Options | Require customer selection for quotes)
- Items are available to add to quote
- Customer may be required (depending on store configuration)
- User has permission to create quotes (no specific quote permission documented; controlled by general POS permissions)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Create a quote in POS:**
1. Tap **Orders | Quote**
2. **POS enters quote mode:**
   - Quote icon displays in top right corner of POS screen
   - Transaction screen indicates quote mode
3. (Optional) Look up and select customer:
   - Tap **Customers | Lookup Customer** or press **F7**
   - Search for customer by name, phone, or customer ID
   - Select customer:
     - Tap customer once and tap **Select**; OR
     - Tap customer twice (double-tap)
   - Customer information displays in Customer pane at top of POS screen
   - **Note:** Depending on store configuration (File | Configuration | Store Rules | Customer Options | Require customer selection for quotes), customer selection may be **required**
4. Add items to quote (scan or enter Item Lookup Codes)
   - Items display on transaction screen
   - Quote total calculates (including tax)
5. (Optional) **Enter approved discounts or price changes:**
   - Apply discounts to items or transaction
   - Modify pricing as approved by management
   - Discounts/price changes will appear on quote receipt
   - **Purpose:** Show customer potential savings or negotiated pricing
6. (Optional) Add comment to quote:
   - Tap **Orders | Order Details | Order Comment**
   - Enter reference number (optional) and comment
   - Tap **OK**
7. (Optional) Override expiration date:
   - Tap **Orders | Order Details | Order Due**
   - Change expiration date (default is configured days from current date)
   - **Expiration = days quote price is valid**
8. Tap **Transaction | Tender Sale** or press **F12**
9. **On the Tender screen, Total Due shows $0.00:**
   - **No payment is collected** when creating a quote
   - Quote is price estimate only; not a sale
10. Tap **OK** (no payment required)
11. Tap **Yes** to print quote receipt showing:
    - Quote number
    - Items with quantities and prices
    - **Total quote amount** (including tax)
    - Discounts or price changes (if applied)
    - **Expiration date** (date quote pricing is valid until)
    - Customer information (if selected)
    - Comment (if added)
12. Quote is saved in Store database and queued for sync to Central
13. **No inventory adjustment:** Items remain available for sale
14. **No payment recorded:** Quote does not affect batch totals
15. Customer receives quote receipt with pricing and expiration date

## Validation Points

- Verify quote is created in POS with correct details
- Verify quote icon displays in POS during quote creation
- Verify customer information captured (if customer selected)
- Verify items, quantities, and prices correct
- Verify discounts/price changes captured (if applied)
- Verify **Total Due = $0.00** on tender screen (no payment)
- Verify expiration date calculated correctly (configured days from current date)
- Verify quote exists in Store Manager (Journal | Transactions or Orders)
- Verify quote exists in Central after sync
- Verify quote details match between POS, Store Manager, and Central:
  - Items, quantities, prices
  - Total amount (including tax)
  - Discounts/price changes
  - Expiration date
  - Customer information
  - Comment (if added)
- Verify **no payment recorded** (batch totals unchanged)
- Verify **no inventory adjustment** (items still available)
- Mapping validation: Quote fields map correctly from Store to Central
- Duplicate prevention: No duplicate quote in Central for the same quote number