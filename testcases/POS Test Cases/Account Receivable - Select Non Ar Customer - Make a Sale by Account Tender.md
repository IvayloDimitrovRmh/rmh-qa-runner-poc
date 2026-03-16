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

## Validation Points

- Verify **validation message/error is displayed** when cashier attempts to use Store Credit tender for non-AR customer
- Verify **Store Credit tender is blocked** for non-AR customer (field disabled or error shown)
- Verify **no sale transaction with Store Credit tender** is created in POS for non-AR customer
- Verify cashier **can complete sale using other tender types** (Cash, Card, etc.)
- Verify **no AR invoice created** in POS or Central for non-AR customer
- Verify **no AR balance update** for non-AR customer (customer has no AR account)
- Verify if sale is completed with allowed tender, regular sale transaction exists in POS and Central
- Verify **no corresponding AR transaction** exists in Central