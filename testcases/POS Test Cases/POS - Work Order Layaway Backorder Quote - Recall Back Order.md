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

# Scenario: Recall Back Order

## Business Entity

Back order transaction (recalled for pickup/processing)

## Business Purpose

Recall previously created back orders when out-of-stock items have arrived and customers return to pick up their orders, allowing cashiers to complete the back order transaction, collect the balance owing, and adjust inventory.

## Trigger

Out-of-stock items arrive at store; customer is notified and returns to pick up back order; user recalls the back order in POS to process pickup.

## Preconditions

- POS is operational and cashier is logged in
- Back order exists in Store database (previously created)
- Back order is in "open" status (not yet fulfilled/completed)
- **Items have arrived** and are now in stock
- Back order may have:
  - Deposit paid
  - Balance owing
- Customer information is associated with back order
- User has permission to recall and process back orders (no specific recall permission documented; controlled by general POS order permissions)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Recall back order for pickup in POS:**

**Step 1: Recall the back order**
1. **Look up customer (recommended):**
   - Tap **Customers | Lookup Customer** or press **F7**
   - Search for customer by name, phone, or customer ID
   - Select customer
   - Customer information displays in Customer pane
   - **Benefit:** When customer is selected, POS displays only back orders belonging to that customer
2. **Recall the back order:**
   - Tap **Orders | Recalls | Recall a Back Order**
   - **Recall Back Order screen displays** showing:
     - **If customer selected:** Only back orders for selected customer
     - **If no customer selected:** All open back orders (must search manually)
     - Back order list shows:
       - Back order number
       - Customer name
       - Order date
       - Total amount
       - Balance owing
       - Expiration date
3. **Select the customer's back order:**
   - Tap back order once and tap **Add**; OR
   - Tap back order twice (double-tap)
4. **Back order recalls to transaction screen** showing:
   - All items in back order
   - Back order number
   - Total amount
   - Deposit paid (if applicable)
   - **Balance owing** (total - deposit)
   - Expiration date
5. (Optional) View back order history:
   - Tap **Orders | Order Details | Order History**
   - View all transactions for this back order (deposit, etc.)
   - Tap transaction to view receipt details

**Step 2: Process the back order pickup**
6. **Verify items are in stock:**
   - Items should now be available (arrived from supplier or another store)
   - Check item availability if needed
7. Tap **Transaction | Tender Sale** or press **F12**
8. **Select Order Action screen displays** with options:
   - **Pick up Entire:** Customer picks up all items (most common)
   - **Pick up Partial:** Customer picks up some items if only partial shipment arrived

**Option A: Pick up Entire (most common)**
9. Tap **Pick up Entire**
10. **POS proceeds to tender screen:**
    - Balance owing displays
    - Amount due = Total - Deposit already paid
11. Customer pays balance owing:
    - Enter payment amount next to tender type
    - Tap **OK**
12. Tap **Yes** to print pickup receipt showing:
    - Items picked up
    - Final payment received
    - Total paid (deposit + final payment)
    - Back order number
    - Date
13. **Back order completes:**
    - Back order status changes to "completed/closed"
    - **Inventory adjusted:**
      - Items subtracted from On-Hand quantity
      - Regular sale inventory adjustment applied
14. Customer takes items

**Option B: Pick up Partial**
15. Tap **Pick up Partial**
16. **Pick up Partial screen displays** showing all items with quantities
17. Select items customer is picking up:
    - Tap checkbox next to each item; OR
    - In **Pick Up** column, enter quantity customer is picking up
    - **Reason:** Only some items arrived; customer picks up available items
18. Tap **OK**
19. **If deposit was paid, POS calculates deposit application:**
    - Deposit proportionally applied to items being picked up
    - Message displays: "Amount of deposit being applied: $X.XX"
    - Tap **OK** to confirm
20. POS proceeds to tender screen
21. Amount due = (Items picked up total) - (Applied deposit portion)
22. Customer pays amount due
23. Enter payment amount next to tender type
24. Tap **OK** to complete payment
25. Tap **Yes** to print receipt showing:
    - Items picked up (quantities)
    - Payment received
    - Deposit applied (if applicable)
    - **Remaining balance on back order** (for items not yet arrived)
    - Remaining items on back order
26. **Back order status:**
    - If Pick up Entire: Back order closes (completed)
    - If Pick up Partial: Back order remains open for remaining items (when they arrive)
27. **Inventory adjusted:** Items picked up are subtracted from On-Hand quantity
28. Pickup transaction is recorded in Store database and queued for sync to Central

**Alternative: Use POS command**
- Can use `BackOrder_RecallCommand` to invoke Recall Back Order dialog (no parameters)

## Expected Synchronization Behavior

- Insert: Not applicable (back order already exists; pickup creates new pickup transaction)
- Update: Back order status is updated in Store (completed or partial pickup) and synced to Central
- Delete: Not applicable (back orders are not deleted; status updated to completed)
- Matching key: Back order number (unique identifier from Store to Central); Store ID + Back order number

## Expected Result in Source System

- Back order is recalled successfully in POS
- Pickup transaction is created/visible in POS (Store database)
- **Back order status updated:**
  - **If Pick up Entire:** Status changed to "completed/closed"
  - **If Pick up Partial:** Status remains "open" with updated quantities picked up
- Pickup transaction details captured:
  - Items picked up (quantities)
  - Final payment amount
  - Total paid (deposit + final payment)
- Back order appears in Journal with updated status
- Back order is visible in Store Manager with completed status
- Receipt prints showing pickup details
- **Inventory adjusted:**
  - Items picked up subtracted from On-Hand quantity
  - Regular sale inventory adjustment applied
  - Items no longer reserved for back order
- Payment recorded in batch totals

## Expected Result in Target System

- Back order status update syncs to Central database
- Pickup transaction syncs to Central
- Back order in Central reflects:
  - Updated status (completed or partial pickup)
  - All items picked up
  - Final payment
  - Pickup date
- Back order syncs automatically via Central Client
- Back order is available for Central Manager reporting with completed status
- Inventory adjustment syncs to Central

## Validation Points

- Verify back order recalls successfully in POS
- Verify customer filtering works (if customer selected, only their back orders display)
- Verify back order details correct when recalled (items, balance owing, deposit paid)
- Verify order action selection (Pick up Entire vs. Pick up Partial)
- Verify balance owing calculated correctly (total - deposit)
- Verify final payment processed
- Verify pickup transaction created in POS
- Verify back order status updated in Store Manager
- Verify back order status update syncs to Central
- Verify **inventory adjusted** (On-Hand decreased by picked up quantities)
- Verify receipt shows correct pickup details
- Verify **back order closes** if Pick up Entire selected
- Verify **back order remains open** if Pick up Partial selected with remaining items
- Mapping validation: Back order status, pickup details, inventory updates map correctly from Store to Central
- Duplicate prevention: No duplicate pickup transactions in Central

## Negative / Edge Case Coverage

- **Back order not found:** If back order does not exist or is already completed/cancelled, POS prevents recall; verify validation
- **Customer filtering:** If customer selected but has no open back orders, recall screen shows "no back orders found"; verify message
- **All open back orders display:** If no customer selected, all open back orders display; cashier must search manually; verify full list accessibility
- **Multiple back orders for same customer:** Customer can have multiple open back orders; verify correct one can be selected
- **Back order expired:** If back order is past expiration date (store failed to fill within configured days), store policy determines handling; verify expired back order processing
- **Items still out of stock:** If cashier recalls back order but items have not arrived, they should not process pickup; verify items are in stock before pickup
- **Partial shipment:** If only some items arrived, customer picks up partial; remaining items stay on back order; verify partial pickup with deposit application
- **Partial pickup quantity validation:** If cashier selects more quantity than ordered, POS should prevent; verify validation
- **Zero items selected for partial pickup:** If cashier taps Pick up Partial but selects no items, POS should prevent; verify validation
- **Deposit application on partial pickup:** Deposit is proportionally applied; verify calculation is correct
- **Balance still owing:** Customer must pay balance before taking items; verify final payment required
- **Payment declined:** If final payment is declined, back order should not complete; verify rollback
- **Back order recall then cancel:** If cashier recalls back order but cancels before completing tender, back order remains unchanged; verify no status change
- **Inventory not available:** If items were reserved but sold to another customer or damaged, store must handle separately; verify inventory validation
- **Back order cancellation:** If customer cancels back order, deposit may be refunded (store policy); verify cancellation workflow
- **Items arrived notification:** Store should notify customer when items arrive (outside POS); verify customer communication process
- **Back order history view:** Order Details | Order History shows all transactions for back order; verify deposit and pickup display
- **POS offline then sync later:** Back order pickup/status update created locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify back order status update appears in Central after retry
- **Duplicate prevention across repeated sync attempts:** Back order status update sync is idempotent; repeated sync does not create duplicates in Central
- **Consistency Checker:** If back order status update fails to sync, run Consistency Checker to synchronize missing updates to Central

## Known Issues / Notes

- Video link: https://somup.com/cOehl7WP3A
- Reference: RMH documentation - [POS command reference - Order commands](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/reference-commands.md)
- Reference: RMH documentation - [Inventory policies](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/policies-inventory.md)
- **Recall access:** Orders | Recalls | Recall a Back Order
- **POS command available:** `BackOrder_RecallCommand` - Invokes Recall Back Order dialog (no parameters)
- **Customer selection recommended:** Selecting customer before recalling back order filters list to only that customer's back orders
- **Pickup options:**
  1. **Pick up Entire:** Customer takes all items; back order completes
  2. **Pick up Partial:** Customer takes some items (partial shipment arrived); returns later for rest; back order remains open
- **Prerequisite:** Items must have arrived and be in stock before processing back order pickup
- **Inventory adjustment timing:** Unlike layaway (items committed at creation), back order inventory is adjusted **at pickup** (items were not in stock at creation)
- **Balance owing:** Customer pays balance = Total - Deposit already paid
- **Partial shipment handling:** Common scenario where supplier only sends partial order; customer picks up available items and waits for rest
- **Deposit application (partial pickup):** When customer picks up partial, deposit is proportionally applied:
  - Formula: Applied = Total Deposit × (Value of Items Picked Up ÷ Total Back Order Value)
  - Example: $100 deposit on $500 back order; customer picks up $300 worth; applied = $100 × ($300 ÷ $500) = $60
- **Back order completion:** Back order closes when all items picked up and balance paid
- **Back order lifecycle:**
  1. **Create:** Back order created for out-of-stock items; deposit paid
  2. **Replenish:** Store orders items from supplier or requests transfer
  3. **Arrival:** Items arrive at store; received into inventory
  4. **Notify:** Store notifies customer items are ready for pickup
  5. **Recall:** When customer returns, cashier recalls back order (this scenario)
  6. **Pickup:** Customer picks up items and pays balance
  7. **Complete:** Back order closes; inventory adjusted
- **Expiration date meaning:** For back orders, expiration represents days store has to fulfill order (not customer payment deadline)
- **Customer notification:** Store must notify customer when items arrive (phone, email, text); not automated in POS
- **Store best practice:** Contact customer promptly when items arrive to complete back order quickly
- **Inventory tracking:** Items on back order create demand signal; may trigger purchase orders or transfers
- **Back order vs. other orders:**
  - **Back Order:** Items were out of stock; inventory adjusted at pickup
  - **Work Order:** Items in stock; require assembly; inventory adjusted at pickup
  - **Layaway:** Items in stock; committed at creation; released at pickup
  - **Quote:** No inventory impact; becomes sale or work order when processed
