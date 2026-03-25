# Merchandising / Items

## Metadata
Feature: Merchandising Items  
Business Area: Merchandising > Items  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP 1.1  
Priority: High  

---

# Scenario: Create a new standard item in Central Manager

## Preconditions
- Central Manager is installed and running.
- At least one Department exists in Central Manager. To verify: navigate to **Setup → Merchandising → Departments**.
- At least one Category exists in Central Manager. To verify: navigate to **Setup → Merchandising → Categories**.
- The logged-in user has permission to create items in Central Manager.

## Required Test Data
- Item Lookup Code: TEST-STD-001
- Item Description: Test Standard Item 001
- Item Type: Standard
- Department: General
- Category: Miscellaneous
- Price: 19.99
- Cost: 10.00

## Navigation Path
Central Manager → Merchandising → Items

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Items**.
4. Click **New** to open the item creation dialog.
5. Select **Standard Item** and click **OK**.
6. On the **General** tab, enter the following:
   - **Item Lookup Code:** `TEST-STD-001`
   - **Description:** `Test Standard Item 001`
   - **Department:** `General`
   - **Category:** `Miscellaneous`
   - **Price:** `19.99`
   - **Cost:** `10.00`
7. Confirm the **Item type** field is set to **Standard**.
8. Click **OK** to save the new item.

---

## Expected Results
- The new standard item TEST-STD-001 is created and saved successfully in Central Manager.

## Validation Checks
- Verify item TEST-STD-001 exists in Central Manager → Merchandising → Items by searching for `TEST-STD-001` and confirming the record is present.
- Verify the **Description** field shows `Test Standard Item 001` in Central Manager → Merchandising → Items by opening the TEST-STD-001 record and checking the **General** tab.
- Verify the **Price** field shows `19.99` and the **Cost** field shows `10.00` in Central Manager → Merchandising → Items by opening the TEST-STD-001 record and checking the **General** tab.
- Verify the **Department** is `General` and the **Category** is `Miscellaneous` in Central Manager → Merchandising → Items by opening the TEST-STD-001 record and checking the **General** tab.