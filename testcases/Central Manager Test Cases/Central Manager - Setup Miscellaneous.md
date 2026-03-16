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

## Preconditions
- Custom Field configuration exists in Central.
- Active stores are identified using table `Store`.
- Synchronization service is active.

## Action
Create or modify Custom Field definitions in Central.

## Expected Results
- Lookup active stores in table `Store`.
- Insert new Custom Fields into store(s).
- Update existing Custom Fields in store(s).
- Matching key: Custom Field identifier.
- Custom Field configuration saved successfully in Central.
- Custom Field definitions inserted or updated in store(s).

## Validation Points
- Custom Field identifier matches between Central and Store.
- Field name, type, and configuration synchronized correctly.
- Only active stores receive the update.

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

## Preconditions
- Item Property configuration exists in Central.
- Active stores identified using table `Store`.

## Action
Create or modify Item Property definitions.

## Expected Results
- Lookup active stores in table `Store`.
- Insert new Item Properties into store(s).
- Update existing Item Properties in store(s).
- Item Property configuration saved successfully in Central.
- Item Property definitions inserted or updated in store(s).

## Validation Points
- Property identifiers match between systems.
- Property attributes synchronized correctly.

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

## Preconditions
- Random Weight EAN configuration exists in Central.
- Active stores identified using table `Store`.

## Action
Create or modify Random Weight EAN configuration.

## Expected Results
- Lookup active stores in table `Store`.
- Insert new Random Weight EAN configuration into store(s).
- Update existing Random Weight EAN configuration in store(s).
- Random Weight EAN configuration saved successfully in Central.
- Random Weight EAN configuration updated in store(s).

## Validation Checks
- EAN configuration values match between systems.
- Barcode format rules synchronized correctly.