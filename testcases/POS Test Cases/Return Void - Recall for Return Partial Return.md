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