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

# Scenario: Recall for Return (negative transaction total)

## Business Entity

Return transaction (with negative transaction total - customer receives refund)

## Business Purpose

Process a return that results in a negative transaction total (customer is owed money) and ensure the return is synchronized to Central for accurate financial reporting, reconciliation, and inventory adjustment.

## Trigger

User recalls a transaction for return in POS and completes a return resulting in a negative transaction total (return amount exceeds new purchases or is a full return).

## Preconditions

- POS is operational and cashier is logged in
- An existing tendered transaction is available to recall (transaction must be completed/tendered)
- Transaction is in current batch or previous batches (visible in Journal)
- User has permission to perform returns (no explicit "return" permission documented; access controlled by menu/store policy)
- Return rules allow negative totals: "Do not allow negative tendering" is **not** enabled (File | Configuration | Store Rules | POS Options) - Starting with release 3.11.3
- Reason codes for returns may be configured (optional, set in Store Manager under File | Configuration | Store Rules | Reason Code Options)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Recall a transaction in POS and process a return that results in a negative transaction total:**
1. On the POS transaction screen, do one of the following:
   - Tap **Transaction | Recall Transaction | Recall for Return** (or use POS command: `Transaction_RecallForReturnCommand`)
   - Tap **Transaction | Sale/Return/No Sale | Return** or press **Ctrl-F4** (puts POS into return mode; all items entered are considered returns)
2. On the Recall for Return screen, look up the transaction by doing one of the following:
   - If transaction was completed recently, scroll down and select the transaction number from the list
   - Enter the transaction number from the customer's receipt into the lookup field and press **Enter**
   - Enter the customer's name or phone number (if customer was assigned to transaction) and press **Enter** to search for customer's transactions
3. Tap **Add**
4. If prompted for a reason code, on the Select Reason Code screen, select the appropriate reason for the return (e.g., "Defective item", "Customer dissatisfaction") and tap **OK**
   - **Note:** Reason codes are optional and may not be configured for your store
5. On the POS transaction screen, the items that were purchased in the recalled transaction are listed in **red**. Do one of the following:
   - If customer wants to return specific item(s), click the checkbox next to those items (scroll through entire list to confirm correct selection)
   - If customer wants to return all items, click the checkbox at the top of the checkbox column (auto-selects all items)
   - If customer wants to return partial quantity, click checkbox beside item, click **Action**, use **+** and **-** keys to indicate quantity to return, and click **OK**
6. (Optional) If customer is also purchasing new items in same transaction (exchange), add those items to transaction
   - Result: Return items (in red) have negative value; new purchase items (in black) have positive value
   - If return value > new purchase value, transaction total is **negative** (customer is owed money)
7. Tap **Transaction | Tender Sale** or press **F12**
8. On the Tender screen, transaction total displays as **negative amount** (e.g., -$25.00 if customer is owed $25)
9. Enter the refund amount next to the relevant tender type (follow store policy for tender type):
   - **Original tender:** Most stores refund using original transaction tender (e.g., if customer paid with VISA ending in 1234, use same card)
   - **Cash:** Some stores refund all returns in cash
   - **Voucher/Gift Card:** Some stores refund to voucher or gift card
   - **Tip:** If customer is receiving full refund amount using one tender type, click in amount field next to tender type and press **+** on keyboard; POS automatically enters full refund amount
10. Tap **OK** to complete the return
11. If customer wants a receipt, tap **Yes** to print the return receipt
12. Return transaction is created in Store database and queued for sync to Central

## Expected Synchronization Behavior

- Insert: Insert the return transaction in Store database and sync/insert the corresponding return transaction in Central database (return is separate transaction, not update to original)
- Update: Not applicable (return creates new transaction; original transaction remains unchanged)
- Delete: Not applicable (original transaction is not deleted; return creates separate entry)
- Matching key: Return transaction number (unique identifier from Store to Central); Store ID + Return transaction number; Return transaction references original transaction number

## Expected Result in Source System

- Return transaction is created/visible in POS (stored as separate transaction in Store database)
- Original transaction remains in Store database (unchanged)
- Transaction total is **negative** in POS (e.g., -$25.00 indicates customer receives $25 refund)
- Return transaction appears in Journal (Transaction | Receipt | Journal) with negative total
- Return transaction is visible in Store Manager (Journal | Transactions) as separate entry
- Inventory is adjusted: returned items are added back to on-hand quantity
- Tender amounts are reversed: refund is recorded (negative tender amount)
- Cash drawer balance reflects refund (cash reduced if refunded in cash)

## Expected Result in Target System

- Return transaction is created/visible in Central database after sync
- Original transaction remains in Central (unchanged)
- Transaction total is **negative** in Central (same as Store)
- Return transaction syncs automatically via Central Client
- Return transaction is available for Central Manager reporting
- Related totals reflect the return in Central reporting (X, Z, ZZ reports show return as separate line item)
- Inventory adjustments sync to Central

## Validation Points

- Verify return transaction exists in POS with negative total
- Verify return transaction exists in Store Manager (Journal | Transactions)
- Verify return transaction exists in Central after sync
- Verify transaction total sign/amount is consistent between POS, Store Manager, and Central (all show negative value)
- Verify original transaction remains unchanged in Store and Central
- Verify return transaction references original transaction number
- Verify inventory adjustment: returned items added back to on-hand quantity in Store and Central
- Verify tender refund: negative tender amount recorded in Store and Central
- Mapping validation: Return transaction fields (Store ID, Return transaction number, original transaction number, line items with negative quantities, negative tender amounts, timestamp) map correctly from Store to Central
- Duplicate prevention: No duplicate return transaction in Central for the same Return transaction number

## Negative / Edge Case Coverage

- **Return exceeds original sale amounts/quantities:** If customer attempts to return more than purchased, POS may allow it (depending on configuration); store should implement policy to prevent over-returns; some stores use "Do not allow negative tendering" (release 3.11.3) to block negative totals
- **"Do not allow negative tendering" enabled:** Starting with release 3.11.3, if "Do not allow negative tendering" is enabled (File | Configuration | Store Rules | POS Options), POS prevents returns that result in negative transaction totals; cashier must process return separately without new purchases
- **Return without receipt:** If customer doesn't have receipt, cashier can use Transaction | Sale/Return/No Sale | Return mode and manually enter returned items (without recalling original transaction); negative total indicates refund owed
- **Partial return:** Customer can return specific items or partial quantities from original transaction; if partial return value < any new purchases in same transaction, total may be positive (customer owes money)
- **Exchange with negative total:** If customer exchanges item for lower-priced item, transaction total is negative (customer receives refund of price difference); follow store policy for tender type
- **POS offline then sync later:** Return transaction with negative total created locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify return transaction appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Return transaction sync is idempotent; repeated sync of same return does not create duplicates in Central
- **Reason code requirement:** If "Prompt for reason code on..." is configured for returns, cashier must select reason code before return completes; if not configured, reason code prompt is skipped
- **Inventory impact:** Return adds items back to inventory on-hand quantity; verify inventory adjustment syncs to Central
- **Tender refund policy:** Follow store policy for tender type (original tender, cash, voucher); verify refund recorded in X/Z reports
- **Return Mode vs. Recall for Return:** Using Return Mode (Transaction | Sale/Return/No Sale | Return) allows manual entry of returns without recalling transaction; using Recall for Return automatically populates items from original transaction
- **Consistency Checker:** If return transaction fails to sync, run Consistency Checker to synchronize missing return records to Central
- **Store credit returns:** Some stores refund to store credit/voucher instead of original tender; verify store credit voucher is created and synced to Central
- **User permission for return/void:** Starting with release 3.10.5, "Do not allow to return or void entries from transaction" option (Setup | People & Security | Users | Extended Properties tab) prevents users from processing returns

## Known Issues / Notes

- Video link: https://somup.com/cOnbQOWtGg
- Reference: RMH documentation - [Processing returns](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/processing-returns.md)
- Reference: RMH documentation - [Processing exchanges](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/processing-exchanges.md)
- Reference: RMH documentation - [Processing refunds to a voucher](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/processing-refunds-to-vouchers.md)
- **Negative transaction total:** Indicates customer receives refund; displayed as negative amount (e.g., -$25.00)
- **Return is separate transaction:** Original transaction remains unchanged; return creates new reversing transaction
- **Returned items displayed in red:** POS shows returned items in red color on transaction screen
- **Recall for Return vs. Return Mode:**
  - **Recall for Return** (Transaction | Recall Transaction | Recall for Return): Recalls original transaction and auto-populates items
  - **Return Mode** (Transaction | Sale/Return/No Sale | Return or Ctrl-F4): Manual entry mode for returns without recalling transaction
- **"Do not allow negative tendering" option:** Starting with release 3.11.3 (File | Configuration | Store Rules | POS Options), can prevent negative transaction totals
- **Tender policy:** Most stores refund using original tender (e.g., credit card must be same card); follow store policy
- **Inventory adjustment:** Returned items added back to on-hand quantity immediately in Store; syncs to Central
- **POS commands available:** 
  - `Transaction_RecallForReturnCommand` - Initiates recall for return process
  - `Transaction_SetReturnModeCommand` - Changes transaction to return mode
- **Reason codes optional:** Configured in File | Configuration | Store Rules | Reason Code Options
- **Exchange handling:** Can combine returns and new purchases in same transaction; if return > new purchase, total is negative (refund)
- **User permission:** Release 3.10.5 added "Do not allow to return or void entries from transaction" option to restrict return access
- **Refund tender types:** Cash, original tender (credit/debit card), voucher/gift card, or store credit per store policy
