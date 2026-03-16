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

# Scenario: Worksheet 252 Synchronization to Stores

## Preconditions
- Central and Store synchronization services are active.
- Stores are selected for worksheet synchronization.
- Effective date and time are configured for the worksheet.
- User has permission to modify worksheets.

## Required Test Data
- Worksheet ID: 252
- Effective synchronization date/time
- Selected stores

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Locate Worksheet 252.
3. Modify worksheet data or configuration.
4. Set or confirm the effective date/time for synchronization.
5. Save the worksheet.
6. Wait until the effective date/time or trigger synchronization.
7. Verify the update appears in the selected store(s).

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **252: Update Matrix Items Prices**, confirm the worksheet is present and its status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- **Store(s):** For at least one matrix item component that was modified in Worksheet 252, open the component item in the store (e.g., Merchandising > Items or Item Matrices / component item, Pricing tab) and confirm that the price, cost, and any other pricing-related fields that were updated in the worksheet (e.g., Price, Price A/B/C, MSRP, Sale Price, Sale Start/End Date, Buydown) match the values set in the worksheet in Central Manager.
- Compare the modified matrix component pricing and cost values in the worksheet in Central Manager with the same matrix components in each selected store; the values in the store match the Central configuration for those components.