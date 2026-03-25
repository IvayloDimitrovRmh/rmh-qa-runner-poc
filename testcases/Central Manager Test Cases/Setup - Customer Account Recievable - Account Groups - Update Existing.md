# Setup / Customer / Accounts Receivable

## Metadata
Feature: Setup — Account Groups  
Business Area: Setup > Customer > Accounts Receivable  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V2  
Priority: High  

---

# Scenario: Update Existing Account Group and Synchronize to Selected Stores

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create and modify Accounts Receivable configuration in Central Manager.
- Account group `AG-001` already exists in Central Manager. To verify: navigate to **Central Manager → Setup → Customer → Accounts Receivable → Account Groups** and confirm `AG-001` appears in the list.
  > **If it does not exist**, complete the *Create New Account Group and Synchronize to Selected Stores* scenario first.
- Account group `AG-001` has already been synchronized to `Store001`. To verify: navigate to **Setup → Customer → Account Groups** in Store Manager on `Store001` and confirm `AG-001` appears in the list.
- At least one store with **Active** status exists that can receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.

## Required Test Data
- Account Group Code: AG-001
- Updated Account Group Name: QA Test Account Group 001 Updated
- Updated Finance Charge: Yes
- Updated Payment Terms: NET15
- Updated Credit Limit: 1000.00
- Updated Application Method: Manual

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Account Groups

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Expand **Customer** to reveal the customer configuration options.
4. Click **Accounts Receivable**.
5. Click **Account Groups**.
6. In the account group list, locate and double-click the record with **Code** `AG-001` to open it.
7. In the **Name** field, clear the existing value and enter `QA Test Account Group 001 Updated`.
8. In the **Finance Charge** field, update the value to `Yes`.
9. In the **Payment Terms** field, update the value to `NET15`.
10. In the **Credit Limit** field, clear the existing value and enter `1000.00`.
11. In the **Application Method** field, select `Manual`.
    > **Note:** **Manual** requires you to manually select the ledger entry to apply each adjustment to. Select **Apply to oldest** if you want adjustments applied automatically to the oldest ledger entry.
12. Click **Save And Close** to save the updated account group record.
13. Allow synchronization to run to `Store001`. Synchronization runs on its configured schedule. Confirm with your system administrator how long synchronization typically takes in your environment before proceeding to validation.

---

## Expected Results
- The account group record `AG-001` is updated in Central Manager with the new **Name**, **Finance Charge**, **Payment Terms**, **Credit Limit**, and **Application Method** values.
- The updated values are synchronized to `Store001` and the existing `AG-001` record in the store reflects the changes.

## Validation Checks
- Verify the updated account group record `AG-001` exists in Central Manager → Setup → Customer → Accounts Receivable → Account Groups by opening the `AG-001` record and confirming the **Name** shows `QA Test Account Group 001 Updated`, **Credit Limit** shows `1000.00`, and **Application Method** shows `Manual`.
- Verify the updated account group record `AG-001` was synchronized to Store Manager on `Store001` by navigating to **Setup → Customer → Account Groups** in Store Manager, opening the `AG-001` record, and confirming the **Name** (`QA Test Account Group 001 Updated`), **Credit Limit** (`1000.00`), **Payment Terms** (`NET15`), and **Application Method** (`Manual`) fields reflect the updated values.
- Verify no duplicate or unintended account group records were created in Store Manager on `Store001` during synchronization by confirming only one record with **Code** `AG-001` appears in the account group list.