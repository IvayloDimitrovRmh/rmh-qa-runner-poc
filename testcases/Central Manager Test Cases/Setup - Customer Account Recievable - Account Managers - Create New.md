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

# Scenario: Create New Account Manager and Synchronize to Selected Stores

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create and modify Accounts Receivable configuration in Central Manager.
- At least one store with **Active** status exists that can receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.

## Required Test Data
- Account Manager Code: AMG-001
- Account Manager Name: QA Test Account Manager 001
- Contact Phone: 555-000-0001
- Contact Email: qa.manager001@teststore.com

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Account Managers

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Expand **Customer** to reveal the customer configuration options.
4. Click **Accounts Receivable**.
5. Click **Account Managers**.
6. Click **New** to open a new account manager record.
7. In the **Code** field, enter `AMG-001`.
8. In the **Name** field, enter `QA Test Account Manager 001`.
9. In the contact information fields, enter the contact details: phone `555-000-0001` and email `qa.manager001@teststore.com`.
10. Click **Save And Close** to save the new account manager record.
11. Allow synchronization to run to `Store001`. Synchronization runs on its configured schedule. Confirm with your system administrator how long synchronization typically takes in your environment before proceeding to validation.

---

## Expected Results
- The new account manager record `AMG-001` — `QA Test Account Manager 001` is created in Central Manager.
- The account manager record is inserted into `Store001` on synchronization.

## Validation Checks
- Verify the new account manager record `AMG-001` exists in Central Manager → Setup → Customer → Accounts Receivable → Account Managers by searching the account manager list and confirming the record appears with **Code** `AMG-001` and **Name** `QA Test Account Manager 001`.
- Verify the account manager record `AMG-001` was inserted in Store Manager on `Store001` by navigating to **Setup → Customer → Account Managers** in Store Manager and confirming the record appears with **Code** `AMG-001` and **Name** `QA Test Account Manager 001`.
- Verify no duplicate account manager records exist in Store Manager on `Store001` by confirming only one record with **Code** `AMG-001` appears in the account manager list.