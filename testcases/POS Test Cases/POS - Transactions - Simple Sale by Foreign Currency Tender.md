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

## Business Entity

Sale transaction (foreign currency payment)

## Business Purpose

Record a customer sale paid by foreign currency and ensure the transaction with currency conversion is available in Central for reporting and reconciliation.

## Trigger

A cashier completes a simple sale and selects a foreign currency tender type.

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

## Expected Synchronization Behavior

- Insert: Insert the sale transaction in Store database and sync/insert the corresponding transaction in Central database (transaction stored in local currency with foreign currency tender details)
- Update: Not applicable for new sale transactions (completed sales are not updated; voids/returns create separate transactions)
- Delete: Not applicable (completed sales are not deleted; voids create reversing transactions)
- Matching key: Transaction number (unique identifier from Store to Central); Store ID + Transaction number

## Expected Result in Source System

- Sale transaction is created/visible in POS (Store database)
- Tender recorded as foreign currency tender type with currency code (e.g., "EUR" for Euro, "MXN" for Peso)
- Transaction total is stored in local currency (store's base currency)
- Foreign currency tender amount is stored with currency code
- Exchange rate used for conversion is recorded with the transaction
- Change due (if applicable) is calculated and displayed in local currency (if "Return local currency" is enabled)
- Receipt shows transaction total in local currency and tender in foreign currency
- Transaction is visible in Store Manager (Journal | Transactions)

## Expected Result in Target System

- Sale transaction is created/visible in Central database after sync
- Transaction includes all line items, tender details (foreign currency type, amount, currency code), total (in local currency), exchange rate, and timestamp
- Transaction syncs automatically via Central Client (visible in Central Client Dashboard under "Store Info" - Transactions synchronized)
- Transaction is available for Central Manager reporting with foreign currency details preserved

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

## Negative / Edge Case Coverage

- **POS offline at time of sale:** Transaction created locally in Store database using current exchange rate, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify transaction appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Transaction sync is idempotent; repeated sync of same transaction does not create duplicates in Central
- **Exchange rate rounding/precision:** RMH uses the exchange rate as configured in Setup | Financial | Currencies; verify rounding follows store's currency precision settings (typically 2 decimal places for most currencies)
- **Exchange rate changes mid-transaction:** POS uses the exchange rate configured at the time the tender screen is opened; rate changes after tender screen opens do not affect current transaction
- **Overpayment (change due in local currency):** If "Return local currency" is enabled and customer pays more than transaction total in foreign currency, POS calculates change in local currency using exchange rate
- **Foreign currency conversion rate is zero or missing:** POS should prevent tendering if exchange rate is not configured or is zero; validation error should display
- **Multiple foreign currency tender types in one transaction:** If store accepts multiple foreign currencies, each tender amount is converted using its respective exchange rate; verify all conversions are recorded correctly
- **Void/refund of foreign currency transaction:** Voiding or returning a foreign currency sale creates a separate reversing transaction that also syncs to Central; exchange rate used should match original transaction or use current rate per store policy
- **Consistency Checker:** If transaction fails to sync, run Consistency Checker (available in Central Client or via command line) to synchronize missing transactions to Central

## Known Issues / Notes

- Video link: https://somup.com/cOnDo7WOuv
- Reference: RMH documentation - [Setting up currencies](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-currencies.md)
- Reference: RMH documentation - [Setting up tender types](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-tender-types.md)
- Reference: RMH documentation - [Setting up store rules](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-store-rules.md)
- Currencies are configured in Setup | Financial | Currencies with Description, Code, Conversion rate, Exchange rate, and Locale
- Exchange rate is used by Store Manager and POS to convert foreign currency amounts tendered to the local currency
- Conversion rate is used to convert local currency to foreign currency (opposite direction)
- "Return local currency" store rule (File | Configuration | Store Rules | POS) controls whether change is displayed in local currency when foreign currency is used
- Tender types are configured in Setup | Financial | Tender Types; select the specific currency from the Currency dropdown for each foreign currency tender type
- Starting with release 3.51.5, when receiving purchase orders from suppliers who use foreign currency, Store Manager automatically converts item cost to local currency based on exchange rates
- Foreign currency handling is primarily for purchase orders/receiving; POS foreign currency tendering requires tender types configured with specific currencies
- Transaction total is always stored in the store's local (base) currency; foreign currency amounts are converted at tender time