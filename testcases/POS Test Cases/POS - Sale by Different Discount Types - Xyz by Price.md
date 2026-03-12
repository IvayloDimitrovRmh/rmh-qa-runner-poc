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

## Business Entity

Sale transaction / Discount (Buy X and get Y for Z: Unit Price discount scheme)

## Business Purpose

Process sales with "Buy X and get Y for Z: Unit Price" discount schemes (e.g., Buy 1 get 1 at discounted unit price) and ensure the transaction with discount details is synchronized to Central for accurate reporting, reconciliation, and promotion tracking.

## Trigger

User completes a sale in POS where items qualify for a "Buy X and get Y for Z: Unit Price" discount scheme.

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

## Expected Synchronization Behavior

- Insert: Insert the sale transaction in Store database and sync/insert the corresponding transaction in Central database
- Update: Not applicable (sale creates new transaction; not updated)
- Delete: Not applicable (sales are not deleted; voids create reversing transactions)
- Matching key: Transaction number (unique identifier from Store to Central); Store ID + Transaction number

## Expected Result in Source System

- Sale transaction is created/visible in POS (Store database)
- **"Buy X and get Y for Z: Unit Price" discount is applied** and visible:
  - Items charged at full price (Quantity to Buy)
  - Items charged at discount price (Quantity to Get)
  - Discount savings calculated and displayed
- Transaction appears in Journal (Transaction | Receipt | Journal) with discount details
- Transaction is visible in Store Manager (Journal | Transactions) showing:
  - Line items with individual prices
  - Discount information
- Receipt shows:
  - Items with quantities
  - Full price items
  - Discount price items
  - Total savings
- Inventory is adjusted (all items subtracted from on-hand quantity, regardless of discount)
- Tender amounts are recorded (customer pays discounted total)

## Expected Result in Target System

- Sale transaction is created/visible in Central database after sync
- **Discount details are reflected in Central:**
  - Transaction includes line items with full price and discount price
  - Discount savings amount captured
  - Discount scheme information preserved
- Transaction syncs automatically via Central Client
- Transaction is available for Central Manager reporting
- Discount/promotion reports show:
  - Discount scheme usage
  - Total savings provided
  - Items sold with discount
- Inventory adjustments sync to Central

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

## Negative / Edge Case Coverage

- **Discount not applied when expected (configuration error):** If discount does not apply automatically when qualifying quantity is added, verify:
  - Discount scheme is active (not inactive) in Setup | Merchandising | Discounts
  - Items have discount scheme assigned (Item | Discounts tab)
  - Qualifying quantity is met (e.g., need 2 items for Buy 1 Get 1)
  - Discount pricing schedule is configured correctly
- **Invalid discount configuration:** If discount scheme has invalid configuration (e.g., Discount Price > full price), POS may not apply discount or may show error; verify discount configuration
- **Insufficient quantity:** If customer adds fewer items than required (e.g., only 1 item for Buy 1 Get 1), discount is not applied; customer pays full price for all items
- **Partial quantity:** If customer buys 3 items with "Buy 1 Get 1 at $1.00" discount:
  - Item 1: $5.00 (full price)
  - Item 2: $1.00 (discount price)
  - Item 3: $5.00 (full price) - cycle repeats
- **Multiple discount schemes on same item:** If item has multiple discount schemes assigned, POS may apply only one (typically the best discount for customer); verify discount priority/logic
- **Mix and Match vs. Buy X Get Y:** Do not confuse with "Mix and Match" discount type (different discount scheme); "Buy X and get Y for Z" applies to same item, while "Mix and Match" can apply across different items in a group
- **Unit Price vs. Percent Off:** The screenshot shows "Buy X and get Y for Z: **Unit Price**" (fixed price for discount items), not "Buy X and get Y for Z: Percent Off" (percentage discount); verify correct type is used
- **Discount odd items setting:** If "Discount odd items" is enabled in quantity discount pricing table (different feature), verify it does not conflict with Buy X Get Y discount
- **Return/void of discounted items:** If transaction with Buy X Get Y discount is returned or voided, discount is reversed; verify return processing handles discount correctly
- **POS offline then sync later:** Sale with Buy X Get Y discount created locally in Store database, then synced to Central when connectivity is restored; discount details preserved
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify sale with discount appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Sale sync is idempotent; repeated sync does not create duplicates in Central
- **Discount reporting:** Verify discount reports in Central Manager accurately show Buy X Get Y discount usage and savings
- **Consistency Checker:** If sale transaction with discount fails to sync, run Consistency Checker to synchronize missing sale records to Central

## Known Issues / Notes

- **Video link:** TBD
- **Notes:** Expected text states should insert into Store and Central
- Reference: RMH documentation - [Assigning discounts to items](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_UG_Topics/assigning-discounts-to-items.md)
- Reference: RMH documentation - [Setting up standard items](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-standard-items.md)
- **"XYZ by Price" = "Buy X and get Y for Z: Unit Price"** discount scheme
- **Discount scheme types:** RMH offers three main item-level discount schemes:
  1. **Mix and Match** (various types: Unit Price, Percent off, etc.)
  2. **Buy X and get Y for Z** (Unit Price or Percent Off)
  3. **Quantity discount pricing table** (tiered pricing based on quantity)
- **Buy X and get Y for Z: Unit Price configuration:**
  - **Description:** Friendly name for discount (e.g., "XYZ by price", "BOGO $1")
  - **Type:** Select "Buy X and get Y for Z: Unit Price"
  - **Quantity to Buy at full price:** Items customer pays full price for (e.g., 1)
  - **Quantity to Get at discount:** Items customer gets at discount price (e.g., 1)
  - **Discount Price:** Fixed unit price for discounted items (e.g., $1.00)
- **Automatic application:** POS automatically applies Buy X Get Y discount when qualifying quantity is added; no manual discount selection needed
- **Item-level discount:** Discount scheme is assigned to specific items (Item | Discounts tab); not applied at transaction level
- **Discount assignment methods:**
  1. Individual items: Open item and assign discount on Discounts tab
  2. Bulk assignment: Use Inventory Wizard (Merchandising | Wizards | Inventory Wizard | Task 5020: Set Item Discount)
- **Common use cases:**
  - **BOGO (Buy One Get One):** Buy 1 at full price, get 1 at $0.00 or low price
  - **Buy 1 Get 1 Half Off:** Buy 1 at full price, get 1 at 50% off (use Percent Off type)
  - **Buy 2 Get 1 at $1:** Buy 2 at full price, get 1 at $1.00
- **Pricing cycle:** Discount repeats for each qualifying quantity set (e.g., Buy 1 Get 1 applies to items 1-2, 3-4, 5-6, etc.)
- **No mix of items:** Buy X Get Y discount applies to same item only; customer must buy X quantity of **same item** to get Y of **same item** at discount
- **Alternative: Mix and Match:** For discounts across different items, use "Mix and Match" discount scheme instead
- **Discount vs. Sale Price:** Buy X Get Y discount is different from item sale price (Pricing tab | Sale Pricing); both can coexist but may conflict
- **Best discount wins:** If multiple discounts apply to same item, POS typically applies the best discount for customer (lowest price)
