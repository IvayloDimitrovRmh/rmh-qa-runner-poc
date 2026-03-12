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

## Business Entity

Work order transaction

## Business Purpose

Create work orders for transactions that require additional time to assemble, pull from inventory, or schedule for completion, allowing customers to pay a deposit and return later to pick up the completed order and pay the balance owing.

## Trigger

User creates a work order in POS for items that require assembly, inventory pulling, or scheduled completion.

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

## Expected Synchronization Behavior

- Insert: Insert the work order transaction in Store database and sync/insert the corresponding work order record in Central database
- Update: When work order is processed/picked up, work order status is updated in Store and synced to Central
- Delete: Work orders are not deleted; if cancelled, status is updated
- Matching key: Work order number (unique identifier from Store to Central); Store ID + Work order number

## Expected Result in Source System

- Work order transaction is created/visible in POS (Store database)
- Work order is in "open" status (pending pick up)
- Work order details captured:
  - Customer information (if selected)
  - Line items
  - Total amount (including tax)
  - Deposit amount paid
  - Balance owing
  - Due date
  - Comment (if added)
- Work order appears in Journal (Transaction | Receipt | Journal)
- Work order is visible in Store Manager (Journal | Transactions or Orders)
- Receipt prints showing work order details and balance owing
- Deposit payment recorded in batch totals
- Inventory is **not** adjusted (items remain on-hand until work order is picked up)

## Expected Result in Target System

- Work order record is created/visible in Central database after sync
- Work order syncs automatically via Central Client
- Work order is available for Central Manager reporting
- Work order details preserved in Central (customer, items, deposit, balance, due date)
- Work order status tracked in Central (open/pending)

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

## Negative / Edge Case Coverage

- **Customer selection required but not selected:** If store configuration requires customer selection (File | Configuration | Store Rules | Customer Options | Require customer selection for orders) and cashier does not select customer, POS prevents work order creation; verify enforcement
- **Deposit amount override:** Cashier can override deposit amount (Orders | Order Details | Order Deposit Override); verify override is captured
- **Due date override:** Cashier can override due date (Orders | Order Details | Order Due); verify override is captured
- **Zero deposit:** Store can configure 0% deposit (no deposit required); verify work order creates with zero deposit
- **Full payment at work order creation:** Customer can pay full work order amount as "deposit"; verify balance owing is $0
- **Work order expiration:** Work orders have due date (expiration); expired work orders may require special handling; verify due date calculation
- **Work order cancellation:** If work order is cancelled before pickup, it should be marked as cancelled (not deleted); verify cancellation handling
- **Work order with no items:** POS should prevent creating work order with no items; verify validation
- **Work order mode exit:** Cashier can exit work order mode by cancelling transaction or selecting different order type; verify mode switching
- **Multiple work orders for same customer:** Customer can have multiple open work orders; verify all are tracked separately
- **POS offline then sync later:** Work order created locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify work order appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Work order sync is idempotent; repeated sync does not create duplicates in Central
- **Work order recall for processing:** Work order must be recalled when customer returns (Orders | Recalls | Recall a Work Order); verify recall workflow
- **Consistency Checker:** If work order fails to sync, run Consistency Checker to synchronize missing work order records to Central

## Known Issues / Notes

- Video link: https://somup.com/cOefXzWl98
- Reference: RMH documentation - [Creating work orders](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/work-orders-creating.md)
- Reference: RMH documentation - [About work orders](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/about-work-orders.md)
- Reference: RMH documentation - [Setting up work orders](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_UG_Topics/setting-up-work-orders.md)
- **Work order purpose:** Manage transactions requiring additional time to assemble, pull from inventory, or schedule for completion
- **Work order icon:** When in work order mode, work order icon displays in top right corner of POS screen
- **Common use cases:**
  - **Home improvement store:** Collect supplies for renovation project; deliver to loading area
  - **Electronics store:** Purchase equipment for delivery/installation
  - **Furniture store:** Assemble furniture; schedule delivery
  - **Warehouse pickup:** Large items collected from nearby warehouse
- **Deposit requirement:** Store configures minimum deposit percentage (File | Configuration | Ordering rules | Work Order | Deposit)
- **Due date calculation:** Store configures expected days to fulfillment (File | Configuration | Ordering rules | Work Order | Due Days); POS adds days to current date to create pick up date
- **Customer selection:** Recommended to select customer for easy work order lookup when customer returns; may be required by store configuration
- **Cashier overrides:** Cashier can override due date and deposit amount (Orders | Order Details menu)
- **Work order comments:** Cashier can add reference number and comment to work order (Orders | Order Details | Order Comment); displays on receipt and when recalled
- **Inventory handling:** Inventory is **not** adjusted when work order is created; items remain on-hand until work order is picked up/processed
- **Payment at creation:** Customer pays deposit (or full amount) when work order is created; deposit recorded in batch
- **Work order receipt:** Receipt shows total amount, deposit paid, **balance owing**, and due date
- **Work order lifecycle:**
  1. **Create:** Work order created with deposit
  2. **Store:** Work order saved in open status
  3. **Recall:** When customer returns, cashier recalls work order (Orders | Recalls | Recall a Work Order)
  4. **Process:** Customer picks up items (entire or partial) and pays balance
  5. **Complete:** Work order closed when all items picked up and paid
- **Partial pickup support:** Customers can pick up some items and return later for remaining items; deposit is proportionally applied
- **Work order vs. other order types:**
  - **Work Order:** Items require assembly/pulling; deposit required; pick up later
  - **Layaway:** Customer reserves items; makes multiple payments over time
  - **Back Order:** Items out of stock; customer reserves for when available
  - **Quote:** Price estimate; no commitment to purchase
