# Merchandising / Discounts

## Metadata
Feature: Merchandising Discounts  
Business Area: Merchandising > Discounts  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP 1.1  
Priority: High  

---

# Scenario: Insert a new discount in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store group (Store Group 01) exists with at least one store assigned (Store001).
- The logged-in user has a role with the **Discounts** privilege enabled under **Merchandising**.
- The target store Store001 is operational and able to receive synchronization from Central Manager.
- No existing discount with description `TEST-DISC-001 Mix and Match` exists in Central Manager (to avoid duplicates).

## Required Test Data
- Discount Description: TEST-DISC-001 Mix and Match
- Discount Type: Mix and Match: Unit Price
- Quantity: 3
- Reg. Price: 1.50
- Store Group: Store Group 01
- Target Store: Store001

## Navigation Path
Central Manager → Merchandising → Discounts

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Merchandising**.
3. Click **Discounts** to open the Discounts list.
4. Click **New** to create a new discount. The discount detail form opens.
5. In the **Description** field, enter `TEST-DISC-001 Mix and Match`.
6. In the discount type selection area, select **Mix and Match: Unit Price**.
7. In the **Pricing Schedule** section, enter the following values:
   - **Quantity:** `3`
   - **Reg. Price:** `1.50`
8. Click the **Store Groups** tab.
9. Locate **Store Group 01** in the list and select it to assign this discount to that store group.
10. Click **Save And Close** to save the new discount and return to the Discounts list.
11. In the Discounts list, confirm the row with description `TEST-DISC-001 Mix and Match` is present.
12. Allow time for the synchronization cycle to complete between Central Server and Store001, or trigger a manual sync if required by your environment.
13. Open Store Manager on Store001.
14. In Store Manager, navigate to **Merchandising → Discounts**.
15. In the Discounts list, confirm the discount with description `TEST-DISC-001 Mix and Match` is present.

---

## Expected Results
- The new discount TEST-DISC-001 Mix and Match is created and saved successfully in Central Manager.
- The discount is synchronized to and visible in the target store Store001.
- The discount does not appear in stores that are not members of Store Group 01.

## Validation Checks
- Verify the new discount record is present in Central Manager → Merchandising → Discounts by locating `TEST-DISC-001 Mix and Match` in the Discounts list immediately after saving.
- Verify the **Description** value in Central Manager → Merchandising → Discounts by reopening the discount record and confirming the **Description** field displays `TEST-DISC-001 Mix and Match`.
- Verify the discount type is correct in Central Manager → Merchandising → Discounts by reopening the discount record and confirming the discount type selection shows `Mix and Match: Unit Price`.
- Verify the pricing schedule values are correct in Central Manager → Merchandising → Discounts by reopening the discount record and confirming **Quantity** is `3` and **Reg. Price** is `1.50` in the **Pricing Schedule** section.
- Verify the **Store Group** assignment in Central Manager → Merchandising → Discounts by reopening the discount record, clicking the **Store Groups** tab, and confirming **Store Group 01** is selected.
- Verify the discount is present in the target store in Store001 → Merchandising → Discounts by locating the discount with description `TEST-DISC-001 Mix and Match` in the store's Discounts list after synchronization has completed.