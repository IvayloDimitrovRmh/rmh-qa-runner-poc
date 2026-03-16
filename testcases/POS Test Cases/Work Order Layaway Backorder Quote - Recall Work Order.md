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