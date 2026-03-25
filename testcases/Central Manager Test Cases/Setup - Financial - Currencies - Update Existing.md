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

# Scenario: Update an Existing Currency Record in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- A currency record with Code `EUR` and Description `Euro` already exists in Central Manager with an Exchange rate of `1.10` and has been previously synchronized to `Store001`. To confirm, navigate to **Central Manager → Setup → Financial → Currencies** and verify the record appears in the list. If it does not exist, execute the **Currencies - Create New** test case first.
- The user is logged into Central Manager with a role that has permissions to access Setup > Financial > Currencies.

## Required Test Data
- Currency Code (record to update): EUR
- Current Exchange rate (before update): 1.10
- Updated Exchange rate (after update): 1.15
- All other fields remain unchanged
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Financial → Currencies

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Financial**.
4. Click **Currencies**. The Currencies list screen opens, showing all existing currency records.
5. In the Currencies list, locate the record with Code `EUR` and Description `Euro`.
6. Select that record to highlight it, then click **Edit**. The currency edit form opens, showing the current field values.
7. Confirm the **Description** field shows `Euro`. Do not modify this field.
8. Confirm the **Code** field shows `EUR`. Do not modify this field.
9. Confirm the **Conversion rate** field shows `1`. Do not modify this field.
10. Confirm the **Exchange rate** field currently shows `1.10`. This is the field you will update.
    - The exchange rate is the rate at which this currency can be exchanged for the local currency. Store Manager uses this to convert amounts tendered in this currency to the local currency.
11. Click inside the **Exchange rate** field, clear the existing value, and type: `1.15`
12. Confirm the **Locale** field still shows `English (United Kingdom)`. Do not modify this field.
13. Click **Save And Close** to save the updated currency record and return to the Currencies list.
14. On the Currencies list, confirm the record with Code `EUR` and Description `Euro` is still present.
15. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
16. Open Store Manager on `Store001`.
17. In Store Manager, navigate to **Setup → Financial → Currencies**.
18. Confirm the Currencies list in the store shows the record with Code `EUR` and that the updated exchange rate is reflected.

## Expected Results
- The currency record `EUR` in Central Manager is updated: the **Exchange rate** field now shows `1.15` instead of `1.10`.
- All other fields on the record remain unchanged (Description `Euro`, Code `EUR`, Conversion rate `1`, Locale `English (United Kingdom)`).
- The updated currency record is synchronized to the active target store `Store001`.

## Validation Checks
- Verify **Exchange rate updated to 1.15** in **Central Manager > Setup > Financial > Currencies** by selecting the `EUR` record, clicking **Edit**, and confirming the **Exchange rate** field displays `1.15`.
- Verify **no unintended field changes** in **Central Manager > Setup > Financial > Currencies** by confirming all other fields remain unchanged: Description `Euro`, Code `EUR`, Conversion rate `1`, Locale `English (United Kingdom)`.
- Verify **updated currency record is synchronized to target store** in **Store001 > Setup > Financial > Currencies** by opening the Currencies list in Store Manager on `Store001` after synchronization and confirming the record with Code `EUR` is present and reflects the updated Exchange rate of `1.15`.

> **Note:** Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.