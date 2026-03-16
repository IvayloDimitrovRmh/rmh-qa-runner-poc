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

# Scenario: Simple Sale by Food Stamp Tender

## Preconditions

- POS is operational and cashier is logged in
- Items are added to the transaction (items exist in inventory with valid Item Lookup Codes)
- Food Stamp tender type is configured in Setup | Financial | Tender Types and assigned to the store group
- Store rule "Don't round food stamps" is configured per store policy (File | Configuration | Store Rules | POS)
- Item eligibility rules: Items eligible for food stamp purchase should be configured appropriately (typically food items; eligibility depends on government regulations)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Complete a simple sale in POS using Food Stamp tender:**
1. Add items to the transaction (scan barcode, enter Item Lookup Code, or use item lookup)
   - Ensure items are eligible for food stamp/SNAP/EBT purchase (typically food items per government regulations)
2. Tap **Transaction | Tender Sale** or press **F12** or **Enter**
3. On the Tender screen, enter the tender amount next to **Food Stamp** tender type
   - **Tip:** If customer is paying the full amount with food stamps, tap in the Food Stamp amount field and press **+** on the keyboard; POS automatically enters the full transaction amount
4. If "Don't round food stamps" store rule is **not** enabled, POS rounds up the food stamp transaction to the nearest dollar (default behavior)
5. If "Don't round food stamps" store rule **is** enabled, POS does not round the food stamp amount (precise amount tendering)
6. Tap **OK**
7. If customer wants a receipt, tap **Yes** to print the receipt
8. Receipt shows transaction total and tender as Food Stamp

## Validation Points

- Verify sale transaction exists in POS
- Verify sale transaction exists in Store Manager (Journal | Transactions)
- Verify the same sale transaction exists in Central database after sync
- Verify transaction number matches between Store and Central
- Verify tender type code (e.g., "FS") and tender amount match between Store and Central
- Verify transaction total rounding behavior matches "Don't round food stamps" store rule configuration
- Verify only eligible items are included in food stamp transactions (if eligibility rules are configured)
- Mapping validation: Transaction fields (Store ID, Transaction number, line items, tender type, total, timestamp) map correctly from Store to Central
- Duplicate prevention: No duplicate transaction in Central for the same Store ID + Transaction number