
# Merchandising / Item Taxes

## Metadata
Feature: Financial Configuration Synchronization  
Business Area: Merchandising  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central → Store  
Release: MVP 1.1  
Priority: High

---

# Scenario: Item Tax Insert/Update Synchronization

## Preconditions
- User has access to Central Manager with privileges to manage Item Taxes and Worksheets.
- At least one store is configured and available for synchronization.

## Required Test Data
- Item Tax Description
- Item Tax Code
- Store Group or specific stores for sync

## Navigation Path
Central Manager → Setup → Financial → Item Taxes

## Execution Steps
1. Log in to Central Manager.
2. Navigate to Setup → Financial → Item Taxes.
3. Click "New" to create a new Item Tax, or select an existing Item Tax and click "Edit" to update.
4. Enter or modify the required fields (Description, Code, calculation options, etc.).
5. Click "Save and Close."
6. Navigate to Worksheets → 320: Adjust Item Sales Tax.
7. Select the target store(s) and proceed through the worksheet steps.
8. On the Contents tab, assign the appropriate Item Tax to items as needed.
9. Click "Approve" to finalize the worksheet and trigger synchronization.
10. Monitor worksheet processing status in Worksheets Status → 320: Adjust Item Sales Tax.

## Expected Results
- The Item Tax configuration is inserted or updated in the selected store(s) after worksheet approval.

## Validation Checks
- Confirm the Item Tax appears in the target store(s) with correct details.
- Verify the worksheet status is "Processed" and acknowledged.
- Confirm that items in the store(s) reflect the updated Item Tax assignment.

---

**Note:**  
- Synchronization is explicitly confirmed for worksheet-based Item Tax changes.  
- Direct sync from the Item Taxes screen is implied but not explicitly documented.  
- All steps and field names are confirmed in local documentation.
