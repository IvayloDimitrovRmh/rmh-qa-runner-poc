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

# Scenario: Convert Quote to Work Order

## Business Entity

Quote transaction (converted to work order)

## Business Purpose

Convert previously created quotes to work orders when customers decide to purchase but items require assembly, pulling from inventory, or scheduled delivery, allowing stores to manage fulfillment while collecting a deposit from the customer.

## Trigger

Customer returns to store to purchase items from a previously created quote, but items require additional time to assemble or pull from inventory; user recalls the quote in POS and converts it to a work order.

## Preconditions

- POS is operational and cashier is logged in
- Quote exists in Store database (previously created)
- Quote is in "open" status (not yet processed or expired)
- Quote has:
  - Customer information associated (recommended for work order)
  - Items with pricing
  - Expiration date
- Items require assembly, inventory pulling, or other preparation before customer pickup
- Work order configuration exists in Store Manager:
  - Due days configured (File | Configuration | Ordering rules | Work Order | Due Days)
  - Deposit percentage configured (File | Configuration | Ordering rules | Work Order | Deposit)
- User has permission to recall quotes and create work orders (no specific permission documented; controlled by general POS order permissions)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Convert quote to work order in POS:**

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

**Step 2: Convert quote to work order**
5. Tap **Transaction | Tender Sale** or press **F12**
6. **Select Order Action screen displays** with options:
   - **Pick up Entire:** Convert quote to sale (different scenario)
   - **Convert to Work Order:** Convert quote to work order
7. Tap **Convert to Work Order**
8. **POS converts quote to work order:**
   - Quote items transfer to work order
   - Quoted prices preserved in work order
   - Work order deposit calculated based on configuration (File | Configuration | Ordering rules | Work Order | Deposit percentage)
   - Work order due date calculated based on configuration (File | Configuration | Ordering rules | Work Order | Due Days)
9. **POS displays work order with deposit:**
   - **"Addl. deposit" field** shows required deposit amount (percentage of work order total)
   - Example: If deposit is 20% and work order total is $500, required deposit is $100
   - Customer can pay more than minimum deposit
10. (Optional) Override deposit or due date:
    - Tap **Orders | Order Details | Order Deposit Override** to change deposit
    - Tap **Orders | Order Details | Order Due** to change due date
11. (Optional) Add comment to work order:
    - Tap **Orders | Order Details | Order Comment**
    - Enter reference number and/or comment
    - Tap **OK**
12. **POS proceeds to tender screen:**
    - Deposit amount displays
    - Customer pays deposit (not full amount)
13. Enter deposit amount next to appropriate tender type:
    - Enter at least minimum deposit amount
    - Customer can pay more than minimum or full amount
14. Tap **OK** to complete deposit payment
15. Tap **Yes** to print work order receipt showing:
    - Work order number
    - Items (from original quote)
    - Prices (quoted prices)
    - Total work order amount (including tax)
    - Deposit amount paid
    - **Balance owing** (total - deposit)
    - **Due date** (pickup date)
    - Original quote reference
16. **Quote converts to work order:**
    - Quote status changes to "completed/converted to work order"
    - Work order created with items and pricing from quote
    - Work order is in "open" status (pending pickup)
17. Work order transaction is recorded in Store database and queued for sync to Central
18. **Inventory NOT adjusted** (items remain on-hand until work order is picked up)
19. Customer receives work order receipt with pickup date and balance owing

## Expected Synchronization Behavior

- Insert: Insert the work order transaction (converted from quote) in Store database and sync/insert to Central database
- Update: Quote status is updated in Store (converted to work order) and synced to Central; Work order status will be updated when picked up
- Delete: Not applicable (quotes and work orders are not deleted; status updated)
- Matching key: Quote number + Work order number; Store ID + Quote number; Store ID + Work order number

## Expected Result in Source System

- Quote is recalled successfully in POS
- **Work order transaction is created/visible** in POS (Store database)
- **Quote status updated:**
  - Status changed to "completed/converted to work order"
  - Quote no longer appears in open quotes list
  - Link to work order created
- Work order details captured:
  - Items from quote (quantities, quoted prices)
  - Total amount (from quote)
  - Deposit amount paid
  - Balance owing
  - Due date (pickup date)
  - Link to original quote number
- Work order appears in Journal (Transaction | Receipt | Journal)
- Work order is visible in Store Manager (Journal | Transactions or Orders)
- Work order receipt prints showing work order details and original quote reference
- **Inventory NOT adjusted** (items remain on-hand; will be adjusted when work order is picked up)
- Deposit payment recorded in batch totals

## Expected Result in Target System

- Quote status update syncs to Central database (converted to work order)
- Work order transaction syncs to Central
- Quote in Central reflects:
  - Updated status (completed/converted to work order)
  - Link to work order
  - Conversion date
- Work order available in Central Manager for reporting
- Work order tracked in Central (open status, pending pickup)

## Validation Points

- Verify quote recalls successfully in POS
- Verify customer filtering works (if customer selected, only their quotes display)
- Verify quote details correct when recalled (items, prices, total)
- Verify order action selection displays (Pick up Entire vs. Convert to Work Order)
- Verify **Convert to Work Order** creates work order
- Verify **quoted prices preserved** in work order
- Verify **work order deposit calculated** correctly (percentage of total)
- Verify **work order due date calculated** correctly (configured days from current date)
- Verify deposit payment processed
- Verify work order transaction created in POS
- Verify quote status updated in Store Manager (completed/converted to work order)
- Verify work order status is "open" (pending pickup)
- Verify quote and work order status updates sync to Central
- Verify **inventory NOT adjusted** at conversion (items still on-hand)
- Verify receipt shows work order details, deposit, balance, due date, and quote reference
- Verify deposit recorded in batch totals
- Mapping validation: Quote conversion, work order details map correctly from Store to Central
- Duplicate prevention: No duplicate work orders in Central

## Negative / Edge Case Coverage

- **Quote not found:** If quote does not exist or is already processed, POS prevents recall; verify validation
- **Customer not selected on quote:** If quote has no customer associated, converting to work order may require customer selection; verify customer handling
- **Quote expired:** If quote is past expiration date, store policy determines if conversion is allowed; verify expiration handling
- **Items out of stock:** If items on quote are now out of stock, may need to create back order instead; verify inventory validation
- **Discounts on quote:** If quote included discounts, discounts should be preserved in work order; verify discounts are applied
- **Deposit override:** Cashier can override deposit amount; verify override is captured
- **Due date override:** Cashier can override due date; verify override is captured
- **Payment declined:** If deposit payment is declined, quote should not convert to work order; verify rollback
- **Quote recall then cancel:** If cashier recalls quote but cancels before completing tender, quote remains in open status; verify no work order created
- **Convert to work order vs. pick up entire:** Customer chooses "Convert to Work Order" if items need assembly/pulling; "Pick up Entire" is for immediate purchase; verify correct action selected
- **Work order pickup:** After work order is created, customer returns when items are ready; cashier recalls work order (Orders | Recalls | Recall a Work Order) to complete pickup
- **Quote history view:** Order Details | Order History may show quote creation and conversion transactions; verify history accessible
- **POS offline then sync later:** Quote conversion to work order created locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify work order and quote status update appear in Central after retry
- **Duplicate prevention across repeated sync attempts:** Work order sync is idempotent; repeated sync does not create duplicates in Central
- **Consistency Checker:** If quote conversion or work order fails to sync, run Consistency Checker to synchronize missing records to Central

## Known Issues / Notes

- Video link: https://somup.com/cOeh2wWPOd
- Reference: RMH documentation - [Processing quotes](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/quotes-processing.md)
- Reference: RMH documentation - [Creating quotes](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/quotes-creating.md)
- Reference: RMH documentation - [Creating work orders](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/work-orders-creating.md)
- Reference: RMH documentation - [Processing work orders](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/work-orders-processing.md)
- **Recall access:** Orders | Recalls | Recall a Quote
- **POS command available:** `Quote_RecallCommand` - Invokes Recall Quote dialog (no parameters)
- **Customer selection recommended:** Quote should have customer associated for work order tracking
- **Convert to Work Order = Quote becomes Work Order:** "Convert to Work Order" creates work order with items and pricing from quote
- **Quoted prices preserved:** Work order uses prices from original quote (including discounts), not current prices
- **Deposit required:** Unlike "Pick up Entire" (full payment), "Convert to Work Order" requires deposit
- **Balance owing:** Customer pays balance when returning to pick up work order
- **Inventory adjustment timing:** Inventory is NOT adjusted when converting quote to work order; adjusted when work order is picked up
- **Quote lifecycle (conversion path):**
  1. **Create:** Quote created with items and pricing; no payment; no inventory impact
  2. **Review:** Customer reviews quote and decides to purchase
  3. **Recall:** Customer returns; items require assembly/pulling
  4. **Convert to Work Order:** Quote converts to work order (this scenario); customer pays deposit
  5. **Assembly/Pulling:** Store prepares items for pickup
  6. **Pickup:** Customer returns; cashier recalls work order; customer pays balance; inventory adjusted
  7. **Complete:** Work order closes
- **Why convert to work order?**
  - Items require assembly (e.g., furniture, equipment)
  - Items need to be pulled from warehouse/back office
  - Large items require loading area coordination
  - Customer wants items delivered (work order for delivery)
- **Quote processing options:**
  1. **Pick up Entire:** Convert to sale; customer pays and takes items immediately
  2. **Convert to Work Order:** Convert to work order; customer pays deposit; returns later for pickup
- **Work order configuration applies:** When converting to work order, standard work order settings apply (deposit percentage, due days)
- **Common workflow:** Customer gets quote → reviews pricing → decides to purchase → items need assembly → returns to store → cashier recalls quote → selects Convert to Work Order → customer pays deposit → store assembles items → customer returns → work order pickup → customer pays balance → takes items
- **Use case:** Customer wants large furniture at quoted price, but furniture requires assembly; quote converts to work order for assembly and scheduled pickup
