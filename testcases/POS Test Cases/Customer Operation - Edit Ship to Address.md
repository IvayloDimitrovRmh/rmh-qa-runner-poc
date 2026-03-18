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

## Validation Points

- Verify updated address values in POS (Customers | Edit Customer | Shipping tab)
- Verify updated address values in Store Manager (Customer | Customers)
- Verify updated address values in Central after sync
- Verify address fields (Address Line 1, Address Line 2, City, State, ZIP, Country) map correctly from Store to Central
- Verify primary shipping address flag (if changed) is updated in Central
- Verify correct Address ID is updated (not creating new address)
- Duplicate prevention: No duplicate addresses created during edit operation