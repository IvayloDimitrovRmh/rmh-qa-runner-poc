# Setup / Financial — Currencies

## Metadata
Feature: Currencies
Business Area: Setup > Financial > Currencies
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Insert a New Currency Record in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- The user is logged into Central Manager with a role that has permissions to access Setup > Financial > Currencies.
- No currency record with Code `EUR` currently exists in Central Manager. To confirm, navigate to **Central Manager → Setup → Financial → Currencies** and verify that `EUR` does not appear in the list.

## Required Test Data
- Currency Description: Euro
- Currency Code: EUR
- Conversion rate: 1
- Exchange rate: 1.10
- Locale: English (United Kingdom)
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Financial → Currencies

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Financial**.
4. Click **Currencies**. The Currencies list screen opens, showing all existing currency records.
5. Click **New**. The currency creation form opens.
6. In the **Description** field, enter: `Euro`
7. In the **Code** field, enter: `EUR`
8. In the **Conversion rate** field, enter: `1`
   - The conversion rate is the ratio between two currencies, indicating how much of one currency equals the equivalent value of another.
9. In the **Exchange rate** field, enter: `1.10`
   - The exchange rate is the rate at which one currency can be exchanged for another. Store Manager uses this to convert amounts tendered in this currency to the local currency.
10. In the **Locale** field, select: `English (United Kingdom)`
    - The locale identifies the country where the currency is standard.
11. Click **Save And Close** to save the new currency record and return to the Currencies list.
12. On the Currencies list, confirm that a record with Description `Euro` and Code `EUR` now appears in the list.
13. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
14. Open Store Manager on `Store001`.
15. In Store Manager, navigate to **Setup → Financial → Currencies**.
16. Confirm that the Currencies list in the store shows a record with Description `Euro` and Code `EUR`.

## Expected Results
- The new currency record `EUR` with Description `Euro`, Conversion rate `1`, Exchange rate `1.10`, and Locale `English (United Kingdom)` is saved in Central Manager and appears in the Currencies list.
- The currency record is inserted into the active target store `Store001` via synchronization.
- The currency is available as a dependency for tender types and suppliers that reference `EUR`.

## Validation Checks
- Verify **currency record EUR exists in Central Manager** in **Central Manager > Setup > Financial > Currencies** by confirming a record with Description `Euro` and Code `EUR` appears in the Currencies list after saving.
- Verify **currency field values are correct** in **Central Manager > Setup > Financial > Currencies** by selecting the `EUR` record, clicking **Edit**, and confirming: Description `Euro`, Code `EUR`, Conversion rate `1`, Exchange rate `1.10`, Locale `English (United Kingdom)`.
- Verify **currency record is synchronized to target store** in **Store001 > Setup > Financial > Currencies** by opening the Currencies list in Store Manager on `Store001` after synchronization and confirming a record with Description `Euro` and Code `EUR` is present in the list.

> **Note:** Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.