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

# Scenario: Create New Number Series and Synchronize to Selected Stores

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create and modify Accounts Receivable configuration in Central Manager.
- At least one store with **Active** status exists that can receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.

## Required Test Data
- Number Series Code: NS-001
- Number Series Name: QA Test Number Series 001
- Prefix: QA
- No. of Digit: 6
- Last Used: 0

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Number Series

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Expand **Customer** to reveal the customer configuration options.
4. Click **Accounts Receivable**.
5. Click **Number Series**.
6. Click **New** to open a new number series record.
7. In the **Code** field, enter `NS-001`.
8. In the **Name** field, enter `QA Test Number Series 001`.
9. In the **Prefix** field, enter `QA`.
10. In the **No. of Digit** field, enter `6`.
11. In the **Last Used** field, enter `0`.
12. Click **Save And Close** to save the new number series record.
13. Allow synchronization to run to `Store001`. Synchronization runs on its configured schedule. Confirm with your system administrator how long synchronization typically takes in your environment before proceeding to validation.

---

## Expected Results
- The new number series record `NS-001` — `QA Test Number Series 001` is created in Central Manager.
- The number series record is inserted into `Store001` on synchronization.

## Validation Checks
- Verify the new number series record `NS-001` exists in Central Manager → Setup → Customer → Accounts Receivable → Number Series by searching the list and confirming the record appears with **Code** `NS-001` and **Name** `QA Test Number Series 001`.
- Verify the number series record `NS-001` was inserted in Store Manager on `Store001` by navigating to **Setup → Customer → Number Series** in Store Manager and confirming the record appears with **Code** `NS-001`, **Name** `QA Test Number Series 001`, **Prefix** `QA`, and **No. of Digit** `6`.
- Verify no duplicate number series records exist in Store Manager on `Store001` by confirming only one record with **Code** `NS-001` appears in the number series list.