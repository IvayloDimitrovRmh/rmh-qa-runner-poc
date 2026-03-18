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

## Validation Points

- Verify customer exists in POS with correct contact information
- Verify customer exists in Store Manager (Customer | Customers)
- Verify Ship To address exists in POS (Customers | Edit Customer | Shipping tab)
- Verify customer exists in Central after sync
- Verify Ship To address exists in Central with correct address details
- Verify mandatory fields were enforced (if configured) before save
- Mapping validation: Customer fields (First Name, Last Name, Email, Phone, etc.) and shipping address fields (Address, City, State, ZIP, Country) map correctly from Store to Central
- Duplicate prevention: No duplicate customer/address in Central for the same Customer ID