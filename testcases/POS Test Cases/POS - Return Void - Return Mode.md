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

# Scenario: Return Mode

## Business Entity

Return transaction (manual entry using Return Mode)

## Business Purpose

Process returns using Return Mode (manual entry without recalling original transaction) and ensure return activity is synchronized to Central for accurate reporting, reconciliation, and inventory adjustment.

## Trigger

User enters Return Mode in POS to manually process returns without recalling the original transaction.

## Preconditions

- POS is operational and cashier is logged in
- User has permission to perform returns (no explicit "return" permission documented; access controlled by menu/store policy)
- Return Mode is available in POS (standard feature, no configuration required)
- Customer is returning items (may or may not have original receipt)
- Reason codes for returns may be configured (optional, set in Store Manager under File | Configuration | Store Rules | Reason Code Options)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Enter Return Mode in POS and complete a return transaction (manual entry):**
1. On the POS transaction screen, do one of the following to enter **Return Mode**:
   - Tap **Transaction | Sale/Return/No Sale | Return**
   - Press **Ctrl-F4** (keyboard shortcut)
   - Use POS command: `Transaction_SetReturnModeCommand`
2. POS switches to **Return Mode** - indicated by return icon in top right corner of screen
3. In Return Mode, **all items entered are treated as returns** (incoming items from customer)
4. Enter the returned items using one of the following methods:
   
   **Method A: Return only (no exchange):**
   - Scan or enter Item Lookup Code for returned item(s)
   - Items appear with **positive quantity** in Return Mode (positive = incoming/returned items)
   - Item values appear as negative (refund amounts)
   - Repeat for all returned items
   
   **Method B: Exchange (return + new purchase):**
   - Scan or enter Item Lookup Code for returned item(s) - appears with **positive quantity**
   - For items customer is purchasing (exchange items), enter those items with **negative quantity**:
     - Enter item, then click **Action** button
     - Use **-** key to change quantity from positive to negative
     - Negative quantity in Return Mode = outgoing/sale items
   - Net result: Positive items (returns) - Negative items (purchases) = net refund or payment amount
   
5. If prompted for reason code, on the Select Reason Code screen, select the appropriate reason for the return and tap **OK**
   - **Note:** Reason codes are optional and may not be configured for your store
6. Verify transaction totals:
   - If return only: Transaction total is **negative** (customer receives refund)
   - If exchange with return > purchase: Transaction total is **negative** (customer receives refund)
   - If exchange with purchase > return: Transaction total is **positive** (customer owes money)
   - If exchange with purchase = return: Transaction total is **zero** (even exchange)
7. Tap **Transaction | Tender Sale** or press **F12**
8. On the Tender screen, enter the tender amount next to the relevant tender type:
   - If refund (negative total): Enter refund amount (follow store policy for tender type)
   - If payment (positive total): Enter payment amount from customer
   - **Tip:** Click in amount field and press **+** on keyboard to auto-enter full amount
9. Tap **OK** to complete the return
10. If customer wants a receipt, tap **Yes** to print the receipt
11. Return transaction is created in Store database and queued for sync to Central
12. To exit Return Mode, do one of the following:
    - Tap **Transaction | Sale/Return/No Sale | Sale** (switch back to Sale Mode)
    - Use POS command: `Transaction_SetSalesModeCommand`

## Expected Synchronization Behavior

- Insert: Insert the return transaction in Store database and sync/insert the corresponding return transaction in Central database (return is standalone transaction, may or may not reference original transaction)
- Update: Not applicable (return creates new transaction)
- Delete: Not applicable (returns are not deleted; voids create reversing transactions)
- Matching key: Return transaction number (unique identifier from Store to Central); Store ID + Return transaction number

## Expected Result in Source System

- Return Mode is active (indicated by return icon in top right corner of POS screen)
- Return transaction is created/visible in POS (stored in Store database)
- Returned items appear with **positive quantities** in Return Mode (positive = incoming items)
- Exchange items (if any) appear with **negative quantities** in Return Mode (negative = outgoing/sale items)
- Transaction total reflects net refund (negative) or payment (positive)
- Return transaction appears in Journal (Transaction | Receipt | Journal)
- Return transaction is visible in Store Manager (Journal | Transactions)
- Inventory is adjusted:
  - Returned items (positive quantity): added to on-hand quantity
  - Exchange items (negative quantity): subtracted from on-hand quantity
- Tender shows refund or payment depending on net total

## Expected Result in Target System

- Return transaction is created/visible in Central database after sync
- Return transaction syncs automatically via Central Client
- Transaction is available for Central Manager reporting
- Related totals reflect the return in Central reporting
- Inventory adjustments sync to Central

## Validation Points

- Verify Return Mode is active (return icon visible in POS)
- Verify return transaction exists in POS
- Verify return transaction exists in Store Manager (Journal | Transactions)
- Verify return transaction exists in Central after sync
- Verify returned items have correct quantities (positive for returns, negative for exchange items in Return Mode)
- Verify transaction total sign (negative for refund, positive for payment)
- Verify inventory adjustments (returned items added to on-hand, exchange items subtracted)
- Verify tender amount (refund or payment)
- Mapping validation: Return transaction fields (Store ID, Transaction number, line items with quantities, tender amount, timestamp) map correctly from Store to Central
- Duplicate prevention: No duplicate return in Central for the same Transaction number

## Negative / Edge Case Coverage

- **Enter Return Mode without permissions:** No explicit "return" permission documented; access controlled by store policy; starting with release 3.10.5, "Do not allow to return or void entries from transaction" option prevents return access
- **Return Mode used without recalling original transaction:** This is the **primary use case** for Return Mode; cashier manually enters returned items without recalling original transaction; useful when customer doesn't have receipt or transaction is very old
- **Return without receipt:** Return Mode allows returns without original receipt; cashier manually enters items customer is returning; store policy determines if receipt is required
- **Forget to exit Return Mode:** If cashier forgets to exit Return Mode after completing return, all subsequent items entered are treated as returns; cashier should switch back to Sale Mode (Transaction | Sale/Return/No Sale | Sale) after each return
- **Return Mode quantity conventions:** Positive quantity = incoming/returned items; Negative quantity = outgoing/sale items (opposite of Sale Mode where positive = sale); verify cashier understands quantity sign conventions
- **Exchange in Return Mode:** To process exchange, enter returned items (positive quantity) and new purchase items (negative quantity); net total determines refund or payment
- **POS offline then sync later:** Return transaction created locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify return transaction appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Return transaction sync is idempotent; repeated sync does not create duplicates in Central
- **Reason code requirement:** If configured, cashier must select reason code before return completes
- **Inventory impact:** Returned items added to on-hand (positive quantity); exchange items subtracted from on-hand (negative quantity)
- **Tender refund or payment:** Depending on net total, transaction may be refund (negative) or payment (positive)
- **Return Mode vs. Recall for Return:** 
  - **Return Mode:** Manual entry, no original transaction reference, customer may not have receipt
  - **Recall for Return:** Auto-populates from original transaction, requires transaction lookup
- **Consistency Checker:** If return transaction fails to sync, run Consistency Checker to synchronize missing return records to Central
- **User permission for return/void:** Starting with release 3.10.5, "Do not allow to return or void entries from transaction" option prevents users from accessing Return Mode

## Known Issues / Notes

- Video link: https://somup.com/cOnb6lWtsb
- Reference: RMH documentation - [Processing returns](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/processing-returns.md)
- Reference: RMH documentation - [Processing exchanges](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/processing-exchanges.md)
- Reference: RMH documentation - [Processing refunds of bottle deposits](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/bottle-deposits-refunding.md)
- **Return Mode:** Manual entry method for processing returns without recalling original transaction
- **Return Mode indicator:** Return icon appears in top right corner of POS screen when active
- **Quantity sign conventions in Return Mode:**
  - **Positive quantity** = incoming/returned items (customer returning to store)
  - **Negative quantity** = outgoing/sale items (customer purchasing from store)
  - **This is opposite of Sale Mode** where positive = sale
- **Primary use cases for Return Mode:**
  - Customer doesn't have receipt
  - Original transaction is very old (not in Journal)
  - Returns without receipt per store policy
  - Bottle deposit refunds
  - Quick manual returns
- **Keyboard shortcuts:**
  - **Ctrl-F4:** Enter Return Mode
  - **Transaction | Sale/Return/No Sale | Sale:** Exit Return Mode (return to Sale Mode)
- **POS commands available:**
  - `Transaction_SetReturnModeCommand` - Enter Return Mode
  - `Transaction_SetSalesModeCommand` - Exit Return Mode (return to Sale Mode)
  - `Transaction_ToggleReturnModeCommand` - Toggle between Sale and Return Mode
- **Exchange in Return Mode:** Enter returned items (positive qty) and new purchase items (negative qty); net total determines refund or payment
- **Remember to exit Return Mode:** After completing return, switch back to Sale Mode to avoid treating subsequent sales as returns
- **Return Mode vs. Recall for Return comparison:**
  - **Return Mode:** Manual entry, no transaction reference, flexible (no receipt needed)
  - **Recall for Return:** Auto-populate from original, requires transaction lookup, better audit trail
- **Reason codes optional:** Configured in File | Configuration | Store Rules | Reason Code Options
- **User permission:** Release 3.10.5 added "Do not allow to return or void entries from transaction" option to restrict Return Mode access
- **Bottle deposit refunds:** Return Mode is commonly used for bottle deposit refunds (items entered with negative quantities)
