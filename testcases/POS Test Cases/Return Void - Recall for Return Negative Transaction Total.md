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