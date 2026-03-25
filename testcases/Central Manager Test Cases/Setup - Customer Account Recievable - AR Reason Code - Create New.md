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

# Scenario: Create New AR Reason Code and Synchronize to Selected Stores

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create and modify Accounts Receivable configuration in Central Manager.
- At least one store with **Active** status exists that can receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.

## Required Test Data
- AR Reason Code: ARC-001
- AR Reason Code Name: QA Test AR Reason Code 001
- Type: Adjustment

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → AR Reason Codes

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Expand **Customer** to reveal the customer configuration options.
4. Click **Accounts Receivable**.
5. Click **AR Reason Codes**.
6. Click **New** to open a new AR reason code record.
7. In the **Code** field, enter `ARC-001`.
8. In the **Name** field, enter `QA Test AR Reason Code 001`.
9. In the **Type** drop-down, select `Adjustment`.
   > **Note:** The following Type options are available: **Adjustment**, **Hold**, **Reversal**, **Unapply**. Select the type that matches the intended AR credit/debit adjustment scenario being tested.
10. Click **Save And Close** to save the new AR reason code record.
11. Allow synchronization to run to `Store001`. Synchronization runs on its configured schedule. Confirm with your system administrator how long synchronization typically takes in your environment before proceeding to validation.

---

## Expected Results
- The new AR reason code record `ARC-001` — `QA Test AR Reason Code 001` is created in Central Manager.
- The AR reason code record is inserted into `Store001` on synchronization.

## Validation Checks
- Verify the new AR reason code record `ARC-001` exists in Central Manager → Setup → Customer → Accounts Receivable → AR Reason Codes by searching the list and confirming the record appears with **Code** `ARC-001` and **Name** `QA Test AR Reason Code 001`.
- Verify the AR reason code record `ARC-001` was inserted in Store Manager on `Store001` by navigating to **Setup → Customer → Reason Codes** in Store Manager and confirming the record appears with **Code** `ARC-001`, **Name** `QA Test AR Reason Code 001`, and **Type** `Adjustment`.
- Verify no duplicate AR reason code records exist in Store Manager on `Store001` by confirming only one record with **Code** `ARC-001` appears in the reason code list.