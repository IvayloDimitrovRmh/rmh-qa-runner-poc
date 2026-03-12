# Transactions

## Metadata

Feature: Transactions  
Business Area: Transactions  
Source System: POS  
Target System: Central  
Sync Direction: Store -> Central  
Release: TBD  
Priority: 2

---

# Scenario: Simple Sale by Cash Tender

## Preconditions

- POS is operational and cashier is logged in
- Items are added to the transaction (items exist in inventory with valid Item Lookup Codes)
- Cash tender type is configured in Setup | Financial | Tender Types and assigned to the store group
- Cash tender type is set to "POP Cash Drawer" if cash drawer should open (optional configuration)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Complete a simple sale in POS using Cash tender:**
1. Add items to the transaction (scan barcode, enter Item Lookup Code, or use item lookup)
2. Tap **Transaction | Tender Sale** or press **F12** or **Enter**
3. On the Tender screen, enter the tender amount next to **Cash** tender type
   - **Tip:** If customer is paying the full amount with cash, tap in the Cash amount field and press **+** on the keyboard; POS automatically enters the full transaction amount
4. Tap **OK**
5. If customer wants a receipt, tap **Yes** to print the receipt
6. Cash drawer opens (if "POP Cash Drawer" is enabled for Cash tender type)

## Validation Points

- Verify sale transaction exists in POS
- Verify sale transaction exists in Store Manager (Journal | Transactions)
- Verify the same sale transaction exists in Central database after sync
- Verify transaction number matches between Store and Central
- Verify tender type code (e.g., "CA") and tender amount match between Store and Central
- Mapping validation: Transaction fields (Store ID, Transaction number, line items, tender type, total, timestamp) map correctly from Store to Central
- Duplicate prevention: No duplicate transaction in Central for the same Store ID + Transaction number