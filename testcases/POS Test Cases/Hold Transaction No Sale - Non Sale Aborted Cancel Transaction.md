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

# Scenario: Non Sale, Aborted, Cancel Transaction

## Preconditions

- POS is operational and cashier is logged in
- A transaction is in progress (items have been added to transaction screen)
- Transaction has **not** been tendered yet (cannot cancel after tender; must use void instead)
- User has permission to cancel transactions: "Allowed to abort transactions" permission is enabled (Setup | People & Security | Users | General tab | POS User Roles)
- Reason codes for cancelled transactions may be configured (optional, set in Store Manager under File | Configuration | Store Rules | Reason Code Options)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Perform an Abort or Cancel Transaction operation in POS:**
1. Add items to transaction (scan or enter Item Lookup Codes)
2. Before tendering, customer decides not to complete purchase or cashier needs to cancel
3. Do one of the following to cancel/abort the transaction:
   - Press **Esc** (Escape key)
   - Press **F8**
   - Use POS command: `Transaction_CancelTransactionCommand` (with optional parameter True/False to control whether POS closes)
4. Tap **Yes** to confirm you want to cancel the transaction
5. If prompted for a reason code, on the Select Reason Code screen, select the appropriate reason (e.g., "Customer changed mind", "Price check only", "Pricing error") and tap **OK**
   - **Note:** Reason codes are optional and may not be configured for your store
6. Transaction is cancelled and removed from POS transaction screen
7. Cancelled transaction event is recorded in Store database and queued for sync to Central
8. POS returns to empty transaction screen (ready for next transaction)

## Validation Points

- Verify cancelled transaction event exists in POS (Journal)
- Verify cancelled transaction event exists in Store Manager (Journal | Transactions)
- Verify cancelled transaction event exists in Central after sync
- Verify cancelled transaction count increments in batch totals (X/Z reports)
- Verify reason code (if configured) is captured with cancelled transaction event
- Verify timestamp and cashier ID are recorded with cancelled transaction
- Verify line items from cancelled transaction are captured (for analysis)
- Mapping validation: Cancelled transaction event fields (Store ID, Event ID, Cashier ID, Timestamp, Line Items, Reason Code) map correctly from Store to Central
- Duplicate prevention: No duplicate cancelled transaction events in Central for the same Event ID