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

# Scenario: Edit Customer and add new ship to address

## Business Entity

Customer and Ship To address

## Business Purpose

Maintain accurate customer information by adding additional Ship To addresses and ensuring Central reflects the updated customer profile, enabling multiple shipping destinations and accurate tax calculations based on destination.

## Trigger

User edits an existing customer and adds a new Ship To address in POS.

## Preconditions

- POS is operational and user is logged in
- Customer exists in POS (customer can be looked up by name, phone, or any combination)
- User has permission to edit customers: "Allowed to view and edit all customers" permission is enabled (Setup | People & Security | Users | General tab | POS User Roles)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Edit an existing customer in POS and add a new Ship To address:**
1. Tap **Customers | Lookup Customer** or press **F7**
2. On the customer lookup screen, type all or part of the customer's name, phone number, or any combination and press **Enter**
3. To select the customer, do one of the following:
   - Tap the customer's name once and tap **Select**
   - Tap the customer's name twice
4. Tap **Customers | Edit Customer** (or use command: `Customer_EditCommand`)
5. The Customer dialog displays with existing customer information
6. Navigate to the **Shipping** tab
7. Tap **New** to add a new shipping address
8. If prompted "Do you want to use the existing Billing information address?":
   - Select **Yes** to use the billing address as a shipping address (address fields auto-populate)
   - Select **No** to enter a new shipping address (manually enter address fields)
9. Enter the new shipping address details:
   - Address Line 1 (street address)
   - Address Line 2 (optional - suite, apt, etc.)
   - City
   - State/Province
   - ZIP/Postal Code
   - Country
10. (Optional) If the customer wants this address to be their primary shipping address, select **This is the primary shipping address for this customer**
11. Tap **Save** to save the shipping address
12. Tap **OK** to close the Customer dialog
13. Customer update (including new Ship To address) is saved in Store database and queued for sync to Central

## Expected Synchronization Behavior

- Insert: Insert the new Ship To address in Store database and sync/insert it into Central database; customer record is updated (not inserted again)
- Update: Customer record is updated in Store and Central with timestamp; new shipping address is linked to existing customer ID
- Delete: Not applicable (shipping addresses are typically not deleted; customer can be marked inactive to preserve transaction history)
- Matching key: Customer ID (unique identifier from Store to Central); Store ID + Customer ID; each shipping address has unique address ID

## Expected Result in Source System

- Customer record is updated/saved in POS (Store database) with new Ship To address
- New Ship To address is created/visible in POS (Customers | Edit Customer | Shipping tab)
- Customer continues to appear in customer lookup with updated information
- Customer record is visible in Store Manager (Customer | Customers) with new shipping address

## Expected Result in Target System

- Customer record reflects updates in Central database (last modified timestamp updated)
- New Ship To address is created/visible in Central for the customer
- Customer syncs automatically via Central Client
- Customer is available in Central Manager (Customer | Customers) with new shipping address
- Shipping address(es) appear in customer record in Central Manager

## Validation Points

- Verify new Ship To address exists in POS (Customers | Edit Customer | Shipping tab)
- Verify new Ship To address exists in Store Manager (Customer | Customers)
- Verify new Ship To address exists in Central after sync
- Verify the address is associated with the correct customer in Central (Customer ID matches)
- Verify address fields (Address, City, State, ZIP, Country) map correctly from Store to Central
- Verify primary shipping address flag (if set) is preserved in Central
- Duplicate prevention: No duplicate address in Central for the same customer and address details

## Negative / Edge Case Coverage

- **Add duplicate Ship To address:** If user enters an address that matches existing address, RMH allows it (no built-in duplicate detection); store should have policy to prevent duplicates
- **POS offline then sync later:** Customer update with new shipping address is saved locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify customer update with new shipping address appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Address validation errors:** RMH does not enforce address validation (e.g., valid ZIP code format, state abbreviation); store should implement validation policy or extension if required
- **Incomplete address:** User can save shipping address with some fields empty (e.g., no ZIP code); verify partial addresses sync correctly
- **Primary shipping address:** If user selects "This is the primary shipping address for this customer," verify primary flag syncs to Central and previous primary address is updated
- **Multiple Ship To addresses:** Customer can have unlimited shipping addresses; verify all addresses sync correctly to Central
- **Editing existing customer in Central:** If customer is edited in Central Manager (for global customers), changes sync to stores in assigned store groups
- **Ship To address for tax calculation:** Starting with release 3.50.11, if "If shipping to the customer" tax option is enabled (File | Configuration | Sales Tax), POS calculates local tax at destination using shipping address (not billing address)
- **Ship To address display in POS:** Starting with release 3.50.11, if shipping address is selected for customer transaction, address displays in Customer pane in POS
- **Select Shipping Address command:** POS command `Customer_SelectShippingAddressCommand` invokes Select Shipping Address dialog to add shipping address for selected customer
- **Ship To Customer on purchase orders:** Starting with release 3.10.4, customer's shipping address can be used when creating purchase orders with "Ship To Customer" option
- **Consistency Checker:** If customer update or shipping address fails to sync, run Consistency Checker to synchronize missing records to Central

## Known Issues / Notes

- Video link: https://somup.com/cOnDDaWOyI
- Reference: RMH documentation - [Adding a shipping address](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/shipping-adding-address.md)
- Reference: RMH documentation - [Editing customer profiles](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/customers-editing.md)
- Reference: RMH documentation - [Setting up sales tax rules](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-sales-tax-rules.md)
- **Pre-requisite:** "Allowed to view and edit all customers" permission must be enabled for POS users to add shipping addresses
- User can edit existing customer profile by tapping **Customers | Edit Customer** or using POS command `Customer_EditCommand`
- **Copy billing address:** When adding new shipping address, POS prompts "Do you want to use the existing Billing information address?" - selecting Yes auto-populates address fields
- **Primary shipping address:** Customer can have multiple shipping addresses; one can be marked as primary
- **No duplicate detection:** RMH does not prevent duplicate shipping addresses; stores should implement policy to check for duplicates
- **No address validation:** RMH does not enforce address format validation (ZIP code, state abbreviation, etc.); consider implementing custom validation extension if required
- **Ship To address for tax calculation:** Starting with release 3.50.11, shipping address (not billing address) is used for destination tax calculation if configured
- **Shipping address in Customer pane:** Starting with release 3.50.11, selected shipping address displays in Customer pane at top of POS screen during transaction
- **POS command available:** `Customer_SelectShippingAddressCommand` invokes Select Shipping Address dialog for programmatic access via POS Task Pads or Custom Buttons
- **Purchase orders:** Ship To address can be used when creating purchase orders with "Ship To Customer" option (release 3.10.4+)
- Customer updates sync from Store to Central automatically via Central Client
- Global customers (created in Central Manager) can be edited in stores; changes sync back to Central