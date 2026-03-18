# Store Synchronization to Active Stores

## Metadata

Feature: Store Synchronization to Active Stores  
Business Area: Setup > Store  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: MVP 1.1  
Priority: Unknown  

---

# Scenario: Insert or Update Store Records to Active Stores

## Preconditions
- Store records exist in Central.
- Active stores are identified using the table `Store`.
- Synchronization service is active.

## Action
Create or modify store records in Central.

## Expected Results
- Lookup active stores in table `Store`.
- Insert store records only into active store(s).
- Update existing store records when applicable.
- Matching key: Store identifier.
- Store configuration saved successfully in Central.
- Store record inserted or updated only in active store(s).

## Validation Points
- Store identifier matches across systems.
- Only active stores receive the synchronization.
- Store configuration fields correctly mapped.

## Negative / Edge Case Coverage