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

# Scenario: Worksheet 351 Synchronization to Stores

## Preconditions
- Central and Store synchronization services are active.
- Worksheet 351 exists in Central Manager.
- Store(s) are selected for worksheet synchronization.
- Effective date/time for synchronization is configured.

## Required Test Data
- Worksheet ID: 351
- Selected store(s)
- Effective synchronization date/time

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Locate Worksheet 351.
3. Modify worksheet configuration or operational values.
4. Ensure the correct store(s) are selected for synchronization.
5. Save the worksheet.
6. Wait for the effective date/time or trigger synchronization manually.
7. Verify the worksheet updates appear in the selected store(s).

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **351: Update Inventory - Item Prices Cost (Regular)**, confirm the worksheet is present and its status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- **Store(s):** For at least one item that was modified in Worksheet 351, open the item in the store (e.g., Merchandising > Items > item > Pricing tab and cost-related fields) and confirm that the price, cost, and any other pricing-related fields that were updated in the worksheet (e.g., Price, Price A/B/C, MSRP, Sale Price, Sale Start/End Date, Buydown) match the values set in the worksheet in Central Manager.
- **Data consistency:** Compare the modified item pricing and cost values in the worksheet in Central Manager with the same items in each selected store; the values in the store match the Central configuration for those items.