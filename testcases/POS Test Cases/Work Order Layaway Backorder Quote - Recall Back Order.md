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