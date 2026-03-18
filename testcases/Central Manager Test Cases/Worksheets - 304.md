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

# Scenario: Worksheet 304 Synchronization to Stores

## Preconditions
- Central and Store synchronization services are active.
- One or more stores are selected for worksheet synchronization.
- Effective date and time are configured for the worksheet.
- User has permission to modify worksheets.

## Required Test Data
- Worksheet ID: 304
- Effective synchronization date/time
- Selected store(s)

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Locate Worksheet 304.
3. Modify worksheet configuration or operational data.
4. Set or confirm the effective date/time for synchronization.
5. Save the worksheet.
6. Wait until the configured effective date/time or trigger synchronization manually.
7. Verify the update appears in the selected store(s).

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **304: Change Item Prices (Regular)**, confirm the worksheet is present and its status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- **Store(s):** For at least one item that was modified in Worksheet 304, open the item in the store (e.g., Merchandising > Items > item > Pricing tab or equivalent) and confirm that the regular price (New Price) matches the value set in the worksheet in Central Manager.
- **Data consistency:** Compare the modified item prices in the worksheet in Central Manager with the same items in each selected store; the prices in the store match the Central configuration for those items.