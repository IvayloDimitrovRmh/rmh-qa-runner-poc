# Hold Transaction/No Sale

## Metadata

Feature: Hold Transaction/No Sale  
Business Area: Hold Transaction/No Sale  
Source System: POS  
Target System: Central  
Sync Direction: Store -> Central  
Release: TBD  
Priority: 12

---

# Scenario: Non Sale, Aborted, Cancel Transaction

## Business Entity

Aborted/Cancelled transaction event (transaction started but not completed)

## Business Purpose

Track non-sale, aborted, or cancelled transaction events (transactions started but abandoned before tender) and synchronize them to Central for audit, analytics, operational reporting, and identifying patterns that may indicate training needs or process issues.

## Trigger

User performs an Abort or Cancel Transaction operation in POS (cancels transaction before tendering).

## Preconditions

- POS is operational and cashier is logged in
- A transaction is in progress (items have been added to transaction screen)
- Transaction has **not** been tendered yet (cannot cancel after tender; must use void instead)
- User has permission to cancel transactions: "Allowed to abort transactions" permission is enabled (Setup | People & Security | Users | General tab | POS User Roles)
- Reason codes for cancelled transactions may be configured (optional, set in Store Manager under File | Configuration | Store Rules | Reason Code Options)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Perform an Abort or Cancel Transaction operation in POS:**
1. Add items to transaction (scan or enter Item Lookup Codes)
2. Before tendering, customer decides not to complete purchase or cashier needs to cancel
3. Do one of the following to cancel/abort the transaction:
   - Press **Esc** (Escape key)
   - Press **F8**
   - Use POS command: `Transaction_CancelTransactionCommand` (with optional parameter True/False to control whether POS closes)
4. Tap **Yes** to confirm you want to cancel the transaction
5. If prompted for a reason code, on the Select Reason Code screen, select the appropriate reason (e.g., "Customer changed mind", "Price check only", "Pricing error") and tap **OK**
   - **Note:** Reason codes are optional and may not be configured for your store
6. Transaction is cancelled and removed from POS transaction screen
7. Cancelled transaction event is recorded in Store database and queued for sync to Central
8. POS returns to empty transaction screen (ready for next transaction)

## Expected Synchronization Behavior

- Insert: Insert the cancelled transaction event in Store database and sync/insert the corresponding record in Central database
- Update: Not applicable (cancelled transactions are not updated; each cancel is a new event)
- Delete: Not applicable (cancelled transaction events are not deleted; they are permanent audit records)
- Matching key: Cancelled transaction event ID or timestamp (unique identifier from Store to Central); Store ID + Event ID

## Expected Result in Source System

- Cancelled transaction event is created/visible in POS (Store database)
- Cancelled transaction appears in Journal (Transaction | Receipt | Journal) as aborted/cancelled entry
- Cancelled transaction is visible in Store Manager (Journal | Transactions or specific cancelled transaction report)
- Cancelled transaction count increments in batch totals (X and Z reports show cancelled transaction count)
- No inventory adjustment (cancelled transactions do not affect inventory; items never left store)
- No tender amounts (transaction was not tendered)
- Transaction screen is cleared and ready for next transaction

## Expected Result in Target System

- Cancelled transaction event is created/visible in Central database after sync
- Cancelled transaction event syncs automatically via Central Client
- Cancelled transaction event is available for Central Manager reporting and analysis
- Cancelled transaction count appears in Central reports (batch summaries, operational reports)
- Cancelled transactions can be analyzed for training needs (excessive cancels may indicate cashier training issues or pricing problems)

## Validation Points

- Verify cancelled transaction event exists in POS (Journal)
- Verify cancelled transaction event exists in Store Manager (Journal | Transactions)
- Verify cancelled transaction event exists in Central after sync
- Verify cancelled transaction count increments in batch totals (X/Z reports)
- Verify reason code (if configured) is captured with cancelled transaction event
- Verify timestamp and cashier ID are recorded with cancelled transaction
- Verify line items from cancelled transaction are captured (for analysis)
- Mapping validation: Cancelled transaction event fields (Store ID, Event ID, Cashier ID, Timestamp, Line Items, Reason Code) map correctly from Store to Central
- Duplicate prevention: No duplicate cancelled transaction events in Central for the same Event ID

## Negative / Edge Case Coverage

- **Cancel without proper permission:** If user does not have "Allowed to abort transactions" permission (Setup | People & Security | Users | General tab), POS prevents cancel operation; verify permission is enforced
- **Excessive cancel events:** Multiple cancels by same cashier in short time period may indicate training issues, pricing problems, or suspicious activity; store should monitor cancel frequency in reports
- **Cancel reason code required:** If store configures reason code requirement for cancelled transactions (File | Configuration | Store Rules | Reason Code Options), cashier must select reason before cancel completes
- **Cannot cancel after tender:** If transaction has been tendered, cancel is not available; cashier must use **Void** instead (Transaction | Recall Transaction | Recall for Void)
- **Cancel vs. Void distinction:**
  - **Cancel:** Before tender; removes transaction from screen; no refund needed
  - **Void:** After tender; creates reversing transaction; refund to customer
- **Cancel with customer assigned:** If customer was assigned to transaction before cancel, customer association is removed when transaction is cancelled
- **Cancel with discounts applied:** If discounts were applied before cancel, discount information is captured in cancelled transaction event for audit purposes
- **POS offline then sync later:** Cancelled transaction event created locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify cancelled transaction event appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Cancelled transaction event sync is idempotent; repeated sync does not create duplicate events in Central
- **Cancel frequency monitoring:** Store should monitor cancel frequency per cashier for training purposes; excessive cancels may indicate need for additional training
- **Cancel in X/Z reports:** Cancelled transaction count appears in X report (mid-shift report) and Z report (end-of-shift report); verify count accuracy
- **Cancel audit trail:** Each cancelled transaction event records cashier ID, timestamp, line items, and reason code (if provided); useful for operational analysis
- **Consistency Checker:** If cancelled transaction event fails to sync, run Consistency Checker to synchronize missing cancelled transaction records to Central

## Known Issues / Notes

- Video link: https://somup.com/cOnZoaWpQA
- Reference: RMH documentation - [Canceling transactions](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/transactions-canceling.md)
- **Cancel purpose:** Remove transaction from POS before tendering (customer changed mind, pricing error, price check only)
- **Cancel is audit event:** Each cancel is recorded with cashier ID, timestamp, and line items for operational analysis
- **Permission required:** "Allowed to abort transactions" permission (Setup | People & Security | Users | General tab | POS User Roles)
- **Cancel vs. Void distinction:**
  - **Cancel (Abort):** Before tender; transaction removed from screen; no financial impact
  - **Void:** After tender; creates reversing transaction; refund to customer
- **Reason codes optional:** Store can optionally configure reason codes for cancels (e.g., "Customer changed mind", "Price check")
- **Cancel in reports:** Cancelled transaction count appears in X reports (mid-shift) and Z reports (end-of-shift)
- **Keyboard shortcuts:** Esc or F8 to cancel transaction
- **POS command available:** `Transaction_CancelTransactionCommand` performs cancel operation (optional parameter True/False to close POS)
- **Cannot cancel after tender:** Once transaction is tendered, cancel is no longer available; must use void instead
- **Common cancel use cases:**
  - Customer changed mind
  - Price check only (not ready to buy)
  - Pricing error discovered
  - Wrong items scanned
  - Customer needs more time to decide
- **Operational analysis:**
  - Monitor cancel frequency per cashier (training indicator)
  - Analyze cancel reasons (identify process issues)
  - Review cancelled transaction line items (understand customer behavior)
  - Excessive cancels may indicate cashier training needs or pricing problems
- **No inventory impact:** Cancelled transactions do not affect inventory (items never left store; no adjustment needed)
- **No tender impact:** Cancelled transactions do not affect tender totals (transaction was never tendered)
- **Audit trail:** Cancelled transaction events provide operational insight into why transactions are abandoned
