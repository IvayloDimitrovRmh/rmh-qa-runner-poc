# Setup / Inventory/Purchasing — Payment Terms

## Metadata
Feature: Payment Terms
Business Area: Setup > Inventory/Purchasing > Payment Terms
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Insert a New Payment Terms Record in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- At least one Store Group exists in Central Manager (e.g., `Store Group 01`) and contains `Store001`. To confirm, navigate to **Central Manager → Setup → Store Groups** and verify `Store Group 01` is listed and includes `Store001`.
- The user is logged into Central Manager with a role that has permissions to access Setup > Inventory/Purchasing > Payment Terms.
- No payment terms record with Code `PT-NET30-001` currently exists in Central Manager. To confirm, navigate to **Central Manager → Setup → Inventory/Purchasing → Payment Terms** and verify that `PT-NET30-001` does not appear in the list.

## Required Test Data
- Payment Terms Code: PT-NET30-001
- Payment Terms Name: TEST Net 30
- Store Group: Store Group 01

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Payment Terms

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Inventory/Purchasing**.
4. Click **Payment Terms**. The Payment Terms list screen opens, showing all existing payment terms records.
5. Click **New**. The payment terms creation form opens.
6. Confirm you are on the **General** tab.
7. In the **Code** field, enter: `PT-NET30-001`
   - The code is a unique identifier for these payment terms.
8. In the **Name** field, enter: `TEST Net 30`
   - The name entered here is printed on the purchase order or transfer as the payment terms.
9. Click the **Store Groups** tab.
10. On the Store Groups tab, locate `Store Group 01` in the list of available store groups.
11. Select `Store Group 01` to assign these payment terms to the stores in that group.
12. Click **Save And Close** to save the new payment terms record and return to the Payment Terms list.
13. On the Payment Terms list, confirm that a record with Code `PT-NET30-001` and Name `TEST Net 30` now appears in the list.
14. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
15. Open Store Manager on `Store001`.
16. In Store Manager, navigate to **Setup → Inventory/Purchasing → Payment Terms**.
17. Confirm that the Payment Terms list in the store shows a record with Code `PT-NET30-001` and Name `TEST Net 30`.

## Expected Results
- The new payment terms record `PT-NET30-001` with Name `TEST Net 30` is saved in Central Manager and appears in the Payment Terms list.
- The payment terms record is inserted into the active target store `Store001` via synchronization.
- The payment terms `TEST Net 30` are available for selection on purchase orders and transfers at `Store001`.

## Validation Checks
- Verify **payment terms record PT-NET30-001 exists in Central Manager** in **Central Manager > Setup > Inventory/Purchasing > Payment Terms** by confirming a record with Code `PT-NET30-001` and Name `TEST Net 30` appears in the Payment Terms list after saving.
- Verify **Store Group assignment** in **Central Manager > Setup > Inventory/Purchasing > Payment Terms** by opening the `PT-NET30-001` record, clicking the **Store Groups** tab, and confirming `Store Group 01` is selected.
- Verify **payment terms record is synchronized to target store** in **Store001 > Setup > Inventory/Purchasing > Payment Terms** by opening the Payment Terms list in Store Manager on `Store001` after synchronization and confirming a record with Code `PT-NET30-001` and Name `TEST Net 30` is present in the list.

> **Note:** The Name field value is printed on purchase orders and transfers as the payment terms. Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.