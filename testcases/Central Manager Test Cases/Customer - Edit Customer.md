# Customer / Customer Accounts

## Metadata
Feature: Customer Accounts
Business Area: Customer
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store (via POS Lookup Online)
Release: MVP 1.1
Priority: High

---

# Scenario: Update an Existing Customer Record and Synchronize to Store

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- A customer record with First Name `John`, Last Name `TEST-CUST-001` already exists in Central Manager.
- The customer `John TEST-CUST-001` is accessible in Central Manager with a known E-mail Address of `john.original@example.com`.
- The target store `Store001` is operational, online, and has POS running.
- The user is logged into Central Manager with a role that has the Customer privilege enabled.
- The POS operator at `Store001` has access to the Customers function in POS.

## Required Test Data
- Customer First Name (existing): John
- Customer Last Name (existing): TEST-CUST-001
- Field to update: E-mail Address
- Current E-mail Address value: john.original@example.com
- Updated E-mail Address value: john.updated@example.com
- Target Store: Store001

## Navigation Path
Central Manager → Customer → Customers

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Customer**.
3. In the Customer menu, click **Customers**. The Customers list screen opens, displaying all existing customer records.
4. In the Customers list, locate the row for `John TEST-CUST-001`. Click on that row to select it and open the customer record.
5. The customer detail form opens. Verify the current values before making changes:
   - **First Name**: `John`
   - **Last Name**: `TEST-CUST-001`
   - **E-mail Address**: `john.original@example.com`
6. On the **Billing Information** tab, locate the **E-mail Address** field and clear the existing value `john.original@example.com`.
7. Type the updated value: `john.updated@example.com`
8. Click **Save And Close** to save the changes and return to the Customers list.
9. Reopen the customer record for `John TEST-CUST-001` and confirm the **E-mail Address** field on the **Billing Information** tab now shows `john.updated@example.com`.
10. At the target store `Store001`, open POS.
11. In POS, tap **Customers**, then tap **Lookup Customer**. The customer lookup screen opens.
12. In the lookup field, type `TEST-CUST-001` to search for the customer.
13. Tap **Lookup Online**. The system queries the Central database for matching customer records.
14. In the search results, locate `John TEST-CUST-001`. Tap the record once to select it, then tap **Select** (or tap the record twice). The customer record is synchronized from the Central database to the `Store001` database.
15. Confirm the customer record is now loaded in POS with the updated E-mail Address `john.updated@example.com`.

## Expected Results
- The customer record `John TEST-CUST-001` is successfully updated in Central Manager with the new E-mail Address `john.updated@example.com`.
- The updated customer record is synchronized to `Store001` via POS Lookup Online and the updated E-mail Address is visible in the store.

## Validation Checks
- Verify **updated E-mail Address in Central Manager** in **Central Manager > Customer > Customers** by reopening the `John TEST-CUST-001` record after saving and confirming the **E-mail Address** field on the **Billing Information** tab displays `john.updated@example.com`.
- Verify **customer record is synchronized to store** in **Store001 POS** by confirming the Lookup Online result for `TEST-CUST-001` returns the record and allows selection without error.
- Verify **updated E-mail Address in store** in **Store001 POS** by confirming the customer record loaded after Lookup Online displays the E-mail Address as `john.updated@example.com`.
- Verify **customer record is not updated in non-target stores without Lookup Online** by confirming that stores where POS Lookup Online was not performed still show the previous customer data or do not have the record at all.