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

## Validation Points

- Verify sale exists in POS without customer assignment
- Verify sale exists in Store Manager (Journal | Transactions) with no customer details
- Verify sale exists in Central after sync
- Verify customer field/ID is null/blank in both Store and Central
- Verify transaction number matches between Store and Central
- Mapping validation: Transaction fields (Store ID, Transaction number, line items, tender type, total, timestamp) map correctly from Store to Central
- Duplicate prevention: No duplicate sale in Central for the same Store ID + Transaction number