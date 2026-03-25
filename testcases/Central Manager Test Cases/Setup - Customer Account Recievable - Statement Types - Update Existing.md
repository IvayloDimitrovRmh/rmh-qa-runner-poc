# Setup / Customer / Accounts Receivable

## Metadata
Feature: Setup — Statement Types  
Business Area: Setup > Customer > Accounts Receivable  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V2  
Priority: High  

---

# Scenario: Update Existing Statement Type and Synchronize to Selected Stores

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create and modify Accounts Receivable configuration in Central Manager.
- Statement type `ST-001` already exists in Central Manager. To verify: navigate to **Central Manager → Setup → Customer → Accounts Receivable → Statement Types** and confirm `ST-001` appears in the list.
  > **If it does not exist**, complete the *Create New Statement Type* scenario first.
- Statement type `ST-001` has already been synchronized to `Store001`. To verify: navigate to **Setup → Customer → Statement Types** in Store Manager on `Store001` and confirm `ST-001` appears in the list.
- At least one store with **Active** status exists that can receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.

## Required Test Data
- Statement Type Code: ST-001
- Updated Statement Type Name: QA Test Statement Type 001 Updated
- Dataset: Standard

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Statement Types

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Expand **Customer** to reveal the customer configuration options.
4. Click **Accounts Receivable**.
5. Click **Statement Types**.
6. In the statement type list, locate the record with **Code** `ST-001`, select it, and click **Edit** to open it.
7. In the **Name** field, clear the existing value and enter `QA Test Statement Type 001 Updated`.
8. Confirm the **Dataset** field remains set to `Standard`.
   > **Note:** **Standard** is the documented dataset option for statement types.
9. Click **Save And Close** to save the updated statement type record.
10. Allow synchronization to run to `Store001`. Synchronization runs on its configured schedule. Confirm with your system administrator how long synchronization typically takes in your environment before proceeding to validation.

---

## Expected Results
- The statement type record `ST-001` is updated in Central Manager with the new **Name** value.
- The updated value is synchronized to `Store001` and the existing `ST-001` record in the store reflects the change.

## Validation Checks
- Verify the updated statement type record `ST-001` exists in Central Manager → Setup → Customer → Accounts Receivable → Statement Types by opening the `ST-001` record and confirming the **Name** shows `QA Test Statement Type 001 Updated`.
- Verify the updated statement type record `ST-001` was synchronized to Store Manager on `Store001` by navigating to **Setup → Customer → Statement Types** in Store Manager, opening the `ST-001` record, and confirming the **Name** shows `QA Test Statement Type 001 Updated` and **Dataset** shows `Standard`.
- Verify no duplicate or unintended statement type records were created in Store Manager on `Store001` during synchronization by confirming only one record with **Code** `ST-001` appears in the statement type list.