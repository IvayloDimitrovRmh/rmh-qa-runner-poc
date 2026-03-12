# Worksheets

## Metadata
Feature: Worksheet Synchronization  
Business Area: Worksheets > Worksheets  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: Unknown  
Priority: Unknown  

---

# Scenario: Worksheet 308 Synchronization to Stores

## Required Test Data
- Worksheet ID: 308
- Effective synchronization date/time
- Selected store(s)

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Locate Worksheet 308.
3. Modify worksheet configuration or operational data.
4. Set or confirm the effective date/time for synchronization.
5. Save the worksheet.
6. Wait until the configured effective date/time or trigger synchronization manually.
7. Verify the update appears in the selected store(s).

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **308: Change Item Restocking Info**, confirm the worksheet is present and its status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- **Store(s):** For at least one item that was modified in Worksheet 308, open the item in the store (e.g., Merchandising > Items > item > Inventory tab or equivalent) and confirm that Reorder Point and Restock Level match the values set in the worksheet in Central Manager, and that Restock Level is greater than Reorder Point.
- **Data consistency:** Compare the Reorder Point and Restock Level values in the worksheet in Central Manager with the same items in each selected store; the values in the store match the Central configuration for those items.