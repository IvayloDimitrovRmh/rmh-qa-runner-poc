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

# Scenario: Create Layaway

## Business Entity

Layaway order transaction

## Business Purpose

Create layaway orders allowing customers to reserve items by paying a deposit, with the store holding the items until the customer pays the full balance over time, enabling customers to purchase items they cannot afford to pay for immediately.

## Trigger

User creates a layaway order in POS for customer who wants to reserve items and make incremental payments.

## Preconditions

- POS is operational and cashier is logged in
- Layaways are configured in Store Manager:
  - Expiration period configured (File | Configuration | Ordering rules | Layaway | Expiration days)
  - Minimum deposit amount configured (File | Configuration | Ordering rules | Layaway | Deposit percentage)
  - Layaway receipt format configured (Setup | Hardware | Receipt Formats)
- Items are available to sell and can be added to layaway
- Customer exists (customer selection required for layaways)
- User has permission to create layaways (no specific layaway permission documented; controlled by general POS permissions)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Create a layaway order in POS:**
1. Tap **Orders | Layaway**
2. **POS enters layaway mode:**
   - Layaway icon displays in top right corner of POS screen
   - Transaction screen indicates layaway mode
3. **Look up and select customer (required for layaways):**
   - Tap **Customers | Lookup Customer** or press **F7**
   - Search for customer by name, phone, or customer ID
   - Select customer:
     - Tap customer once and tap **Select**; OR
     - Tap customer twice (double-tap)
   - Customer information displays in Customer pane at top of POS screen
4. Add items to layaway order (scan or enter Item Lookup Codes)
   - Items display on transaction screen
   - Layaway total calculates (including tax)
5. **POS displays minimum deposit amount** in "Addl. deposit" field:
   - Deposit calculated as percentage of layaway total (configured in File | Configuration | Ordering rules | Layaway | Deposit)
   - Example: If deposit is 20% and layaway total is $500, minimum deposit is $100
   - **Customer can pay more than minimum deposit**
6. (Optional) Override deposit amount:
   - Tap **Orders | Order Details | Order Deposit Override**
   - Enter new deposit amount or percentage
   - Customer can pay more than minimum; store policy may allow less
7. (Optional) Override expiration date:
   - Tap **Orders | Order Details | Order Due**
   - Change expiration date (default is configured days from current date)
8. (Optional) Add comment to layaway:
   - Tap **Orders | Order Details | Order Comment**
   - Enter reference number (optional) and comment
   - Tap **OK**
9. Tap **Transaction | Tender Sale** or press **F12**
10. On the Tender screen, enter deposit amount next to appropriate tender type:
    - **Store policy:** Many stores only accept **cash, direct deposit, or check** for layaway deposits (to avoid transaction fees)
    - Minimum deposit amount shown in "Addl. deposit" field
    - Customer can pay more than minimum
11. Tap **OK** to complete deposit payment
12. Tap **Yes** to print layaway receipt showing:
    - Layaway order number
    - Items on layaway
    - Total layaway amount (including tax)
    - Deposit amount paid
    - **Balance owing** (layaway total - deposit)
    - **Expiration date** (date by which balance must be paid)
13. Layaway order is saved in Store database and queued for sync to Central
14. **Items are marked as "Committed" inventory:**
    - Items removed from available inventory
    - Items shown as "Committed" on Inventory tab in Store Manager
    - Items held in back office/storage area until layaway is paid off
15. Customer receives layaway receipt with expiration date and balance owing

## Expected Synchronization Behavior

- Insert: Insert the layaway order transaction in Store database and sync/insert the corresponding layaway record in Central database
- Update: When layaway payments are made or layaway is picked up, layaway status is updated in Store and synced to Central
- Delete: Layaways are not deleted; if cancelled, status is updated
- Matching key: Layaway order number (unique identifier from Store to Central); Store ID + Layaway order number

## Expected Result in Source System

- Layaway order transaction is created/visible in POS (Store database)
- Layaway is in "open" status (pending full payment)
- Layaway details captured:
  - Customer information (required)
  - Line items
  - Total amount (including tax)
  - Deposit amount paid
  - Balance owing
  - Expiration date
  - Comment (if added)
- Layaway appears in Journal (Transaction | Receipt | Journal)
- Layaway is visible in Store Manager (Journal | Transactions or Orders)
- Receipt prints showing layaway details, balance owing, and expiration date
- Deposit payment recorded in batch totals
- **Inventory adjusted:**
  - Items marked as "Committed" (not available for sale)
  - On-Hand quantity unchanged
  - Available quantity decreased (On-Hand - Committed)
  - Items shown as "Committed" on Inventory tab in Store Manager

## Expected Result in Target System

- Layaway order record is created/visible in Central database after sync
- Layaway syncs automatically via Central Client
- Layaway is available for Central Manager reporting
- Layaway details preserved in Central (customer, items, deposit, balance, expiration date)
- Layaway status tracked in Central (open/pending)
- Inventory commitment syncs to Central (items marked as committed)

## Validation Points

- Verify layaway is created in POS with correct details
- Verify layaway icon displays in POS during layaway creation
- Verify customer selection is required (cannot create layaway without customer)
- Verify minimum deposit amount calculated correctly (percentage of total)
- Verify expiration date calculated correctly (configured days from current date)
- Verify layaway exists in Store Manager (Journal | Transactions or Orders)
- Verify layaway exists in Central after sync
- Verify layaway details match between POS, Store Manager, and Central:
  - Items, quantities, prices
  - Total amount, deposit amount, balance owing
  - Expiration date
  - Customer information
  - Comment (if added)
- Verify inventory marked as "Committed" in Store Manager (Inventory tab)
- Verify inventory commitment syncs to Central
- Mapping validation: Layaway fields map correctly from Store to Central
- Duplicate prevention: No duplicate layaway in Central for the same layaway order number

## Negative / Edge Case Coverage

- **Customer not selected:** If cashier does not select customer, POS prevents layaway creation; verify customer selection enforcement
- **Deposit amount override:** Cashier can override deposit amount (Orders | Order Details | Order Deposit Override); verify override is captured
- **Zero deposit:** Store can configure 0% deposit (no deposit required); verify layaway creates with zero deposit
- **Full payment at layaway creation:** Customer can pay full layaway amount as "deposit"; balance owing is $0; verify layaway can be picked up immediately
- **Expiration date override:** Cashier can override expiration date; verify override is captured
- **Layaway expiration:** Layaway has expiration date (e.g., 30 days); after expiration, customer may lose deposit or layaway may be cancelled; verify expiration tracking
- **Layaway cancellation:** If layaway is cancelled before full payment, customer may receive full/partial deposit refund (store policy dependent); verify cancellation handling
- **Layaway with no items:** POS should prevent creating layaway with no items; verify validation
- **Layaway mode exit:** Cashier can exit layaway mode by cancelling transaction or selecting different order type; verify mode switching
- **Multiple layaways for same customer:** Customer can have multiple open layaways; verify all are tracked separately
- **Inventory commitment:** Items on layaway are marked "Committed"; verify items are not available for sale to other customers
- **Tender type restrictions:** Store policy may restrict layaway deposits to cash, check, or direct deposit (not credit cards); verify tender type policy enforcement (if configured)
- **POS offline then sync later:** Layaway created locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify layaway appears in Central after retry
- **Duplicate prevention across repeated sync attempts:** Layaway sync is idempotent; repeated sync does not create duplicates in Central
- **Consistency Checker:** If layaway fails to sync, run Consistency Checker to synchronize missing layaway records to Central

## Known Issues / Notes

- Video link: https://somup.com/cOehlwWPYO
- Reference: RMH documentation - [Creating layaway orders](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/layaways-creating.md)
- Reference: RMH documentation - [About layaways](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/about-layaways.md)
- Reference: RMH documentation - [Setting up layaways](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_UG_Topics/setting-up-layaways.md)
- **Layaway purpose:** Allow customers to reserve items and pay over time; store holds items until fully paid
- **Layaway icon:** When in layaway mode, layaway icon displays in top right corner of POS screen
- **Customer selection required:** Unlike work orders, layaways **require** customer selection (cannot create without customer)
- **Layaway configuration:**
  - **Expiration:** Maximum days customer has to pay off balance (File | Configuration | Ordering rules | Layaway | Expiration)
  - **Deposit:** Minimum deposit percentage (File | Configuration | Ordering rules | Layaway | Deposit)
- **Best practices (from RMH documentation):**
  - Set expiration to 30 days (encourages quick payoff; minimizes storage issues)
  - Require at least 20% deposit
  - Accept only cash, direct deposit, or check for deposits (avoids transaction fees)
- **Inventory commitment:** Items on layaway are marked "Committed":
  - **On-Hand:** Unchanged (items physically in store)
  - **Available:** Decreased (On-Hand - Committed)
  - Items not available for sale to other customers
  - Items shown as "Committed" on Inventory tab in Store Manager
- **Layaway storage:** Items held in back office or storage area until customer pays balance
- **Deposit requirement:** Store configures minimum deposit percentage; customer can pay more; cashier can override
- **Expiration date:** Calculated from configuration; cashier can override
- **Payment at creation:** Customer pays initial deposit when layaway is created
- **Layaway receipt:** Receipt shows total amount, deposit paid, **balance owing**, and **expiration date**
- **Layaway lifecycle:**
  1. **Create:** Layaway created with deposit; items marked committed
  2. **Store:** Items held in back office until paid off
  3. **Payments:** Customer returns to make incremental payments (Orders | Payments | Payment on Layaway)
  4. **Pickup:** When fully paid, customer picks up items; items released from committed status
  5. **Expiration/Cancellation:** If not paid by expiration, layaway may be cancelled (store policy)
- **Layaway vs. other order types:**
  - **Layaway:** Customer reserves items; makes multiple payments over time; cannot take items until fully paid; items committed
  - **Work Order:** Items require assembly/pulling; deposit required; pick up when ready
  - **Back Order:** Items out of stock; customer reserves for when available
  - **Quote:** Price estimate; no commitment to purchase
- **Cancellation policy:** Store policy determines if customer receives full/partial deposit refund if layaway is cancelled
- **Local laws:** Some jurisdictions have laws governing layaway agreements, deposits, and cancellations
