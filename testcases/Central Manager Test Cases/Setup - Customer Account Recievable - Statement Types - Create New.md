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

# Scenario: Create New Statement Type and Synchronize to Selected Stores

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create and modify Accounts Receivable configuration in Central Manager.
- At least one store with **Active** status exists that can receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.

## Required Test Data
- Statement Type Code: ST-001
- Statement Type Name: QA Test Statement Type 001
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
6. Click **New** to open a new statement type record.
7. In the **Code** field, enter `ST-001`.
8. In the **Name** field, enter `QA Test Statement Type 001`.
9. In the **Dataset** field, select `Standard`.
   > **Note:** **Standard** is the documented dataset option for statement types.
10. Click **Save And Close** to save the new statement type record.
11. Allow synchronization to run to `Store001`. Synchronization runs on its configured schedule. Confirm with your system administrator how long synchronization typically takes in your environment before proceeding to validation.

---

## Expected Results
- The new statement type record `ST-001` — `QA Test Statement Type 001` is created in Central Manager.
- The statement type record is inserted into `Store001` on synchronization.

## Validation Checks
- Verify the new statement type record `ST-001` exists in Central Manager → Setup → Customer → Accounts Receivable → Statement Types by searching the list and confirming the record appears with **Code** `ST-001` and **Name** `QA Test Statement Type 001`.
- Verify the statement type record `ST-001` was inserted in Store Manager on `Store001` by navigating to **Setup → Customer → Statement Types** in Store Manager and confirming the record appears with **Code** `ST-001`, **Name** `QA Test Statement Type 001`, and **Dataset** `Standard`.
- Verify no duplicate statement type records exist in Store Manager on `Store001` by confirming only one record with **Code** `ST-001` appears in the statement type list.