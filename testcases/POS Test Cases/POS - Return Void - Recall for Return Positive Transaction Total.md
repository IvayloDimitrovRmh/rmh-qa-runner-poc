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

# Scenario: Recall for Return (positive transaction total)

## Business Entity

Return transaction (with positive transaction total - customer owes money)

## Business Purpose

Process a return scenario where the resulting transaction total is positive (customer returns items but also purchases new items of greater value, resulting in net amount owed by customer) and ensure the return is synchronized to Central for accurate reporting and reconciliation.

## Trigger

User recalls a transaction for return in POS and completes a return resulting in a positive transaction total (typically an exchange where new purchase value exceeds return value).

## Preconditions

- POS is operational and cashier is logged in
- An existing tendered transaction is available to recall (transaction must be completed/tendered)
- Transaction is in current batch or previous batches (visible in Journal)
- User has permission to perform returns (no explicit "return" permission documented; access controlled by menu/store policy)
- Customer is exchanging items: returning items AND purchasing new items in same transaction, where new purchase value > return value
- Reason codes for returns may be configured (optional, set in Store Manager under File | Configuration | Store Rules | Reason Code Options)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Recall a transaction in POS and process a return that results in a positive transaction total (exchange scenario):**
1. On the POS transaction screen, tap **Transaction | Recall Transaction | Recall for Return** (or use POS command: `Transaction_RecallForReturnCommand`)
2. On the Recall for Return screen, look up the original transaction by doing one of the following:
   - If transaction was completed recently, scroll down and select the transaction number from the list
   - Enter the transaction number from the customer's receipt into the lookup field and press **Enter**
   - Enter the customer's name or phone number (if customer was assigned to transaction) and press **Enter**
3. Tap **Add**
4. If prompted for a reason code, on the Select Reason Code screen, select the appropriate reason for the return (e.g., "Exchange - wrong size") and tap **OK**
   - **Note:** Reason codes are optional and may not be configured for your store
5. On the POS transaction screen, the items from the original transaction are listed in **red**
6. Select the item(s) customer is returning:
   - Click checkbox next to returned items
   - Or adjust quantity using Action button if returning partial quantity
7. Add the **new items** customer is purchasing (exchange items):
   - Scan or enter Item Lookup Code for new items
   - New items appear in **black** (normal sale items)
8. Verify transaction totals:
   - Returned items (in red) have **negative value** (e.g., -$50.00 for returned item)
   - New purchase items (in black) have **positive value** (e.g., +$75.00 for new item)
   - **Net transaction total is POSITIVE** (e.g., $25.00) if new purchase > return
   - Customer **owes** the difference ($25.00 in this example)
9. Tap **Transaction | Tender Sale** or press **F12**
10. On the Tender screen, transaction total displays as **positive amount** (e.g., $25.00 indicates customer owes $25)
11. Enter the payment amount next to the relevant tender type:
    - Customer pays the **difference** (net positive amount)
    - **Tip:** Click in amount field next to tender type and press **+** on keyboard to auto-enter full amount
12. Tap **OK** to complete the return/exchange
13. If customer wants a receipt, tap **Yes** to print the receipt
14. Return/exchange transaction is created in Store database and queued for sync to Central

## Expected Synchronization Behavior

- Insert: Insert the return/exchange transaction in Store database and sync/insert the corresponding transaction in Central database (transaction includes both return items and new purchase items)
- Update: Not applicable (return/exchange creates new transaction; original transaction remains unchanged)
- Delete: Not applicable (original transaction is not deleted; return/exchange creates separate entry)
- Matching key: Return/exchange transaction number (unique identifier from Store to Central); Store ID + Transaction number; Transaction references original transaction number for return portion

## Expected Result in Source System

- Return/exchange transaction is created/visible in POS (stored as separate transaction in Store database)
- Original transaction remains in Store database (unchanged)
- Transaction total is **positive** in POS (e.g., $25.00 indicates customer owes money)
- Transaction includes both:
  - **Return items** (negative line items in red)
  - **New purchase items** (positive line items in black)
- Net transaction total = new purchases - returns = **positive value** (customer payment required)
- Return/exchange transaction appears in Journal (Transaction | Receipt | Journal)
- Transaction is visible in Store Manager (Journal | Transactions) showing both return and purchase line items
- Inventory is adjusted:
  - Returned items: added back to on-hand quantity
  - New purchase items: subtracted from on-hand quantity
- Tender shows **customer payment** for net positive amount

## Expected Result in Target System

- Return/exchange transaction is created/visible in Central database after sync
- Original transaction remains in Central (unchanged)
- Transaction total is **positive** in Central (matches Store)
- Transaction includes both return items (negative) and new purchase items (positive)
- Return/exchange transaction syncs automatically via Central Client
- Transaction is available for Central Manager reporting
- Related totals reflect both return and sale in Central reporting
- Inventory adjustments (both return and purchase) sync to Central

## Validation Points

- Verify return/exchange transaction exists in POS with positive total
- Verify return/exchange transaction exists in Store Manager (Journal | Transactions)
- Verify return/exchange transaction exists in Central after sync
- Verify transaction total sign/amount is consistent between POS, Store Manager, and Central (all show **positive** value)
- Verify transaction includes both:
  - Return line items (negative values)
  - New purchase line items (positive values)
- Verify net total = new purchases - returns = positive amount
- Verify original transaction remains unchanged in Store and Central
- Verify transaction references original transaction number for return portion
- Verify inventory adjustments:
  - Returned items added back to on-hand quantity
  - New purchase items subtracted from on-hand quantity
- Verify tender: customer payment recorded for net positive amount
- Mapping validation: Transaction fields (Store ID, Transaction number, original transaction reference, return line items, purchase line items, net positive total, tender amount, timestamp) map correctly from Store to Central
- Duplicate prevention: No duplicate transaction in Central for the same Transaction number

## Negative / Edge Case Coverage

- **Positive total not allowed by configuration:** If store has policies preventing exchanges or requiring separate return/sale transactions, cashier must process return and new sale separately (some stores prefer this for clearer reporting)
- **Exchange with equal value:** If return value = new purchase value, transaction total is $0.00 (no payment or refund); POS still creates transaction showing both return and purchase
- **Exchange with return value > purchase value:** Results in **negative** total (customer receives refund); this is the "Recall for Return (negative transaction total)" scenario
- **Multiple exchanges in one transaction:** Customer can return multiple items and purchase multiple new items in single transaction; POS calculates net total correctly
- **Return without exchange:** If customer only returns items without purchasing anything new, result is negative total (refund scenario)
- **POS offline then sync later:** Return/exchange transaction created locally in Store database with both return and purchase line items, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify transaction appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Transaction sync is idempotent; repeated sync of same transaction does not create duplicates in Central
- **Reason code requirement:** If configured for returns, cashier must select reason code before transaction completes
- **Inventory impact:** Both returned items (added to inventory) and new purchases (subtracted from inventory) are processed correctly
- **Tender payment:** Customer pays net positive amount; verify payment recorded in X/Z reports
- **Return Mode alternative:** Customer can also use Return Mode (Transaction | Sale/Return/No Sale | Return) and manually enter returned items (negative quantities) and new purchase items (negative quantities in return mode = outgoing items)
- **Consistency Checker:** If transaction fails to sync, run Consistency Checker to synchronize missing records to Central
- **User permission for return/void:** Starting with release 3.10.5, "Do not allow to return or void entries from transaction" option prevents users from processing returns/exchanges

## Known Issues / Notes

- Video link: https://somup.com/cOnbQRWtKa
- Reference: RMH documentation - [Processing returns](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/processing-returns.md)
- Reference: RMH documentation - [Processing exchanges](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/processing-exchanges.md)
- **Positive transaction total:** Indicates customer **owes money**; typically occurs in exchange scenarios where new purchase > return
- **Return/exchange transaction:** Single transaction containing both return items (negative) and new purchase items (positive)
- **Net total calculation:** New purchases - returns = positive amount (customer payment required)
- **Returned items in red, new items in black:** POS color-codes to distinguish return vs. purchase
- **Exchange scenarios:**
  - **Positive total:** New purchase > return (customer owes difference)
  - **Zero total:** New purchase = return (no payment/refund)
  - **Negative total:** New purchase < return (customer receives refund)
- **Return Mode alternative:** For exchanges, cashier can use Return Mode:
  - Enter returned item with **positive quantity** (in return mode, positive = incoming)
  - Enter new purchase item with **negative quantity** (in return mode, negative = outgoing)
  - Result: Same net positive total if new purchase > return
- **Inventory impact:** Dual adjustment (returned items +, new purchases -)
- **Single vs. separate transactions:** Some stores prefer separate return transaction + new sale transaction for clearer reporting; RMH supports both approaches
- **POS command available:** `Transaction_RecallForReturnCommand` initiates recall for return process
- **Reason codes optional:** Configured in File | Configuration | Store Rules | Reason Code Options
- **User permission:** Release 3.10.5 added "Do not allow to return or void entries from transaction" option to restrict return/exchange access
- **Receipt shows both:** Return/exchange receipt displays both returned items (negative) and new purchases (positive) with net total
