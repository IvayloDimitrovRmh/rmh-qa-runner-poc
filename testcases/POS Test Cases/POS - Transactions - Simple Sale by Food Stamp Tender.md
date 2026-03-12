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

# Scenario: Simple Sale by Food Stamp Tender

## Business Entity

Sale transaction (food stamp/SNAP/EBT payment)

## Business Purpose

Record a customer sale paid by Food Stamp tender (also known as SNAP or EBT) and ensure the transaction is available in Central for reporting and compliance-related reconciliation.

## Trigger

A cashier completes a simple sale and selects Food Stamp as the tender type.

## Preconditions

- POS is operational and cashier is logged in
- Items are added to the transaction (items exist in inventory with valid Item Lookup Codes)
- Food Stamp tender type is configured in Setup | Financial | Tender Types and assigned to the store group
- Store rule "Don't round food stamps" is configured per store policy (File | Configuration | Store Rules | POS)
- Item eligibility rules: Items eligible for food stamp purchase should be configured appropriately (typically food items; eligibility depends on government regulations)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Complete a simple sale in POS using Food Stamp tender:**
1. Add items to the transaction (scan barcode, enter Item Lookup Code, or use item lookup)
   - Ensure items are eligible for food stamp/SNAP/EBT purchase (typically food items per government regulations)
2. Tap **Transaction | Tender Sale** or press **F12** or **Enter**
3. On the Tender screen, enter the tender amount next to **Food Stamp** tender type
   - **Tip:** If customer is paying the full amount with food stamps, tap in the Food Stamp amount field and press **+** on the keyboard; POS automatically enters the full transaction amount
4. If "Don't round food stamps" store rule is **not** enabled, POS rounds up the food stamp transaction to the nearest dollar (default behavior)
5. If "Don't round food stamps" store rule **is** enabled, POS does not round the food stamp amount (precise amount tendering)
6. Tap **OK**
7. If customer wants a receipt, tap **Yes** to print the receipt
8. Receipt shows transaction total and tender as Food Stamp

## Expected Synchronization Behavior

- Insert: Insert the sale transaction in Store database and sync/insert the corresponding transaction in Central database
- Update: Not applicable for new sale transactions (completed sales are not updated; voids/returns create separate transactions)
- Delete: Not applicable (completed sales are not deleted; voids create reversing transactions)
- Matching key: Transaction number (unique identifier from Store to Central); Store ID + Transaction number

## Expected Result in Source System

- Sale transaction is created/visible in POS (Store database)
- Tender recorded as Food Stamp with tender type code (e.g., "FS" for Food Stamp)
- Transaction total is rounded to nearest dollar (if "Don't round food stamps" is not enabled)
- Transaction total is precise amount (if "Don't round food stamps" is enabled)
- Receipt is printed (if requested)
- Transaction is visible in Store Manager (Journal | Transactions)

## Expected Result in Target System

- Sale transaction is created/visible in Central database after sync
- Transaction includes all line items, tender details (Food Stamp), total (rounded or precise per configuration), and timestamp
- Transaction syncs automatically via Central Client (visible in Central Client Dashboard under "Store Info" - Transactions synchronized)
- Transaction is available for Central Manager reporting and compliance reconciliation

## Validation Points

- Verify sale transaction exists in POS
- Verify sale transaction exists in Store Manager (Journal | Transactions)
- Verify the same sale transaction exists in Central database after sync
- Verify transaction number matches between Store and Central
- Verify tender type code (e.g., "FS") and tender amount match between Store and Central
- Verify transaction total rounding behavior matches "Don't round food stamps" store rule configuration
- Verify only eligible items are included in food stamp transactions (if eligibility rules are configured)
- Mapping validation: Transaction fields (Store ID, Transaction number, line items, tender type, total, timestamp) map correctly from Store to Central
- Duplicate prevention: No duplicate transaction in Central for the same Store ID + Transaction number

## Negative / Edge Case Coverage

- **POS offline at time of sale:** Transaction created locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify transaction appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Transaction sync is idempotent; repeated sync of same transaction does not create duplicates in Central
- **Mixed eligibility items behavior:** If transaction includes both food stamp-eligible and non-eligible items, cashier may need to split payment between Food Stamp tender (for eligible items) and another tender type (for non-eligible items); verify POS behavior per store configuration
- **Food stamp rounding behavior:** If "Don't round food stamps" is not enabled, verify transaction is rounded to nearest dollar (e.g., $15.47 rounds to $16.00); if enabled, verify exact amount ($15.47) is tendered
- **Overpayment (change due):** Food stamp tender typically does not provide cash change; if overpayment occurs, verify POS behavior per store policy and government regulations (may issue store credit or require exact payment)
- **Non-eligible items in food stamp transaction:** If cashier attempts to tender non-eligible items with food stamps, POS should display validation error or split tender prompt (behavior depends on store configuration)
- **Void/refund of food stamp transaction:** Voiding or returning a food stamp sale creates a separate reversing transaction that also syncs to Central; refund handling should comply with government regulations
- **Consistency Checker:** If transaction fails to sync, run Consistency Checker (available in Central Client or via command line) to synchronize missing transactions to Central

## Known Issues / Notes

- Video link: https://somup.com/cOnDoLWOu7
- Reference: RMH documentation - [Setting up store rules](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-store-rules.md)
- Reference: RMH documentation - [Setting up tender types](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-tender-types.md)
- Food Stamp tender is also known as SNAP (Supplemental Nutrition Assistance Program) or EBT (Electronic Benefits Transfer) in the United States
- Store rule "Don't round food stamps" (File | Configuration | Store Rules | POS) controls whether food stamp transactions are rounded to the nearest dollar
- **Default behavior:** Food stamp transactions are rounded up to the nearest dollar unless "Don't round food stamps" is enabled
- Food stamp eligibility rules are governed by federal/state regulations; typically only food items are eligible for food stamp purchase
- Item eligibility for food stamps is typically configured at the item level or department/category level in RMH
- Tender types are configured in Setup | Financial | Tender Types
- Food stamp tender typically does not provide cash change; overpayment handling should comply with government regulations
- Compliance reporting for food stamp transactions is critical; ensure transaction data is accurately synchronized to Central for auditing