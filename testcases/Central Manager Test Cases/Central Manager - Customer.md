# Customer Synchronization to Stores

## Metadata

Feature: Customer Synchronization to Stores  
Business Area: Customer  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: MVP 1.1  
Priority: Unknown  

---

# Scenario: Edit Customer and Synchronize to Stores

## Preconditions

- Customer exists in Central.
- Customer record exists in one or more stores.
- Lookup for the customer is performed in the table 'Global Catalog'.

## Action

Modify customer information in Central.

## Validation Points

- Customer identifier matches between Central and Store.
- Customer fields correctly updated.
- Only stores containing the customer record receive updates.

---

# Customer Ship-To Synchronization to Stores

## Metadata

Feature: Customer Synchronization to Stores  
Business Area: Customer  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: MVP 1.1  
Priority: Unknown  

---

# Scenario: Update Customer Ship-To Tab and Synchronize to Stores


## Preconditions

- Customer exists in Central.
- Customer exists in one or more stores.
- Lookup performed using the table 'Global Catalog'.

## Action

Add, edit, or remove Ship-To information for a customer.


## Validation Points

- Customer identifiers match across systems.
- Ship-To records correctly associated with customer.
- Only relevant stores receive updates.