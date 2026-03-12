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

## Business Entity

Quote transaction

## Business Purpose

Create quotes providing customers with price estimates for items or services, allowing customers to review pricing before committing to purchase, with no payment collected and no inventory impact at quote creation.

## Trigger

User creates a quote in POS for customer who wants a price estimate before making a purchase decision.

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

## Expected Synchronization Behavior

- Insert: Insert the quote transaction in Store database and sync/insert the corresponding quote record in Central database
- Update: When quote is processed (picked up or converted), quote status is updated in Store and synced to Central
- Delete: Quotes are not deleted; if expired or cancelled, status is updated
- Matching key: Quote number (unique identifier from Store to Central); Store ID + Quote number

## Expected Result in Source System

- Quote transaction is created/visible in POS (Store database)
- Quote is in "open" status (pending customer decision)
- Quote details captured:
  - Customer information (if selected)
  - Line items with prices
  - Total amount (including tax)
  - Discounts/price changes (if applied)
  - **No payment** (Total Due = $0.00)
  - Expiration date
  - Comment (if added)
- Quote appears in Journal (Transaction | Receipt | Journal)
- Quote is visible in Store Manager (Journal | Transactions or Orders)
- Receipt prints showing quote details and expiration date
- **No batch impact:** No payment recorded; batch totals unchanged
- **No inventory adjustment:** Items remain available (On-Hand and Available unchanged)

## Expected Result in Target System

- Quote record is created/visible in Central database after sync
- Quote syncs automatically via Central Client
- Quote is available for Central Manager reporting
- Quote details preserved in Central (customer, items, pricing, discounts, expiration date)
- Quote status tracked in Central (open/pending)

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

## Negative / Edge Case Coverage

- **Customer selection required but not selected:** If store configuration requires customer selection (File | Configuration | Store Rules | Customer Options | Require customer selection for quotes) and cashier does not select customer, POS may prevent quote creation; verify enforcement
- **Quote with no items:** POS should prevent creating quote with no items; verify validation
- **Discounts/price changes:** Cashier can apply discounts or modify pricing on quote (with appropriate permissions); verify discounts are captured
- **Expiration date override:** Cashier can override expiration date; verify override is captured
- **Quote expiration:** Quote has expiration date; after expiration, quoted prices may no longer be valid; verify expiration tracking
- **Quote never processed:** If customer never returns, quote remains in open status; store may periodically purge expired quotes
- **Quote mode exit:** Cashier can exit quote mode by cancelling transaction or selecting different order type; verify mode switching
- **Multiple quotes for same customer:** Customer can have multiple quotes; verify all are tracked separately
- **Payment attempted on quote:** Tender screen shows $0.00; no payment should be collected; if cashier attempts to enter payment, POS should prevent or ignore; verify no payment processing
- **Inventory availability:** Items on quote are not reserved; another customer can purchase items before quote customer returns; verify no inventory commitment
- **Price changes after quote:** If item prices change after quote is created, quoted price may no longer match current price; store policy determines handling
- **POS offline then sync later:** Quote created locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify quote appears in Central after retry
- **Duplicate prevention across repeated sync attempts:** Quote sync is idempotent; repeated sync does not create duplicates in Central
- **Consistency Checker:** If quote fails to sync, run Consistency Checker to synchronize missing quote records to Central

## Known Issues / Notes

- Video link: https://somup.com/cOeh2WWP0w
- Reference: RMH documentation - [Creating quotes](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/quotes-creating.md)
- Reference: RMH documentation - [Processing quotes](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/quotes-processing.md)
- Reference: RMH documentation - [Setting up ordering rules](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-ordering-rules.md)
- **Quote purpose:** Provide price estimate to customer; no payment collected; no commitment to purchase
- **Quote icon:** When in quote mode, quote icon displays in top right corner of POS screen
- **Customer selection:** May be optional or required depending on configuration (File | Configuration | Store Rules | Customer Options | Require customer selection for quotes)
- **Quote configuration:**
  - **Expiration:** Maximum days quote pricing is valid (File | Configuration | Ordering rules | Quote | Expiration)
  - Example: 30 days expiration means customer has 30 days to purchase at quoted price
- **No payment:** Critical difference from other order types:
  - **Total Due = $0.00** on tender screen
  - No payment collected
  - No batch impact
  - Quote is estimate only
- **No inventory impact:**
  - Items not reserved or committed
  - Items remain available for sale to other customers
  - No inventory adjustment at quote creation
- **Discounts/price changes allowed:** Cashier can apply discounts or modify pricing on quote to show customer potential savings or negotiated pricing
- **Expiration date:** Represents days quote pricing is valid; after expiration, store may honor quoted price or charge current price (store policy)
- **Quote receipt:** Receipt shows:
  - Quote number
  - Items, quantities, prices
  - Total (including tax)
  - Discounts/price changes (if applied)
  - **Expiration date**
  - "This is a quote" or similar indicator
- **Quote lifecycle:**
  1. **Create:** Quote created with items and pricing (this scenario)
  2. **Review:** Customer reviews quote and decides whether to purchase
  3. **Process:** If customer returns to purchase:
     - **Option A:** Recall quote and pick up (convert to sale)
     - **Option B:** Convert quote to work order (if items need assembly/pulling)
  4. **Complete:** Quote converts to sale or work order; inventory adjusted at that time
  5. **(Or) Expiration:** Quote expires; customer does not purchase
- **POS command:** `Quote_RecallCommand` available for recalling quotes (no parameters)
- **Quote vs. other order types:**
  - **Quote:** Price estimate; no payment; no inventory impact; no commitment
  - **Work Order:** Items require assembly; deposit required; inventory adjusted at pickup
  - **Layaway:** Items reserved; payments over time; inventory committed
  - **Back Order:** Items out of stock; deposit required; inventory adjusted at pickup
- **Common use cases:**
  - Customer wants price before committing to large purchase
  - Customer comparing prices between stores
  - Custom order or special project requiring pricing estimate
  - Contractor/business needs quote for approval before purchasing
- **Quote processing options:**
  - **Pick up Entire:** Convert quote to sale; customer pays and takes items
  - **Convert to Work Order:** If items need assembly/pulling; creates work order from quote
- **Store best practice:** Follow up with customers on quotes; contact before expiration to close sale
