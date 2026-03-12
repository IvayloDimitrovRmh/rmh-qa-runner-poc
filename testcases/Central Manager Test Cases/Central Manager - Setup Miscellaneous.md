# Custom Fields Synchronization to Stores

## Metadata

Feature: Custom Fields Synchronization to Stores  
Business Area: Setup > Miscellaneous  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: MVP 1.1  
Priority: B60  

---

# Scenario: Insert or Update Custom Fields in Stores

## Business Entity

Custom Fields

## Business Purpose

Ensure custom field configurations defined in Central are synchronized to stores so that additional metadata fields used in business operations remain consistent across all store environments.

## Trigger

User creates or updates Custom Field definitions in Central.

## Preconditions

- Custom Field configuration exists in Central.
- Active stores are identified using table `Store`.
- Synchronization service is active.

## Action

Create or modify Custom Field definitions in Central.

## Expected Synchronization Behavior

- Lookup active stores in table `Store`.
- Insert new Custom Fields into store(s).
- Update existing Custom Fields in store(s).
- Matching key: Custom Field identifier.

## Expected Result in Source System

- Custom Field configuration saved successfully in Central.

## Expected Result in Target System

- Custom Field definitions inserted or updated in store(s).

## Validation Points

- Custom Field identifier matches between Central and Store.
- Field name, type, and configuration synchronized correctly.
- Only active stores receive the update.

## Negative / Edge Case Coverage

- Invalid field configuration rejected.
- Sync retry if store unavailable.
- Duplicate field definitions prevented.

---

# Item Properties Synchronization to Stores

## Metadata

Feature: Item Properties Synchronization to Stores  
Business Area: Setup > Miscellaneous  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: MVP 1.1  
Priority: B60  

---

# Scenario: Insert or Update Item Properties in Stores

## Business Entity

Item Properties

## Business Purpose

Ensure item property definitions configured in Central are synchronized to stores to support consistent item classification and operational behavior.

## Trigger

User creates or modifies Item Property definitions in Central.

## Preconditions

- Item Property configuration exists in Central.
- Active stores identified using table `Store`.

## Action

Create or modify Item Property definitions.

## Expected Synchronization Behavior

- Lookup active stores in table `Store`.
- Insert new Item Properties into store(s).
- Update existing Item Properties in store(s).

## Expected Result in Source System

- Item Property configuration saved successfully in Central.

## Expected Result in Target System

- Item Property definitions inserted or updated in store(s).

## Validation Points

- Property identifiers match between systems.
- Property attributes synchronized correctly.

## Negative / Edge Case Coverage

- Invalid property configuration rejected.
- Sync retry if store unavailable.

---

# Random Weight EAN Synchronization to Stores

## Metadata

Feature: Random Weight EAN Synchronization to Stores  
Business Area: Setup > Miscellaneous  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: MVP 1.1  
Priority: B60  

---

# Scenario: Insert or Update Random Weight EAN Configuration in Stores

## Business Entity

Random Weight EAN

## Business Purpose

Ensure random weight EAN configurations defined in Central are synchronized to stores to enable proper barcode processing for weighted items.

## Trigger

User creates or updates Random Weight EAN configuration in Central.

## Preconditions

- Random Weight EAN configuration exists in Central.
- Active stores identified using table `Store`.

## Action

Create or modify Random Weight EAN configuration.

## Expected Synchronization Behavior

- Lookup active stores in table `Store`.
- Insert new Random Weight EAN configuration into store(s).
- Update existing Random Weight EAN configuration in store(s).

## Expected Result in Source System

- Random Weight EAN configuration saved successfully in Central.

## Expected Result in Target System

- Random Weight EAN configuration updated in store(s).

## Validation Points

- EAN configuration values match between systems.
- Barcode format rules synchronized correctly.

## Negative / Edge Case Coverage

- Invalid EAN configuration rejected.
- Sync retry if store unavailable.