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

# Scenario: Update an Existing Discount in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- A discount with Description `TEST-DISC-001 Mix and Match` already exists in Central Manager, configured as **Mix and Match: Unit Price** with Quantity `3` and Reg. Price `1.50`.
- The discount `TEST-DISC-001 Mix and Match` is currently assigned to Store Group `Store Group 01`, which includes store `Store001`.
- The user is logged into Central Manager with a role that has the Discounts privilege enabled under Merchandising.
- The target store `Store001` is operational and able to receive synchronization from Central Manager.

## Required Test Data
- Discount Description (existing): TEST-DISC-001 Mix and Match
- Discount Type (existing): Mix and Match: Unit Price
- Field to update: Reg. Price
- Updated Reg. Price value: 1.20
- Store Group: Store Group 01
- Target Store: Store001

## Navigation Path
Central Manager → Merchandising → Discounts

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Merchandising**.
3. In the Merchandising menu, click **Discounts**. The Discounts list screen opens, displaying all existing discounts.
4. In the Discounts list, locate the row where the **Description** column shows `TEST-DISC-001 Mix and Match`. Click on that row to select it and open the discount record.
5. The discount detail form opens. Verify the current values before making changes:
   - **Description**: `TEST-DISC-001 Mix and Match`
   - **Discount Type**: Mix and Match: Unit Price
   - **Quantity**: `3`
   - **Reg. Price**: `1.50`
6. In the **Pricing Schedule** section, locate the **Reg. Price** field and clear the existing value `1.50`.
7. Type the updated value: `1.20`
8. Click the **Store Groups** tab. Confirm that **Store Group 01** is selected. Do not change the store group assignment.
9. Click **Save And Close** to save the changes and return to the Discounts list.
10. In the Discounts list, locate the row for `TEST-DISC-001 Mix and Match` and confirm it is still present.
11. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
12. Open Store Manager on `Store001`.
13. In Store Manager, navigate to **Merchandising → Discounts**.
14. In the Discounts list, locate the discount with Description `TEST-DISC-001 Mix and Match` and open the record.
15. Confirm the **Reg. Price** field shows the updated value `1.20`.

## Expected Results
- The discount record `TEST-DISC-001 Mix and Match` is successfully updated in Central Manager with the new Reg. Price of `1.20`.
- The updated discount data is synchronized to the target store `Store001`.
- The Description and discount type remain unchanged after the update.

## Validation Checks
- Verify **updated Reg. Price value** in **Central Manager > Merchandising > Discounts** by reopening the `TEST-DISC-001 Mix and Match` record after saving and confirming the **Reg. Price** field displays `1.20` in the Pricing Schedule section.
- Verify **Description is unchanged** in **Central Manager > Merchandising > Discounts** by confirming the **Description** field still displays `TEST-DISC-001 Mix and Match` when the record is reopened.
- Verify **discount type is unchanged** in **Central Manager > Merchandising > Discounts** by confirming the discount type selection still shows **Mix and Match: Unit Price** when the record is reopened.
- Verify **Store Group assignment is unchanged** in **Central Manager > Merchandising > Discounts** by clicking the **Store Groups** tab on the reopened record and confirming **Store Group 01** remains selected after saving.
- Verify **updated discount data in target store** in **Store001 > Merchandising > Discounts** by opening the `TEST-DISC-001 Mix and Match` record in Store Manager after synchronization and confirming the **Reg. Price** field displays `1.20`.
- Verify **stores outside Store Group 01 are unaffected** by confirming the discount update does not appear in any store not assigned to `Store Group 01`.