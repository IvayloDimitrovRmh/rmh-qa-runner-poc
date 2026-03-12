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

## Business Entity

Customer (global customer managed by Central)

## Business Purpose

Allow a store (S1) to retrieve customer information from another store (S2) via Central Manager, enabling consistent customer service across multiple store locations by making customer data available where needed for sales and service.

## Trigger

User performs an online customer lookup in POS at Store 1 (S1) for a customer that exists in Store 2 (S2).

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

## Negative / Edge Case Coverage

- **Lookup when offline:** If S1 is offline (no Central connectivity), customer lookup only searches local S1 database; customer from S2 is not available until S1 comes online
- **Customer not found in S2:** If customer does not exist in S2 or has not synced to Central, customer does not appear in S1 lookup results
- **Partial sync: Central updated but S1 download fails:** If customer syncs from S2 to Central but S1 download fails, Central Client at S1 retries download; verify customer appears at S1 after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated lookups:** Customer download from Central to S1 is idempotent; repeated lookups do not create duplicate customer records at S1
- **Customer updated in S2 after initial lookup:** If customer is updated in S2 after being downloaded to S1, updated information syncs to Central; S1 receives updates via periodic sync or when customer is accessed again
- **Global customer vs. local customer:** 
  - **Global customer** (created in Central Manager, assigned to store groups): Automatically syncs to all stores in assigned store groups; available for lookup at S1 without S2 involvement
  - **Local customer** (created in S2): Syncs to Central; available for lookup at S1 via Central download
- **Customer created at multiple stores:** If same customer (same name/phone) is created independently at S1 and S2, two separate customer records exist; RMH does not auto-merge duplicates; manual consolidation required
- **Consistency Checker:** If customer fails to sync from S2 to Central or from Central to S1, run Consistency Checker to synchronize missing customer records
- **Store group assignment:** If global customer is assigned to store groups, customer automatically syncs to stores in those groups; verify S1 is in assigned store group to receive customer
- **Customer edits at S1:** If customer is edited at S1 after download, changes sync back to Central; if customer is global, changes sync to other stores in assigned store groups

## Known Issues / Notes

- Video link: https://somup.com/cOnDDdWO4B
- Expected text states: "sync customer from S2 to Central and then download at S1"
- Reference: RMH documentation - [Synchronizing customer records between stores](https://github.com/rmhpos/gitbook-repo/blob/main/docs/CM_UG_Topics/customers-synchronizing.md)
- Reference: RMH documentation - [Setting up customer accounts](https://github.com/rmhpos/gitbook-repo/blob/main/docs/CM_UG_Topics/setting-up-customer-accounts.md)
- **Customer synchronization flow:** S2 creates customer -> S2 syncs to Central via Central Client -> S1 looks up customer -> Central downloads customer to S1 via Central Client
- **Global customers:** Created in Central Manager (Setup | People and Security | Store Users for users, Customer | Customers for customers) and assigned to store groups; automatically sync to all stores in assigned groups
- **Local customers:** Created in Store Manager or POS at specific store; sync to Central; available for download to other stores via lookup or Central sync
- **Online lookup requirement:** Store 1 must be in online mode with Central connectivity to lookup customers from other stores; offline mode only searches local S1 database
- **No automatic customer merge:** If same customer is created independently at multiple stores, RMH creates separate customer records; manual consolidation required to prevent duplicates
- **Duplicate detection:** RMH does not provide built-in duplicate customer detection; stores should implement policies to search for existing customers before creating new ones
- **Customer ownership:** Local customers "belong" to store where created but can be used by other stores after sync; global customers belong to Central and sync to all assigned stores
- **Sync timing:** Customer sync from S2 to Central occurs automatically via Central Client; download from Central to S1 occurs on lookup/first use or periodic sync
- **Consistency Checker:** Can be used to synchronize customer records between stores and Central if automatic sync fails
