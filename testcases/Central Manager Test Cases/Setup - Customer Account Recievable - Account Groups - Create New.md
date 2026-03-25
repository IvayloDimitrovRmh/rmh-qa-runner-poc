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

# Scenario: Create New Account Group and Synchronize to Selected Stores

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create and modify Accounts Receivable configuration in Central Manager.
- At least one store with **Active** status exists that can receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.
- If Payment Terms are required for the account group, confirm that payment terms exist in Central Manager. To verify: navigate to **Central Manager → Setup → Customer → Accounts Receivable** and confirm payment terms records are available. If none exist, configure payment terms before running this test.

## Required Test Data
- Account Group Code: AG-001
- Account Group Name: QA Test Account Group 001
- Finance Charge: No
- Payment Terms: NET30
- Number Series: NS-AR-001
- Credit Limit: 500.00
- Application Method: Apply to oldest

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Account Groups

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Expand **Customer** to reveal the customer configuration options.
4. Click **Accounts Receivable**.
5. Click **Account Groups**.
6. Click **New** to open a new account group record.
7. In the **Code** field, enter `AG-001`.
8. In the **Name** field, enter `QA Test Account Group 001`.
9. In the **Finance Charge** field, select or enter `No`.
10. In the **Payment Terms** field, select or enter `NET30`.
11. In the **Number Series** field, select or enter `NS-AR-001`.
12. In the **Credit Limit** field, enter `500.00`.
13. In the **Application Method** field, select `Apply to oldest`.
    > **Note:** **Apply to oldest** automatically applies adjustments to the oldest ledger entry. Select **Manual** if you want to manually select the ledger entry for each adjustment.
14. Click **Save And Close** to save the new account group record.
15. Allow synchronization to run to `Store001`. Synchronization runs on its configured schedule. Confirm with your system administrator how long synchronization typically takes in your environment before proceeding to validation.

---

## Expected Results
- The new account group record `AG-001` — `QA Test Account Group 001` is created in Central Manager.
- The account group record is inserted into `Store001` on synchronization.

## Validation Checks
- Verify the new account group record `AG-001` exists in Central Manager → Setup → Customer → Accounts Receivable → Account Groups by searching the account group list and confirming the record appears with **Code** `AG-001` and **Name** `QA Test Account Group 001`.
- Verify the account group record `AG-001` was inserted in Store Manager on `Store001` by navigating to **Setup → Customer → Account Groups** in Store Manager, opening the `AG-001` record, and confirming the **Code**, **Name**, **Credit Limit** (`500.00`), and **Application Method** (`Apply to oldest`) fields match the values configured in Central Manager.
- Verify no duplicate account group records exist in Store Manager on `Store001` by confirming only one record with **Code** `AG-001` appears in the account group list.