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

# Scenario: Make a payment on Layaway

## Business Entity

Layaway payment transaction

## Business Purpose

Allow customers to make incremental payments on their layaway orders, reducing the balance owing and bringing them closer to full payment and item pickup, while tracking payment history and remaining balance.

## Trigger

Customer returns to store to make a payment on an existing layaway order; user processes the payment in POS.

## Preconditions

- POS is operational and cashier is logged in
- Layaway order exists in Store database (previously created)
- Layaway is in "open" status (not fully paid or cancelled)
- Layaway has balance owing (total - payments already made)
- Customer information is associated with layaway
- User has permission to process layaway payments (no specific layaway payment permission documented; controlled by general POS permissions)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Make a payment on layaway order:**

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
   - Payments already made (if any)
   - **Balance owing**
   - Expiration date
5. **Process payment on layaway:**
   - Tap **Orders | Payments | Payment on Layaway**
   - **Layaway Payment screen displays** showing:
     - Current balance owing
     - Field to enter payment amount
6. **Enter payment amount:**
   - Enter amount customer is paying
   - Customer can pay:
     - **Partial payment:** Any amount less than balance (reduces balance)
     - **Full balance:** Pay off entire remaining balance
     - **Minimum payment:** Store policy may require minimum payment amounts
   - **Note:** POS may show recommended or minimum payment amount
7. Tap **OK** to confirm payment amount
8. **POS proceeds to tender screen:**
   - Payment amount displays
   - Balance owing after payment displays (if partial payment)
9. Enter payment amount next to appropriate tender type:
   - **Store policy:** Many stores only accept **cash, direct deposit, or check** for layaway payments (to avoid transaction fees)
10. Tap **OK** to complete payment
11. Tap **Yes** to print payment receipt showing:
    - Layaway order number
    - Payment amount received
    - **Total paid to date** (all payments including this one)
    - **Remaining balance** (if not fully paid)
    - Expiration date
    - Items on layaway
12. **Layaway status updated:**
    - If full balance paid: Layaway ready for pickup
    - If partial payment: Layaway remains open with reduced balance
13. Payment transaction is recorded in Store database and queued for sync to Central
14. Customer receives payment receipt showing remaining balance and expiration date

**Alternative: Use POS command**
- Can use `Layaway_PaymentCommand` to initiate payment on layaway process (no parameters)

## Expected Synchronization Behavior

- Insert: Insert the layaway payment transaction in Store database and sync/insert the corresponding payment record in Central database
- Update: Layaway order balance is updated in Store (reduced by payment amount) and synced to Central
- Delete: Not applicable (payments are not deleted; if voided, reversing transaction created)
- Matching key: Layaway order number + Payment transaction number; Store ID + Layaway order number

## Expected Result in Source System

- Layaway payment transaction is created/visible in POS (Store database)
- **Layaway balance updated:**
  - Balance owing = Previous balance - Payment amount
  - Total paid to date increased by payment amount
- **Layaway status:**
  - If full balance paid: Status may change to "ready for pickup" or "paid in full"
  - If partial payment: Status remains "open" with updated balance
- Payment transaction appears in Journal (Transaction | Receipt | Journal)
- Payment is visible in Store Manager (Journal | Transactions)
- Layaway order in Store Manager shows updated balance and payment history
- Receipt prints showing payment details and remaining balance
- Payment recorded in batch totals
- **Inventory remains committed** (items still held for customer until pickup)

## Expected Result in Target System

- Layaway payment transaction is created/visible in Central database after sync
- **Layaway order updated in Central:**
  - Balance owing updated (matches Store)
  - Payment history updated
  - Total paid to date updated
- Payment transaction syncs automatically via Central Client
- Layaway is available for Central Manager reporting with updated balance
- Payment history tracked in Central

## Validation Points

- Verify layaway recalls successfully in POS
- Verify customer filtering works (if customer selected, only their layaways display)
- Verify layaway details correct when recalled (items, balance owing, expiration date)
- Verify payment amount can be entered (partial or full)
- Verify payment transaction created in POS
- Verify layaway balance updated correctly (previous balance - payment amount)
- Verify total paid to date updated correctly
- Verify payment exists in Store Manager (Journal | Transactions)
- Verify layaway order shows payment in payment history
- Verify payment syncs to Central
- Verify layaway balance update syncs to Central
- Verify receipt shows correct payment details and remaining balance
- Verify **layaway remains open** if partial payment (balance > 0)
- Verify **layaway ready for pickup** if full balance paid
- Verify inventory remains committed (if layaway not fully paid)
- Mapping validation: Payment amount, balance updates map correctly from Store to Central
- Duplicate prevention: No duplicate payment transactions in Central

## Negative / Edge Case Coverage

- **Layaway not found:** If layaway does not exist or is already completed/cancelled, POS prevents recall; verify validation
- **Customer filtering:** If customer selected but has no open layaways, recall screen shows "no layaways found"; verify message
- **All open layaways display:** If no customer selected, all open layaways display; cashier must search manually; verify full list accessibility
- **Multiple layaways for same customer:** Customer can have multiple open layaways; verify correct one can be selected
- **Layaway expired:** If layaway is past expiration date, it still appears in recall list; store policy determines if payment allowed; verify expired layaway handling
- **Overpayment:** If customer pays more than balance owing, POS should prevent or show warning; verify validation
- **Zero payment:** If cashier enters $0 payment, POS should prevent; verify validation
- **Negative payment:** POS should prevent negative payment amounts; verify validation
- **Minimum payment requirement:** Store policy may require minimum payment amounts; verify policy enforcement (if configured)
- **Multiple payments same day:** Customer can make multiple payments on same layaway; each payment creates separate transaction; verify multiple payment tracking
- **Payment then pickup:** If customer makes payment bringing balance to $0, they can pick up items immediately; verify pickup workflow after final payment
- **Payment declined:** If payment is declined (e.g., check bounces), layaway balance should not update; verify rollback
- **Tender type restrictions:** Store policy may restrict layaway payments to cash, check, or direct deposit; verify tender type policy enforcement
- **Layaway recall then cancel:** If cashier recalls layaway but cancels before processing payment, layaway remains unchanged; verify no payment recorded
- **Payment history view:** Order Details | Order History shows all transactions for layaway (initial deposit, payments); verify payment history display
- **POS offline then sync later:** Layaway payment created locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify payment appears in Central after retry
- **Duplicate prevention across repeated sync attempts:** Payment sync is idempotent; repeated sync does not create duplicates in Central
- **Consistency Checker:** If layaway payment fails to sync, run Consistency Checker to synchronize missing payment records to Central

## Known Issues / Notes

- Video link: https://somup.com/cOehlwWPYO
- Reference: RMH documentation - [Processing layaway orders](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/layaways-processing.md)
- Reference: RMH documentation - [About layaways](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/about-layaways.md)
- Reference: RMH documentation - [Setting up layaways](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_UG_Topics/setting-up-layaways.md)
- **Payment access:** Orders | Payments | Payment on Layaway
- **POS command available:** `Layaway_PaymentCommand` - Initiates payment on layaway process (no parameters)
- **Customer selection recommended:** Selecting customer before recalling layaway filters list to only that customer's layaways
- **Payment types:**
  - **Partial payment:** Customer pays less than full balance; layaway remains open
  - **Full payment:** Customer pays entire balance; layaway ready for pickup
- **Store policy - tender types:** Many stores only accept cash, direct deposit, or check for layaway payments (avoids transaction fees)
- **Payment flexibility:** Customer can pay any amount (subject to store minimum payment policy)
- **Balance calculation:** Balance = Total Layaway Amount - All Payments (deposit + incremental payments)
- **Total paid to date:** Cumulative total of all payments made on layaway (deposit + all incremental payments)
- **Payment receipt:** Receipt shows payment amount, total paid to date, remaining balance, and expiration date
- **Expiration tracking:** Layaway has expiration date; customer must pay off balance before expiration or layaway may be cancelled
- **Inventory commitment:** Items remain committed (held for customer) until layaway is fully paid and picked up
- **Payment workflow:**
  1. **Recall layaway:** Orders | Recalls | Recall a Layaway
  2. **Payment:** Orders | Payments | Payment on Layaway
  3. **Enter amount:** Customer specifies payment amount
  4. **Tender:** Process payment with allowed tender type
  5. **Receipt:** Print payment receipt showing remaining balance
  6. **(If balance $0) Pickup:** Customer can pick up items immediately
- **Layaway lifecycle:**
  1. **Create:** Layaway created with initial deposit
  2. **Payments:** Customer makes incremental payments (this scenario)
  3. **Pickup:** When fully paid, customer picks up items
  4. **(Or) Expiration/Cancellation:** If not paid by expiration, layaway cancelled
- **Payment history:** All layaway transactions (deposit, payments, pickup) tracked in order history (Orders | Order Details | Order History)
- **Final payment → pickup:** If payment brings balance to $0, customer can immediately proceed to pickup (Orders | Recalls | Recall a Layaway → Tender Sale → Pick up Entire)
- **Best practice:** Encourage customers to pay off layaway quickly (within expiration period) to free up inventory and storage space
