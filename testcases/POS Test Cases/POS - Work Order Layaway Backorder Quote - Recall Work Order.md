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

# Scenario: Recall work order

## Business Entity

Work order transaction (recalled for processing/pickup)

## Business Purpose

Recall previously created work orders when customers return to pick up their orders, allowing cashiers to complete the work order by collecting the balance owing and finalizing the transaction.

## Trigger

Customer returns to store to pick up work order; user recalls the work order in POS to process pickup and collect payment.

## Preconditions

- POS is operational and cashier is logged in
- Work order exists in Store database (previously created)
- Work order is in "open" status (not yet fully picked up/completed)
- Work order may have:
  - Deposit paid
  - Partial pickups already processed
  - Balance owing
- Customer information may be associated with work order (recommended)
- User has permission to recall and process work orders (no specific recall permission documented; controlled by general POS order permissions)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Recall work order in POS:**

**Step 1: Recall the work order**
1. (Optional but recommended) Look up customer first to filter work orders:
   - Tap **Customers | Lookup Customer** or press **F7**
   - Search for customer by name, phone, or customer ID
   - Select customer
   - Customer information displays in Customer pane
   - **Benefit:** When customer is selected, POS displays only work orders belonging to that customer (easier to find)
2. Tap **Orders | Recalls | Recall a Work Order**
3. **Recall Work Order screen displays** showing:
   - **If customer selected:** Only work orders for selected customer
   - **If no customer selected:** All open work orders (must search manually)
   - Work order list shows:
     - Work order number
     - Customer name (if associated)
     - Order date
     - Total amount
     - Balance owing
     - Due date
4. Select the customer's work order:
   - Tap work order once and tap **Add**; OR
   - Tap work order twice (double-tap)
5. **Work order recalls to transaction screen** showing:
   - All items in work order
   - Work order number
   - Total amount
   - Deposit paid (if applicable)
   - **Balance owing** = Total - Deposits/Payments
   - **R.T.D. (Received to Date)** column: Quantity already picked up (if partial pickups)
   - **On Order** column: Quantity remaining to pick up
6. (Optional) View work order history:
   - Tap **Orders | Order Details | Order History**
   - View all transactions for this work order (deposit, partial pickups, etc.)
   - Tap transaction to view receipt details

**Step 2: Process the work order (pickup)**
7. Tap **Transaction | Tender Sale** or press **F12**
8. **Select Order Action screen displays** with options:
   - **Pick up Entire:** Customer picks up all remaining items
   - **Pick up Partial:** Customer picks up some items; return later for rest
9. Select appropriate action:

**Option A: Pick up Entire**
   - Tap **Pick up Entire**
   - POS proceeds to tender screen
   - Balance owing displays
   - Customer pays balance
   - Work order completes (closes)

**Option B: Pick up Partial**
   - Tap **Pick up Partial**
   - **Pick up Partial screen displays** showing all items with quantities
   - Select items customer is picking up:
     - Tap checkbox next to each item; OR
     - In **Pick Up** column, enter quantity customer is picking up
   - Tap **OK**
   - If deposit was paid, **POS calculates deposit application:**
     - Deposit is proportionally applied to items being picked up
     - Message displays: "Amount of deposit being applied: $X.XX"
     - Tap **OK** to confirm
   - POS proceeds to tender screen
   - Amount due = (Items picked up total) - (Applied deposit portion)
   - Customer pays amount due
   - Work order remains open with remaining items

10. On Tender screen, enter payment amount next to tender type
11. Tap **OK** to complete payment
12. Tap **Yes** to print receipt showing:
    - Items picked up (quantities)
    - Payment received
    - Deposit applied (if applicable)
    - **Remaining balance on work order** (if partial pickup)
    - Work order number
13. **Work order status updated:**
    - If Pick up Entire: Work order closes (completed)
    - If Pick up Partial: Work order remains open for remaining items
14. **Inventory adjusted:** Items picked up are subtracted from on-hand quantity
15. Transaction is recorded in Store database and queued for sync to Central

## Expected Synchronization Behavior

- Insert: Not applicable (work order already exists; pickup creates new pickup transaction)
- Update: Work order status is updated in Store (picked up quantities, balance owing, completion status) and synced to Central
- Delete: Not applicable (work orders are not deleted; status updated to completed)
- Matching key: Work order number (unique identifier from Store to Central); Store ID + Work order number

## Expected Result in Source System

- Work order is recalled successfully in POS
- Pickup transaction is created/visible in POS (Store database)
- **Work order status updated:**
  - **If Pick up Entire:** Status changed to "completed/closed"
  - **If Pick up Partial:** Status remains "open"; R.T.D. (Received to Date) updated with picked up quantities
- Pickup transaction details captured:
  - Items picked up (quantities)
  - Payment amount
  - Deposit application (if applicable)
  - Remaining balance (if partial)
- Work order appears in Journal with updated status
- Work order is visible in Store Manager with updated status and pickup history
- Receipt prints showing pickup details
- **Inventory adjusted:** Items picked up subtracted from on-hand quantity
- Payment recorded in batch totals

## Expected Result in Target System

- Work order status update syncs to Central database
- Pickup transaction syncs to Central
- Work order in Central reflects:
  - Updated status (completed or open with partial pickup)
  - R.T.D. quantities updated
  - Balance owing updated
  - Pickup transaction history
- Work order syncs automatically via Central Client
- Work order is available for Central Manager reporting with updated status

## Validation Points

- Verify work order recalls successfully in POS
- Verify customer filtering works (if customer selected, only their work orders display)
- Verify work order details correct when recalled (items, quantities, balance, deposit)
- Verify R.T.D. and On Order columns show correct quantities (if partial pickups already processed)
- Verify order action selection (Pick up Entire vs. Pick up Partial)
- Verify deposit application calculated correctly (proportional to items picked up)
- Verify balance owing calculated correctly
- Verify pickup transaction created in POS
- Verify work order status updated in Store Manager
- Verify work order status update syncs to Central
- Verify inventory adjusted for picked up items
- Verify receipt shows correct pickup details
- Verify **work order closes** if Pick up Entire selected
- Verify **work order remains open** if Pick up Partial selected with remaining items
- Mapping validation: Work order status, pickup quantities, balance updates map correctly from Store to Central
- Duplicate prevention: No duplicate pickup transactions in Central

## Negative / Edge Case Coverage

- **Work order not found:** If work order number does not exist or is already completed, POS should prevent recall; verify validation
- **Customer selection filtering:** If customer selected but has no open work orders, recall screen shows "no work orders found"; verify message
- **All open work orders display:** If no customer selected, all open work orders display; cashier must search manually; verify full list accessibility
- **Multiple work orders for same customer:** Customer can have multiple open work orders; verify all display and correct one can be selected
- **Work order expired:** If work order is past due date, it still appears in recall list; verify expired work orders can be processed
- **Partial pickup then another partial:** Customer can pick up partial, return later for another partial pickup; verify R.T.D. accumulates correctly
- **Partial pickup quantity validation:** If cashier selects more quantity than On Order, POS should prevent; verify validation
- **Zero items selected for partial pickup:** If cashier taps Pick up Partial but selects no items, POS should prevent; verify validation
- **Deposit application on partial pickup:** Deposit is proportionally applied; verify calculation is correct (deposit * (items picked up value / total work order value))
- **No deposit work orders:** If work order has no deposit, full balance is due at pickup; verify no deposit application message
- **Payment declined:** If payment is declined during pickup processing, work order should not update status; verify rollback
- **Work order recall then cancel:** If cashier recalls work order but cancels before completing tender, work order remains in open status; verify no status change
- **Work order history view:** Order Details | Order History shows all transactions for work order; verify deposit and partial pickups display
- **POS offline then sync later:** Work order pickup/status update created locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify work order status update appears in Central after retry
- **Duplicate prevention across repeated sync attempts:** Work order status update sync is idempotent; repeated sync does not create duplicates in Central
- **Consistency Checker:** If work order status update fails to sync, run Consistency Checker to synchronize missing updates to Central

## Known Issues / Notes

- Video link: https://somup.com/cOefXMWLS4
- Reference: RMH documentation - [Processing work orders](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/work-orders-processing.md)
- Reference: RMH documentation - [About work orders](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/about-work-orders.md)
- Reference: RMH documentation - [Looking up order history](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/orders-order-history.md)
- **Customer selection recommended:** Selecting customer before recalling work order filters list to only that customer's work orders (easier to find)
- **Recall without customer:** If no customer selected, all open work orders display; cashier must search through list
- **Recall access:** Tap **Orders | Recalls | Recall a Work Order**
- **POS command available:** `WorkOrder_RecallCommand` - Invokes Recall Work Order dialog (no parameters)
- **Pick up options:**
  1. **Pick up Entire:** Customer takes all remaining items; work order completes
  2. **Pick up Partial:** Customer takes some items; returns later for rest; work order remains open
- **R.T.D. (Received to Date):** Shows quantity already picked up (from previous partial pickups)
- **On Order:** Shows quantity remaining to be picked up
- **Balance:** Total work order amount - deposits - payments already made
- **Deposit application (partial pickup):** When customer picks up partial, deposit is proportionally applied:
  - Formula: Deposit Applied = Total Deposit × (Value of Items Picked Up ÷ Total Work Order Value)
  - Example: $100 deposit on $500 work order; customer picks up $300 worth; deposit applied = $100 × ($300 ÷ $500) = $60
- **Inventory adjustment:** Inventory is adjusted when items are picked up (not when work order is created)
- **Work order completion:** Work order closes when all items picked up and balance paid
- **Work order lifecycle:**
  1. **Create:** Work order created with deposit
  2. **Open:** Work order saved; customer has receipt with pickup date
  3. **Recall:** When customer returns, cashier recalls work order
  4. **Process:** Customer picks up items (entire or partial) and pays balance
  5. **Complete:** Work order closes when all items picked up
  6. **(Optional) Partial loop:** Customer can pick up partial multiple times until all items received
- **Work order history:** Order Details | Order History shows all transactions (deposit, partial pickups) for work order
- **Due date tracking:** Work orders have due dates but can be picked up after expiration
- **Common workflow:** Customer orders large items → pays deposit → store assembles/pulls from warehouse → customer returns → cashier recalls work order → customer picks up and pays balance
