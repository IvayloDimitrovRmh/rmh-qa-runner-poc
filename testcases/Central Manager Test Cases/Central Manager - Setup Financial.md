# Item Taxes Synchronization to Selected Stores

## Metadata

Feature: Item Taxes Synchronization to Selected Stores  
Business Area: Setup > Financial  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: MVP 1.1  
Priority: Unknown  

---

# Scenario: Insert or Update Item Taxes in Selected Stores

## Business Entity

Item Taxes

## Business Purpose

Ensure item tax configurations maintained in Central are synchronized to selected stores so that taxation rules for items remain consistent across all store locations.

## Trigger

User creates or updates Item Tax configuration in Central.

## Preconditions

- Item Tax configuration exists in Central.
- Store Group configuration includes selected store(s).
- Synchronization service is active.

## Action

Create or modify Item Tax definitions in Central.

## Expected Synchronization Behavior

- Insert new Item Tax into selected store(s).
- Update existing Item Tax in selected store(s).
- Matching key: Tax identifier.

## Expected Result in Source System

- Item Tax configuration saved successfully in Central.

## Expected Result in Target System

- Item Tax configuration inserted or updated in selected store(s).

## Validation Points

- Tax identifier matches between Central and Store.
- Tax percentage and calculation rules synchronized correctly.
- Configuration applied only to intended store(s).

## Negative / Edge Case Coverage

- Invalid tax configuration rejected.
- Sync retry if store unavailable.
- Duplicate tax entries prevented.

---

# Sales Taxes Synchronization to Selected Stores

## Metadata

Feature: Sales Taxes Synchronization to Selected Stores  
Business Area: Setup > Financial  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: MVP 1.1  
Priority: B56  

---

# Scenario: Insert or Update Sales Taxes in Selected Stores

## Business Entity

Sales Taxes

## Business Purpose

Ensure sales tax configurations maintained in Central are synchronized to selected stores to guarantee consistent taxation during sales transactions.

## Trigger

User creates or updates Sales Tax configuration in Central.

## Preconditions

- Sales Tax configuration exists in Central.
- Store Group configuration includes selected store(s).

## Action

Create or modify Sales Tax definitions.

## Expected Synchronization Behavior

- Insert new Sales Tax into selected store(s).
- Update existing Sales Tax in selected store(s).

## Expected Result in Source System

- Sales Tax configuration saved successfully in Central.

## Expected Result in Target System

- Sales Tax configuration inserted or updated in selected store(s).

## Validation Points

- Sales Tax identifier matches across systems.
- Tax rates and calculation rules synchronized correctly.

## Negative / Edge Case Coverage

- Invalid tax configuration rejected.
- Sync retry if store unavailable.

---

# Currencies Synchronization to Stores

## Metadata

Feature: Currencies Synchronization to Stores  
Business Area: Setup > Financial  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: MVP 1.1  
Priority: Unknown  

---

# Scenario: Insert or Update Currencies in Stores

## Business Entity

Currencies

## Business Purpose

Ensure currency definitions configured in Central are synchronized to stores so that financial transactions use consistent currency settings.

## Trigger

User creates or updates Currency configuration in Central.

## Preconditions

- Currency configuration exists in Central.
- Currency synchronization occurs as a dependency of Tender Types and Suppliers synchronization.

## Action

Create or modify Currency definitions.

## Expected Synchronization Behavior

- Insert new Currency into store(s).
- Update existing Currency in store(s).

## Expected Result in Source System

- Currency configuration saved successfully in Central.

## Expected Result in Target System

- Currency configuration inserted or updated in store(s).

## Validation Points

- Currency code matches across systems.
- Currency attributes synchronized correctly.

## Negative / Edge Case Coverage

- Invalid currency configuration rejected.
- Sync retry if store unavailable.

---

# Tender Types Synchronization to Selected Stores

## Metadata

Feature: Tender Types Synchronization to Selected Stores  
Business Area: Setup > Financial  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: MVP 1.1  
Priority: Unknown  

---

# Scenario: Insert or Update Tender Types in Selected Stores

## Business Entity

Tender Types

## Business Purpose

Ensure tender type configurations defined in Central are synchronized to selected stores so that payment processing remains consistent across all POS systems.

## Trigger

User creates or updates Tender Type configuration in Central.

## Preconditions

- Tender Type configuration exists in Central.
- Store Group configuration includes selected store(s).

## Action

Create or modify Tender Type definitions.

## Expected Synchronization Behavior

- Insert new Tender Type into selected store(s).
- Update existing Tender Type in selected store(s).

## Expected Result in Source System

- Tender Type configuration saved successfully in Central.

## Expected Result in Target System

- Tender Type configuration inserted or updated in selected store(s).

## Validation Points

- Tender Type identifier matches across systems.
- Payment configuration synchronized correctly.

## Negative / Edge Case Coverage

- Invalid tender configuration rejected.
- Sync retry if store unavailable.