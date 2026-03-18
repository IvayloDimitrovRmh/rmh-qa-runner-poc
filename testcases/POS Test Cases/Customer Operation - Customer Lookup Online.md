# Customer Operation

## Metadata

Feature: Customer Operation  
Business Area: Customer Operation  
Source System: POS (Store 1)  
Target System: Central  
Sync Direction: Store 2 -> Central -> Store 1  
Release: TBD  
Priority: 3

---

# Scenario: Customer Lookup Online

## Preconditions

- POS is operational at Store 1 (S1) and user is logged in
- Customer exists in Store 2 (S2) and has been synced to Central
- Central connectivity is available (Store 1 is in online mode with connection to Central database)
- Customer is either a global customer (created in Central Manager and assigned to store groups) or a local customer in S2 that has synced to Central
- Network connectivity between S1, Central, and S2 is operational

## Action

**Perform Customer Lookup Online in POS at Store 1:**
1. At Store 1 (S1), tap **Customers | Lookup Customer** or press **F7**
2. On the customer lookup screen, type all or part of the customer's name, phone number, or any combination and press **Enter**
3. If customer exists in S2 and has synced to Central:
   - Customer appears in lookup results at S1 (downloaded from Central)
   - Select the customer using one of the following:
     - Tap the customer's name once and tap **Select**
     - Tap the customer's name twice
4. Customer information displays in Customer pane at top of POS screen at S1
5. Customer is now available for transactions at S1

## Expected Synchronization Behavior

- Insert: Customer from S2 syncs to Central (if not already synced); Central then downloads customer to S1 on lookup/first use
- Update: If customer is updated in S2, changes sync to Central; if customer is later looked up or used in S1, updated information is available
- Delete: Not applicable (customers are typically made inactive rather than deleted to preserve transaction history)
- Matching key: Customer ID (unique identifier across all stores); Store ID + Customer ID for local customers

## Expected Result in Source System

- Customer record becomes available/downloaded at S1 (Store 1 database)
- Customer appears in customer lookup at S1 (Customers | Lookup Customer)
- Customer is visible in Store Manager at S1 (Customer | Customers)
- Customer can be used for transactions at S1

## Expected Result in Target System

- Customer record is present in Central database (synced from S2)
- Customer is visible in Central Manager (Customer | Customers)
- Customer sync status is tracked via Central Client Dashboard

## Validation Points

- Verify customer exists in S2 (Store 2) prior to lookup
- Verify customer has synced from S2 to Central
- Verify customer is present in Central database
- Verify customer is downloaded and available at S1 after lookup
- Verify customer details (name, phone, email, addresses) match across S2, Central, and S1
- Mapping validation: Customer fields map correctly from S2 -> Central -> S1
- Duplicate prevention: No duplicate customer records created at S1 or Central