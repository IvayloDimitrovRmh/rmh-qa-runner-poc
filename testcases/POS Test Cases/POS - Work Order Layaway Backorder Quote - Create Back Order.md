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

# Scenario: Create Back Order

## Preconditions

- POS is operational and cashier is logged in
- **Back orders are enabled** in Store Manager:
  - File | Configuration | Store Rules | POS Options | "Enable back orders" is **selected**
- Back order configuration exists in Store Manager:
  - Expiration period configured (File | Configuration | Ordering rules | Back Order | Expiration days)
  - Minimum deposit amount configured (File | Configuration | Ordering rules | Back Order | Deposit percentage)
- Items exist but are out of stock (On-Hand quantity ≤ 0) or available quantity < requested quantity
- Customer exists (customer selection **required** for back orders per RMH documentation)
- User has permission to create back orders (no specific back order permission documented; controlled by general POS permissions)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Create a back order in POS:**

**Scenario: Out of stock item triggers back order**
1. In normal transaction mode (not order mode initially)
2. Add item to transaction (scan or enter Item Lookup Code)
3. **If item is out of stock and back orders are enabled:**
   - POS prompts or automatically switches to back order mode
   - Back order icon may display in top right corner
   - **Customer selection required:** POS prompts to select customer

**Or manually create back order:**
1. Tap **Orders | Back Order** (if available in POS menu)
2. **POS enters back order mode:**
   - Back order icon displays in top right corner (if applicable)
   - Transaction screen indicates back order mode
3. **Look up and select customer (required for back orders):**
   - Tap **Customers | Lookup Customer** or press **F7**
   - Search for customer by name, phone, or customer ID
   - Select customer:
     - Tap customer once and tap **Select**; OR
     - Tap customer twice (double-tap)
   - Customer information displays in Customer pane at top of POS screen
   - **Note:** Per RMH documentation, "If enabled, the cashier is required to select a customer to create a back order"
4. Add out-of-stock items to back order (scan or enter Item Lookup Codes)
   - Items display on transaction screen
   - Back order total calculates (including tax)
5. **POS displays minimum deposit amount** in "Addl. deposit" field:
   - Deposit calculated as percentage of back order total (configured in File | Configuration | Ordering rules | Back Order | Deposit)
   - Example: If deposit is 20% and back order total is $500, minimum deposit is $100
   - Customer can pay more than minimum deposit
6. (Optional) Override deposit amount:
   - Tap **Orders | Order Details | Order Deposit Override**
   - Enter new deposit amount or percentage
7. (Optional) Override expiration date:
   - Tap **Orders | Order Details | Order Due**
   - Change expiration date (default is configured days from current date)
   - **Expiration = days store has to fill back order**
8. (Optional) Add comment to back order:
   - Tap **Orders | Order Details | Order Comment**
   - Enter reference number (optional) and comment
   - Tap **OK**
9. Tap **Transaction | Tender Sale** or press **F12**
10. On the Tender screen, enter deposit amount next to appropriate tender type:
    - Minimum deposit amount shown in "Addl. deposit" field
    - Customer can pay more than minimum
11. Tap **OK** to complete deposit payment
12. Tap **Yes** to print back order receipt showing:
    - Back order number
    - Out-of-stock items ordered
    - Total back order amount (including tax)
    - Deposit amount paid
    - **Balance owing** (back order total - deposit)
    - **Expiration date** (date by which store should fill back order)
13. Back order is saved in Store database and queued for sync to Central
14. **Items are marked for reorder/replenishment:**
    - Back order creates demand signal
    - Items may be flagged for purchasing/transfer
15. Customer receives back order receipt with expiration date and balance owing

## Validation Points

- Verify back orders are enabled (File | Configuration | Store Rules | POS Options | Enable back orders)
- Verify back order is created in POS with correct details
- Verify back order icon displays in POS (if applicable)
- Verify customer selection is required (cannot create back order without customer)
- Verify minimum deposit amount calculated correctly (percentage of total)
- Verify expiration date calculated correctly (configured days from current date)
- Verify back order exists in Store Manager (Journal | Transactions or Orders)
- Verify back order exists in Central after sync
- Verify back order details match between POS, Store Manager, and Central:
  - Items, quantities, prices
  - Total amount, deposit amount, balance owing
  - Expiration date
  - Customer information
  - Comment (if added)
- Verify inventory NOT adjusted at back order creation (items not in stock)
- Mapping validation: Back order fields map correctly from Store to Central
- Duplicate prevention: No duplicate back order in Central for the same back order number