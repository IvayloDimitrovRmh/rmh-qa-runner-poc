# Customer Synchronization

## Metadata

Feature: Customer Synchronization  
Business Area: Customer > Customers  
Source System: Store  
Target System: Central  
Sync Direction: Store -> Central  
Release: Unknown  
Priority: 3  

---

# Scenario: Create New or Edit Existing Customer

## Preconditions
- Store is connected to Central.
- Customer record can be created or edited in Store.

## Action
Create a new customer or update an existing customer in Store.

## Expected Results
- Insert new customer into Central.
- Update existing customer in Central.
- Matching key: Customer identifier.
- Customer record is successfully created or updated in Store.
- Customer record is inserted or updated in Central.

## Validation Points
- Customer identifier matches between Store and Central.
- Customer attributes are synchronized correctly.
- No duplicate customer records are created.

---

# Customer Ship-To Synchronization

## Metadata

Feature: Customer Synchronization  
Business Area: Customer > Customers  
Source System: Store  
Target System: Central  
Sync Direction: Store -> Central  
Release: Unknown  
Priority: 3  

---

# Scenario: Add or Remove Ship-To Address

## Preconditions
- Customer exists in Store.
- Ship-To tab is accessible for the customer.

## Action
Add, remove, or update Ship-To address entries in the customer Ship-To tab.

## Expected Results
- Insert new Ship-To record in Central.
- Update existing Ship-To record in Central.
- Delete Ship-To record in Central.
- Ship-To address entries are successfully updated in Store.
- Ship-To address entries are inserted, updated, or deleted in Central.

## Validation Points
- Customer identifier matches between Store and Central.
- Ship-To records are associated with the correct customer.
- Address fields are synchronized correctly.