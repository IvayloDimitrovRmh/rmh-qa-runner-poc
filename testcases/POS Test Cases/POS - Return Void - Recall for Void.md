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

# Scenario: Recall for Void

## Preconditions

- POS is operational and cashier is logged in
- An existing tendered transaction is available to recall (transaction must be completed/tendered; cannot void transaction before tender)
- Transaction is in current batch or previous batches (visible in Journal)
- User has permission to void transactions (no explicit "void" permission; assumed if user can access transaction recall functionality)
- Reason codes for voids may be configured (optional, set in Store Manager under File | Configuration | Store Rules | Reason Code Options)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Recall a transaction in POS and perform a void:**
1. Tap **Transaction | Recall Transaction | Recall for Void** (or use POS command: `Transaction_RecallForVoidCommand`)
2. On the Recall for Void screen, look up the transaction by doing one of the following:
   - Scroll through the list of recent transactions until you find the correct one
   - Enter the transaction number from the customer's receipt into the lookup field and press **Enter**
   - Enter the customer's name or phone number (if customer was assigned to transaction) and press **Enter** to search for customer's transactions
3. Tap the transaction to select it and tap **Add**
4. If prompted for a reason code, on the Select Reason Code screen, select the appropriate reason for the void (e.g., "Wrong payment method", "Customer error") and tap **OK**
   - **Note:** Reason codes are optional and may not be configured for your store
5. POS displays the voided transaction with all line items and tender amounts
6. Confirm that the tender amounts and tender types match the original transaction
   - Tender amounts appear as **negative amounts** (with parentheses around the amount, e.g., ($50.00))
7. Tap **OK** to complete the void
8. If customer wants a receipt, tap **Yes** to print the void receipt
9. Void transaction is created in Store database and queued for sync to Central

## Validation Points

- Verify the void is recorded in POS as separate transaction
- Verify void transaction exists in Store Manager (Journal | Transactions)
- Verify void transaction exists in Central after sync
- Verify void transaction has negative tender amounts matching original transaction
- Verify original transaction remains unchanged in Store and Central
- Verify void transaction references original transaction number
- Verify inventory adjustment: items added back to on-hand quantity
- Verify tender reversal: cash drawer balance updated
- Mapping validation: Void transaction fields (Store ID, Void transaction number, original transaction number, line items, negative tender amounts, timestamp) map correctly from Store to Central
- Duplicate prevention: No duplicate void records in Central for the same Void transaction number