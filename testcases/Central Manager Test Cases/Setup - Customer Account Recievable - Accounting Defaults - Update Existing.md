# Setup / Customer / Accounts Receivable

## Metadata
Feature: Setup — Accounting Defaults  
Business Area: Setup > Customer > Accounts Receivable  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V2  
Priority: High  

---

# Scenario: Configure Accounting Defaults and Synchronize to Selected Stores

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create and modify Accounts Receivable configuration in Central Manager.
- Account group `AG-001` exists in Central Manager. To verify: navigate to **Central Manager → Setup → Customer → Accounts Receivable → Account Groups** and confirm `AG-001` appears in the list.
  > **If it does not exist**, complete the *Create New Account Group and Synchronize to Selected Stores* scenario first.
- Number series `NS-001` exists in Central Manager. To verify: navigate to **Central Manager → Setup → Customer → Accounts Receivable → Number Series** and confirm `NS-001` appears in the list.
  > **If it does not exist**, complete the *Create New Number Series and Synchronize to Selected Stores* scenario first.
- Statement type `ST-001` exists in Central Manager. To verify: navigate to **Central Manager → Setup → Customer → Accounts Receivable → Statement Types** and confirm `ST-001` appears in the list.
  > **If it does not exist**, complete the *Create New Statement Type and Synchronize to Selected Stores* scenario first.
- At least one store with **Active** status exists that can receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.

## Required Test Data
- Default Customer Group: AG-001
- Default Number Series: NS-001
- Default Statement Type: ST-001

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Accounting Defaults

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Expand **Customer** to reveal the customer configuration options.
4. Click **Accounts Receivable**.
5. Click **Accounting Defaults**.
6. In the **Default Customer Group** field, select `AG-001`.
7. In the **Default Number Series** field, select `NS-001`.
8. In the **Default Statement Type** field, select `ST-001`.
9. Click **Save And Close** to save the accounting defaults configuration.
10. Allow synchronization to run to `Store001`. Synchronization runs on its configured schedule. Confirm with your system administrator how long synchronization typically takes in your environment before proceeding to validation.

---

## Expected Results
- The accounting defaults configuration is saved in Central Manager with **Default Customer Group** `AG-001`, **Default Number Series** `NS-001`, and **Default Statement Type** `ST-001`.
- The updated configuration is synchronized to `Store001`.

## Validation Checks
- Verify the accounting defaults configuration was saved in Central Manager → Setup → Customer → Accounts Receivable → Accounting Defaults by opening the screen and confirming the **Default Customer Group** shows `AG-001`, **Default Number Series** shows `NS-001`, and **Default Statement Type** shows `ST-001`.
- Verify the accounting defaults configuration was synchronized to Store Manager on `Store001` by navigating to **Setup → Customer → Accounting Defaults** in Store Manager and confirming the **Default Customer Group** shows `AG-001`, **Default Number Series** shows `NS-001`, and **Default Statement Type** shows `ST-001`.
- Verify no unintended changes occurred to other Accounts Receivable configuration records in Store Manager on `Store001` during synchronization by confirming account groups, number series, and statement type records are unchanged from their expected state.