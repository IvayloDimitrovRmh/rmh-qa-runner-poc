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

## Business Entity

Stores

## Business Purpose

Ensure store configuration records maintained in Central are synchronized only to active stores so that store setup and operational configuration remain consistent across the environment.

## Trigger

User creates or updates store configuration in Central.

## Preconditions

- Store records exist in Central.
- Active stores are identified using the table `Store`.
- Synchronization service is active.

## Action

Create or modify store records in Central.

## Expected Synchronization Behavior

- Lookup active stores in table `Store`.
- Insert store records only into active store(s).
- Update existing store records when applicable.
- Matching key: Store identifier.

## Expected Result in Source System

- Store configuration saved successfully in Central.

## Expected Result in Target System

- Store record inserted or updated only in active store(s).

## Validation Points

- Store identifier matches across systems.
- Only active stores receive the synchronization.
- Store configuration fields correctly mapped.

## Negative / Edge Case Coverage

- Inactive stores do not receive updates.
- Sync retry if store unavailable.
- Duplicate store record prevention.

## Known Issues / Notes

- Create & Update operations executed with ID = 0.
- Code validation required for update operation handling.