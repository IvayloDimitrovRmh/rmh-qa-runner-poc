# Worksheets

## Metadata
Feature: Worksheet Synchronization  
Business Area: Worksheets > Worksheets  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: MVP 1.1   
Priority: Unknown  

---

# Scenario: Worksheet 321 Synchronization to Stores

## Preconditions
- Central and Store synchronization services are running.
- Worksheet 321 exists in Central Manager.
- One or more stores are selected for synchronization.
- Effective date/time for synchronization is configured.

## Required Test Data
- Worksheet ID: 321
- Selected store(s)
- Effective synchronization date/time

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Locate Worksheet 321.
3. Modify worksheet configuration or operational values.
4. Confirm the selected store(s) for synchronization.
5. Save the worksheet.
6. Wait for the configured effective date/time or trigger synchronization manually.
7. Verify the worksheet changes appear in the selected store(s).

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **321: Change Item Block Sales**, confirm the worksheet is present and its status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- **Store(s):** For at least one item that was modified in Worksheet 321, open the item in the store (e.g., Merchandising > Items > item, or the screen where block sales is configured) and confirm that Block Sales Type, Block Sales Reason, Block Sales Schedule, Block Sales Start Date, and Block Sales End Date match the values set in the worksheet in Central Manager.
- **Data consistency:** Compare the block sales settings in the worksheet in Central Manager with the same items in each selected store; the block sales configuration in the store matches the Central configuration for those items.