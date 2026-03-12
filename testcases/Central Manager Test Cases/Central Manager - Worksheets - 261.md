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

# Scenario: Worksheet 261 Synchronization to Stores

## Preconditions
- Central and Store synchronization services are active.
- Stores are selected for worksheet synchronization.
- Effective date/time is configured for worksheet updates.
- User has permission to modify worksheets.

## Required Test Data
- Worksheet ID: 261
- Effective synchronization date/time
- Selected store(s)

## Navigation Path
Central Manager → Worksheets → Worksheets

## Execution Steps
1. Open Central Manager and navigate to Worksheets → Worksheets.
2. Locate Worksheet 261.
3. Modify worksheet configuration or data.
4. Set or confirm the effective date/time for synchronization.
5. Save the worksheet.
6. Wait until the configured effective date/time or trigger synchronization manually.
7. Verify the update appears in the selected store(s).

## Validation Checks
- **Central Manager:** Under **Worksheets** → **Worksheets Status** → **261: Download Items**, confirm the worksheet is present and its status indicates that processing has been initiated or completed (e.g., not "Not Yet Approved" after approval).
- **Store(s) – new items:** For at least one item that was in the worksheet as a new item, confirm the item exists in the store (e.g., Merchandising > Items); confirm key properties (e.g., description, lookup code, price, cost) match the Central Manager definition for that item.
- **Store(s) – existing items:** For at least one item that already existed in the store and was in the worksheet, confirm that item properties (other than quantity) have been updated to match Central Manager (e.g., description, pricing, cost); confirm that the store’s on-hand or quantity value was not overwritten by Central.
- **Data consistency:** Item properties in the store for the worksheet’s items match the properties defined in Central Manager for those items (excluding quantity for existing items).