# Setup / Customer / Accounts Receivable

## Metadata
Feature: Setup — Email Message  
Business Area: Setup > Customer > Accounts Receivable  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP V2  
Priority: High  

---

# Scenario: Configure AR Email Message and Synchronize to Selected Stores

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create and modify Accounts Receivable configuration in Central Manager.
- At least one store with **Active** status exists that can receive synchronization (e.g., `Store001`).
- Central-to-store synchronization services are running.

## Required Test Data
- Email Subject: Your Account Statement - Closing Date {Closing Date}
- Email Body: Dear Customer, please find attached your account statement for the billing period ending {Closing Date}. If you have any questions, please contact us.
- Email Signature: QA Test Store - Accounts Receivable Department

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Email Message

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Expand **Customer** to reveal the customer configuration options.
4. Click **Accounts Receivable**.
5. Expand **Email Message** to reveal the email message configuration screen.
6. In the **Subject** field, clear the existing value and enter `Your Account Statement - Closing Date {Closing Date}`.
   > **Note:** `{Closing Date}` is a variable that pulls in the closing date used when the billing cycle was closed. Include it in the Subject to have it populated automatically at runtime.
7. In the **Body** field, clear the existing value and enter: `Dear Customer, please find attached your account statement for the billing period ending {Closing Date}. If you have any questions, please contact us.`
8. In the **Signature** field, clear the existing value and enter `QA Test Store - Accounts Receivable Department`.
9. Click **OK** to save the changes.
10. Click **OK** to confirm the save.
11. Allow synchronization to run to `Store001`. Synchronization runs on its configured schedule. Confirm with your system administrator how long synchronization typically takes in your environment before proceeding to validation.

---

## Expected Results
- The AR email message configuration is saved in Central Manager with the updated **Subject**, **Body**, and **Signature** values.
- The updated configuration is synchronized to `Store001`.

## Validation Checks
- Verify the email message configuration was saved in Central Manager → Setup → Customer → Accounts Receivable → Email Message by opening the screen and confirming the **Subject** shows `Your Account Statement - Closing Date {Closing Date}`, the **Body** contains the configured text, and the **Signature** shows `QA Test Store - Accounts Receivable Department`.
- Verify the email message configuration was synchronized to Store Manager on `Store001` by navigating to **Setup → Customer → Email Message** in Store Manager and confirming the **Subject**, **Body**, and **Signature** fields reflect the values configured in Central Manager.
- Verify no unintended changes occurred to other Accounts Receivable configuration records in Store Manager on `Store001` during synchronization by confirming account groups, number series, statement types, and payment terms records are unchanged from their expected state.