# TAX/VAT

## Metadata

Feature: TAX/VAT  
Business Area: TAX/VAT  
Source System: POS  
Target System: Central  
Sync Direction: Store -> Central  
Release: 3.50.11  
Priority: 8

---

# Scenario: Sale by applying destination TAX

## Preconditions

- POS is operational and cashier is logged in
- **Destination tax is enabled** in Store Manager:
  - File | Configuration | Sales Tax | Tax Schedule Basis
  - "If shipping to the customer, select the value (e.g. Ship to state\city\country\ZIP) to use to determine the local tax at the destination (on a per customer basis)" is **selected**
  - Value selected from dropdown (e.g., "Ship to state", "Ship to ZIP", etc.)
- Customer exists with at least one shipping address configured:
  - Customer | Shipping tab | Shipping addresses added
  - Shipping address includes necessary fields (State, City, Country, ZIP) for tax determination
- Items are available to sell and have been added to transaction
- Items have "Item is taxable" checkbox selected and tax schedules configured
- User has permission to tender sales (no specific destination tax permission documented)
- Tax schedules exist for destination jurisdictions (e.g., different states, cities, countries)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Complete a sale in POS by applying destination tax based on customer shipping address:**

**Note:** Feature available starting with release 3.50.11

1. Tap **Customers | Lookup Customer** or press **F7**
2. Search for customer by name, phone, or customer ID and press **Enter**
3. Select the customer (customer must have shipping address configured)
4. Customer information displays in Customer pane at top of POS screen
5. Add items to transaction (scan or enter Item Lookup Codes)
6. Items display with **default local tax** applied (store's local tax jurisdiction)
7. Before tendering, tap **Customers | Select Shipping Address**
8. On the Select Shipping Address screen, select shipping address from list:
   - Most customers want to ship to **primary shipping address** (marked as primary)
   - Customer can also select alternate shipping address
   - If new shipping address needed, tap **New** and enter address (requires "Allowed to view and edit all customers" permission)
9. (Optional) If customer wants to change primary shipping address, tap address and tap **Set Primary**
10. Tap **OK** to confirm shipping address selection
11. **Shipping address displays in Customer pane** at top of POS screen (to the right of billing address)
12. **POS automatically recalculates tax** using destination tax:
    - Tax changes from local tax to destination jurisdiction tax
    - Tax schedule determined by shipping address field selected in configuration (e.g., state, ZIP, country)
    - Transaction tax total recalculates
13. Verify destination tax applied correctly:
    - Transaction screen shows updated tax amount
    - Tax reflects destination jurisdiction, not store's local tax
14. (Optional) If wrong shipping address selected, tap **Customers | Clear Shipping Address** to remove selection
    - POS reverts to local item tax
    - Can then re-select correct shipping address
15. Tap **Transaction | Tender Sale** or press **F12**
16. On the Tender screen, verify tax amount reflects destination tax
17. Enter payment amount and complete tender
18. Receipt prints showing:
    - Items purchased
    - Shipping address
    - Tax calculated for destination jurisdiction
    - Total amount
19. Transaction is recorded in Store database and queued for sync to Central

**Alternative: Using POS command**
- Can use `ItemTax_SetDestinationTaxCommand` to manually apply destination tax based on shipping address

## Validation Points

- Verify destination tax configuration is enabled (File | Configuration | Sales Tax)
- Verify customer has shipping address configured
- Verify shipping address is selected in POS before tender
- Verify **shipping address displays in Customer pane** after selection
- Verify sale transaction exists in POS with destination tax applied
- Verify **tax calculated using destination jurisdiction**, not store's local tax
- Verify sale transaction exists in Store Manager (Journal | Transactions)
- Verify sale transaction exists in Central after sync
- Verify **destination tax amount matches** between POS, Store Manager, and Central
- Verify shipping address preserved in transaction record
- Mapping validation: Destination tax fields (destination tax schedule ID, tax amount, shipping address, jurisdiction) map correctly from Store to Central
- Duplicate prevention: No duplicate sale in Central for the same Transaction number