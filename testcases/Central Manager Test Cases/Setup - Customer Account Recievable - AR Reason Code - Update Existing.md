# Setup / Customer / Accounts Receivable

## Metadata
Feature: Setup — AR Reason Codes  
Business Area: Setup > Customer > Accounts Receivable  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V2  
Priority: High  

---

# Scenario: Update Existing AR Reason Code and Synchronize to Selected Stores

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create and modify Accounts Receivable configuration in Central Manager.
- AR reason code `ARC-001` already exists in Central Manager. To verify: navigate to **Central Manager → Setup → Customer → Accounts Receivable → AR Reason Codes** and confirm `ARC-001` appears in the list.
  > **If it does not exist**, complete the *Create New AR Reason Code and Synchronize to Selected Stores* scenario first.
- AR reason code `ARC-001` has already been synchronized to `Store001`. To verify: navigate to **Setup → Customer → Reason Codes** in Store Manager on `Store001` and confirm `ARC-001` appears in the list.
- At least one store with **Active** status exists that can receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.

## Required Test Data
- AR Reason Code: ARC-001
- Updated AR Reason Code Name: QA Test AR Reason Code 001 Updated
- Updated Type: Reversal

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → AR Reason Codes

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Expand **Customer** to reveal the customer configuration options.
4. Click **Accounts Receivable**.
5. Click **AR Reason Codes**.
6. In the AR reason code list, locate the record with **Code** `ARC-001`, select it, and click **Edit** to open it.
7. In the **Name** field, clear the existing value and enter `QA Test AR Reason Code 001 Updated`.
8. In the **Type** drop-down, select `Reversal`.
   > **Note:** The following Type options are available: **Adjustment**, **Hold**, **Reversal**, **Unapply**. The original value was `Adjustment`; changing it to `Reversal` confirms the update is applied and synchronized correctly.
9. Click **Save And Close** to save the updated AR reason code record.
10. Allow synchronization to run to `Store001`. Synchronization runs on its configured schedule. Confirm with your system administrator how long synchronization typically takes in your environment before proceeding to validation.

---

## Expected Results
- The AR reason code record `ARC-001` is updated in Central Manager with the new **Name** and **Type** values.
- The updated values are synchronized to `Store001` and the existing `ARC-001` record in the store reflects the changes.

## Validation Checks
- Verify the updated AR reason code record `ARC-001` exists in Central Manager → Setup → Customer → Accounts Receivable → AR Reason Codes by opening the `ARC-001` record and confirming the **Name** shows `QA Test AR Reason Code 001 Updated` and the **Type** shows `Reversal`.
- Verify the updated AR reason code record `ARC-001` was synchronized to Store Manager on `Store001` by navigating to **Setup → Customer → Reason Codes** in Store Manager, opening the `ARC-001` record, and confirming the **Name** shows `QA Test AR Reason Code 001 Updated` and the **Type** shows `Reversal`.
- Verify no duplicate or unintended AR reason code records were created in Store Manager on `Store001` during synchronization by confirming only one record with **Code** `ARC-001` appears in the reason code list.