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

# Scenario: Create New Payment Terms and Synchronize to Selected Stores

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create and modify Accounts Receivable configuration in Central Manager.
- At least one store with **Active** status exists that can receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.

## Required Test Data
- Payment Terms Code: PT-001
- Payment Terms Name: QA Test Payment Terms 001
- Due After Date: 30
- Grace Period: 5
- Minimum Payment: 25.00

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Payment Terms

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Expand **Customer** to reveal the customer configuration options.
4. Click **Accounts Receivable**.
5. Click **Payment Terms**.
6. Click **New** to open a new payment terms record.
7. In the **Code** field, enter `PT-001`.
8. In the **Name** field, enter `QA Test Payment Terms 001`.
9. In the **Due After Date** field, enter `30`.
10. In the **Grace Period** field, enter `5`.
11. In the **Minimum Payment** field, enter `25.00`.
12. Click **Save And Close** to save the new payment terms record.
13. Allow synchronization to run to `Store001`. Synchronization runs on its configured schedule. Confirm with your system administrator how long synchronization typically takes in your environment before proceeding to validation.

---

## Expected Results
- The new payment terms record `PT-001` — `QA Test Payment Terms 001` is created in Central Manager.
- The payment terms record is inserted into `Store001` on synchronization.

## Validation Checks
- Verify the new payment terms record `PT-001` exists in Central Manager → Setup → Customer → Accounts Receivable → Payment Terms by searching the payment terms list and confirming the record appears with **Code** `PT-001` and **Name** `QA Test Payment Terms 001`.
- Verify the payment terms record `PT-001` was inserted in Store Manager on `Store001` by navigating to **Setup → Customer → Payment Terms** in Store Manager and confirming the record appears with **Code** `PT-001`, **Name** `QA Test Payment Terms 001`, **Due After Date** `30`, **Grace Period** `5`, and **Minimum Payment** `25.00`.
- Verify no duplicate payment terms records exist in Store Manager on `Store001` by confirming only one record with **Code** `PT-001` appears in the payment terms list.