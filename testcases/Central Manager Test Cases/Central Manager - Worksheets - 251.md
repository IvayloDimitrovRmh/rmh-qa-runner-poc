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

# Scenario: Worksheet 251 Synchronization to Stores

## Preconditions
- Central and Store synchronization services are active.
- Stores are selected for worksheet synchronization.
- Effective date and time for the worksheet synchronization are configured.
- User has permission to modify worksheets.

## Required Test Data
- Worksheet ID: 251
- Effective date and time for synchronization
- Selected stores

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Locate Worksheet 251.
3. Modify worksheet data or configuration.
4. Set or confirm the effective date/time for synchronization.
5. Save the worksheet.
6. Wait until the effective date/time or trigger synchronization.
7. Verify the update appears in the selected store(s).

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **251: Update Inventory - Item Prices**, confirm the worksheet is present and its status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- For at least one item that was modified in Worksheet 251, open the item in the store (e.g., Merchandising > Items or equivalent) and confirm that the price (and any other pricing-related fields that were updated in the worksheet) matches the value set in the worksheet in Central Manager.
- Compare the modified item pricing values in the worksheet in Central Manager with the same items in each selected store; the values in the store match the Central configuration for those items.