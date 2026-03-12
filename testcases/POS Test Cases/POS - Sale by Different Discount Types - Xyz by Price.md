# Sale by different discount types

## Metadata

Feature: Sale by different discount types  
Business Area: Sale by different discount types  
Source System: POS  
Target System: Central  
Sync Direction: Store -> Central  
Release: TBD  
Priority: 11

---

# Scenario: XYZ by Price (Buy X and get Y for Z: Unit Price)

## Preconditions

- POS is operational and cashier is logged in
- Items are available to sell and have been added to transaction
- **"Buy X and get Y for Z: Unit Price" discount scheme** is configured in Store Manager:
  - Discount created: Setup | Merchandising | Discounts
  - Discount Type selected: **"Buy X and get Y for Z: Unit Price"**
  - Pricing Schedule configured:
    - **Quantity to Buy at full price:** Number of items customer must buy at regular price (e.g., 1)
    - **Quantity to Get at discount:** Number of items customer receives at discounted price (e.g., 1)
    - **Discount Price:** Unit price for discounted items (e.g., $1.00)
- Items have discount scheme assigned:
  - Item | Discounts tab | "Use a Buy X and get Y for Z discount scheme" selected
  - Discount scheme selected from dropdown
- Customer purchases qualifying quantity of items (e.g., buys 2 or more items to trigger Buy 1 Get 1 discount)
- User has permission to process discounts: "Allowed to access Pricing" permission enabled (Setup | People & Security | Users | General tab | POS User Roles)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Complete a sale in POS applying "Buy X and get Y for Z: Unit Price" discount:**
1. Add qualifying items to transaction (scan or enter Item Lookup Codes)
   - Items must have "Buy X and get Y for Z: Unit Price" discount scheme assigned
2. Add sufficient quantity to trigger discount:
   - Example: For "Buy 1 Get 1 at $1.00" discount, add 2 or more of the same item
3. **POS automatically applies discount** when qualifying quantity is reached:
   - First item(s) charged at **full price** (Quantity to Buy at full price)
   - Additional item(s) charged at **Discount Price** (Quantity to Get at discount)
   - Example: Buy 2 items at $5.00 each with "Buy 1 Get 1 at $1.00" discount:
     - Item 1: $5.00 (full price)
     - Item 2: $1.00 (discount price)
     - Total: $6.00 (saved $4.00)
4. Discount details display on transaction screen:
   - Items show individual prices (full price vs. discount price)
   - Discount line may appear showing savings
5. (Optional) Verify discount was applied correctly
6. Tap **Transaction | Tender Sale** or press **F12**
7. On the Tender screen, verify:
   - Subtotal reflects discounted pricing
   - Discount savings may be displayed
8. Enter payment amount and complete tender
9. Receipt prints showing:
   - Items with individual prices
   - Discount details (savings amount)
   - Total amount
10. Transaction is recorded in Store database and queued for sync to Central

## Validation Points

- Verify sale transaction exists in POS with discount applied
- Verify discount was **automatically applied** when qualifying quantity was added
- Verify correct pricing:
  - First item(s) at full price (Quantity to Buy at full price)
  - Additional item(s) at discount price (Quantity to Get at discount)
- Verify discount savings calculated correctly
- Verify sale transaction exists in Store Manager (Journal | Transactions)
- Verify sale transaction exists in Central after sync
- Verify **discount amount and type match** between POS, Store Manager, and Central
- Verify discount scheme information preserved in Central (discount type, savings amount)
- Mapping validation: Discount fields (discount scheme ID, discount type, full price items, discount price items, savings amount) map correctly from Store to Central
- Duplicate prevention: No duplicate sale in Central for the same Transaction number