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

# Scenario: Worksheet 322 Synchronization to Stores

## Preconditions
- Central and Store synchronization services are active.
- Worksheet 322 exists in Central Manager.
- Store(s) are selected for worksheet synchronization.
- Effective date/time for synchronization is configured.

## Required Test Data
- Worksheet ID: 322
- Effective synchronization date/time
- Selected store(s)

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to **Worksheets → Worksheets**.
2. Locate **Worksheet 322**.
3. Modify worksheet configuration or operational data.
4. Confirm the selected store(s) for synchronization.
5. Save the worksheet.
6. Wait for the effective synchronization time or trigger synchronization.
7. Verify the update appears in the selected store(s).

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **322: Change Item Discounts**, confirm the worksheet is present and its status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- **Store(s):** For at least one item that was modified in Worksheet 322, open the item in the store (e.g., Merchandising > Items > item, Pricing tab or equivalent where quantity discount is configured) and confirm that the New Quantity Discount (or quantity discount pricing) matches the value or configuration set in the worksheet in Central Manager.
- **Data consistency:** Compare the quantity discount settings in the worksheet in Central Manager with the same items in each selected store; the discount configuration in the store matches the Central configuration for those items.