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