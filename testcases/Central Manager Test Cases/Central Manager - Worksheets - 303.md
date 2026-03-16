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

# Scenario: Worksheet 303 Synchronization to Stores

## Preconditions
- Central and Store synchronization services are active.
- Stores are selected for worksheet synchronization.
- Effective date and time are configured for the worksheet.
- User has permission to modify worksheets.

## Required Test Data
- Worksheet ID: 303
- Effective synchronization date/time
- Selected stores

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Locate Worksheet 303.
3. Modify worksheet configuration or data.
4. Set or confirm the effective date/time for synchronization.
5. Save the worksheet.
6. Wait until the configured effective date/time or trigger synchronization manually.
7. Verify the update appears in the selected store(s).

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **303: Change Item Ordering Info**, confirm the worksheet is present and its status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- **Store(s):** For at least one item that was modified in Worksheet 303, open the item in the store (e.g., Merchandising > Items > item > Purchase tab or equivalent) and confirm that the ordering fields that were updated in the worksheet (Min. Order, Cost, Reorder, MPQ, Purchase Tax) match the values set in the worksheet in Central Manager.
- **Data consistency:** Compare the modified ordering information in the worksheet in Central Manager with the same items in each selected store; the values in the store match the Central configuration for those items.