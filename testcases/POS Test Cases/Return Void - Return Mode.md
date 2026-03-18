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