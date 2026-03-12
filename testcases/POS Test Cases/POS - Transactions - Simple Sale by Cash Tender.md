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

# Scenario: Simple Sale by Cash Tender

## Business Entity

Sale transaction

## Business Purpose

Record a customer sale paid by cash and ensure the transaction is available in Central for reporting, reconciliation, and downstream processing.

## Trigger

A cashier completes a simple sale and selects Cash as the tender type.

## Preconditions

- POS is operational and cashier is logged in
- Items are added to the transaction (items exist in inventory with valid Item Lookup Codes)
- Cash tender type is configured in Setup | Financial | Tender Types and assigned to the store group
- Cash tender type is set to "POP Cash Drawer" if cash drawer should open (optional configuration)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Complete a simple sale in POS using Cash tender:**
1. Add items to the transaction (scan barcode, enter Item Lookup Code, or use item lookup)
2. Tap **Transaction | Tender Sale** or press **F12** or **Enter**
3. On the Tender screen, enter the tender amount next to **Cash** tender type
   - **Tip:** If customer is paying the full amount with cash, tap in the Cash amount field and press **+** on the keyboard; POS automatically enters the full transaction amount
4. Tap **OK**
5. If customer wants a receipt, tap **Yes** to print the receipt
6. Cash drawer opens (if "POP Cash Drawer" is enabled for Cash tender type)

## Expected Synchronization Behavior

- Insert: Insert the sale transaction in Store database and sync/insert the corresponding transaction in Central database
- Update: Not applicable for new sale transactions (completed sales are not updated; voids/returns create separate transactions)
- Delete: Not applicable (completed sales are not deleted; voids create reversing transactions)
- Matching key: Transaction number (unique identifier from Store to Central); Store ID + Transaction number

## Expected Result in Source System

- Sale transaction is created/visible in POS (Store database)
- Tender recorded as Cash with tender type code (e.g., "CA" for Cash)
- Transaction total, tender amount, and change amount (if applicable) are recorded
- Receipt is printed (if requested)
- Cash drawer opens (if "POP Cash Drawer" enabled)
- Transaction is visible in Store Manager (Journal | Transactions)

## Expected Result in Target System

- Sale transaction is created/visible in Central database after sync
- Transaction includes all line items, tender details (Cash), total, and timestamp
- Transaction syncs automatically via Central Client (visible in Central Client Dashboard under "Store Info" - Transactions synchronized)
- Transaction is available for Central Manager reporting

## Validation Points

- Verify sale transaction exists in POS
- Verify sale transaction exists in Store Manager (Journal | Transactions)
- Verify the same sale transaction exists in Central database after sync
- Verify transaction number matches between Store and Central
- Verify tender type code (e.g., "CA") and tender amount match between Store and Central
- Mapping validation: Transaction fields (Store ID, Transaction number, line items, tender type, total, timestamp) map correctly from Store to Central
- Duplicate prevention: No duplicate transaction in Central for the same Store ID + Transaction number

## Negative / Edge Case Coverage

- **POS offline at time of sale:** Transaction created locally in Store database, then synced to Central when connectivity is restored (offline mode supported)
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify transaction appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Transaction sync is idempotent; repeated sync of same transaction does not create duplicates in Central
- **Void/refund behavior:** Voiding or returning a cash sale creates a separate reversing transaction that also syncs to Central; original transaction remains in both Store and Central
- **Overpayment (change due):** If customer pays more than transaction total (e.g., pays $50 for $35 sale), POS calculates and displays change due; transaction records tendered amount and change amount
- **Cash drawer failure:** If cash drawer fails to open, transaction still completes; cashier can manually open drawer or use override
- **Receipt printing failure:** If receipt fails to print, transaction still completes; cashier can reprint receipt from Journal | Transactions
- **Consistency Checker:** If transaction fails to sync, run Consistency Checker (available in Central Client or via command line) to synchronize missing transactions to Central
- **Blind closed batch:** If POS operates offline for extended period, sync creates blind closed batch in Store Manager; generate Z Report to close batch and verify transactions synced using Consistency Checker

## Known Issues / Notes

- Video link: https://somup.com/cOnl2EWYzf
- Reference: RMH POS documentation - [Tendering a sale](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/transactions-tendering-sale.md)
- Reference: RMH documentation - [Setting up tender types](https://github.com/rmhpos/gitbook-repo/blob/main/docs/CM_UG_Topics/setting-up-tender-types.md)
- Reference: RMH documentation - [Use the Consistency Checker](https://github.com/rmhpos/gitbook-repo/blob/main/docs/IG_Topics/consistency-checker.md)
- Cash tender type is typically configured with "POP Cash Drawer" enabled to automatically open the cash drawer when cash payment is accepted
- Cash tender type can have a "Maximum Amount" configured to limit the maximum cash transaction amount accepted
- Tender types are configured in Central Manager or Store Manager under Setup | Financial | Tender Types
- Transaction synchronization between Store and Central is managed by Central Client; Dashboard shows pending jobs, failed jobs, and synchronized transactions
- Starting with release 3.50.5, the Consistency Checker can synchronize missing transactions between Store and Central
- For Central-enabled stores, run the Sales Consistency Checker daily to ensure no dropped transactions
- If POS operates in offline mode due to database connection loss, transactions are saved locally and synced when connection is restored; blind closed batches are created in Store Manager