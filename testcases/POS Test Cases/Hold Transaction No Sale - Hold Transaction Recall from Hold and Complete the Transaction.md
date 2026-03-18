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