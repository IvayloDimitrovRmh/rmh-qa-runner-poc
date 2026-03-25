# Setup / Customer / Accounts Receivable

## Metadata
Feature: Setup — Finance Charges  
Business Area: Setup > Customer > Accounts Receivable  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V2  
Priority: High  

---

# Scenario: Update Existing Finance Charge and Synchronize to Selected Stores

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create and modify Accounts Receivable configuration in Central Manager.
- Finance charge `FC-001` already exists in Central Manager. To verify: navigate to **Central Manager → Setup → Customer → Accounts Receivable → Finance Charges** and confirm `FC-001` appears in the list.
  > **If it does not exist**, complete the *Create New Finance Charge and Synchronize to Selected Stores* scenario first.
- Finance charge `FC-001` has already been synchronized to `Store001`. To verify: navigate to **Setup → Customer → Finance Charges** in Store Manager on `Store001` and confirm `FC-001` appears in the list.
- At least one store with **Active** status exists that can receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.

## Required Test Data
- Finance Charge Code: FC-001
- Updated Finance Charge Name: QA Test Finance Charge 001 Updated
- Updated Apply Charges on Fin. Charges: No
- Updated Min. Finance Charges: 5.00
- Updated Annual Interest Rate: 24.00

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Finance Charges

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Expand **Customer** to reveal the customer configuration options.
4. Click **Accounts Receivable**.
5. Click **Finance Charges**.
6. In the finance charge list, locate the record with **Code** `FC-001`, select it, and click **Edit** to open it.
7. In the **Name** field, clear the existing value and enter `QA Test Finance Charge 001 Updated`.
8. Confirm the **Apply Charges on Fin. Charges** checkbox remains unselected (`No`).
   > **Note:** Select this option only if you want Store Manager to include previously unpaid finance charges when calculating new finance charges. Check applicable state laws before enabling this option, as it may be restricted in some jurisdictions.
9. In the **Min. Finance Charges** field, clear the existing value and enter `5.00`.
10. In the **Annual Interest Rate** field, clear the existing value and enter `24.00`.
11. Click **Save And Close** to save the updated finance charge record.
12. Allow synchronization to run to `Store001`. Synchronization runs on its configured schedule. Confirm with your system administrator how long synchronization typically takes in your environment before proceeding to validation.

---

## Expected Results
- The finance charge record `FC-001` is updated in Central Manager with the new **Name**, **Min. Finance Charges**, and **Annual Interest Rate** values.
- The updated values are synchronized to `Store001` and the existing `FC-001` record in the store reflects the changes.

## Validation Checks
- Verify the updated finance charge record `FC-001` exists in Central Manager → Setup → Customer → Accounts Receivable → Finance Charges by opening the `FC-001` record and confirming the **Name** shows `QA Test Finance Charge 001 Updated`, **Min. Finance Charges** shows `5.00`, and **Annual Interest Rate** shows `24.00`.
- Verify the updated finance charge record `FC-001` was synchronized to Store Manager on `Store001` by navigating to **Setup → Customer → Finance Charges** in Store Manager, opening the `FC-001` record, and confirming the **Name** (`QA Test Finance Charge 001 Updated`), **Min. Finance Charges** (`5.00`), and **Annual Interest Rate** (`24.00`) fields reflect the updated values.
- Verify no duplicate or unintended finance charge records were created in Store Manager on `Store001` during synchronization by confirming only one record with **Code** `FC-001` appears in the finance charge list.