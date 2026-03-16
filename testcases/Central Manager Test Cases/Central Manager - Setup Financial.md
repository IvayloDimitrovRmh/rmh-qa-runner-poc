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

## Preconditions

- Item Tax configuration exists in Central.
- Store Group configuration includes selected store(s).
- Synchronization service is active.

## Action

Create or modify Item Tax definitions in Central.

## Expected
- Insert new Item Tax into selected store(s).
- Update existing Item Tax in selected store(s).
- Matching key: Tax identifier.
- Item Tax configuration saved successfully in Central.
- Item Tax configuration inserted or updated in selected store(s).

## Validation Points

- Tax identifier matches between Central and Store.
- Tax percentage and calculation rules synchronized correctly.
- Configuration applied only to intended store(s).

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

## Preconditions

- Sales Tax configuration exists in Central.
- Store Group configuration includes selected store(s).

## Action

Create or modify Sales Tax definitions.

## Expected Synchronization Behavior
- Insert new Sales Tax into selected store(s).
- Update existing Sales Tax in selected store(s).
- Sales Tax configuration saved successfully in Central.
- Sales Tax configuration inserted or updated in selected store(s).

## Validation Points
- Sales Tax identifier matches across systems.
- Tax rates and calculation rules synchronized correctly.

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

## Preconditions

- Currency configuration exists in Central.
- Currency synchronization occurs as a dependency of Tender Types and Suppliers synchronization.

## Action

Create or modify Currency definitions.

## Expected
- Insert new Currency into store(s).
- Update existing Currency in store(s).
- Currency configuration saved successfully in Central.
- Currency configuration inserted or updated in store(s).

## Validation Points

- Currency code matches across systems.
- Currency attributes synchronized correctly.

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

## Preconditions

- Tender Type configuration exists in Central.
- Store Group configuration includes selected store(s).

## Action

Create or modify Tender Type definitions.

## Expected
- Insert new Tender Type into selected store(s).
- Update existing Tender Type in selected store(s).
- Tender Type configuration saved successfully in Central.
- Tender Type configuration inserted or updated in selected store(s).

## Validation Checks
- Tender Type identifier matches across systems.
- Payment configuration synchronized correctly.