# Register List Synchronization

## Metadata

Feature: Register List Synchronization  
Business Area: Setup > Hardware  
Source System: Store  
Target System: Central  
Sync Direction: Store -> Central  
Release: Unknown  
Priority: 6  

---

# Scenario: Insert or Update Register List

## Business Entity

Register List

## Business Purpose

Ensure register configuration changes performed in Store are synchronized to Central so that POS hardware configuration remains consistent across the environment.

## Trigger

User creates or updates register configuration in Store.

## Preconditions

- Store is connected to Central.
- Register configuration exists in Store.

## Action

Insert or update register entries in the Register List.

## Expected Synchronization Behavior

- Insert new register configuration into Central.
- Update existing register configuration in Central.
- Matching key: Register identifier.

## Expected Result in Source System

- Register configuration saved successfully in Store.

## Expected Result in Target System

- Register configuration inserted or updated in Central.

## Validation Points

- Register identifier matches between Store and Central.
- Register attributes synchronized correctly.
- Hardware configuration fields are mapped correctly.

## Negative / Edge Case Coverage

- Invalid register configuration rejected.
- Synchronization retry if Central is unavailable.
- Duplicate register entries prevented.

## Known Issues / Notes

- Bug 204266: Store > Register List: Not all values correctly sync to Central

---

# Store Information Synchronization

## Metadata

Feature: Store Information Synchronization  
Business Area: File > Configuration > Store Tab  
Source System: Store  
Target System: Central  
Sync Direction: Store -> Central  
Release: Unknown  
Priority: 9  

---

# Scenario: Edit Store Information

## Business Entity

Store Information

## Business Purpose

Ensure updates to store configuration information in Store are synchronized to Central so that headquarters maintains accurate store configuration data.

## Trigger

User edits store information within the Store configuration settings.

## Preconditions

- Store is connected to Central.
- Store configuration exists in Store.
- Central database contains the table `HQConfiguration`.

## Action

Modify store configuration details in the Store Tab under File > Configuration.

## Expected Synchronization Behavior

- Update record in Central table `HQConfiguration` using `StoreID` as the key.

## Expected Result in Source System

- Store configuration updates saved successfully in Store.

## Expected Result in Target System

- Corresponding record updated in Central table `HQConfiguration` using StoreID.

## Validation Points

- StoreID matches between Store and Central.
- Configuration values are synchronized correctly.
- No duplicate store configuration records created.

## Negative / Edge Case Coverage

- Invalid configuration values rejected.
- Synchronization retry if Central is unavailable.
- Partial update does not corrupt configuration data.