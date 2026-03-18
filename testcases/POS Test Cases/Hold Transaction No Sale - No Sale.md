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

# Scenario: No Sale

## Preconditions

- POS is operational and cashier is logged in
- Cash drawer is connected to POS (if applicable; some stores use manual cash drawers)
- User has permission to perform No Sale operations (no explicit "No Sale" permission documented; typically available to all POS users unless restricted by store policy)
- Reason codes for No Sales may be configured (optional, set in Store Manager under File | Configuration | Store Rules | Reason Code Options)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Perform a No Sale operation in POS:**
1. From the POS transaction screen (with no active transaction), do one of the following:
   - Tap **Operations | Cash | No Sale**
   - Tap **Transaction | Sale/Return/No Sale | No Sale**
   - Use POS command: `Transaction_NoSaleCommand`
2. If prompted for a reason code, on the Select Reason Code screen, select the appropriate reason (e.g., "Make change", "Check cash balance", "Customer request") and tap **OK**
   - **Note:** Reason codes are optional and may not be configured for your store
3. Cash drawer opens (if connected to POS and configured to open on No Sale)
4. Cashier performs intended action (make change, check cash balance, etc.)
5. Close cash drawer
6. No Sale event is recorded in Store database and queued for sync to Central

## Validation Points

- Verify No Sale event exists in POS (Journal)
- Verify No Sale event exists in Store Manager (Journal | Transactions)
- Verify No Sale event exists in Central after sync
- Verify No Sale count increments in batch totals (X/Z reports)
- Verify reason code (if configured) is captured with No Sale event
- Verify timestamp and cashier ID are recorded with No Sale event
- Mapping validation: No Sale event fields (Store ID, Event ID, Cashier ID, Timestamp, Reason Code) map correctly from Store to Central
- Duplicate prevention: No duplicate No Sale events in Central for the same Event ID