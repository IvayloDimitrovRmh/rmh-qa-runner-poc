# Accounts Synchronization

## Metadata

Feature: Accounts Synchronization  
Business Area: Customer > AR  
Source System: Store  
Target System: Central  
Sync Direction: Store -> Central  
Release: Unknown  
Priority: 10  

---

# Scenario: Insert or Update Accounts

## Preconditions
- Store is connected to Central.
- Customer account exists or can be created in Store.

## Action
Insert or update account records in Store.

## Expected Results
- Insert new account record into Central.
- Update existing account record in Central.
- Matching key: Account identifier.
- Account record saved successfully in Store.
- Account record inserted or updated in Central.

## Validation Points
- Account identifier matches between Store and Central.
- Account attributes and financial data are synchronized correctly.
- No duplicate account records are created.

---

# Billing Cycle Synchronization

## Metadata

Feature: Billing Cycle Synchronization  
Business Area: Customer > AR  
Source System: Store  
Target System: Central  
Sync Direction: Store -> Central  
Release: Unknown  
Priority: 18  

---

# Scenario: Close Billing Cycle

## Preconditions
- Store is connected to Central.
- Billing cycle exists in Store.

## Action
Close billing cycle.

## Expected Results
- Insert billing cycle closure information into Central.
- Update billing cycle status in Central.
- Billing cycle successfully closed in Store.
- Billing cycle closure reflected in Central.

## Validation Points
- Billing cycle identifier matches between systems.
- Closure status synchronized correctly.

---

# Statement Printing Synchronization

## Metadata

Feature: Statement Printing Synchronization  
Business Area: Customer > AR  
Source System: Store  
Target System: Central  
Sync Direction: Store -> Central  
Release: Unknown  
Priority: 19  

---

# Scenario: Print Statements

## Preconditions
- Store is connected to Central.
- Customer accounts exist in Store.

## Action
Generate and print statements for customers.

## Expected Results
- Insert or update statement information in Central.
- Statements printed successfully in Store.
- Statement activity recorded in Central.

## Validation Points
- Customer account identifier matches between systems.
- Statement generation event synchronized correctly.