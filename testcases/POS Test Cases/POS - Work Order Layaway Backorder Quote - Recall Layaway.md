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

# Scenario: Recall Layaway

## Business Entity

Layaway order transaction (recalled for pickup/processing)

## Business Purpose

Recall previously created layaway orders when customers have fully paid the balance and return to pick up their items, allowing cashiers to complete the layaway transaction and release items from committed inventory.

## Trigger

Customer returns to store to pick up layaway order after paying full balance; user recalls the layaway in POS to process pickup.

## Preconditions

- POS is operational and cashier is logged in
- Layaway order exists in Store database (previously created)
- Layaway is in "open" status or "paid in full" status
- Layaway balance is fully paid (balance owing = $0) or customer is picking up with final payment
- Customer information is associated with layaway
- Items are still committed in inventory (held in back office/storage)
- User has permission to recall and process layaways (no specific recall permission documented; controlled by general POS order permissions)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Preconditions

- POS is operational and cashier is logged in
- Layaway order exists in Store database (previously created)
- Layaway is in "open" status or "paid in full" status
- Layaway balance is fully paid (balance owing = $0) or customer is picking up with final payment
- Customer information is associated with layaway
- Items are still committed in inventory (held in back office/storage)
- User has permission to recall and process layaways (no specific recall permission documented; controlled by general POS order permissions)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Recall layaway for pickup in POS:**

**Step 1: Recall the layaway**
1. **Look up customer (recommended):**
   - Tap **Customers | Lookup Customer** or press **F7**
   - Search for customer by name, phone, or customer ID
   - Select customer
   - Customer information displays in Customer pane
   - **Benefit:** When customer is selected, POS displays only layaways belonging to that customer
2. **Recall the layaway:**
   - Tap **Orders | Recalls | Recall a Layaway**
   - **Recall Layaway screen displays** showing:
     - **If customer selected:** Only layaways for selected customer
     - **If no customer selected:** All open layaways (must search manually)
     - Layaway list shows:
       - Layaway order number
       - Customer name
       - Order date
       - Total amount
       - Balance owing
       - Expiration date
3. **Select the customer's layaway:**
   - Tap layaway once and tap **Add**; OR
   - Tap layaway twice (double-tap)
4. **Layaway recalls to transaction screen** showing:
   - All items in layaway
   - Layaway order number
   - Total amount
   - Payments made (deposit + incremental payments)
   - **Balance owing** (should be $0 if fully paid)
   - Expiration date
5. (Optional) View layaway history:
   - Tap **Orders | Order Details | Order History**
   - View all transactions for this layaway (deposit, payments, etc.)
   - Tap transaction to view receipt details

**Step 2: Process the layaway pickup**
6. Tap **Transaction | Tender Sale** or press **F12**
7. **Select Order Action screen displays** with options:
   - **Pick up Entire:** Customer picks up all items
   - **Pick up Partial:** Customer picks up some items; return later for rest (if applicable)

**Option A: Pick up Entire (most common)**
8. Tap **Pick up Entire**
9. **If balance already paid ($0 balance):**
   - POS proceeds to tender screen
   - Amount due shows $0.00
   - Tap **OK** (no payment required)
   - Or customer may owe additional fees (store policy dependent)
10. **If balance still owing:**
    - POS proceeds to tender screen
    - Amount due shows remaining balance
    - Customer pays final balance
    - Enter payment amount next to tender type
    - Tap **OK**
11. Tap **Yes** to print pickup receipt showing:
    - Items picked up
    - Final payment (if made)
    - Total paid (all payments including deposit)
    - Layaway order number
    - Date
12. **Layaway completes:**
    - Layaway status changes to "completed/closed"
    - **Inventory released from committed:**
      - Items subtracted from On-Hand quantity
      - Items no longer show as "Committed"
      - Available inventory updated
13. Customer takes items

**Option B: Pick up Partial (if applicable)**
14. Tap **Pick up Partial**
15. **Pick up Partial screen displays** showing all items with quantities
16. Select items customer is picking up:
    - Tap checkbox next to each item; OR
    - In **Pick Up** column, enter quantity customer is picking up
17. Tap **OK**
18. **If deposit/payments were made, POS calculates deposit application:**
    - Deposit/payments proportionally applied to items being picked up
    - Message displays: "Amount of deposit being applied: $X.XX"
    - Tap **OK** to confirm
19. POS proceeds to tender screen
20. Amount due = (Items picked up total) - (Applied deposit portion)
21. Customer pays amount due
22. Enter payment amount next to tender type
23. Tap **OK** to complete payment
24. Tap **Yes** to print receipt showing:
    - Items picked up (quantities)
    - Payment received
    - Deposit applied (if applicable)
    - **Remaining balance on layaway** (if partial pickup)
    - Remaining items on layaway
25. **Layaway status:**
    - If Pick up Entire: Layaway closes (completed)
    - If Pick up Partial: Layaway remains open for remaining items
26. **Inventory adjusted:** Items picked up are:
    - Subtracted from On-Hand quantity
    - Released from "Committed" status
27. Pickup transaction is recorded in Store database and queued for sync to Central

**Alternative: Use POS command**
- Can use `Layaway_RecallCommand` to invoke Recall Layaway dialog (no parameters)

## Expected Synchronization Behavior

- Insert: Not applicable (layaway already exists; pickup creates new pickup transaction)
- Update: Layaway status is updated in Store (completed or partial pickup) and synced to Central
- Delete: Not applicable (layaways are not deleted; status updated to completed)
- Matching key: Layaway order number (unique identifier from Store to Central); Store ID + Layaway order number

## Expected Result in Source System

- Layaway is recalled successfully in POS
- Pickup transaction is created/visible in POS (Store database)
- **Layaway status updated:**
  - **If Pick up Entire:** Status changed to "completed/closed"
  - **If Pick up Partial:** Status remains "open" with updated quantities picked up
- Pickup transaction details captured:
  - Items picked up (quantities)
  - Final payment amount (if balance was owing)
  - Total paid (all payments)
- Layaway appears in Journal with updated status
- Layaway is visible in Store Manager with completed status
- Receipt prints showing pickup details
- **Inventory adjusted:**
  - Items picked up subtracted from On-Hand quantity
  - Items **released from "Committed" status**
  - Available inventory increased (items no longer held)
- Payment recorded in batch totals (if final payment made)

## Expected Result in Target System

- Layaway status update syncs to Central database
- Pickup transaction syncs to Central
- Layaway in Central reflects:
  - Updated status (completed or partial pickup)
  - All items picked up
  - Final payment (if applicable)
  - Pickup date
- Layaway syncs automatically via Central Client
- Layaway is available for Central Manager reporting with completed status
- **Inventory commitment released** in Central (items no longer committed)

## Validation Points

- Verify layaway recalls successfully in POS
- Verify customer filtering works (if customer selected, only their layaways display)
- Verify layaway details correct when recalled (items, balance owing, payments made)
- Verify order action selection (Pick up Entire vs. Pick up Partial)
- Verify balance owing calculated correctly
- Verify final payment processed (if balance owing)
- Verify pickup transaction created in POS
- Verify layaway status updated in Store Manager
- Verify layaway status update syncs to Central
- Verify **inventory released from committed status**
- Verify **inventory adjusted** (On-Hand decreased, Available increased)
- Verify receipt shows correct pickup details
- Verify **layaway closes** if Pick up Entire selected
- Verify **layaway remains open** if Pick up Partial selected with remaining items
- Mapping validation: Layaway status, pickup details, inventory updates map correctly from Store to Central
- Duplicate prevention: No duplicate pickup transactions in Central

## Negative / Edge Case Coverage

- **Layaway not found:** If layaway does not exist or is already completed/cancelled, POS prevents recall; verify validation
- **Customer filtering:** If customer selected but has no open layaways, recall screen shows "no layaways found"; verify message
- **All open layaways display:** If no customer selected, all open layaways display; cashier must search manually; verify full list accessibility
- **Multiple layaways for same customer:** Customer can have multiple open layaways; verify correct one can be selected
- **Layaway expired:** If layaway is past expiration date, store policy determines if pickup allowed or if layaway is cancelled; verify expired layaway handling
- **Balance still owing:** If customer recalls layaway for pickup but balance is not fully paid, they must make final payment; verify final payment processing
- **Partial pickup:** Customer can pick up some items and return later for rest; verify partial pickup with deposit application
- **Partial pickup quantity validation:** If cashier selects more quantity than on layaway, POS should prevent; verify validation
- **Zero items selected for partial pickup:** If cashier taps Pick up Partial but selects no items, POS should prevent; verify validation
- **Deposit application on partial pickup:** Deposit/payments are proportionally applied; verify calculation is correct
- **No final payment:** If balance is $0, customer picks up items with no additional payment; verify $0 tender
- **Payment declined:** If final payment is declined, layaway should not complete; verify rollback
- **Layaway recall then cancel:** If cashier recalls layaway but cancels before completing tender, layaway remains unchanged; verify no status change
- **Inventory commitment release:** When layaway is picked up, items are released from committed status and subtracted from on-hand; verify inventory updates
- **Items already removed from inventory:** If items were stolen/damaged while on layaway, store must handle separately; verify inventory discrepancy handling
- **Layaway history view:** Order Details | Order History shows all transactions for layaway; verify deposit, payments, and pickup display
- **POS offline then sync later:** Layaway pickup/status update created locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify layaway status update appears in Central after retry
- **Duplicate prevention across repeated sync attempts:** Layaway status update sync is idempotent; repeated sync does not create duplicates in Central
- **Consistency Checker:** If layaway status update fails to sync, run Consistency Checker to synchronize missing updates to Central

## Known Issues / Notes

- Video link: https://somup.com/cOehl4WPYm
- Reference: RMH documentation - [Processing layaway orders](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/layaways-processing.md)
- Reference: RMH documentation - [About layaways](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/about-layaways.md)
- Reference: RMH documentation - [Setting up layaways](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_UG_Topics/setting-up-layaways.md)
- **Recall access:** Orders | Recalls | Recall a Layaway
- **POS command available:** `Layaway_RecallCommand` - Invokes Recall Layaway dialog (no parameters)
- **Customer selection recommended:** Selecting customer before recalling layaway filters list to only that customer's layaways
- **Pickup options:**
  1. **Pick up Entire:** Customer takes all items; layaway completes
  2. **Pick up Partial:** Customer takes some items; returns later for rest; layaway remains open
- **Balance owing scenarios:**
  - **Balance $0:** Customer has fully paid; picks up items with no additional payment
  - **Balance > $0:** Customer must make final payment before picking up items
- **Inventory commitment release:** Critical difference from work orders:
  - **Layaway creation:** Items marked "Committed" (held for customer)
  - **Layaway pickup:** Items released from "Committed" and subtracted from On-Hand
  - **Available inventory:** Increases when layaway picked up (items no longer committed)
- **Inventory impact:**
  - **On-Hand:** Decreased by picked up quantities
  - **Committed:** Decreased by picked up quantities
  - **Available:** Increased by picked up quantities (On-Hand - Committed)
- **Partial pickup deposit application:** When customer picks up partial, deposit/payments are proportionally applied:
  - Formula: Applied = Total Paid × (Value of Items Picked Up ÷ Total Layaway Value)
  - Example: $200 paid on $500 layaway; customer picks up $300 worth; applied = $200 × ($300 ÷ $500) = $120
- **Layaway completion:** Layaway closes when all items picked up and balance paid
- **Layaway lifecycle:**
  1. **Create:** Layaway created with deposit; items committed
  2. **Payments:** Customer makes incremental payments
  3. **Recall:** When fully paid, cashier recalls layaway (this scenario)
  4. **Pickup:** Customer picks up items; inventory released
  5. **Complete:** Layaway closes
- **Expiration handling:** If layaway expired before pickup, store policy determines:
  - Allow pickup (customer pays late fees if applicable)
  - Cancel layaway; refund deposit (full or partial per policy/law)
- **Layaway vs. work order pickup:**
  - **Layaway:** Items were committed at creation; released at pickup
  - **Work Order:** Items not committed at creation; subtracted at pickup
- **Common workflow:** Customer pays final balance → cashier recalls layaway → customer picks up items → layaway completes → inventory released
- **Store best practice:** Have items pulled from back office/storage and ready when customer arrives for pickup
