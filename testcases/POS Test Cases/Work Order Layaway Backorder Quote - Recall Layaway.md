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