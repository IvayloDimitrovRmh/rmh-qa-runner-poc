# Account Receivable (Application method - Manual /Apply to oldest)

## Metadata

Feature: Account Receivable (Application method - Manual /Apply to oldest)  
Business Area: Account Receivable  
Source System: POS  
Target System: Central  
Sync Direction: Store -> Central  
Release: TBD  
Priority: 9

---

# Scenario: Select AR customer > Make a sale more than available credit limit by Account Tender

## Business Entity

Sale transaction / Account Receivable tender / Split tender (AR credit + additional tender type)

## Business Purpose

Allow AR customers to use their available credit and require additional payment methods when sale exceeds credit limit, ensuring accurate AR balance tracking and preventing customers from exceeding their approved credit limit in both Store and Central.

## Trigger

User selects an AR customer in POS and attempts to complete a sale where the transaction total exceeds the customer's available credit limit using Account (Store Credit) tender.

## Preconditions

- POS is operational and cashier is logged in
- An AR (Store Credit) customer exists and is configured:
  - Customer has AR account linked (Customer | Account Receivable tab in Store Manager)
  - Customer has credit limit set in AR Account Group (Setup | Customer | Account Groups | Credit Limit field)
  - Customer has available credit (Available Credit = Credit Limit - Current Balance)
- Items are available to sell and have been added to transaction
- Sale transaction total **exceeds** the customer's available credit limit
- Store Credit tender type is configured (Setup | Financial | Tender Types | Store Credit tender)
- User has permission to tender sales (no specific AR tender permission documented; controlled by general POS tender permissions)
- Store policy enforces credit limits: "Hold the company or person to their credit limit and payment terms" (AR best practice)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Select an AR customer in POS and make a sale that exceeds the available credit limit by Account (Store Credit) tender:**

**Note:** Based on available RMH documentation, the exact behavior when sale exceeds available credit is **not explicitly documented**. The following describes the expected workflow based on AR best practices and split tender functionality:

1. Tap **Customers | Lookup Customer** or press **F7**
2. Search for AR customer by name, phone, or customer ID and press **Enter**
3. Select the AR customer
4. Customer information displays in Customer pane at top of POS screen, including:
   - **Available Credit:** Remaining credit available (Credit Limit - Current Balance)
   - **Balance Due:** Current outstanding balance
   - **Next Payment Due:** Next payment due date (if applicable)
5. Add items to transaction (scan or enter Item Lookup Codes)
6. Transaction total exceeds customer's **Available Credit**
   - Example: Available Credit = $500, Transaction Total = $750 (exceeds by $250)
7. Tap **Transaction | Tender Sale** or press **F12**
8. On the Tender screen, transaction total displays (e.g., $750)

**Scenario A: POS enforces credit limit (TBD - not explicitly documented)**
- POS may prevent tendering more than Available Credit to Store Credit tender
- Cashier must use split tender: Available Credit ($500) to Store Credit + remaining amount ($250) to another tender type
- Enter $500 next to **Store Credit** tender type
- Enter $250 next to another tender type (e.g., **Cash**, **Credit Card**, etc.)
- Tap **OK** to complete split tender
- AR balance increases by $500 (amount charged to Store Credit)
- Remaining $250 paid via other tender type

**Scenario B: POS allows exceeding credit limit (TBD - not explicitly documented)**
- POS may allow tendering full amount to Store Credit even if it exceeds Available Credit
- Store policy should prevent this (best practice: "Hold the company or person to their credit limit")
- If allowed, AR balance would exceed credit limit (not recommended)

**Note:** RMH AR best practices state "Hold the company or person to their credit limit and payment terms," suggesting credit limits should be enforced

9. After tendering, on the Register Transaction screen, verify:
   - Customer's updated **Balance Due**
   - Customer's updated **Available Credit**
   - Next payment due date
10. Tap **Finish**
11. Tap **Yes** to print the receipt showing:
    - Items purchased
    - Split tender details (if applicable)
    - Updated AR balance information
12. Sale transaction is recorded in Store database and queued for sync to Central

## Expected Synchronization Behavior

- Insert: Insert the sale transaction (with split tender: partial Store Credit + other tender type) in Store database and sync/insert the corresponding transaction in Central database
- Update: AR customer balance is updated in Store (increased by amount charged to Store Credit) and synced to Central
- Delete: Not applicable (sales are not deleted; voids create reversing transactions)
- Matching key: Transaction number (unique identifier from Store to Central); Store ID + Transaction number; AR customer account ID

## Expected Result in Source System

- **If split tender used:**
  - POS allows use of available credit via Store Credit tender (up to Available Credit limit)
  - POS requires remaining payment using another tender type
  - Sale transaction is created/visible in POS with split tender details:
    - Store Credit tender: Amount up to Available Credit (e.g., $500)
    - Other tender (Cash/Card/etc.): Remaining amount (e.g., $250)
- AR customer balance is updated in Store:
  - **Balance Due** increases by amount charged to Store Credit (e.g., +$500)
  - **Available Credit** decreases by amount charged to Store Credit (e.g., $500 → $0 if fully used)
- Transaction appears in Journal (Transaction | Receipt | Journal)
- Transaction is visible in Store Manager (Journal | Transactions) with split tender details
- AR invoice is created for the amount charged to Store Credit
- Receipt prints showing:
  - Split tender breakdown
  - Updated AR balance information (Balance Due, Available Credit, Next Payment Due)
- Inventory is adjusted (items subtracted from on-hand quantity)

## Expected Result in Target System

- Sale transaction is created/visible in Central database after sync
- Split tender details are reflected in Central (Store Credit amount + other tender amount)
- AR balance is updated in Central (matches Store):
  - Customer Balance Due increased by Store Credit amount
  - Available Credit decreased by Store Credit amount
- Transaction syncs automatically via Central Client
- Transaction is available for Central Manager reporting
- AR invoice for Store Credit portion syncs to Central
- AR reports show updated customer balance and credit utilization

## Validation Points

- **If split tender enforced:**
  - Verify available credit is applied correctly in POS (amount charged to Store Credit ≤ Available Credit)
  - Verify remaining payment is collected via other tender type
  - Verify split tender details are correct (Store Credit + other tender = transaction total)
- Verify sale transaction exists in POS with split tender breakdown
- Verify sale transaction exists in Store Manager (Journal | Transactions)
- Verify sale transaction exists in Central after sync
- Verify AR balance is updated correctly in POS, Store Manager, and Central:
  - Balance Due increased by Store Credit amount
  - Available Credit decreased by Store Credit amount
  - Credit Limit unchanged
- Verify split tender amounts map correctly from Store to Central
- Mapping validation: Transaction fields (Store ID, Transaction number, customer account ID, split tender details, AR balance updates, timestamp) map correctly from Store to Central
- Duplicate prevention: No duplicate sale in Central for the same Transaction number

## Negative / Edge Case Coverage

- **Sale exactly equals available credit:** Customer can tender full amount to Store Credit; no split tender needed; Available Credit becomes $0 after sale
- **Sale exceeds credit limit but POS allows (TBD):** If POS allows exceeding credit limit, this violates AR best practice; store should configure to prevent this; verify credit limit enforcement
- **Credit limit changes mid-transaction (TBD):** If AR account credit limit is changed in Store Manager while transaction is in progress in POS, POS uses credit limit/available credit active at time customer was selected; to apply updated credit limit, clear customer and re-select
- **Second tender payment declined/failed (TBD):** If split tender is used and second tender type (e.g., credit card) is declined, cashier must use different tender type or cancel transaction; Store Credit portion may need to be voided if transaction is cancelled
- **Customer attempts to use more Store Credit than available (TBD):** POS should prevent entering Store Credit amount > Available Credit; cashier should receive error/warning; verify credit limit enforcement
- **Zero available credit:** If customer has $0 Available Credit, POS should prevent using Store Credit tender; entire transaction must be paid with other tender types
- **Negative available credit (over-limit):** If customer account is already over credit limit (Balance Due > Credit Limit), Available Credit shows as negative or $0; POS should prevent using Store Credit tender
- **Store Credit tender with no customer selected:** If cashier attempts to use Store Credit tender without selecting AR customer, POS prevents it; customer must be selected first
- **Customer not linked to AR account:** If customer exists but is not linked to AR account (no Account Receivable tab configured), Store Credit tender is not available
- **Multiple AR accounts per customer (TBD):** RMH documentation does not clearly address multiple AR accounts per customer; typically one customer = one AR account
- **POS offline then sync later:** Sale with split tender (Store Credit + other) created locally in Store database, then synced to Central when connectivity is restored; AR balance update also queued for sync
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify sale and AR balance update appear in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Sale sync is idempotent; repeated sync does not create duplicate transactions or double-charge AR balance
- **AR invoice creation:** Sale charged to Store Credit creates AR invoice in Store; verify invoice syncs to Central and appears in customer AR statement
- **Statement generation:** Customer AR statement includes all invoices (including split tender transactions); verify statement accuracy
- **Consistency Checker:** If sale or AR balance update fails to sync, run Consistency Checker to synchronize missing records to Central

## Known Issues / Notes

- **Video link:** TBD
- **Notes:** Expected text states should allow available credit use and prompt for remaining payment; should insert into Store and Central
- Reference: RMH documentation - [Tendering store credit](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/transactions-tendering-store-credit.md)
- Reference: RMH documentation - [About AR](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/about-ar.md)
- Reference: RMH documentation - [Processing AR payments](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/processing-payments-ar.md)
- Reference: RMH documentation - [AR best practices](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_UG_Topics/accounts-receivable-best-practices.md)
- Reference: RMH documentation - [Setting up account groups](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_UG_Topics/setting-up-account-groups.md)
- **CRITICAL - TBD:** Specific behavior when sale exceeds available credit limit is **not explicitly documented** in RMH documentation; the scenarios described above (split tender enforcement vs. allowing over-limit) are inferred from AR best practices and general tender behavior
- **AR best practice:** RMH documentation states "Hold the company or person to their credit limit and payment terms," indicating credit limits should be enforced
- **Store Credit = Account Receivable:** "Store Credit" and "Account Receivable (AR)" refer to the same functionality in RMH; customer buys on credit and pays later
- **AR account setup required:** Customer must have AR account linked (Customer | Account Receivable tab) to use Store Credit tender
- **Credit limit configured in Account Group:** Credit limit is set at AR Account Group level (Setup | Customer | Account Groups | Credit Limit); all customers in same account group share same credit limit
- **Available Credit calculation:** Available Credit = Credit Limit - Balance Due
- **Balance Due:** Total of all unpaid AR invoices for customer
- **AR customer information in POS:** When AR customer is selected, POS displays:
  - Available Credit
  - Balance Due
  - Next Payment Due date (if applicable)
- **Store Credit tender type:** Must be configured in Setup | Financial | Tender Types
- **AR invoice creation:** Each sale charged to Store Credit creates an AR invoice
- **Application method:** Account Groups can be configured with "Manual" or "Apply to oldest" application method for AR payments; this affects how payments are applied to invoices, not how sales are tendered
- **Split tender support:** RMH supports split tender (multiple tender types in one transaction); this can be used to stay within credit limits
- **Sequential tendering:** Starting with release 3.50.3, RMH supports sequential tendering (process payments one at a time); this may be relevant for split tender scenarios
- **No explicit credit limit override permission:** RMH documentation does not mention a specific permission to override credit limits; enforcement is through configuration and store policy
- **AR reporting:** AR reports in Central Manager and Store Manager track customer balances, aging, and credit utilization
