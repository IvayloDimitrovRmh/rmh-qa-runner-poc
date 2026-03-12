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

# Scenario: Hold Transaction > Recall from Hold and complete the transaction

## Business Entity

Hold transaction (temporary/local) / Sale transaction (completed)

## Business Purpose

Allow temporarily holding a transaction in progress (customer needs to step away, get more items, etc.) and later recalling it to complete the sale, ensuring the completed sale is synchronized to Central while the hold state remains local to the store.

## Trigger

User places a transaction on hold in POS, then later recalls the held transaction and completes the sale.

## Preconditions

- POS is operational and cashier is logged in
- A transaction is in progress (items have been added to transaction)
- User has permission to hold transactions: "Allowed to put transactions on hold" permission is enabled (Setup | People & Security | Users | General tab | POS User Roles)
- Transaction can be placed on hold (items added, no tender yet; cannot hold after tender)
- Store is in online mode with connectivity to Central database for synchronization after sale completion (or offline mode with later sync capability)

## Action

**Place a transaction on hold in POS, recall it, and complete the sale:**

**Part 1: Place transaction on hold**
1. Add items to transaction (scan or enter Item Lookup Codes)
2. Customer needs to step away or get more items (transaction not ready to complete)
3. Tap **Transaction | Put on Hold** or use POS command: `Transaction_SetOnHoldCommand`
4. (Optional) If prompted, enter a hold reference or note (e.g., "Customer getting more items")
5. Transaction is saved to **Store database only** as held transaction
6. POS clears transaction screen and is ready for next transaction
7. Held transaction is **NOT synced to Central** (remains local to Store)

**Part 2: Recall transaction from hold and complete sale**
1. When customer returns, tap **Transaction | Recall Transaction | Recall from Hold** or use POS command: `Transaction_RecallFromHoldCommand`
2. On the Recall from Hold screen, do one of the following:
   - Scroll through list of held transactions and select the correct one
   - Enter customer name, reference, or transaction details into lookup field and press **Enter**
3. Tap the held transaction to select it and tap **Add**
4. POS recalls the held transaction with all previously added items
5. (Optional) Add more items if customer found additional items
6. (Optional) Make any needed changes (delete items, change quantities, add discounts, etc.)
7. Tap **Transaction | Tender Sale** or press **F12**
8. On the Tender screen, enter the tender amount next to the relevant tender type
   - **Tip:** Click in amount field and press **+** on keyboard to auto-enter full amount
9. Tap **OK** to complete the sale
10. If customer wants a receipt, tap **Yes** to print the receipt
11. **Held transaction is deleted from Store database** (no longer in hold list)
12. **Completed sale transaction is created in Store database** and queued for sync to Central

## Expected Synchronization Behavior

- Insert: 
  - **Hold transaction:** Inserted into **Store database only** (NOT synced to Central)
  - **Completed sale:** When hold is recalled and tendered, insert the sale transaction into Store database and sync/insert it into Central database
- Update: Not applicable (hold becomes completed sale; not updated, replaced)
- Delete: When held transaction is recalled and completed, hold record is **deleted** from Store database (no longer needed)
- Matching key: Completed sale transaction number (unique identifier from Store to Central); Store ID + Transaction number

## Expected Result in Source System

- **While on hold:**
  - Hold transaction is created/visible in POS (Store database only)
  - Hold transaction appears in Recall from Hold list
  - Hold transaction is **NOT synced to Central**
- **After recall and completion:**
  - Hold transaction is **deleted** from Store database (no longer in hold list)
  - Completed sale transaction is created/visible in POS (Store database)
  - Sale transaction appears in Journal (Transaction | Receipt | Journal)
  - Sale transaction is visible in Store Manager (Journal | Transactions)
  - Inventory is adjusted (items subtracted from on-hand quantity)
  - Tender amounts are recorded

## Expected Result in Target System

- **While on hold:**
  - Hold transaction is **NOT synced to Central** (does not appear in Central Manager)
- **After recall and completion:**
  - Completed sale transaction is created/visible in Central database after sync
  - Sale transaction syncs automatically via Central Client
  - Sale transaction is available for Central Manager reporting
  - Inventory adjustments sync to Central
  - No hold record in Central (holds are local to Store only)

## Validation Points

- **While on hold:**
  - Verify hold transaction exists in POS (Recall from Hold list)
  - Verify hold transaction does **NOT** exist in Central (holds are local only)
- **After recall and completion:**
  - Verify hold transaction is **deleted** from POS (no longer in hold list)
  - Verify completed sale exists in POS (Journal | Transactions)
  - Verify completed sale exists in Store Manager
  - Verify completed sale exists in Central after sync
  - Verify inventory adjustment (items subtracted from on-hand)
  - Verify tender amounts recorded
- Mapping validation: Completed sale transaction fields (Store ID, Transaction number, line items, tender amounts, timestamp) map correctly from Store to Central
- Duplicate prevention: No duplicate sale in Central for the same Transaction number

## Negative / Edge Case Coverage

- **Hold transaction never recalled (orphaned hold):** If held transaction is never recalled, it remains in Store database indefinitely in hold list; POS does not auto-delete old holds; store should implement policy to review/clear old holds periodically
- **Recall hold but abandon before completing:** If cashier recalls held transaction but cancels before tendering (press Esc or F8), transaction can be put back on hold or canceled; if canceled, hold record is deleted from Store database
- **Multiple holds per customer:** POS allows multiple held transactions; cashier must select correct hold when recalling; verify correct transaction recalled
- **Hold across cashier shifts:** Held transaction persists across cashier logins; any cashier with "Allowed to put transactions on hold" permission can recall any held transaction
- **Hold across POS restarts:** Held transactions persist in Store database even if POS is restarted; holds available after POS restart
- **POS offline when completing recalled hold:** If POS is offline when completing sale, sale transaction created locally in Store database and synced to Central when connectivity is restored; hold record deleted locally
- **Sync failure then retry for completed sale:** Central Client automatically retries failed sync jobs; verify sale transaction appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Sale transaction sync is idempotent; repeated sync does not create duplicates in Central
- **Hold transaction limit:** POS does not enforce hard limit on number of held transactions; store should implement policy to prevent excessive holds
- **Inventory reservation:** Items in held transaction are **not** reserved in inventory; inventory on-hand is only adjusted when sale is completed; if item goes out of stock while transaction is on hold, cashier may encounter out-of-stock error when recalling hold
- **Customer assignment:** If customer was assigned to transaction before hold, customer assignment persists when transaction is recalled
- **Discounts and promotions:** Any discounts applied before hold persist when transaction is recalled; verify discounts are still valid at recall time
- **Consistency Checker:** If completed sale transaction fails to sync, run Consistency Checker to synchronize missing sale records to Central; held transactions are **not** synced via Consistency Checker (local only)

## Known Issues / Notes

- Video link: https://somup.com/cOnb6tWtL3
- Notes: Expected text specifies hold should insert into Store only; completed sale should insert into Store and sync to Central
- Reference: RMH documentation - [Putting a transaction on hold](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/transactions-putting-hold.md)
- Reference: RMH documentation - [Recalling a transaction from hold](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/transactions-recalling-hold.md)
- **Hold transactions are LOCAL only:** Hold transactions are stored in Store database only; they are **NOT synced to Central**
- **Completed sales ARE synced:** Once held transaction is recalled and tendered, it becomes a normal sale transaction and syncs to Central
- **Hold record is deleted:** When held transaction is recalled and completed, hold record is deleted from Store database
- **Permission required:** "Allowed to put transactions on hold" permission (Setup | People & Security | Users | General tab | POS User Roles)
- **Hold use cases:**
  - Customer needs to step away (phone call, get wallet, etc.)
  - Customer wants to get more items
  - Customer price checking items before committing to purchase
  - Cashier needs to serve another customer quickly
  - Transaction waiting for manager approval or price check
- **Hold does NOT reserve inventory:** Items in held transaction are not reserved; inventory on-hand adjusted only when sale completed
- **Hold persists across sessions:** Held transactions persist across cashier logins and POS restarts
- **Any cashier can recall:** Any cashier with permission can recall any held transaction (not limited to cashier who created hold)
- **POS commands available:**
  - `Transaction_SetOnHoldCommand` - Put current transaction on hold
  - `Transaction_RecallFromHoldCommand` - Recall transaction from hold
- **Orphaned holds:** Held transactions never recalled remain in Store database indefinitely; store should review/clear old holds periodically
- **Hold limit:** No hard limit on number of holds; store policy should prevent excessive holds
- **Customer and discounts persist:** Customer assignment and discounts applied before hold persist when transaction is recalled
- **Hold reference/note:** Can optionally add reference or note when putting on hold to help identify transaction later
