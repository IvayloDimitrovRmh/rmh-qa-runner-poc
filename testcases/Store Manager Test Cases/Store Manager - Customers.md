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

## Business Entity

Customer

## Business Purpose

Ensure customer records created or modified at the store level are synchronized to Central so that customer data remains consistent across all systems.

## Trigger

User creates a new customer or edits an existing customer record in Store.

## Preconditions

- Store is connected to Central.
- Customer record can be created or edited in Store.

## Action

Create a new customer or update an existing customer in Store.

## Expected Synchronization Behavior

- Insert new customer into Central.
- Update existing customer in Central.
- Matching key: Customer identifier.

## Expected Result in Source System

- Customer record is successfully created or updated in Store.

## Expected Result in Target System

- Customer record is inserted or updated in Central.

## Validation Points

- Customer identifier matches between Store and Central.
- Customer attributes are synchronized correctly.
- No duplicate customer records are created.

## Negative / Edge Case Coverage

- Invalid customer data rejected.
- Synchronization retry if Central is temporarily unavailable.
- Duplicate customer prevention logic verified.

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

## Business Entity

Customer Ship-To

## Business Purpose

Ensure shipping address changes for a customer performed in Store are synchronized to Central so that delivery information remains accurate.

## Trigger

User adds, edits, or removes a Ship-To entry from the Ship-To tab of a customer record in Store.

## Preconditions

- Customer exists in Store.
- Ship-To tab is accessible for the customer.

## Action

Add, remove, or update Ship-To address entries in the customer Ship-To tab.

## Expected Synchronization Behavior

- Insert new Ship-To record in Central.
- Update existing Ship-To record in Central.
- Delete Ship-To record in Central.

## Expected Result in Source System

- Ship-To address entries are successfully updated in Store.

## Expected Result in Target System

- Ship-To address entries are inserted, updated, or deleted in Central.

## Validation Points

- Customer identifier matches between Store and Central.
- Ship-To records are associated with the correct customer.
- Address fields are synchronized correctly.

## Negative / Edge Case Coverage

- Invalid address information rejected.
- Synchronization retry if Central is unavailable.
- Duplicate Ship-To entries prevented.