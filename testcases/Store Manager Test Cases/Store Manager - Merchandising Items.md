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

## Preconditions

- Item exists in Store.
- Store is connected to Central.
- Item synchronization functionality is enabled.

## Action
Edit item attributes including price, cost, quantity, quantity committed, restock level, reorder point, lower buydown, upper buydown, price A/B/C, MSRP, buydown quantity, sale price, sale start date, or sale end date.

## Expected Results
- Update item record in Central.
- Matching key: Item identifier.
- Item properties are successfully updated in Store.
- Corresponding item properties are updated in Central.

## Validation Points
- Item identifier matches between Store and Central.
- Updated fields in Central match the values modified in Store.
- No duplicate item records are created.