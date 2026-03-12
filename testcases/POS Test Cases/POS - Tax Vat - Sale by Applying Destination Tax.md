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

## Business Entity

Sale transaction (with destination tax applied based on customer shipping address)

## Business Purpose

Process sales where items are shipped to customers and apply the correct tax based on the destination jurisdiction (shipping address) rather than the store's local tax, ensuring accurate tax collection for the jurisdiction where the customer receives the items and maintaining tax compliance across multiple tax jurisdictions.

## Trigger

User completes a sale in POS for a customer with a shipping address selected, and POS applies destination tax based on the shipping address jurisdiction.

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

## Expected Synchronization Behavior

- Insert: Insert the sale transaction in Store database and sync/insert the corresponding transaction in Central database
- Update: Not applicable (sale creates new transaction; not updated)
- Delete: Not applicable (sales are not deleted; voids create reversing transactions)
- Matching key: Transaction number (unique identifier from Store to Central); Store ID + Transaction number

## Expected Result in Source System

- Sale transaction is created/visible in POS (Store database)
- **Destination tax is applied** based on shipping address:
  - Tax calculated using destination jurisdiction tax schedule (not store's local tax)
  - Tax amount reflects destination tax rate
  - Shipping address associated with transaction
- Transaction appears in Journal (Transaction | Receipt | Journal) with destination tax details
- Transaction is visible in Store Manager (Journal | Transactions) showing:
  - Line items
  - Destination tax information
  - Shipping address
- Receipt shows:
  - Items with quantities
  - Shipping address
  - Tax breakdown (destination jurisdiction)
  - Total amount
- Inventory is adjusted (items subtracted from on-hand quantity)
- Tender amounts are recorded (customer pays total including destination tax)

## Expected Result in Target System

- Sale transaction is created/visible in Central database after sync
- **Destination tax details are reflected in Central:**
  - Transaction includes destination tax schedule
  - Tax amount calculated for destination jurisdiction
  - Shipping address preserved
- Transaction syncs automatically via Central Client
- Transaction is available for Central Manager reporting
- Tax compliance reports show transaction with destination tax (not local tax)
- Tax remittance reports use destination tax amounts for correct jurisdiction

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

## Negative / Edge Case Coverage

- **Destination tax not enabled:** If "If shipping to the customer..." option is not selected in File | Configuration | Sales Tax, POS uses local item tax regardless of shipping address selection; verify configuration
- **Shipping address not selected before tender:** If cashier forgets to select shipping address before tender, POS defaults to using local item tax (store's jurisdiction); **WARNING in documentation:** This is documented behavior starting with release 3.50.11
- **Customer has no shipping address:** If customer has no shipping addresses configured, cashier cannot select shipping address; POS uses local item tax; cashier can add new shipping address in POS (requires "Allowed to view and edit all customers" permission)
- **Wrong shipping address selected:** If cashier selects wrong shipping address, they can tap **Customers | Clear Shipping Address** (new button in release 3.50.11) to remove selection and re-select correct address
- **Destination jurisdiction has no tax schedule:** If shipping address jurisdiction does not have tax schedule configured in Store Manager, POS may default to local tax or show error; verify all destination jurisdictions have tax schedules configured
- **Shipping address missing required field:** If shipping address is missing field selected in configuration (e.g., configured for "Ship to state" but address has no state), POS may not apply destination tax correctly; verify shipping addresses are complete
- **Change shipping address mid-transaction:** If cashier changes shipping address after items are added, POS recalculates tax using new destination; verify tax recalculation
- **Mix of pickup and shipped items:** If some items are picked up in store and some are shipped, destination tax may apply to all items (configuration dependent); verify store's intended behavior
- **Clear shipping address reverts to local tax:** If cashier clears shipping address using **Clear Shipping Address** button, POS reverts to local item tax
- **Destination tax + manual tax change:** If destination tax is applied, then cashier manually changes tax, manual change may override destination tax; verify precedence
- **Tax-exempt customer with destination tax:** If customer is tax-exempt, exemption takes precedence over destination tax; no tax applied regardless of shipping address
- **Multiple shipping addresses:** Customer can have multiple shipping addresses; cashier must select correct one; verify correct address is selected
- **POS offline then sync later:** Sale with destination tax created locally in Store database, then synced to Central when connectivity is restored; destination tax details preserved
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify sale with destination tax appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Sale sync is idempotent; repeated sync does not create duplicates in Central
- **Tax compliance reporting:** Transactions with destination tax must be reported for correct tax jurisdiction (not store's local jurisdiction); verify tax reports use destination tax
- **Audit trail:** Destination tax with shipping address provides audit trail for multi-jurisdiction tax compliance
- **Consistency Checker:** If sale transaction with destination tax fails to sync, run Consistency Checker to synchronize missing sale records to Central

## Known Issues / Notes

- Video link: https://somup.com/cOnt20WHkx
- Reference: RMH documentation - [Shipping items to customers](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_UG_Topics/customers-shipping.md)
- Reference: RMH documentation - [Selecting a shipping address](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/shipping-selecting-address.md)
- Reference: RMH documentation - [Adding a shipping address](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/shipping-adding-address.md)
- Reference: RMH documentation - [Setting up sales tax rules](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-sales-tax-rules.md)
- Reference: RMH release notes - [Release 3.50.11](https://github.com/rmhpos/gitbook-repo/blob/main/docs/RD_Topics/Old/3-50-11.md)
- **Feature release:** Destination tax (tax based on shipping address) available starting with release 3.50.11
- **Configuration required:** Must enable "If shipping to the customer..." option in File | Configuration | Sales Tax | Tax Schedule Basis
- **Three requirements for destination tax:**
  1. Enable destination tax in Store Manager configuration
  2. Add at least one shipping address for customer
  3. Select shipping address in POS before tender
- **Destination tax determination:** Tax schedule determined by customer's **shipping address** (NOT billing address)
- **Configuration field options:** Can select which shipping address field determines tax:
  - Ship to state
  - Ship to city
  - Ship to country
  - Ship to ZIP
- **Shipping address visibility:** Starting with release 3.50.11, selected shipping address displays in Customer pane in POS (to the right of billing address)
- **Clear Shipping Address button:** New button in release 3.50.11 (Customers menu) to remove shipping address selection and revert to local tax
- **Default behavior if shipping address not selected:** If destination tax is enabled but cashier forgets to select shipping address, POS defaults to local item tax
- **WARNING documented:** RMH documentation explicitly warns cashiers to select shipping address before tender to apply destination tax
- **Local item tax:** Tax that applies at destination jurisdiction (where customer receives items)
- **Default item tax:** Tax that applies for in-store purchases (store's local jurisdiction)
- **Automatic tax recalculation:** When shipping address is selected, POS automatically recalculates tax from local to destination
- **POS command available:** `ItemTax_SetDestinationTaxCommand` - Applies destination tax based on shipping address (no parameters)
- **Permission for adding shipping addresses:** "Allowed to view and edit all customers" permission required to add new shipping addresses in POS
- **Use cases:**
  - **Out-of-state shipping:** Store in California ships to customer in Texas; apply Texas tax, not California tax
  - **International shipping:** Store in US ships to customer in Canada; apply Canadian tax or no tax (depending on configuration)
  - **Multi-location retailer:** Store in one state ships to customer in different state; apply correct state tax
- **Tax compliance:** Destination tax ensures store collects tax for jurisdiction where customer receives items (nexus rules)
- **Tax remittance:** Store must remit collected destination tax to appropriate jurisdiction (not store's local jurisdiction)
