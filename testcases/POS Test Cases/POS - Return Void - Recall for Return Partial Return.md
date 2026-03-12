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

# Scenario: Recall for Return (partial return)

## Business Entity

Return transaction (partial return - subset of items or quantities from original transaction)

## Business Purpose

Allow partial returns against an original transaction (returning some but not all items, or partial quantities of items) and ensure both Store and Central reflect the partial return correctly for inventory and financial accuracy.

## Trigger

User recalls a transaction in POS and processes a partial return (customer returns selected items or partial quantities from original purchase).

## Preconditions

- POS is operational and cashier is logged in
- An existing tendered transaction is available to recall (transaction must be completed/tendered)
- Transaction is in current batch or previous batches (visible in Journal)
- User has permission to perform returns (no explicit "return" permission documented; access controlled by menu/store policy)
- Items/quantities in original transaction support partial return (customer purchased multiple items or quantities > 1)
- Reason codes for returns may be configured (optional, set in Store Manager under File | Configuration | Store Rules | Reason Code Options)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Recall a transaction in POS and process a partial return:**
1. On the POS transaction screen, tap **Transaction | Recall Transaction | Recall for Return** (or use POS command: `Transaction_RecallForReturnCommand`)
2. On the Recall for Return screen, look up the transaction by doing one of the following:
   - If transaction was completed recently, scroll down and select the transaction number from the list
   - Enter the transaction number from the customer's receipt into the lookup field and press **Enter**
   - Enter the customer's name or phone number (if customer was assigned to transaction) and press **Enter** to search for customer's transactions
3. Tap **Add**
4. If prompted for a reason code, on the Select Reason Code screen, select the appropriate reason for the return (e.g., "Defective item", "Wrong size") and tap **OK**
   - **Note:** Reason codes are optional and may not be configured for your store
5. On the POS transaction screen, the items that were purchased in the recalled transaction are listed in **red**. Do one of the following for **partial return**:

   **Scenario A: Return specific items (not all items):**
   - Click the checkbox next to **only the items** customer wants to return (do not select all items)
   - Leave unchecked any items customer is **not** returning
   - Scroll through entire list to confirm correct selection
   
   **Scenario B: Return partial quantity of an item:**
   - If customer purchased quantity > 1 of an item (e.g., 4 packs of beer) and wants to return only some (e.g., 2 packs):
     - Click checkbox beside the item
     - Click **Action** button
     - Use **+** and **-** keys to set the quantity customer wants to return (e.g., change from 4 to 2)
     - Click **OK**
   - **Note:** If "Do not allow to access the Action button" is selected in user profile, use keyboard **+** key to increase quantity or re-enter item to increment

6. Tap **Transaction | Tender Sale** or press **F12**
7. On the Tender screen, transaction total shows the **partial refund amount** (only for returned items/quantities)
8. Enter the refund amount next to the relevant tender type (follow store policy):
   - **Original tender:** Most stores refund using original transaction tender
   - **Cash, voucher, or other tender:** Follow store policy
   - **Tip:** Click in amount field next to tender type and press **+** on keyboard to auto-enter full refund amount
9. Tap **OK** to complete the partial return
10. If customer wants a receipt, tap **Yes** to print the partial return receipt
11. Partial return transaction is created in Store database and queued for sync to Central

## Expected Synchronization Behavior

- Insert: Insert the partial return transaction in Store database and sync/insert the corresponding return transaction in Central database (return is separate transaction, not update to original)
- Update: Not applicable (return creates new transaction; original transaction remains unchanged)
- Delete: Not applicable (original transaction is not deleted; return creates separate entry)
- Matching key: Return transaction number (unique identifier from Store to Central); Store ID + Return transaction number; Return transaction references original transaction number

## Expected Result in Source System

- Partial return transaction is created/visible in POS (stored as separate transaction in Store database)
- Original transaction remains in Store database (unchanged, shows all originally purchased items)
- Returned quantities/amounts reflect the **partial return** in POS (only selected items or partial quantities appear in return transaction)
- Return transaction total shows **partial refund amount** (not full original transaction amount)
- Partial return transaction appears in Journal (Transaction | Receipt | Journal)
- Partial return transaction is visible in Store Manager (Journal | Transactions) as separate entry
- Inventory is adjusted: **only returned items/quantities** are added back to on-hand quantity
- Tender amounts show **partial refund** (negative tender for returned items only)

## Expected Result in Target System

- Partial return transaction is created/visible in Central database after sync
- Original transaction remains in Central (unchanged)
- Returned quantities/amounts reflect the **partial return** in Central (matches Store)
- Partial return transaction syncs automatically via Central Client
- Partial return transaction is available for Central Manager reporting
- Related totals reflect the partial return in Central reporting (X, Z, ZZ reports show partial return)
- Inventory adjustments for **only returned items** sync to Central

## Validation Points

- Verify partial return transaction exists in POS with correct items/quantities
- Verify partial return transaction exists in Store Manager (Journal | Transactions)
- Verify partial return transaction exists in Central after sync
- Verify returned item quantities/amounts align between POS, Store Manager, and Central (only selected items/quantities, not full transaction)
- Verify original transaction remains unchanged in Store and Central (still shows all originally purchased items)
- Verify return transaction references original transaction number
- Verify inventory adjustment: **only returned items/quantities** added back to on-hand in Store and Central
- Verify tender refund: **partial refund amount** (not full original amount) recorded
- Mapping validation: Partial return transaction fields (Store ID, Return transaction number, original transaction number, **partial** line items with returned quantities, refund tender amount, timestamp) map correctly from Store to Central
- Duplicate prevention: No duplicate partial return transaction in Central for the same Return transaction number

## Negative / Edge Case Coverage

- **Attempt to return more than remaining eligible quantity:** POS only shows quantities from original transaction; cashier cannot select more than originally purchased; if customer claims they purchased more, cashier must verify original transaction or process as separate return
- **Partial return repeated multiple times:** Customer can return items from same original transaction multiple times (e.g., return 2 items today, 3 items next week); each return creates separate return transaction referencing same original transaction number; RMH does not enforce "already returned" validation; store must implement policy to prevent duplicate returns
- **Return partial quantity then return more later:** Customer can return 2 of 4 items today, then return remaining 2 items later; each return is separate transaction; verify both returns sync correctly to Central
- **Partial return without receipt:** If customer doesn't have receipt, cashier can use Return Mode (Transaction | Sale/Return/No Sale | Return) and manually enter returned items; partial return processed without recalling original transaction
- **Multiple items partial return:** Customer can select mix of items to return (e.g., return items A and C but not B from A+B+C transaction); verify correct items marked as returned
- **POS offline then sync later:** Partial return transaction created locally in Store database with partial quantities, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify partial return transaction appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Partial return transaction sync is idempotent; repeated sync of same partial return does not create duplicates in Central
- **Reason code requirement:** If configured, cashier must select reason code before partial return completes
- **Inventory impact:** Only returned items/quantities added back to inventory; items **not** returned remain at original on-hand level
- **Tender refund for partial:** Refund amount is only for returned items, not full original transaction; verify correct partial refund in X/Z reports
- **Customer history:** Original transaction and partial return(s) both appear in customer purchase history; useful for tracking partial return patterns
- **Consistency Checker:** If partial return transaction fails to sync, run Consistency Checker to synchronize missing partial return records to Central
- **User permission for return/void:** Starting with release 3.10.5, "Do not allow to return or void entries from transaction" option prevents users from processing partial returns

## Known Issues / Notes

- Video link: https://somup.com/cOnbQkWtHm
- Reference: RMH documentation - [Processing returns](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/processing-returns.md)
- Reference: RMH documentation - [Processing exchanges](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/processing-exchanges.md)
- **Partial return:** Return subset of items or partial quantities from original transaction
- **Return is separate transaction:** Original transaction remains unchanged; each partial return creates new separate transaction
- **Returned items displayed in red:** POS shows returned items in red color on transaction screen
- **Multiple partial returns allowed:** Customer can return from same original transaction multiple times (no built-in "already returned" validation)
- **Partial return methods:**
  - **Select specific items:** Click checkboxes next to only items being returned (leave others unchecked)
  - **Partial quantity:** Use Action button to adjust quantity from original purchase to return quantity
- **Inventory adjustment:** Only returned items/quantities added back to on-hand; non-returned items unchanged
- **Tender refund:** Refund amount is **only for returned items**, not full original transaction
- **POS command available:** `Transaction_RecallForReturnCommand` initiates recall for return process
- **Reason codes optional:** Configured in File | Configuration | Store Rules | Reason Code Options
- **Customer can return in multiple transactions:** Same original transaction can have multiple partial return transactions over time
- **Verify original receipt:** Store should implement policy to verify customer only returns items they actually purchased and haven't already returned
- **User permission:** Release 3.10.5 added "Do not allow to return or void entries from transaction" option to restrict return access
- **Partial return receipt:** Receipt shows only returned items/quantities and partial refund amount, not full original transaction
