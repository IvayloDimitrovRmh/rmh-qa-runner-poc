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

## Business Entity

Back order transaction

## Business Purpose

Create back orders when customers want to purchase items that are currently out of stock, allowing stores to reserve items for customers when inventory is replenished and ensuring customers can purchase items they need even when unavailable.

## Trigger

User creates a back order in POS when customer attempts to purchase items that are out of stock or when quantity requested exceeds available inventory.

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

## Expected Synchronization Behavior

- Insert: Insert the back order transaction in Store database and sync/insert the corresponding back order record in Central database
- Update: When items arrive and back order is filled, back order status is updated in Store and synced to Central
- Delete: Back orders are not deleted; if cancelled, status is updated
- Matching key: Back order number (unique identifier from Store to Central); Store ID + Back order number

## Expected Result in Source System

- Back order transaction is created/visible in POS (Store database)
- Back order is in "open" status (pending fulfillment)
- Back order details captured:
  - Customer information (required)
  - Line items (out-of-stock items)
  - Total amount (including tax)
  - Deposit amount paid
  - Balance owing
  - Expiration date
  - Comment (if added)
- Back order appears in Journal (Transaction | Receipt | Journal)
- Back order is visible in Store Manager (Journal | Transactions or Orders)
- Receipt prints showing back order details, balance owing, and expiration date
- Deposit payment recorded in batch totals
- **Inventory NOT adjusted** (items not in stock; awaiting arrival)
- Back order may create purchase order or transfer request (store process dependent)

## Expected Result in Target System

- Back order record is created/visible in Central database after sync
- Back order syncs automatically via Central Client
- Back order is available for Central Manager reporting
- Back order details preserved in Central (customer, items, deposit, balance, expiration date)
- Back order status tracked in Central (open/pending fulfillment)
- Central may trigger replenishment process (purchase order, transfer from another store)

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

## Negative / Edge Case Coverage

- **Back orders not enabled:** If "Enable back orders" is not selected (File | Configuration | Store Rules | POS Options), POS prevents back order creation; verify enforcement
- **Customer not selected:** Per RMH documentation, customer selection is required for back orders; if not selected, POS prevents back order creation; verify enforcement
- **Out of stock prevention vs. back orders:** If "Do not allow the sale of items when out of stock" is enabled AND back orders are disabled, POS prevents sale; verify configuration precedence
- **Display out of stock warning:** If "Display out of stock" is enabled, POS displays warning when selling out-of-stock items; verify warning displays before creating back order
- **Deposit amount override:** Cashier can override deposit amount; verify override is captured
- **Zero deposit:** Store can configure 0% deposit (no deposit required); verify back order creates with zero deposit
- **Full payment at back order creation:** Customer can pay full back order amount as "deposit"; balance owing is $0; verify handling
- **Expiration date override:** Cashier can override expiration date; verify override is captured
- **Back order expiration:** Store has configured days to fill back order; after expiration, back order may be cancelled; verify expiration tracking
- **Back order cancellation:** If items don't arrive or customer cancels, back order is cancelled; customer may receive deposit refund; verify cancellation handling
- **Back order with no items:** POS should prevent creating back order with no items; verify validation
- **Back order mode exit:** Cashier can exit back order mode by cancelling transaction or selecting different order type; verify mode switching
- **Multiple back orders for same customer:** Customer can have multiple open back orders; verify all are tracked separately
- **Items arrive - notification:** When items arrive, store must notify customer; back order can be recalled for pickup; verify fulfillment workflow
- **Partial fulfillment:** If only some items arrive, customer may pick up partial back order; verify partial pickup support
- **POS offline then sync later:** Back order created locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify back order appears in Central after retry
- **Duplicate prevention across repeated sync attempts:** Back order sync is idempotent; repeated sync does not create duplicates in Central
- **Consistency Checker:** If back order fails to sync, run Consistency Checker to synchronize missing back order records to Central

## Known Issues / Notes

- Video link: https://somup.com/cOehlCWPrH
- Reference: RMH documentation - [Inventory policies](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/policies-inventory.md)
- Reference: RMH documentation - [Setting up ordering rules](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-ordering-rules.md)
- Reference: RMH documentation - [Setting up store rules](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-store-rules.md)
- **Back order purpose:** Allow customers to purchase out-of-stock items; store reserves/orders items for customer
- **Enable back orders configuration:** File | Configuration | Store Rules | POS Options | "Enable back orders"
- **Customer selection required:** Per RMH documentation: "If enabled, the cashier is required to select a customer to create a back order"
- **Back order configuration:**
  - **Expiration:** Maximum days store has to fill back order (File | Configuration | Ordering rules | Back Order | Expiration)
  - **Deposit:** Minimum deposit percentage (File | Configuration | Ordering rules | Back Order | Deposit)
- **Out of stock handling options:**
  1. **Prevent sale:** "Do not allow the sale of items when out of stock" (File | Configuration | Store Rules | Item Options)
  2. **Display warning:** "Display out of stock" shows warning message
  3. **Allow back order:** "Enable back orders" allows creating back order for out-of-stock items
- **Inventory not adjusted:** Unlike regular sales, back orders don't adjust inventory at creation (items not in stock)
- **Deposit requirement:** Store configures minimum deposit percentage; customer can pay more; cashier can override
- **Expiration date:** Represents days store has to fulfill back order (not customer payment deadline like layaway)
- **Back order fulfillment process:**
  1. **Create:** Back order created with deposit
  2. **Replenish:** Store orders/transfers items
  3. **Arrival:** Items arrive at store
  4. **Notify:** Store notifies customer items are ready
  5. **Recall:** Customer returns; cashier recalls back order (Orders | Recalls | Recall a Back Order)
  6. **Pickup:** Customer picks up items and pays balance
  7. **Complete:** Back order closes; inventory adjusted
- **POS command:** `BackOrder_RecallCommand` available for recalling back orders (no parameters)
- **Back order vs. other order types:**
  - **Back Order:** Items out of stock; customer reserves for when available; deposit required
  - **Work Order:** Items in stock but require assembly/pulling; deposit required
  - **Layaway:** Items in stock; customer pays over time; items committed
  - **Quote:** Price estimate; no commitment; no inventory impact
- **Replenishment trigger:** Back orders may trigger automatic replenishment (purchase orders, transfers) in some RMH configurations
- **Use cases:**
  - Customer wants specific item/size/color that is out of stock
  - Popular item sold out; customer willing to wait for restock
  - Seasonal items pre-ordered before arrival
- **Best practice:** Set reasonable expiration period; communicate expected arrival date to customer
