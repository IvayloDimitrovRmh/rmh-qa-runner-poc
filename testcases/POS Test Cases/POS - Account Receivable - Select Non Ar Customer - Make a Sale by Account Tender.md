# Account Receivable (Application method - Manual /Apply to oldest)

## Metadata

Feature: Account Receivable (Application method - Manual /Apply to oldest)  
Business Area: Account Receivable  
Source System: POS  
Target System: Central  
Sync Direction: N/A (transaction should be blocked)  
Release: TBD  
Priority: 9

---

# Scenario: Select non AR customer > Make a sale by Account Tender

## Business Entity

Sale transaction / Account Receivable tender (validation/error scenario)

## Business Purpose

Prevent unauthorized use of Account Receivable (Store Credit) tender by validating customer eligibility and ensuring non-AR customers cannot use Account tender, protecting the store from extending credit to unapproved customers.

## Trigger

User selects a non-AR customer (regular customer without AR account) in POS and attempts to complete a sale using Account (Store Credit) tender.

## Preconditions

- POS is operational and cashier is logged in
- A **non-AR customer** is selected:
  - Customer exists in POS customer database
  - Customer does **NOT** have AR account linked (Customer | Account Receivable tab is not configured or empty)
  - Customer is not in an AR Account Group
- Items are available to sell and have been added to transaction
- Store Credit tender type is configured (Setup | Financial | Tender Types | Store Credit tender)
- User has permission to tender sales (no specific AR tender permission documented; controlled by general POS tender permissions)
- Store is in online mode with connectivity to Central database (or offline mode)

## Action

**Select a non-AR customer in POS and attempt to make a sale by Account (Store Credit) tender:**
1. Tap **Customers | Lookup Customer** or press **F7**
2. Search for non-AR customer by name, phone, or customer ID and press **Enter**
3. Select the **non-AR customer** (customer without AR account)
4. Customer information displays in Customer pane at top of POS screen
   - **No AR information** displays (no Available Credit, Balance Due, or Next Payment Due fields)
   - Customer is a regular customer, not configured for Store Credit
5. Add items to transaction (scan or enter Item Lookup Codes)
6. Tap **Transaction | Tender Sale** or press **F12**
7. On the Tender screen, attempt to enter tender amount next to **Store Credit** tender type
8. **POS displays validation error/message** preventing use of Store Credit tender:
   - Error message may state: "Customer is not set up for store credit" or "Account tender not available for this customer" (exact message TBD - not documented)
   - Store Credit tender field may be **disabled/grayed out** for non-AR customers
9. Cashier must use a different tender type:
   - Cash
   - Credit Card
   - Debit Card
   - Other available tender types (NOT Store Credit)
10. Enter payment amount next to appropriate tender type
11. Tap **OK** to complete sale
12. Transaction is tendered successfully using allowed tender type (not Store Credit)

## Expected Synchronization Behavior

- Insert: If sale is completed using allowed tender type (Cash, Card, etc.), insert the sale transaction in Store database and sync/insert to Central database (normal sale transaction, **NOT** AR transaction)
- Update: Not applicable (regular sale, not AR account update)
- Delete: Not applicable
- Matching key: Transaction number (unique identifier from Store to Central); Store ID + Transaction number

**Note:** If cashier is blocked from using Store Credit tender and does not complete sale, no transaction is created or synced.

## Expected Result in Source System

- **POS displays validation message/error** preventing use of Store Credit (Account) tender for non-AR customer
- Store Credit tender field is **disabled or shows error** when cashier attempts to use it
- Sale **cannot be completed** using Store Credit tender
- Cashier must select different tender type to complete sale
- If sale is completed using allowed tender type:
  - Sale transaction is created/visible in POS
  - **No AR invoice created** (not an AR transaction)
  - Customer AR balance **not updated** (customer has no AR account)
  - Transaction appears in Journal (Transaction | Receipt | Journal) as regular sale
- If cashier cancels transaction instead of using different tender:
  - Transaction is cancelled (no sale created)
  - No AR activity recorded

## Expected Result in Target System

- **No AR transaction** should be created in Central (Store Credit tender was blocked)
- If sale is completed using allowed tender type:
  - Regular sale transaction is created/visible in Central after sync
  - Transaction syncs automatically via Central Client
  - **No AR invoice** in Central (regular sale, not AR)
- If transaction was cancelled:
  - No transaction in Central

## Validation Points

- Verify **validation message/error is displayed** when cashier attempts to use Store Credit tender for non-AR customer
- Verify **Store Credit tender is blocked** for non-AR customer (field disabled or error shown)
- Verify **no sale transaction with Store Credit tender** is created in POS for non-AR customer
- Verify cashier **can complete sale using other tender types** (Cash, Card, etc.)
- Verify **no AR invoice created** in POS or Central for non-AR customer
- Verify **no AR balance update** for non-AR customer (customer has no AR account)
- Verify if sale is completed with allowed tender, regular sale transaction exists in POS and Central
- Verify **no corresponding AR transaction** exists in Central

## Negative / Edge Case Coverage

- **Customer AR status changes mid-transaction:** If customer is converted to AR customer in Store Manager while transaction is in progress in POS, POS uses customer status at time customer was selected; to apply updated AR status, clear customer and re-select customer
- **Bypass validation attempt (security):** POS should enforce AR tender validation at system level; cashier cannot override without proper AR account setup; no documented permission to bypass AR validation
- **Cashier selects wrong customer:** If cashier selects non-AR customer by mistake, they should:
  - Clear customer (Customers | Clear Customer)
  - Select correct AR customer
  - Retry tender with Store Credit
- **Customer requests Store Credit but is not approved:** If non-AR customer requests to buy on credit but is not approved:
  - Store policy: Do not extend credit without AR account setup
  - Cashier should explain store policy
  - Customer must pay with Cash, Card, or other allowed tender
  - If customer wishes to apply for Store Credit, they must complete AR application process (store-specific, not in POS)
- **Mixed customer types in transaction (not applicable):** POS only allows one customer per transaction; cannot mix AR and non-AR customers in single transaction
- **No customer selected:** If cashier attempts to use Store Credit tender without selecting any customer, POS prevents it; customer must be selected first
- **Customer with AR account but $0 credit limit:** If customer has AR account linked but Credit Limit is $0, they effectively cannot use Store Credit; similar to non-AR customer scenario
- **Customer with inactive AR account:** If customer AR account is deactivated or inactive, Store Credit tender should be blocked; verify account status validation
- **POS offline:** If POS is offline, AR account validation still enforced locally; customer must have AR account in local Store database to use Store Credit
- **Sequential tendering:** If sequential tendering is enabled (release 3.50.3), cashier cannot add Store Credit as one of the sequential tenders for non-AR customer
- **Store Credit tender type not configured:** If Store Credit tender type is not configured in POS, it does not appear as option for any customer (AR or non-AR)

## Known Issues / Notes

- **Video link:** TBD
- **Notes:** Expected text states Account tender should not be allowed with validation message/error
- Reference: RMH documentation - [Tendering store credit](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/transactions-tendering-store-credit.md)
- Reference: RMH documentation - [About AR](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/about-ar.md)
- Reference: RMH documentation - [AR best practices](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_UG_Topics/accounts-receivable-best-practices.md)
- **Store Credit validation:** POS enforces that only customers with AR accounts can use Store Credit tender
- **Non-AR customer definition:** Customer exists in POS but does not have AR account linked (Customer | Account Receivable tab not configured)
- **AR account linking:** To enable Store Credit for customer, must link customer to AR account in Store Manager (Customer | Customers | select customer | Account Receivable tab)
- **AR account requirement:** Customer must be assigned to AR Account Group with credit limit to use Store Credit
- **Validation enforcement:** POS validates AR account at tender time; Store Credit tender field disabled or shows error for non-AR customers
- **Exact validation message TBD:** Specific error message text shown by POS when non-AR customer attempts Store Credit is not documented; may vary by RMH version
- **No bypass permission:** RMH documentation does not mention permission to bypass AR validation; AR account setup is required
- **Store policy:** AR best practices state "Make sure the company or person is credit worthy" - customer must be approved and AR account set up before Store Credit can be used
- **Alternative tender types:** Non-AR customers can use Cash, Credit Card, Debit Card, Vouchers, or other configured tender types (just not Store Credit)
- **Customer application process:** Store-specific process for customer to apply for Store Credit account (outside RMH system); once approved, AR account is set up in Store Manager
- **AR account setup steps:** To enable Store Credit for customer:
  1. Set up AR Account Group (Setup | Customer | Account Groups) with Credit Limit
  2. Link customer to AR account (Customer | Customers | select customer | Account Receivable tab | assign Account Group)
  3. Customer can now use Store Credit in POS
- **Security control:** AR validation prevents unauthorized credit extension; only approved customers with AR accounts can use Store Credit
