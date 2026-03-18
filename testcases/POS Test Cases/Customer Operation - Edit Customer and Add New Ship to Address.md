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

## Validation Points

- Verify new Ship To address exists in POS (Customers | Edit Customer | Shipping tab)
- Verify new Ship To address exists in Store Manager (Customer | Customers)
- Verify new Ship To address exists in Central after sync
- Verify the address is associated with the correct customer in Central (Customer ID matches)
- Verify address fields (Address, City, State, ZIP, Country) map correctly from Store to Central
- Verify primary shipping address flag (if set) is preserved in Central
- Duplicate prevention: No duplicate address in Central for the same customer and address details