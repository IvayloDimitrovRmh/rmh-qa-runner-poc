# Batch Information Synchronization

## Metadata

Feature: Batch Information Synchronization  
Business Area: Journal  
Source System: Store  
Target System: Central  
Sync Direction: Store -> Central  
Release: Unknown  
Priority: 11  

---

# Scenario: Update Batch Information

## Preconditions
- Store is connected to Central.
- Batch record exists in Store.
- Batch closing functionality is enabled.

## Action
Update batch information during Z report execution or batch closing process.

## Expected Results
- Update batch information in Central.
- Matching key: Batch identifier.
- Batch status updated successfully in Store.
- Corresponding batch record updated in Central.

## Validation Points
- Batch identifier matches between Store and Central.
- Batch status values synchronized correctly.
- No duplicate batch records created.