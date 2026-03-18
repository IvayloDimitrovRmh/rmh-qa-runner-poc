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