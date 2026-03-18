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