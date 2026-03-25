# Setup / Customer / Accounts Receivable

## Metadata
Feature: Setup — Account Managers  
Business Area: Setup > Customer > Accounts Receivable  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V2  
Priority: High  

---

# Scenario: Update Existing Account Manager and Synchronize to Selected Stores

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create and modify Accounts Receivable configuration in Central Manager.
- Account manager `AMG-001` already exists in Central Manager. To verify: navigate to **Central Manager → Setup → Customer → Accounts Receivable → Account Managers** and confirm `AMG-001` appears in the list.
  > **If it does not exist**, complete the *Create New Account Manager and Synchronize to Selected Stores* scenario first.
- Account manager `AMG-001` has already been synchronized to `Store001`. To verify: navigate to **Setup → Customer → Account Managers** in Store Manager on `Store001` and confirm `AMG-001` appears in the list.
- At least one store with **Active** status exists that can receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.

## Required Test Data
- Account Manager Code: AMG-001
- Updated Account Manager Name: QA Test Account Manager 001 Updated
- Updated Contact Phone: 555-000-0002
- Updated Contact Email: qa.manager001.updated@teststore.com

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Account Managers

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Expand **Customer** to reveal the customer configuration options.
4. Click **Accounts Receivable**.
5. Click **Account Managers**.
6. In the account manager list, locate and double-click the record with **Code** `AMG-001` to open it.
7. In the **Name** field, clear the existing value and enter `QA Test Account Manager 001 Updated`.
8. In the contact information fields, update the phone to `555-000-0002` and the email to `qa.manager001.updated@teststore.com`.
9. Click **Save And Close** to save the updated account manager record.
10. Allow synchronization to run to `Store001`. Synchronization runs on its configured schedule. Confirm with your system administrator how long synchronization typically takes in your environment before proceeding to validation.

---

## Expected Results
- The account manager record `AMG-001` is updated in Central Manager with the new **Name** and contact information values.
- The updated values are synchronized to `Store001` and the existing `AMG-001` record in the store reflects the changes.

## Validation Checks
- Verify the updated account manager record `AMG-001` exists in Central Manager → Setup → Customer → Accounts Receivable → Account Managers by opening the `AMG-001` record and confirming the **Name** shows `QA Test Account Manager 001 Updated` and the contact information reflects the updated phone and email values.
- Verify the updated account manager record `AMG-001` was synchronized to Store Manager on `Store001` by navigating to **Setup → Customer → Account Managers** in Store Manager, opening the `AMG-001` record, and confirming the **Name** shows `QA Test Account Manager 001 Updated` and the contact details match the updated values.
- Verify no duplicate or unintended account manager records were created in Store Manager on `Store001` during synchronization by confirming only one record with **Code** `AMG-001` appears in the account manager list.