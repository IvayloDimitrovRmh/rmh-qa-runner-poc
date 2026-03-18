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