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