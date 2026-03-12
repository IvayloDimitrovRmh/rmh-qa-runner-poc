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

# Scenario: Pick up Quote

## Business Entity

Quote transaction (converted to sale)

## Business Purpose

Convert previously created quotes to actual sales when customers decide to purchase, allowing customers to buy items at the quoted price within the quote expiration period and completing the transaction with payment and inventory adjustment.

## Trigger

Customer returns to store to purchase items from a previously created quote; user recalls the quote in POS and processes it as a sale (Pick up Entire).

## Preconditions

- POS is operational and cashier is logged in
- Quote exists in Store database (previously created)
- Quote is in "open" status (not yet processed or expired)
- Quote may have:
  - Customer information associated
  - Items with pricing
  - Expiration date
- Items are available in inventory (in stock)
- User has permission to recall and process quotes (no specific quote permission documented; controlled by general POS order permissions)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Pick up quote (convert quote to sale) in POS:**

**Step 1: Recall the quote**
1. (Optional but recommended) Look up customer first to filter quotes:
   - Tap **Customers | Lookup Customer** or press **F7**
   - Search for customer by name, phone, or customer ID
   - Select customer
   - Customer information displays in Customer pane
   - **Benefit:** When customer is selected, POS displays only quotes belonging to that customer
2. **Recall the quote:**
   - Tap **Orders | Recalls | Recall a Quote**
   - **Recall Quote screen displays** showing:
     - **If customer selected:** Only quotes for selected customer
     - **If no customer selected:** All open quotes (must search manually)
     - Quote list shows:
       - Quote number
       - Customer name (if associated)
       - Quote date
       - Total amount
       - Expiration date
3. **Select the customer's quote:**
   - Tap quote once and tap **Add**; OR
   - Tap quote twice (double-tap)
4. **Quote recalls to transaction screen** showing:
   - All items from quote
   - Quote number
   - Total amount (including tax)
   - Quoted prices (with any discounts/price changes from quote)
   - Expiration date

**Step 2: Pick up quote (convert to sale)**
5. Tap **Transaction | Tender Sale** or press **F12**
6. **Select Order Action screen displays** with options:
   - **Pick up Entire:** Convert quote to sale; customer buys all items
   - **Convert to Work Order:** Convert quote to work order (different scenario)
7. Tap **Pick up Entire**
8. **POS proceeds to tender screen:**
   - **Total amount displays** (quote total including tax)
   - Customer must pay full amount
   - Unlike quote creation (where Total Due was $0), customer now pays quoted price
9. Enter payment amount next to appropriate tender type:
   - Enter full quote amount
   - Customer pays with Cash, Credit Card, or other tender types
10. Tap **OK** to complete payment
11. Tap **Yes** to print receipt showing:
    - Items purchased
    - Prices (from quote)
    - Payment received
    - Quote number converted to sale
    - Date
12. **Quote converts to sale:**
    - Quote status changes to "completed/converted"
    - Sale transaction created
    - **Inventory adjusted:** Items subtracted from On-Hand quantity
13. Sale transaction is recorded in Store database and queued for sync to Central
14. Customer takes items

**Alternative: Use POS command**
- Can use `Quote_RecallCommand` to invoke Recall Quote dialog (no parameters)

## Expected Synchronization Behavior

- Insert: Insert the sale transaction (converted from quote) in Store database and sync/insert to Central database
- Update: Quote status is updated in Store (converted to sale) and synced to Central
- Delete: Not applicable (quotes are not deleted; status updated to completed)
- Matching key: Quote number + Sale transaction number; Store ID + Quote number

## Expected Result in Source System

- Quote is recalled successfully in POS
- **Sale transaction is created/visible** in POS (Store database)
- **Quote status updated:**
  - Status changed to "completed/converted to sale"
  - Quote no longer appears in open quotes list
- Sale transaction details captured:
  - Items from quote (quantities, prices)
  - Payment amount (full quote total)
  - Link to original quote number
- Sale transaction appears in Journal (Transaction | Receipt | Journal)
- Sale is visible in Store Manager (Journal | Transactions)
- Receipt prints showing sale details and original quote reference
- **Inventory adjusted:**
  - Items subtracted from On-Hand quantity
  - Regular sale inventory adjustment applied
- Payment recorded in batch totals

## Expected Result in Target System

- Quote status update syncs to Central database (converted to sale)
- Sale transaction syncs to Central
- Quote in Central reflects:
  - Updated status (completed/converted)
  - Link to sale transaction
  - Conversion date
- Sale transaction available in Central Manager for reporting
- Inventory adjustment syncs to Central

## Validation Points

- Verify quote recalls successfully in POS
- Verify customer filtering works (if customer selected, only their quotes display)
- Verify quote details correct when recalled (items, prices, total)
- Verify order action selection displays (Pick up Entire vs. Convert to Work Order)
- Verify **Pick up Entire** converts quote to sale
- Verify **Total amount matches quoted price** (including tax)
- Verify payment is required and processed
- Verify sale transaction created in POS
- Verify quote status updated in Store Manager (completed/converted)
- Verify quote status update syncs to Central
- Verify **inventory adjusted** (On-Hand decreased by sold quantities)
- Verify receipt shows sale details and quote reference
- Verify payment recorded in batch totals
- Mapping validation: Quote conversion, sale details, inventory updates map correctly from Store to Central
- Duplicate prevention: No duplicate sale transactions in Central

## Negative / Edge Case Coverage

- **Quote not found:** If quote does not exist or is already processed, POS prevents recall; verify validation
- **Customer filtering:** If customer selected but has no open quotes, recall screen shows "no quotes found"; verify message
- **All open quotes display:** If no customer selected, all open quotes display; cashier must search manually; verify full list accessibility
- **Multiple quotes for same customer:** Customer can have multiple open quotes; verify correct one can be selected
- **Quote expired:** If quote is past expiration date, store policy determines if quoted price is still honored; verify expiration handling
- **Prices changed after quote:** If item prices increased after quote was created, customer should still pay quoted price (within expiration); verify quoted price is honored
- **Items out of stock:** If items on quote are now out of stock, cashier cannot complete pick up entire; may need to create back order or partial quote; verify inventory validation
- **Discounts on quote:** If quote included discounts, discounts should be honored when converting to sale; verify discounts are applied
- **Payment declined:** If payment is declined, quote should not convert to sale; verify rollback
- **Quote recall then cancel:** If cashier recalls quote but cancels before completing tender, quote remains in open status; verify no sale created
- **Partial quote processing:** RMH documentation only shows "Pick up Entire" for quotes (no "Pick up Partial" option); if customer wants only some items, may need to create new transaction or modify quote
- **Convert to sale vs. convert to work order:** Customer chooses "Pick up Entire" to buy immediately; "Convert to Work Order" is different workflow; verify correct action selected
- **Quote history view:** Order Details | Order History may show quote creation transaction; verify quote history accessible
- **POS offline then sync later:** Quote conversion to sale created locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify sale and quote status update appear in Central after retry
- **Duplicate prevention across repeated sync attempts:** Sale sync is idempotent; repeated sync does not create duplicates in Central
- **Consistency Checker:** If quote conversion or sale fails to sync, run Consistency Checker to synchronize missing records to Central

## Known Issues / Notes

- Video link: https://somup.com/cOeh22WPZM
- Reference: RMH documentation - [Processing quotes](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/quotes-processing.md)
- Reference: RMH documentation - [Creating quotes](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/quotes-creating.md)
- **Recall access:** Orders | Recalls | Recall a Quote
- **POS command available:** `Quote_RecallCommand` - Invokes Recall Quote dialog (no parameters)
- **Customer selection recommended:** Selecting customer before recalling quote filters list to only that customer's quotes
- **Pick up Entire = Convert to Sale:** "Pick up Entire" converts quote to actual sale; customer pays and takes items immediately
- **Payment required:** Unlike quote creation (Total Due $0), customer must pay full quoted amount when picking up quote
- **Quoted price honored:** Customer pays prices from original quote (including any discounts/price changes), not current prices
- **Expiration date:** Quote should be processed before expiration; after expiration, store policy determines if quoted price is honored
- **Inventory adjustment timing:** Inventory is adjusted when quote is picked up (converted to sale), not when quote was created
- **Quote lifecycle:**
  1. **Create:** Quote created with items and pricing; no payment; no inventory impact
  2. **Review:** Customer reviews quote and decides to purchase
  3. **Recall:** Customer returns; cashier recalls quote (this scenario)
  4. **Pick up Entire:** Quote converts to sale; customer pays; inventory adjusted
  5. **Complete:** Quote closes; sale transaction created
- **Quote vs. sale:**
  - **Quote creation:** Total Due $0; no payment; no inventory adjustment
  - **Quote pickup (this scenario):** Total Due = quote amount; payment required; inventory adjusted
- **Pick up options for quotes:**
  1. **Pick up Entire:** Convert to sale (this scenario)
  2. **Convert to Work Order:** Convert to work order (next scenario)
  - **No "Pick up Partial" option** for quotes (unlike work orders/layaways)
- **Store policy - expired quotes:** Store determines if expired quotes are honored at quoted price or if current pricing applies
- **Common workflow:** Customer gets quote → reviews pricing → decides to purchase → returns to store → cashier recalls quote → selects Pick up Entire → customer pays → sale completes
- **Use case:** Customer wanted price estimate before committing; quote showed pricing; customer now ready to buy
