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

# Scenario: New Customer and its Ship to address

## Business Entity

Customer and Ship To address

## Business Purpose

Create new customer profiles (including shipping address details) in POS and synchronize them to Central for consistent customer data across locations and channels, enabling ship-to-customer functionality for purchase orders and accurate tax calculations based on destination.

## Trigger

User creates a new customer and enters a Ship To address in POS.

## Preconditions

- POS is operational and user is logged in
- User has permission to create customers: "Allow new customers at POS" store rule is enabled (File | Configuration | Store Rules | Customer Options)
- Mandatory customer fields are configured (if applicable) in File | Configuration | Store Rules | Customer Options (bold fields are required)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Create a new customer in POS and add the customer's Ship To address:**
1. Tap **Customers | New Customer**
2. On the **Customer** tab, enter the customer's contact information:
   - Title (optional)
   - First Name (may be mandatory if configured)
   - Last Name (may be mandatory if configured)
   - Company (if applicable)
   - Email Address (may be mandatory if configured)
   - Phone (may be mandatory if configured)
   - **Note:** If field label is **bold**, it is mandatory; you cannot save the customer profile if those fields are empty
3. (Optional) On the **Billing** tab, enter the customer's billing address (required only if customer will be billed for purchases)
4. On the **Shipping** tab, enter the customer's Ship To address (or addresses):
   a. Tap **New** to add a shipping address
   b. Enter shipping address details:
      - Address Line 1 (street address)
      - Address Line 2 (optional - suite, apt, etc.)
      - City
      - State/Province
      - ZIP/Postal Code
      - Country
   c. Tap **Save**
   d. (Optional) Add additional Ship To addresses by repeating steps a-c
5. (Optional) On the **Options** tab, select applicable customer options (tax exempt, employee, price level, discount %, Tax ID Number)
6. (Optional) On the **Additional** tab, enter notes and custom field information
7. (Optional) On the **Alias** tab, add customer aliases for lookup
8. Tap **Save** to create the customer profile
9. Customer record is created in Store database and queued for sync to Central

## Expected Synchronization Behavior

- Insert: Insert the new customer and Ship To address(es) in Store database and sync/insert the corresponding customer and address(es) into Central database
- Update: If customer or shipping address is edited in Store, changes sync to Central; if edited in Central (for global customers), changes sync to stores in assigned store groups
- Delete: Not applicable (customers are typically made inactive rather than deleted to preserve transaction history)
- Matching key: Customer ID (unique identifier from Store to Central); Store ID + Customer ID

## Expected Result in Source System

- New customer is created/visible in POS
- Customer appears in customer lookup (Customers | Lookup Customer or press F7)
- Ship To address is created/visible for the customer in POS (Customers | Edit Customer | Shipping tab)
- Customer record is visible in Store Manager (Customer | Customers)
- Shipping address(es) appear in customer record in Store Manager

## Expected Result in Target System

- Customer is created/visible in Central database after sync
- Ship To address(es) is created/visible in Central for the customer
- Customer syncs automatically via Central Client
- Customer is available in Central Manager (Customer | Customers)
- Shipping address(es) appear in customer record in Central Manager
- Customer is available for assignment to store groups (if managed as global customer)

## Validation Points

- Verify customer exists in POS with correct contact information
- Verify customer exists in Store Manager (Customer | Customers)
- Verify Ship To address exists in POS (Customers | Edit Customer | Shipping tab)
- Verify customer exists in Central after sync
- Verify Ship To address exists in Central with correct address details
- Verify mandatory fields were enforced (if configured) before save
- Mapping validation: Customer fields (First Name, Last Name, Email, Phone, etc.) and shipping address fields (Address, City, State, ZIP, Country) map correctly from Store to Central
- Duplicate prevention: No duplicate customer/address in Central for the same Customer ID

## Negative / Edge Case Coverage

- **Missing required customer fields:** If mandatory fields (configured in File | Configuration | Store Rules | Customer Options) are empty, POS disables Save button; customer cannot be saved until required fields are filled
- **Missing required address fields:** POS validates shipping address fields; verify incomplete addresses are handled appropriately
- **POS offline then sync later:** Customer created locally in Store database with shipping address, then synced to Central when connectivity is restored; customer and address data are preserved
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify customer with shipping address appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Customer sync is idempotent; repeated sync of same customer does not create duplicates in Central
- **Multiple Ship To addresses:** Customer can have multiple shipping addresses; verify all addresses sync correctly to Central
- **Editing existing customer to add shipping address:** User can edit existing customer in POS (Customers | Edit Customer) and add shipping address on Shipping tab; changes sync to Central
- **Global customer creation:** If customer is created in Central Manager and assigned to store groups, customer syncs to stores; stores can edit customer and changes sync back to Central
- **Ship To address for tax calculation:** Starting with release 3.50.11, if "If shipping to the customer" tax option is enabled (File | Configuration | Sales Tax), POS calculates local tax at destination using shipping address (not billing address)
- **Ship To address display in POS:** Starting with release 3.50.11, if shipping address is selected for customer transaction, address displays in Customer pane in POS
- **Clear Shipping Address:** Starting with release 3.50.11, a "Clear Shipping Address" button is available on Customers menu in POS to remove shipping address from current transaction
- **Ship To Customer on purchase orders:** Starting with release 3.10.4, when creating purchase order with "Ship To Customer" option, customer's shipping address can be looked up and added to Ship To Address field
- **Custom fields:** Custom fields created in Central Manager (Setup | Miscellaneous | Custom Fields) automatically sync to stores (feature available since 3.50.5); stores can create local custom fields that don't sync to Central
- **Consistency Checker:** If customer or shipping address fails to sync, run Consistency Checker to synchronize missing records to Central

## Known Issues / Notes

- Video link: https://somup.com/cOnDDvWOxC
- Reference: RMH documentation - [Adding customer profiles](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/customers-adding.md)
- Reference: RMH documentation - [Adding a shipping address](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/shipping-adding-address.md)
- Reference: RMH documentation - [Setting up sales tax rules](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-sales-tax-rules.md)
- **Pre-requisite:** "Allow new customers at POS" store rule must be enabled (File | Configuration | Store Rules | Customer Options)
- **Mandatory fields:** Fields with **bold labels** in POS are mandatory (configured in Store Manager); POS disables Save button until required fields are filled
- Mandatory customer fields are configured in File | Configuration | Store Rules | Customer Options (starting with release 3.11.1)
- Customer can have **multiple Ship To addresses** (e.g., home address, work address, gift recipient address)
- **Ship To address for tax calculation:** Starting with release 3.50.11, if tax-on-shipping is enabled, POS uses shipping address (not billing address) to calculate destination tax
- **Shipping address in Customer pane:** Starting with release 3.50.11, if shipping address is selected for transaction, it displays in Customer pane at top of POS screen
- **Clear Shipping Address button:** Available in Customers menu (release 3.50.11+) to remove shipping address from current transaction
- **Purchase orders:** Ship To address can be used when creating purchase orders with "Ship To Customer" option (release 3.10.4+)
- **Custom fields sync:** Custom fields created in Central automatically sync to stores; local custom fields don't sync to Central (release 3.50.5+)
- Customer profiles created in POS are stored in Store database and sync to Central via Central Client
- Global customers (created in Central Manager) can be assigned to store groups and sync to multiple stores
- Customers are typically made **inactive** rather than deleted to preserve transaction history and referential integrity
