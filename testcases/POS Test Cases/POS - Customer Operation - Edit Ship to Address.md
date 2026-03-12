# Customer Operation

## Metadata

Feature: Customer Operation  
Business Area: Customer Operation  
Source System: POS  
Target System: Central  
Sync Direction: Store -> Central  
Release: TBD  
Priority: 3

---

# Scenario: Edit Ship to Address

## Business Entity

Ship To address

## Business Purpose

Ensure customer shipping details remain accurate by editing Ship To addresses in POS and synchronizing the updates to Central, enabling accurate tax calculations based on destination and correct shipping for orders.

## Trigger

User edits an existing Ship To address for a customer in POS.

## Preconditions

- POS is operational and user is logged in
- Customer exists in POS (customer can be looked up by name, phone, or any combination)
- Ship To address exists for the customer in POS (customer has at least one shipping address on Shipping tab)
- User has permission to edit customers: "Allowed to view and edit all customers" permission is enabled (Setup | People & Security | Users | General tab | POS User Roles)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Edit an existing Ship To address in POS:**
1. Tap **Customers | Lookup Customer** or press **F7**
2. On the customer lookup screen, type all or part of the customer's name, phone number, or any combination and press **Enter**
3. To select the customer, do one of the following:
   - Tap the customer's name once and tap **Select**
   - Tap the customer's name twice
4. Tap **Customers | Edit Customer** (or use command: `Customer_EditCommand`)
5. The Customer dialog displays with existing customer information
6. Navigate to the **Shipping** tab
7. Select the existing shipping address you want to edit from the list
8. Tap **Edit** (or double-tap the address to edit)
9. Update the shipping address details:
   - Address Line 1 (street address)
   - Address Line 2 (optional - suite, apt, etc.)
   - City
   - State/Province
   - ZIP/Postal Code
   - Country
10. (Optional) Update "This is the primary shipping address for this customer" checkbox if needed
11. Tap **Save** to save the updated shipping address
12. Tap **OK** to close the Customer dialog
13. Customer update (with edited Ship To address) is saved in Store database and queued for sync to Central

## Expected Synchronization Behavior

- Insert: Not applicable (address already exists; not creating new address)
- Update: Update the Ship To address in Store database and sync/update the corresponding address in Central database
- Delete: Not applicable for this scenario (editing, not deleting)
- Matching key: Customer ID (unique identifier); Address ID (unique identifier for shipping address); Store ID + Customer ID + Address ID

## Expected Result in Source System

- Updated Ship To address details are saved/visible in POS (Customers | Edit Customer | Shipping tab)
- Customer record shows last modified timestamp updated
- Updated address is visible in Store Manager (Customer | Customers | Shipping tab)
- If address was selected for current transaction, Customer pane in POS shows updated address

## Expected Result in Target System

- Updated Ship To address details are saved/visible in Central database after sync
- Customer record in Central shows last modified timestamp updated
- Updated address is visible in Central Manager (Customer | Customers | Shipping tab)
- Address changes sync automatically via Central Client

## Validation Points

- Verify updated address values in POS (Customers | Edit Customer | Shipping tab)
- Verify updated address values in Store Manager (Customer | Customers)
- Verify updated address values in Central after sync
- Verify address fields (Address Line 1, Address Line 2, City, State, ZIP, Country) map correctly from Store to Central
- Verify primary shipping address flag (if changed) is updated in Central
- Verify correct Address ID is updated (not creating new address)
- Duplicate prevention: No duplicate addresses created during edit operation

## Negative / Edge Case Coverage

- **Invalid address values:** RMH does not enforce address validation (e.g., valid ZIP code format, state abbreviation); store should implement validation policy or extension if required
- **Incomplete address:** User can save shipping address with some fields empty (e.g., no ZIP code); verify partial addresses sync correctly
- **POS offline then sync later:** Address update is saved locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify address update appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Concurrent edits from multiple sources:** If same customer/address is edited simultaneously in multiple locations (Store A, Store B, Central), last write wins; verify sync conflict resolution
- **Editing primary shipping address:** If user changes "This is the primary shipping address for this customer" checkbox, verify previous primary address is updated and new primary flag syncs to Central
- **Address in use for active transaction:** If shipping address is currently selected for a transaction (visible in Customer pane), editing it updates the address for current transaction after save
- **Clear Shipping Address:** Starting with release 3.50.11, if wrong shipping address is selected for transaction, use **Clear Shipping Address** button (Customers menu) to remove it from current transaction
- **Tax calculation impact:** Starting with release 3.50.11, if "If shipping to the customer" tax option is enabled (File | Configuration | Sales Tax), editing shipping address may impact tax calculation for items shipped to that address
- **Global customer edit:** If customer is global customer (created in Central Manager), editing address in store syncs back to Central and then to other stores in assigned store groups
- **Shipping address display in POS:** Starting with release 3.50.11, selected shipping address displays in Customer pane at top of POS screen; editing address updates Customer pane display after save
- **Ship To address for purchase orders:** If shipping address is used in purchase orders (Ship To Customer option), editing address may impact existing or future purchase orders
- **Consistency Checker:** If address update fails to sync, run Consistency Checker to synchronize missing updates to Central

## Known Issues / Notes

- Video link: https://somup.com/cOnDDBWOyx
- Reference: RMH documentation - [Adding a shipping address](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/shipping-adding-address.md)
- Reference: RMH documentation - [Editing customer profiles](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/customers-editing.md)
- Reference: RMH documentation - [Setting up sales tax rules](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-sales-tax-rules.md)
- **Pre-requisite:** "Allowed to view and edit all customers" permission must be enabled for POS users to edit shipping addresses
- User can edit existing customer profile by tapping **Customers | Edit Customer** or using POS command `Customer_EditCommand`
- **No address validation:** RMH does not enforce address format validation (ZIP code, state abbreviation, etc.); consider implementing custom validation extension if required
- **Primary shipping address:** Only one address can be marked as primary; changing primary flag automatically updates previous primary address
- **Ship To address for tax calculation:** Starting with release 3.50.11, shipping address (not billing address) is used for destination tax calculation if "If shipping to the customer" tax option is enabled (File | Configuration | Sales Tax)
- **Shipping address in Customer pane:** Starting with release 3.50.11, selected shipping address displays in Customer pane at top of POS screen to the right of billing address
- **Clear Shipping Address button:** Starting with release 3.50.11, available in Customers menu to remove shipping address from current transaction if wrong address was selected
- **Tax configuration:** To use local tax at destination, store must: (1) enable "If shipping to the customer" tax option, (2) add at least one shipping address for customer, and (3) select customer's shipping address in POS before tendering sale
- **Default tax behavior:** If destination tax is enabled but shipping address is not selected before tender, POS defaults to using local tax on per-item basis
- **Purchase orders:** Shipping address can be used when creating purchase orders with "Ship To Customer" option (release 3.10.4+)
- Address updates sync from Store to Central automatically via Central Client
- Global customers (created in Central Manager) can have addresses edited in stores; changes sync back to Central
- **Last write wins:** Concurrent edits from multiple locations are resolved using last-write-wins strategy; no conflict resolution UI
