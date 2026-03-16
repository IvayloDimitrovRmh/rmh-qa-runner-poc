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

## Preconditions
- Reason code exists in Central.
- Store group configuration includes selected store(s).
- Synchronization service is active.

## Action
Create or modify reason code records in Central.

## Expected Results
- Insert new reason code into selected store(s).
- Update existing reason code in selected store(s).
- Matching key: Reason Code identifier.
- Reason code saved successfully in Central.
- Reason code inserted or updated in selected store(s).

## Validation Points
- Reason code identifier matches between Central and Store.
- Reason code description synchronized correctly.
- Reason code appears only in the intended store group.

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

## Preconditions
- Tare record exists in Central.
- Active stores are identified using table `Store`.
- Synchronization service is active.

## Action
Create or modify tare records in Central.

## Expected Results
- Lookup active stores in table `Store`.
- Insert new tare records into store(s).
- Update existing tare records in store(s).
- Tare configuration saved successfully in Central.
- Tare configuration inserted or updated in store(s).

## Validation Checks
- Tare identifier matches between Central and Store.
- Weight configuration synchronized correctly.
- Only active stores receive the updates.