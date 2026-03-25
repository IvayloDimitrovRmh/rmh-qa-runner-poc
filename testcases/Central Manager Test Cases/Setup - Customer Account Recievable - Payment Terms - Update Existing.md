# Setup / Customer / Accounts Receivable

## Metadata
Feature: Setup — Payment Terms  
Business Area: Setup > Customer > Accounts Receivable  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V2  
Priority: High  

---

# Scenario: Update Existing Payment Terms and Synchronize to Selected Stores

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create and modify Accounts Receivable configuration in Central Manager.
- Payment terms `PT-001` already exists in Central Manager. To verify: navigate to **Central Manager → Setup → Customer → Accounts Receivable → Payment Terms** and confirm `PT-001` appears in the list.
  > **If it does not exist**, complete the *Create New Payment Terms and Synchronize to Selected Stores* scenario first.
- Payment terms `PT-001` has already been synchronized to `Store001`. To verify: navigate to **Setup → Customer → Payment Terms** in Store Manager on `Store001` and confirm `PT-001` appears in the list.
- At least one store with **Active** status exists that can receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.

## Required Test Data
- Payment Terms Code: PT-001
- Updated Payment Terms Name: QA Test Payment Terms 001 Updated
- Updated Due After Date: 45
- Updated Grace Period: 10
- Updated Minimum Payment: 50.00

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Payment Terms

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Expand **Customer** to reveal the customer configuration options.
4. Click **Accounts Receivable**.
5. Click **Payment Terms**.
6. In the payment terms list, locate the record with **Code** `PT-001`, select it, and click **Edit** to open it.
7. In the **Name** field, clear the existing value and enter `QA Test Payment Terms 001 Updated`.
8. In the **Due After Date** field, clear the existing value and enter `45`.
9. In the **Grace Period** field, clear the existing value and enter `10`.
10. In the **Minimum Payment** field, clear the existing value and enter `50.00`.
11. Click **Save And Close** to save the updated payment terms record.
12. Allow synchronization to run to `Store001`. Synchronization runs on its configured schedule. Confirm with your system administrator how long synchronization typically takes in your environment before proceeding to validation.

---

## Expected Results
- The payment terms record `PT-001` is updated in Central Manager with the new **Name**, **Due After Date**, **Grace Period**, and **Minimum Payment** values.
- The updated values are synchronized to `Store001` and the existing `PT-001` record in the store reflects the changes.

## Validation Checks
- Verify the updated payment terms record `PT-001` exists in Central Manager → Setup → Customer → Accounts Receivable → Payment Terms by opening the `PT-001` record and confirming the **Name** shows `QA Test Payment Terms 001 Updated`, **Due After Date** shows `45`, **Grace Period** shows `10`, and **Minimum Payment** shows `50.00`.
- Verify the updated payment terms record `PT-001` was synchronized to Store Manager on `Store001` by navigating to **Setup → Customer → Payment Terms** in Store Manager, opening the `PT-001` record, and confirming the **Name** (`QA Test Payment Terms 001 Updated`), **Due After Date** (`45`), **Grace Period** (`10`), and **Minimum Payment** (`50.00`) fields reflect the updated values.
- Verify no duplicate or unintended payment terms records were created in Store Manager on `Store001` during synchronization by confirming only one record with **Code** `PT-001` appears in the payment terms list.