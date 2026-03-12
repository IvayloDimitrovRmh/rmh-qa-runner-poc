# Supplier Synchronization to Store Groups

## Metadata

Feature: Supplier Synchronization to Store Groups  
Business Area: Inventory/Purchasing  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: MVP 1.1  
Priority: Unknown  

---

# Scenario: Insert or Update Suppliers in Selected Stores

## Business Entity

Suppliers

## Business Purpose

Ensure supplier records created or updated in Central are synchronized to the selected stores so that purchasing and vendor management remain consistent across all locations.

## Trigger

User creates or edits a supplier record in Central.

## Preconditions

- Supplier record exists in Central.
- Store Group configuration includes the selected store(s).
- Synchronization service is active.

## Action

Create or modify supplier information in Central.

## Expected Synchronization Behavior

- Insert new supplier record into selected store(s).
- Update existing supplier record in selected store(s).
- Matching key: Supplier identifier.

## Expected Result in Source System

- Supplier record saved successfully in Central.

## Expected Result in Target System

- Supplier record inserted or updated in the selected store(s).

## Validation Points

- Supplier identifier matches between Central and Store.
- Supplier details synchronized correctly.
- Supplier record appears only in the intended store group.

## Negative / Edge Case Coverage

- Invalid supplier data rejected.
- Sync retry if store unavailable.
- Duplicate supplier prevention.