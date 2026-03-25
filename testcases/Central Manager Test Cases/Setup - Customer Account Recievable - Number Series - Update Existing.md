# Setup / Customer / Accounts Receivable

## Metadata
Feature: Setup — Number Series  
Business Area: Setup > Customer > Accounts Receivable  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V2  
Priority: High  

---

# Scenario: Update Existing Number Series and Synchronize to Selected Stores

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create and modify Accounts Receivable configuration in Central Manager.
- Number series `NS-001` already exists in Central Manager. To verify: navigate to **Central Manager → Setup → Customer → Accounts Receivable → Number Series** and confirm `NS-001` appears in the list.
  > **If it does not exist**, complete the *Create New Number Series* scenario first.
- Number series `NS-001` has already been synchronized to `Store001`. To verify: navigate to **Setup → Customer → Number Series** in Store Manager on `Store001` and confirm `NS-001` appears in the list.
- At least one store with **Active** status exists that can receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.

## Required Test Data
- Number Series Code: NS-001
- Updated Number Series Name: QA Test Number Series 001 Updated
- Updated Prefix: QA2
- Updated No. of Digit: 8

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Number Series

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Expand **Customer** to reveal the customer configuration options.
4. Click **Accounts Receivable**.
5. Click **Number Series**.
6. In the number series list, locate the record with **Code** `NS-001`, select it, and click **Edit** to open it.
7. In the **Name** field, clear the existing value and enter `QA Test Number Series 001 Updated`.
8. In the **Prefix** field, clear the existing value and enter `QA2`.
9. In the **No. of Digit** field, clear the existing value and enter `8`.
10. Click **Save And Close** to save the updated number series record.
11. Allow synchronization to run to `Store001`. Synchronization runs on its configured schedule. Confirm with your system administrator how long synchronization typically takes in your environment before proceeding to validation.

---

## Expected Results
- The number series record `NS-001` is updated in Central Manager with the new **Name**, **Prefix**, and **No. of Digit** values.
- The updated values are synchronized to `Store001` and the existing `NS-001` record in the store reflects the changes.

## Validation Checks
- Verify the updated number series record `NS-001` exists in Central Manager → Setup → Customer → Accounts Receivable → Number Series by opening the `NS-001` record and confirming the **Name** shows `QA Test Number Series 001 Updated`, **Prefix** shows `QA2`, and **No. of Digit** shows `8`.
- Verify the updated number series record `NS-001` was synchronized to Store Manager on `Store001` by navigating to **Setup → Customer → Number Series** in Store Manager, opening the `NS-001` record, and confirming the **Name** shows `QA Test Number Series 001 Updated`, **Prefix** shows `QA2`, and **No. of Digit** shows `8`.
- Verify no duplicate or unintended number series records were created in Store Manager on `Store001` during synchronization by confirming only one record with **Code** `NS-001` appears in the number series list.