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

## Business Entity

No Sale event/transaction (cash drawer open without sale)

## Business Purpose

Record No Sale events (opening the cash drawer without a transaction, typically to make change or check cash balance) and synchronize them to Central for audit, security monitoring, and reconciliation purposes.

## Trigger

User performs a No Sale operation in POS (opens cash drawer without completing a sale transaction).

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

## Expected Synchronization Behavior

- Insert: Insert the No Sale event/transaction in Store database and sync/insert the corresponding record in Central database
- Update: Not applicable (No Sale events are not updated; each No Sale is a new event)
- Delete: Not applicable (No Sale events are not deleted; they are permanent audit records)
- Matching key: No Sale event ID or timestamp (unique identifier from Store to Central); Store ID + No Sale event ID

## Expected Result in Source System

- No Sale event is created/visible in POS (Store database)
- No Sale event appears in Journal (Transaction | Receipt | Journal) as separate entry
- No Sale event is visible in Store Manager (Journal | Transactions or specific No Sale report)
- No Sale count increments in batch totals (X and Z reports show No Sale count)
- Cash drawer opens (if configured)
- No inventory adjustment (No Sale does not involve items)
- No tender amounts (No Sale does not involve money exchange)

## Expected Result in Target System

- No Sale event is created/visible in Central database after sync
- No Sale event syncs automatically via Central Client
- No Sale event is available for Central Manager reporting and audit
- No Sale count appears in Central reports (batch summaries, security reports)
- No Sale events can be analyzed for security/fraud detection (excessive No Sales may indicate theft)

## Validation Points

- Verify No Sale event exists in POS (Journal)
- Verify No Sale event exists in Store Manager (Journal | Transactions)
- Verify No Sale event exists in Central after sync
- Verify No Sale count increments in batch totals (X/Z reports)
- Verify reason code (if configured) is captured with No Sale event
- Verify timestamp and cashier ID are recorded with No Sale event
- Mapping validation: No Sale event fields (Store ID, Event ID, Cashier ID, Timestamp, Reason Code) map correctly from Store to Central
- Duplicate prevention: No duplicate No Sale events in Central for the same Event ID

## Negative / Edge Case Coverage

- **No Sale without proper permission:** No explicit "No Sale" permission documented; typically available to all POS users; if store wants to restrict No Sale, must use custom security policy or user role restrictions
- **Excessive No Sale events:** Multiple No Sales in short time period may indicate suspicious activity (theft, cash drawer access for unauthorized purposes); store should monitor No Sale frequency in reports; Central reporting can identify cashiers with excessive No Sales
- **No Sale reason code required:** If store configures reason code requirement for No Sales (File | Configuration | Store Rules | Reason Code Options), cashier must select reason before No Sale completes
- **No Sale without cash drawer:** If POS is not connected to cash drawer (manual cash drawer), No Sale still records event but does not trigger automatic drawer open; cashier manually opens drawer
- **No Sale during active transaction:** No Sale typically not available during active transaction (POS disables No Sale when items are in transaction); cashier must complete or cancel transaction first
- **POS offline then sync later:** No Sale event created locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify No Sale event appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** No Sale event sync is idempotent; repeated sync does not create duplicate events in Central
- **No Sale frequency monitoring:** Store should monitor No Sale frequency per cashier for security purposes; excessive No Sales may indicate theft or unauthorized cash drawer access
- **No Sale in X/Z reports:** No Sale count appears in X report (mid-shift report) and Z report (end-of-shift report); verify count accuracy
- **No Sale audit trail:** Each No Sale event records cashier ID and timestamp; useful for security investigations
- **Consistency Checker:** If No Sale event fails to sync, run Consistency Checker to synchronize missing No Sale records to Central

## Known Issues / Notes

- Video link: https://somup.com/cOnbIuWuFA
- Reference: RMH documentation - [Performing "no sale" transactions](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/performing-no-sales.md)
- **No Sale purpose:** Opens cash drawer without completing a sale transaction; typically used to make change for customers or check cash balance
- **No Sale is audit event:** Each No Sale is recorded with cashier ID and timestamp for security and audit purposes
- **Security monitoring:** Excessive No Sales by individual cashier may indicate suspicious activity; store should monitor No Sale frequency
- **No explicit permission:** No Sale typically available to all POS users unless restricted by custom security policy
- **Reason codes optional:** Store can optionally configure reason codes for No Sales (e.g., "Make change", "Check balance")
- **Cash drawer behavior:** If cash drawer is connected to POS and configured, it opens automatically on No Sale; if manual drawer, cashier opens manually
- **No Sale in reports:** No Sale count appears in X reports (mid-shift) and Z reports (end-of-shift)
- **POS command available:** `Transaction_NoSaleCommand` performs No Sale operation (no parameters)
- **No Sale not available during transaction:** POS typically disables No Sale when active transaction is in progress; complete or cancel transaction first
- **Common No Sale use cases:**
  - Making change for customer (customer needs quarters for parking meter, etc.)
  - Checking cash balance in drawer
  - Customer request (needs to break a bill)
  - Manager checking cash drawer contents
- **Security best practices:**
  - Monitor No Sale frequency per cashier
  - Require reason codes for No Sales
  - Review No Sale patterns in reports
  - Investigate cashiers with excessive No Sales
  - Some stores limit No Sale to managers only
- **No inventory impact:** No Sale does not affect inventory (no items involved)
- **No tender impact:** No Sale does not affect tender totals (no money exchanged in transaction; only drawer opened)
- **Audit trail:** No Sale events provide audit trail of cash drawer access without sales
