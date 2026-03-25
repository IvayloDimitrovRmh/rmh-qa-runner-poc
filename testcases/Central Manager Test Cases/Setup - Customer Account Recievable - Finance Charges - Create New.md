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

# Scenario: Create New Finance Charge and Synchronize to Selected Stores

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create and modify Accounts Receivable configuration in Central Manager.
- At least one store with **Active** status exists that can receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.

## Required Test Data
- Finance Charge Code: FC-001
- Finance Charge Name: QA Test Finance Charge 001
- Apply Charges on Fin. Charges: No
- Min. Finance Charges: 2.00
- Annual Interest Rate: 18.00

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Finance Charges

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Expand **Customer** to reveal the customer configuration options.
4. Click **Accounts Receivable**.
5. Click **Finance Charges**.
6. Click **New** to open a new finance charge record.
7. In the **Code** field, enter `FC-001`.
8. In the **Name** field, enter `QA Test Finance Charge 001`.
9. Leave the **Apply Charges on Fin. Charges** checkbox unselected (`No`).
   > **Note:** Select this option only if you want Store Manager to include previously unpaid finance charges when calculating new finance charges. Check applicable state laws before enabling this option, as it may be restricted in some jurisdictions.
10. In the **Min. Finance Charges** field, enter `2.00`.
11. In the **Annual Interest Rate** field, enter `18.00`.
12. Click **Save And Close** to save the new finance charge record.
13. Allow synchronization to run to `Store001`. Synchronization runs on its configured schedule. Confirm with your system administrator how long synchronization typically takes in your environment before proceeding to validation.

---

## Expected Results
- The new finance charge record `FC-001` — `QA Test Finance Charge 001` is created in Central Manager.
- The finance charge record is inserted into `Store001` on synchronization.

## Validation Checks
- Verify the new finance charge record `FC-001` exists in Central Manager → Setup → Customer → Accounts Receivable → Finance Charges by searching the finance charge list and confirming the record appears with **Code** `FC-001` and **Name** `QA Test Finance Charge 001`.
- Verify the finance charge record `FC-001` was inserted in Store Manager on `Store001` by navigating to **Setup → Customer → Finance Charges** in Store Manager and confirming the record appears with **Code** `FC-001` and **Name** `QA Test Finance Charge 001`.
- Verify no duplicate finance charge records exist in Store Manager on `Store001` by confirming only one record with **Code** `FC-001` appears in the finance charge list.