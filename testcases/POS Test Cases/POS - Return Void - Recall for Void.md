# Return/Void

## Metadata

Feature: Return/Void  
Business Area: Return/Void  
Source System: POS  
Target System: Central  
Sync Direction: Store -> Central  
Release: TBD  
Priority: 4

---

# Scenario: Recall for Void

## Business Entity

Void transaction (reversing transaction)

## Business Purpose

Allow voiding a previously recorded sale (after it has been tendered) and ensure the void is centrally reflected for accurate reporting, reconciliation, and inventory adjustment.

## Trigger

User recalls a transaction for void in POS (typically when customer used wrong payment method or transaction needs to be reversed after tender).

## Preconditions

- POS is operational and cashier is logged in
- An existing tendered transaction is available to recall (transaction must be completed/tendered; cannot void transaction before tender)
- Transaction is in current batch or previous batches (visible in Journal)
- User has permission to void transactions (no explicit "void" permission; assumed if user can access transaction recall functionality)
- Reason codes for voids may be configured (optional, set in Store Manager under File | Configuration | Store Rules | Reason Code Options)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Recall a transaction in POS and perform a void:**
1. Tap **Transaction | Recall Transaction | Recall for Void** (or use POS command: `Transaction_RecallForVoidCommand`)
2. On the Recall for Void screen, look up the transaction by doing one of the following:
   - Scroll through the list of recent transactions until you find the correct one
   - Enter the transaction number from the customer's receipt into the lookup field and press **Enter**
   - Enter the customer's name or phone number (if customer was assigned to transaction) and press **Enter** to search for customer's transactions
3. Tap the transaction to select it and tap **Add**
4. If prompted for a reason code, on the Select Reason Code screen, select the appropriate reason for the void (e.g., "Wrong payment method", "Customer error") and tap **OK**
   - **Note:** Reason codes are optional and may not be configured for your store
5. POS displays the voided transaction with all line items and tender amounts
6. Confirm that the tender amounts and tender types match the original transaction
   - Tender amounts appear as **negative amounts** (with parentheses around the amount, e.g., ($50.00))
7. Tap **OK** to complete the void
8. If customer wants a receipt, tap **Yes** to print the void receipt
9. Void transaction is created in Store database and queued for sync to Central

## Expected Synchronization Behavior

- Insert: Insert the void transaction record in Store database and sync/insert the corresponding void record in Central database (void is a separate reversing transaction, not an update to original transaction)
- Update: Not applicable (void creates new transaction; original transaction remains unchanged)
- Delete: Not applicable (original transaction is not deleted; void creates reversing entry)
- Matching key: Void transaction number (unique identifier from Store to Central); Store ID + Void transaction number; Void transaction references original transaction number

## Expected Result in Source System

- Void transaction is created and visible in POS (stored as separate transaction in Store database)
- Original transaction remains in Store database (marked with void reference)
- Related totals reflect the void in POS batch totals and reports
- Void transaction appears in Journal (Transaction | Receipt | Journal) with negative amounts
- Void transaction is visible in Store Manager (Journal | Transactions) as separate entry
- Inventory is adjusted: items from voided sale are added back to on-hand quantity
- Tender amounts are reversed: cash drawer balance reflects void (negative tender)

## Expected Result in Target System

- Void transaction is created/visible in Central database after sync
- Original transaction remains in Central (not modified)
- Related totals reflect the void in Central reporting (X, Z, ZZ reports show void as separate line item)
- Void transaction syncs automatically via Central Client
- Void transaction is available for Central Manager reporting
- Inventory adjustments sync to Central

## Validation Points

- Verify the void is recorded in POS as separate transaction
- Verify void transaction exists in Store Manager (Journal | Transactions)
- Verify void transaction exists in Central after sync
- Verify void transaction has negative tender amounts matching original transaction
- Verify original transaction remains unchanged in Store and Central
- Verify void transaction references original transaction number
- Verify inventory adjustment: items added back to on-hand quantity
- Verify tender reversal: cash drawer balance updated
- Mapping validation: Void transaction fields (Store ID, Void transaction number, original transaction number, line items, negative tender amounts, timestamp) map correctly from Store to Central
- Duplicate prevention: No duplicate void records in Central for the same Void transaction number

## Negative / Edge Case Coverage

- **Attempt void without proper permission:** RMH does not have explicit "void" permission; void functionality is available if user can access Transaction menu; store should implement access control via user roles if needed
- **Attempt to void a transaction that cannot be recalled:** If transaction is not in Journal (e.g., very old transaction from closed batch), it may not appear in recall list; cashier must search by transaction number or customer
- **Void entire transaction only:** POS does not support partial voids; when voiding, entire transaction is voided (all items and tender amounts reversed); if customer wants partial return, use **Recall for Return** instead
- **Void vs. Cancel:** **Cancel** is for transactions before tender (Esc or F8); **Void** is for transactions after tender; cannot void if not yet tendered
- **Void vs. Return:** **Void** reverses entire transaction immediately; **Return** is for returning items (can be partial) and may use different tender
- **POS offline then sync later:** Void transaction created locally in Store database with negative amounts, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify void transaction appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Void transaction sync is idempotent; repeated sync of same void does not create duplicates in Central
- **Reason code requirement:** If "Prompt for reason code on..." is configured for voids, cashier must select reason code before void completes; if not configured, reason code prompt is skipped
- **Inventory impact:** Voiding a sale adds items back to inventory on-hand quantity; verify inventory adjustment syncs to Central
- **Tender reversal:** Void creates negative tender amounts; cash drawer balance is updated; verify tender reversal in X/Z reports
- **Sequential tendering voids:** Voiding a **payment** during sequential tendering (before transaction complete) is different from voiding a **transaction** (after tender complete); use **Void** button on Tender screen during sequential tendering to void individual payments
- **Consistency Checker:** If void transaction fails to sync, run Consistency Checker to synchronize missing void records to Central
- **Store credit voids:** Starting with release 3.51.5, changes to returns or voids for transactions tendered with store credit (specific behavior TBD)
- **User permission for return/void:** Starting with release 3.10.5, new option "Do not allow to return or void entries from transaction" on Extended Properties tab of Users screen prevents users from voiding transactions

## Known Issues / Notes

- Video link: https://somup.com/cOnbQrWtEg
- Reference: RMH documentation - [Voiding transactions](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/transactions-voiding.md)
- Reference: RMH documentation - [Processing returns](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/processing-returns.md)
- Reference: RMH documentation - [Canceling transactions](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/transactions-canceling.md)
- **Void vs. Cancel distinction:**
  - **Cancel** (Esc or F8): Before tender; removes transaction without creating reversing entry; no sync to Central
  - **Void** (Transaction | Recall for Void): After tender; creates reversing transaction with negative amounts; syncs to Central
- **Void entire transaction only:** Cannot void partial transaction; for partial returns, use **Recall for Return**
- **Void creates separate transaction:** Original transaction remains in Store and Central; void is new reversing transaction with negative amounts
- **Negative tender amounts:** Void transaction shows tender amounts as negative (with parentheses, e.g., ($50.00))
- **Inventory adjustment:** Voiding sale adds items back to on-hand quantity immediately in Store; syncs to Central
- **Tender reversal:** Void reverses tender amounts; cash drawer balance updated; reflected in X/Z reports
- **Reason codes optional:** Configured in File | Configuration | Store Rules | Reason Code Options; if enabled, cashier must select reason before void completes
- **POS command available:** `Transaction_RecallForVoidCommand` initiates recall for void process (no parameters)
- **Sequential tendering voids:** Use **Void** button on Tender screen to void individual payments during sequential tendering (before transaction complete); different from voiding entire transaction
- **User permission:** Starting with release 3.10.5, "Do not allow to return or void entries from transaction" option (Setup | People & Security | Users | Extended Properties tab) prevents users from voiding
- **Store credit changes:** Release 3.51.5 introduced changes to returns or voids for transactions tendered with store credit (specific behavior varies)
