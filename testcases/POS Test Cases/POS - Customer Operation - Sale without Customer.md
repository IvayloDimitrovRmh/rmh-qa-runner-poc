# Customer Operation

## Metadata

Feature: Customer Operation  
Business Area: Customer Operation  
Source System: POS  
Target System: Central  
Sync Direction: Store -> Central  
Release: TBD  
Priority: 3

---

# Scenario: Sale w/o customer

## Business Entity

Sale transaction (no customer assigned)

## Business Purpose

Allow completing sales without attaching a customer while still ensuring the transaction is centrally available for reporting and reconciliation. This supports walk-in sales, anonymous purchases, and stores that do not require customer tracking for every transaction.

## Trigger

Cashier completes a sale without selecting/assigning a customer.

## Preconditions

- POS is operational and cashier is logged in
- Items are added to the transaction (items exist in inventory with valid Item Lookup Codes)
- "Require customer selection for sales" store rule is **not** enabled (File | Configuration | Store Rules | Customer Options)
- If "Prompt for customer selection" is enabled, cashier can skip customer selection or dismiss the prompt
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Complete a sale in POS without selecting a customer:**
1. Do **not** tap Customers | Lookup Customer (skip customer selection entirely)
   - If "Prompt for customer selection" is enabled, dismiss the customer lookup prompt
   - Customer pane at top of POS screen remains empty (no customer assigned)
2. Add items to the transaction (scan barcode, enter Item Lookup Code, or use item lookup)
3. Tap **Transaction | Tender Sale** or press **F12** or **Enter**
4. On the Tender screen, enter the tender amount next to the relevant tender type
5. Tap **OK**
6. If customer wants a receipt, tap **Yes** to print the receipt
7. Receipt prints without customer information (anonymous sale)

## Expected Synchronization Behavior

- Insert: Insert the sale transaction in Store database and sync/insert the corresponding transaction in Central database (transaction has no customer ID/reference)
- Update: Not applicable for new sale transactions (completed sales are not updated; voids/returns create separate transactions)
- Delete: Not applicable (completed sales are not deleted; voids create reversing transactions)
- Matching key: Transaction number (unique identifier from Store to Central); Store ID + Transaction number

## Expected Result in Source System

- Sale transaction is created/visible in POS (Store database)
- No customer is associated with the sale (customer ID is null/blank)
- Transaction record shows no customer name, phone, or customer information
- Transaction is visible in Store Manager (Journal | Transactions) without customer details

## Expected Result in Target System

- Sale transaction is created/visible in Central database after sync
- No customer is associated with the sale in Central (customer ID is null/blank)
- Transaction syncs automatically via Central Client
- Transaction is available for Central Manager reporting (appears as anonymous/walk-in sale)

## Validation Points

- Verify sale exists in POS without customer assignment
- Verify sale exists in Store Manager (Journal | Transactions) with no customer details
- Verify sale exists in Central after sync
- Verify customer field/ID is null/blank in both Store and Central
- Verify transaction number matches between Store and Central
- Mapping validation: Transaction fields (Store ID, Transaction number, line items, tender type, total, timestamp) map correctly from Store to Central
- Duplicate prevention: No duplicate sale in Central for the same Store ID + Transaction number

## Negative / Edge Case Coverage

- **POS offline at sale time:** Sale created locally in Store database without customer, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify transaction appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Transaction sync is idempotent; repeated sync of same transaction does not create duplicates in Central
- **Void/refund behavior for sale without customer:** Voiding or returning a sale without customer may require cashier to manually locate transaction by transaction number or date (cannot search by customer name); return creates reversing transaction also without customer assignment
- **Return lookup without customer:** If customer returns an item from anonymous sale, cashier must use **Recall for Return** and search by transaction number or date (cannot search by customer name or phone)
- **Store rules enforcement:** If "Require customer selection for sales" is enabled (File | Configuration | Store Rules | Customer Options), POS prevents sale completion until customer is selected; verify rule enforcement
- **Prompt for customer selection:** If "Prompt for customer selection" is enabled, POS displays customer lookup prompt at transaction start; cashier can dismiss prompt to proceed without customer
- **Always display 'Find' window for customers:** If enabled, POS always shows customer Find screen; cashier can cancel to proceed without selecting customer (unless "Require customer selection for sales" is also enabled)
- **Reporting and analytics:** Sales without customers appear as anonymous/walk-in sales in reports; verify aggregate reporting includes these transactions
- **Loyalty program:** If store uses Loyalty Manager, sales without customer assignment do not earn loyalty points; customer cannot redeem rewards on anonymous sales
- **Consistency Checker:** If transaction fails to sync, run Consistency Checker to synchronize missing transactions to Central

## Known Issues / Notes

- Video link: https://somup.com/cOnDD1WOvi
- Reference: RMH documentation - [Transaction policies](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/policies-transactions.md)
- Reference: RMH documentation - [Setting up store rules](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-store-rules.md)
- Reference: RMH documentation - [Advantages of collecting customer information](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_UG_Topics/advantages-collecting-customer-info.md)
- **Customer selection is optional by default** in RMH POS; stores must explicitly enable "Require customer selection for sales" to force customer tracking
- Store rules for customer selection (File | Configuration | Store Rules | Customer Options):
  - **"Require customer selection for sales"** - Forces customer selection; sale cannot complete without customer
  - **"Prompt for customer selection"** - Displays customer lookup prompt but allows cashier to skip
  - **"Always display 'Find' window for customers"** - Shows customer Find screen instead of list; can be canceled
- Some stores (e.g., firearms dealers) are legally required to collect customer information for every transaction; use "Require customer selection for sales" for compliance
- Sales without customers are common for walk-in retail, anonymous purchases, cash-only transactions, or stores that don't track individual customer data
- Returns for anonymous sales require transaction number or date lookup (cannot search by customer); recommend providing receipt to customer
- Loyalty program requires customer assignment; anonymous sales do not earn or redeem loyalty points
- Customer assignment enables features like purchase history, loyalty rewards, commission tracking, and personalized marketing