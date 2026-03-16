# TAX/VAT

## Metadata

Feature: TAX/VAT  
Business Area: TAX/VAT  
Source System: POS  
Target System: Central  
Sync Direction: Store -> Central  
Release: TBD  
Priority: 8

---

# Scenario: Sale by changing TAX

## Preconditions

- POS is operational and cashier is logged in
- Items are available to sell and have been added to transaction
- Tax schedules are configured in Store Manager (File | Configuration | Sales Tax)
- Items have default tax schedule assigned (Item | General tab | Item tax field)
- User has permission to change tax: **"Allowed to change tax status"** permission enabled (Setup | People & Security | Users | General tab | POS User Roles)
- Reason codes for tax changes may be configured (optional, set in Store Manager under File | Configuration | Store Rules | Reason Code Options)
- Multiple tax schedules are available (e.g., local tax, out-of-state tax, international tax, etc.)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Complete a sale in POS by changing tax for specific items or entire transaction:**

**Scenario A: Changing tax for specific item**
1. Add items to transaction (scan or enter Item Lookup Codes)
2. Items display with default tax schedule applied
3. Select item to change tax:
   - Tap the item once to select it
4. Do one of the following to access tax change:
   - Tap **Action** button beside the item, then on Item Action screen tap **Tax**
   - Tap **Taxes | Current Item Tax | Set Current Item Tax**
   - **Note:** If "Do not allow to access the Action button" is selected in user profile, Action button method is not available
5. On the Select Tax screen, **select the new tax schedule** that applies to the item:
   - Example: Change from "Local Tax 8%" to "Out of State Tax 5%"
   - Different tax schedules may be available depending on configuration
6. If prompted for reason code, on the Select Reason Code screen, select appropriate reason (e.g., "Shipping to another tax jurisdiction", "International customer") and tap **OK**
   - **Note:** Reason codes are optional and may not be configured for your store
7. If reason code selected, it displays below the item description
8. Tax is changed for the selected item:
   - Item shows new tax schedule
   - Transaction tax total recalculates
9. Repeat for additional items if needed
10. Tap **Transaction | Tender Sale** or press **F12**
11. On the Tender screen, verify tax amount reflects changed tax schedule
12. Enter payment amount and complete tender
13. Receipt prints showing items with modified tax

**Scenario B: Changing tax for entire transaction**
1. Add all items to transaction
2. Items display with default tax schedules applied
3. Tap **Taxes | Transaction Tax | Set Transaction Tax**
4. On the Select Tax screen, **select the new tax schedule** that applies to entire transaction:
   - Example: Change entire transaction from "Local Tax 8%" to "Wholesale Tax 0%"
5. If prompted for reason code, select appropriate reason and tap **OK**
6. If reason code selected, it displays below transaction details
7. Tax is changed for **all items** in transaction:
   - All items now use new tax schedule
   - Transaction tax total recalculates
8. Tap **Transaction | Tender Sale** or press **F12**
9. On the Tender screen, verify tax amount reflects changed tax schedule
10. Enter payment amount and complete tender
11. Receipt prints showing modified tax for entire transaction

## Validation Points

- Verify sale transaction exists in POS with changed tax
- Verify tax change was applied correctly:
  - Specific item(s) or entire transaction
  - Tax amount calculated using new tax schedule (not default)
- Verify reason code (if provided) is captured
- Verify sale transaction exists in Store Manager (Journal | Transactions)
- Verify sale transaction exists in Central after sync
- Verify **tax schedule and amount match** between POS, Store Manager, and Central
- Verify reason code preserved in Central
- Mapping validation: Tax change fields (modified tax schedule ID, tax amount, reason code) map correctly from Store to Central
- Duplicate prevention: No duplicate sale in Central for the same Transaction number