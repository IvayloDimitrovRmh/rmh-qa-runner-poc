# Reason Codes Synchronization to Store Groups

## Metadata

Feature: Reason Codes Synchronization to Store Groups  
Business Area: Setup > Merchandising  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: MVP 1.1  
Priority: Unknown  

---

# Scenario: Insert or Update Reason Codes in Selected Stores

## Business Entity

Reason Codes

## Business Purpose

Ensure merchandising reason codes configured in Central are synchronized to selected stores so that operational actions such as returns, voids, and adjustments use consistent reason codes across locations.

## Trigger

User creates or updates a reason code in Central.

## Preconditions

- Reason code exists in Central.
- Store group configuration includes selected store(s).
- Synchronization service is active.

## Action

Create or modify reason code records in Central.

## Expected Synchronization Behavior

- Insert new reason code into selected store(s).
- Update existing reason code in selected store(s).
- Matching key: Reason Code identifier.

## Expected Result in Source System

- Reason code saved successfully in Central.

## Expected Result in Target System

- Reason code inserted or updated in selected store(s).

## Validation Points

- Reason code identifier matches between Central and Store.
- Reason code description synchronized correctly.
- Reason code appears only in the intended store group.

## Negative / Edge Case Coverage

- Invalid reason code configuration rejected.
- Sync retry if store unavailable.
- Duplicate reason codes prevented.

---

# Tares Synchronization to Stores

## Metadata

Feature: Tares Synchronization to Stores  
Business Area: Setup > Merchandising  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: MVP 1.1  
Priority: Unknown  

---

# Scenario: Insert or Update Tares in Stores

## Business Entity

Tares

## Business Purpose

Ensure tare configurations created or updated in Central are synchronized to stores so that weight-based item calculations remain consistent across all store locations.

## Trigger

User creates or modifies tare configuration in Central.

## Preconditions

- Tare record exists in Central.
- Active stores are identified using table `Store`.
- Synchronization service is active.

## Action

Create or modify tare records in Central.

## Expected Synchronization Behavior

- Lookup active stores in table `Store`.
- Insert new tare records into store(s).
- Update existing tare records in store(s).

## Expected Result in Source System

- Tare configuration saved successfully in Central.

## Expected Result in Target System

- Tare configuration inserted or updated in store(s).

## Validation Points

- Tare identifier matches between Central and Store.
- Weight configuration synchronized correctly.
- Only active stores receive the updates.

## Negative / Edge Case Coverage

- Invalid tare configuration rejected.
- Sync retry if store unavailable.
- Duplicate tare records prevented.