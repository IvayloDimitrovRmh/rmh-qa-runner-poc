# Setup / Financial — Tender Types

## Metadata
Feature: Tender Types
Business Area: Setup > Financial > Tender Types
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Insert a New Tender Type Record in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- At least one Store Group exists in Central Manager (e.g., `Store Group 01`) and contains `Store001`. To confirm, navigate to **Central Manager → Setup → Store Groups** and verify `Store Group 01` is listed and includes `Store001`.
- At least one Currency record exists in Central Manager. To confirm, navigate to **Central Manager → Setup → Financial → Currencies** and verify at least one record is listed. The `Default Currency` option is also available and uses the currency defined in the Windows operating system.
- The user is logged into Central Manager with a role that has permissions to access Setup > Financial > Tender Types.
- No tender type record with Tender Code `CA` currently exists in Central Manager. To confirm, navigate to **Central Manager → Setup → Financial → Tender Types** and verify that `CA` does not appear in the list.

## Required Test Data
- Tender Type Description: TEST Cash
- Tender Code: CA
- Tender Type (category): Cash
- Currency: Default Currency
- Display Order: 1
- Maximum Amount: 0.00 (no limit)
- Pop Cash Drawer: Enabled
- Store Group: Store Group 01

## Navigation Path
Central Manager → Setup → Financial → Tender Types

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Financial**.
4. Click **Tender Types**. The Tender Types list screen opens, showing all existing tender type records.
5. Click **New**. The tender type creation form opens.
6. In the **Description** field, enter: `TEST Cash`
7. In the **Tender Code** field, enter: `CA`
8. In the **Tender Type** field, select: `Cash`
   - This is the category that identifies how this payment method is processed at POS.
9. In the **Currency** field, select: `Default Currency`
   - Default Currency uses the currency defined in the Windows operating system of the store.
10. In the **Display Order** field, enter: `1`
    - The display order controls the position of this tender type in the POS tender selection screen, with 1 appearing at the top.
11. Confirm the **Maximum Amount** field shows `0.00`. Leave it as `0.00` — this means no maximum limit is set for this tender type.
12. Select the **POP Cash Drawer** checkbox to enable the cash drawer to open automatically whenever this tender type is used at POS.
13. Leave the **Tender Type is Inactive** checkbox unselected — this tender type must be active for use at POS.
14. Leave all other optional checkboxes unselected:
    - Do not select **Prevent Cashier Overtendering**
    - Do not select **Require Signature**
    - Do not select **Allow Multiple Entries**
15. Click the **Store Groups** tab.
16. On the Store Groups tab, locate `Store Group 01` in the list of available store groups.
17. Select `Store Group 01` to assign this tender type to the stores in that group.
18. Click **Save And Close** to save the new tender type record and return to the Tender Types list.
19. On the Tender Types list, confirm that a record with Description `TEST Cash` and Tender Code `CA` now appears in the list.
20. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
21. Open Store Manager on `Store001`.
22. In Store Manager, navigate to **Setup → Financial → Tender Types**.
23. Confirm that the Tender Types list in the store shows a record with Description `TEST Cash` and Tender Code `CA`.

## Expected Results
- The new tender type record `CA` with Description `TEST Cash`, Tender Type `Cash`, and POP Cash Drawer enabled is saved in Central Manager and appears in the Tender Types list.
- The tender type record is inserted into the active target store `Store001` via synchronization.
- The tender type is available at POS for cashiers to use when processing cash payments.

## Validation Checks
- Verify **tender type record CA exists in Central Manager** in **Central Manager > Setup > Financial > Tender Types** by confirming a record with Description `TEST Cash` and Tender Code `CA` appears in the Tender Types list after saving.
- Verify **tender type field values are correct** in **Central Manager > Setup > Financial > Tender Types** by opening the `CA` record and confirming: Description `TEST Cash`, Tender Code `CA`, Tender Type `Cash`, Currency `Default Currency`, Display Order `1`, Maximum Amount `0.00`, POP Cash Drawer checkbox selected, Store Groups tab shows `Store Group 01` selected.
- Verify **tender type record is synchronized to target store** in **Store001 > Setup > Financial > Tender Types** by opening the Tender Types list in Store Manager on `Store001` after synchronization and confirming a record with Description `TEST Cash` and Tender Code `CA` is present in the list.

> **Note:** Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.