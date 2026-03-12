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

# Scenario: Sale with customer

## Business Entity

Sale transaction (customer-associated)

## Business Purpose

Capture customer-linked sales and synchronize them to Central to support customer analytics, loyalty/CRM processes, purchase history tracking, and centralized reporting.

## Trigger

Cashier completes a sale after selecting/assigning a customer.

## Preconditions

- POS is operational and cashier is logged in
- Items are added to the transaction (items exist in inventory with valid Item Lookup Codes)
- A customer exists in the system (created in Store Manager or POS under Customer | Customers)
- Customer can be looked up in POS by name, phone number, or any combination
- Store rules for customer selection are configured per store policy (File | Configuration | Store Rules | Customer Options)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Complete a sale in POS with a selected customer:**
1. Tap **Customers | Lookup Customer** or press **F7**
2. On the customer lookup screen, type all or part of the customer's name, phone number, or any combination and press **Enter**
3. To select the customer, do one of the following:
   - Tap the customer's name once and tap **Select**
   - Tap the customer's name twice
4. The customer's information displays in the **Customer pane** at the top of the POS screen
5. Add items to the transaction (scan barcode, enter Item Lookup Code, or use item lookup)
6. Tap **Transaction | Tender Sale** or press **F12** or **Enter**
7. On the Tender screen, enter the tender amount next to the relevant tender type
8. Tap **OK**
9. If customer wants a receipt, tap **Yes** to print the receipt
10. Receipt prints with customer information (name, phone, address if configured)

## Expected Synchronization Behavior

- Insert: Insert the sale transaction in Store database and sync/insert the corresponding transaction in Central database (transaction includes customer ID/reference)
- Update: Not applicable for new sale transactions (completed sales are not updated; voids/returns create separate transactions)
- Delete: Not applicable (completed sales are not deleted; voids create reversing transactions)
- Matching key: Transaction number (unique identifier from Store to Central); Store ID + Transaction number; Customer ID links transaction to customer record

## Expected Result in Source System

- Sale transaction is created/visible in POS (Store database)
- Customer is associated with the sale (customer ID is stored with transaction)
- Customer name and information are visible in Customer pane during transaction
- Transaction appears in customer's purchase history (Customers | Edit Customer | Purchases tab)
- Transaction is visible in Store Manager (Journal | Transactions) with customer details

## Expected Result in Target System

- Sale transaction is created/visible in Central database after sync
- Customer association is present in Central (customer ID is stored with transaction)
- Transaction appears in customer's purchase history in Central
- Transaction syncs automatically via Central Client
- Transaction is available for Central Manager reporting with customer analytics (top customers, customer ordering trends, profit margins)

## Validation Points

- Verify sale exists in POS with customer assignment
- Verify customer name displays in Customer pane during transaction
- Verify customer appears in sale record in Store Manager (Journal | Transactions)
- Verify sale exists in Central after sync
- Verify customer association is present in Central (customer ID matches)
- Verify transaction appears in customer's purchase history (POS: Customers | Edit Customer | Purchases tab)
- Verify transaction appears in customer's purchase history in Central
- Mapping validation: Transaction fields (Store ID, Transaction number, Customer ID, line items, tender type, total, timestamp) map correctly from Store to Central
- Duplicate prevention: No duplicate sale in Central for the same Store ID + Transaction number

## Negative / Edge Case Coverage

- **Customer selected but sync fails; retry sync:** Central Client automatically retries failed sync jobs; verify transaction with customer association appears in Central after retry (check Central Client Dashboard for failed jobs)
- **POS offline; sale created locally then synced later:** Transaction created locally in Store database with customer association, then synced to Central when connectivity is restored; customer association is preserved
- **Customer record missing in Central at sync time:** If customer is created in Store but not yet synced to Central, transaction sync may fail or be delayed until customer record syncs; Consistency Checker can synchronize customer records and transactions
- **Customer sync before transaction sync:** RMH typically syncs customer records before transactions; verify customer exists in Central before transaction sync (dependency management)
- **Void/refund of customer-linked sale:** Voiding or returning a customer-linked sale creates a separate reversing transaction also linked to the same customer; customer's purchase history shows both original sale and void/return
- **Return lookup by customer:** If customer returns an item, cashier can use **Recall for Return** and search by customer name or phone; POS displays customer's transaction list for easy lookup
- **Reprint receipt for customer transaction:** Cashier can tap Customers | Lookup Customer, select customer, tap Customers | Edit Customer, go to Purchases tab, tap transaction number, and reprint receipt
- **Loyalty program integration:** If store uses Loyalty Manager, sales with customer assignment earn loyalty points; customer can redeem rewards on transactions; anonymous sales do not earn points
- **Customer purchase history:** Transaction appears in customer's purchase history in both POS and Central; useful for returns, analytics, and customer service
- **Store rules enforcement:** If "Require customer selection for sales" is enabled (File | Configuration | Store Rules | Customer Options), POS prevents sale completion without customer; verify rule enforcement
- **Prompt for customer selection:** If "Prompt for customer selection" is enabled, POS prompts cashier to select customer at transaction start; cashier can proceed with or without customer per store policy
- **Consistency Checker:** If transaction or customer fails to sync, run Consistency Checker to synchronize missing records to Central

## Known Issues / Notes

- Video link: https://somup.com/cOnDDrWOwH
- Reference: RMH documentation - [Transaction policies](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/policies-transactions.md)
- Reference: RMH documentation - [Reprinting receipts](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/transactions-reprint_receipt.md)
- Reference: RMH documentation - [Processing returns](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/processing-returns.md)
- Reference: RMH documentation - [Advantages of collecting customer information](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_UG_Topics/advantages-collecting-customer-info.md)
- **Customer information displays in Customer pane** at the top of the POS screen during the transaction (visible while cashier rings up items)
- Customer lookup is performed by pressing **F7** or tapping **Customers | Lookup Customer**
- Customer can be searched by **name, phone number, or any combination** (partial search supported)
- Customer selection can be **two-click** (tap once + tap Select) or **double-click** (tap customer name twice)
- Transaction is linked to customer via **Customer ID** stored in transaction record
- Customer's **purchase history** is accessible in POS (Customers | Edit Customer | Purchases tab) and Central
- Returns for customer-linked sales can be looked up by **customer name or phone** (easier than anonymous sales which require transaction number)
- Loyalty program requires customer assignment; anonymous sales do not earn or redeem points
- Store rules for customer selection (File | Configuration | Store Rules | Customer Options):
  - **"Require customer selection for sales"** - Forces customer selection; sale cannot complete without customer
  - **"Prompt for customer selection"** - Displays customer lookup prompt at transaction start; optional
  - **"Always display 'Find' window for customers"** - Shows customer Find screen instead of list
- Custom fields can be configured to collect additional customer information (Setup | Miscellaneous | Custom Fields)
- Primary sales representative can be assigned to customer (Customer | Customers | Customer Options tab) for commission tracking