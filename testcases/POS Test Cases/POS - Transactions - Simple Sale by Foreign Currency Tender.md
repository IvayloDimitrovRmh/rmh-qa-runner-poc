# Transactions

## Metadata

Feature: Transactions  
Business Area: Transactions  
Source System: POS  
Target System: Central  
Sync Direction: Store -> Central  
Release: TBD  
Priority: 2

---

# Scenario: Simple Sale by foreign currency Tender

## Preconditions

- POS is operational and cashier is logged in
- Items are added to the transaction (items exist in inventory with valid Item Lookup Codes)
- Foreign currency is configured in Setup | Financial | Currencies with valid exchange rate
- Foreign currency tender type is configured in Setup | Financial | Tender Types with the specific currency selected
- Exchange rate is defined for the foreign currency (conversion from foreign currency to local currency)
- Store rule "Return local currency" is configured per store policy (File | Configuration | Store Rules | POS)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Complete a simple sale in POS using foreign currency tender:**
1. Add items to the transaction (scan barcode, enter Item Lookup Code, or use item lookup)
2. Tap **Transaction | Tender Sale** or press **F12** or **Enter**
3. On the Tender screen, enter the tender amount next to the **foreign currency tender type** (e.g., Euro, Peso, CAD)
   - **Tip:** If customer is paying the full amount, tap in the foreign currency amount field and press **+** on the keyboard; POS automatically enters the full transaction amount
4. POS automatically converts the foreign currency amount to local currency using the configured exchange rate
5. Tap **OK**
6. If "Return local currency" store rule is enabled, POS displays change due in local currency
7. If customer wants a receipt, tap **Yes** to print the receipt
8. Receipt shows transaction total in local currency and tender amount in foreign currency (with currency code)

## Validation Points

- Verify sale transaction exists in POS
- Verify sale transaction exists in Store Manager (Journal | Transactions)
- Verify the same sale transaction exists in Central database after sync
- Verify transaction number matches between Store and Central
- Verify tender type code and foreign currency code (e.g., "EUR") match between Store and Central
- Verify exchange rate used matches the configured rate in Setup | Financial | Currencies
- Verify transaction total in local currency is correctly calculated using exchange rate
- Mapping validation: Transaction fields (Store ID, Transaction number, line items, tender type, foreign currency code, exchange rate, total, timestamp) map correctly from Store to Central
- Duplicate prevention: No duplicate transaction in Central for the same Store ID + Transaction number