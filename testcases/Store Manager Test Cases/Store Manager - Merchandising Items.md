# Item Property Synchronization

## Metadata

Feature: Item Property Synchronization  
Business Area: Merchandising > Items  
Source System: Store  
Target System: Central  
Sync Direction: Store -> Central  
Release: Unknown  
Priority: 2  

---

# Scenario: Update Item Pricing, Cost, Quantity and Merchandising Fields

## Business Entity

Items

## Business Purpose

Ensure updates to item pricing, cost, quantities, and merchandising attributes performed at the store level are synchronized to Central so that inventory, pricing, and promotional information remain consistent across the system.

## Trigger

User edits item properties in Store under Merchandising > Items.

## Preconditions

- Item exists in Store.
- Store is connected to Central.
- Item synchronization functionality is enabled.

## Action

Edit item attributes including price, cost, quantity, quantity committed, restock level, reorder point, lower buydown, upper buydown, price A/B/C, MSRP, buydown quantity, sale price, sale start date, or sale end date.

## Expected Synchronization Behavior

- Update item record in Central.
- Matching key: Item identifier.

## Expected Result in Source System

- Item properties are successfully updated in Store.

## Expected Result in Target System

- Corresponding item properties are updated in Central.

## Validation Points

- Item identifier matches between Store and Central.
- Updated fields in Central match the values modified in Store.
- No duplicate item records are created.

## Negative / Edge Case Coverage

- Invalid pricing or quantity values rejected.
- Synchronization retry occurs if Central is temporarily unavailable.
- Partial updates do not corrupt item data.