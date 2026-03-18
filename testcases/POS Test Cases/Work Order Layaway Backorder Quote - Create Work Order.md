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

# Scenario: Create Work Order

## Preconditions

- POS is operational and cashier is logged in
- Work orders are configured in Store Manager:
  - Expiration date configured (File | Configuration | Ordering rules | Work Order | Due Days)
  - Minimum deposit amount configured (File | Configuration | Ordering rules | Work Order | Deposit percentage)
  - (Optional) Customer selection requirement configured (File | Configuration | Store Rules | Customer Options | Require customer selection for orders)
  - Work order receipt format configured (Setup | Hardware | Receipt Formats)
- Items are available to sell and can be added to work order
- Customer may be required (depending on store configuration)
- User has permission to create work orders (no specific work order permission documented; controlled by general POS permissions)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Create a work order in POS:**
1. Tap **Orders | Work Order**
2. **POS enters work order mode:**
   - Work order icon displays in top right corner of POS screen
   - Transaction screen indicates work order mode
3. (Optional but recommended) Look up customer:
   - Tap **Customers | Lookup Customer** or press **F7**
   - Search for customer and select
   - Customer information displays in Customer pane at top of POS screen
   - **Note:** Depending on store configuration (File | Configuration | Store Rules | Customer Options | Require customer selection for orders), customer selection may be **required**
4. Add items to work order (scan or enter Item Lookup Codes)
   - Items display on transaction screen
   - Work order total calculates (including tax)
5. **POS displays required deposit amount** in "Addl. deposit" field:
   - Deposit amount calculated as percentage of work order total (configured in File | Configuration | Ordering rules | Work Order | Deposit)
   - Example: If deposit is 20% and work order total is $500, required deposit is $100
6. (Optional) Override due date or deposit amount:
   - Tap **Orders | Order Details | Order Due** to change due date
   - Tap **Orders | Order Details | Order Deposit Override** to change deposit amount
   - **Note:** Cashier can override configured defaults
7. (Optional) Add comment to work order:
   - Tap **Orders | Order Details | Order Comment**
   - Enter reference number (optional) and comment
   - Tap **OK**
   - Comment displays on receipt and when work order is recalled
8. Tap **Transaction | Tender Sale** or press **F12**
9. On the Tender screen, enter deposit amount next to appropriate tender type:
   - Minimum deposit amount shown in "Addl. deposit" field
   - Customer can pay more than minimum deposit
   - Customer can pay full work order amount
10. Tap **OK** to complete deposit payment
11. Tap **Yes** to print work order receipt showing:
    - Work order items
    - Total work order amount (including tax)
    - Deposit amount paid
    - **Balance owing** (work order total - deposit)
    - Due date (pick up date)
    - Comment (if added)
12. Work order is saved in Store database and queued for sync to Central
13. Customer receives work order receipt with pick up date and balance owing

## Validation Points

- Verify work order is created in POS with correct details
- Verify work order icon displays in POS during work order creation
- Verify required deposit amount calculated correctly (percentage of total)
- Verify customer information captured (if customer selected)
- Verify work order exists in Store Manager (Journal | Transactions or Orders)
- Verify work order exists in Central after sync
- Verify work order details match between POS, Store Manager, and Central:
  - Items, quantities, prices
  - Total amount, deposit amount, balance owing
  - Due date
  - Customer information
  - Comment (if added)
- Verify inventory **not** adjusted at work order creation (items still on-hand)
- Mapping validation: Work order fields map correctly from Store to Central
- Duplicate prevention: No duplicate work order in Central for the same work order number