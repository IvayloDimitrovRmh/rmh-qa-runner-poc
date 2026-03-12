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

## Business Entity

Batch Info

## Business Purpose

Ensure batch status updates performed at the store level are synchronized to Central so that financial batch processing and reporting remain consistent across systems.

## Trigger

User runs a Z Report or performs batch closing operations in Store.

## Preconditions

- Store is connected to Central.
- Batch record exists in Store.
- Batch closing functionality is enabled.

## Action

Update batch information during Z report execution or batch closing process.

## Expected Synchronization Behavior

- Update batch information in Central.
- Matching key: Batch identifier.

## Expected Result in Source System

- Batch status updated successfully in Store.

## Expected Result in Target System

- Corresponding batch record updated in Central.

## Validation Points

- Batch identifier matches between Store and Central.
- Batch status values synchronized correctly.
- No duplicate batch records created.

## Negative / Edge Case Coverage

- Synchronization retry if Central is unavailable.
- Invalid batch state transitions rejected.
- Partial synchronization does not corrupt batch data.

## Known Issues / Notes

- Bug 204264: Store > Update Batch Info: The batch status is not sync to Central when running Z report for blind closed batch