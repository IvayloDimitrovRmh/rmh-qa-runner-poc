# Worksheets

## Metadata
Feature: Worksheet Synchronization  
Business Area: Worksheets > Worksheets  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: UnknMVP 1.1 own  
Priority: Unknown  

---

# Scenario: Worksheet 320 Synchronization to Stores

## Preconditions
- Central and Store synchronization services are operational.
- Worksheet 320 exists in Central.
- Store(s) are selected for synchronization.
- Effective date/time for worksheet synchronization is configured.

## Required Test Data
- Worksheet ID: 320
- Selected store(s)
- Effective synchronization date/time

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Locate Worksheet 320.
3. Modify worksheet configuration or operational values.
4. Ensure store(s) are selected for synchronization.
5. Save the worksheet.
6. Wait until the effective date/time or trigger synchronization.
7. Verify the worksheet changes appear in the selected store(s).

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **320: Adjust Item Sales Tax**, confirm the worksheet(s) are present and their status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- **Store(s):** For at least one item that was modified in Worksheet 320, open the item in the store (e.g., Merchandising > Items > item, or the screen where item tax / sales tax is assigned) and confirm that the sales tax (or item tax) assigned to the item matches the selection made in the worksheet in Central Manager.
- **Data consistency:** Compare the sales tax selections in the worksheet in Central Manager with the same items in each selected store; the sales tax configuration in the store matches the Central configuration for those items.