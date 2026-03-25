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

# Scenario: Update an Existing Tender Type Record in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- A tender type record with Tender Code `CA` and Description `TEST Cash` already exists in Central Manager with Display Order `1` and has been previously synchronized to `Store001`. To confirm, navigate to **Central Manager → Setup → Financial → Tender Types** and verify the record appears in the list. If it does not exist, execute the **Tender Types - Create New** test case first.
- The user is logged into Central Manager with a role that has permissions to access Setup > Financial > Tender Types.

## Required Test Data
- Tender Code (record to update): CA
- Current Display Order (before update): 1
- Updated Display Order (after update): 2
- All other fields remain unchanged
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Financial → Tender Types

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Financial**.
4. Click **Tender Types**. The Tender Types list screen opens, showing all existing tender type records.
5. In the Tender Types list, locate the record with Tender Code `CA` and Description `TEST Cash`.
6. Select that record to highlight it, then open it for editing.
7. Confirm the **Description** field shows `TEST Cash`. Do not modify this field.
8. Confirm the **Tender Code** field shows `CA`. Do not modify this field.
9. Confirm the **Tender Type** field shows `Cash`. Do not modify this field.
10. Confirm the **Currency** field shows `Default Currency`. Do not modify this field.
11. Confirm the **Display Order** field currently shows `1`. This is the field you will update.
    - The display order controls the position of this tender type on the POS tender selection screen, with 1 at the top.
12. Click inside the **Display Order** field, clear the existing value, and type: `2`
13. Confirm the **Maximum Amount** field still shows `0.00`. Do not modify this field.
14. Confirm the **POP Cash Drawer** checkbox remains selected. Do not modify this field.
15. Confirm the **Tender Type is Inactive** checkbox remains unselected. Do not modify this field.
16. Click the **Store Groups** tab and confirm `Store Group 01` is still selected. Do not modify the store group assignment.
17. Click **Save And Close** to save the updated tender type record and return to the Tender Types list.
18. On the Tender Types list, confirm the record with Tender Code `CA` and Description `TEST Cash` is still present.
19. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
20. Open Store Manager on `Store001`.
21. In Store Manager, navigate to **Setup → Financial → Tender Types**.
22. Confirm the Tender Types list in the store shows the record with Tender Code `CA` and that the updated display order is reflected.

## Expected Results
- The tender type record `CA` in Central Manager is updated: the **Display Order** field now shows `2` instead of `1`.
- All other fields on the record remain unchanged (Description `TEST Cash`, Tender Code `CA`, Tender Type `Cash`, Currency `Default Currency`, Maximum Amount `0.00`, POP Cash Drawer enabled).
- The updated tender type record is synchronized to the active target store `Store001`.

## Validation Checks
- Verify **Display Order updated to 2** in **Central Manager > Setup > Financial > Tender Types** by opening the `CA` record after saving and confirming the **Display Order** field displays `2`.
- Verify **no unintended field changes** in **Central Manager > Setup > Financial > Tender Types** by opening the `CA` record and confirming all other fields remain unchanged: Description `TEST Cash`, Tender Code `CA`, Tender Type `Cash`, Currency `Default Currency`, Maximum Amount `0.00`, POP Cash Drawer checkbox selected, Tender Type is Inactive unselected, Store Groups tab shows `Store Group 01` selected.
- Verify **updated tender type record is synchronized to target store** in **Store001 > Setup > Financial > Tender Types** by opening the Tender Types list in Store Manager on `Store001` after synchronization and confirming the record with Tender Code `CA` and Description `TEST Cash` is present and reflects the updated Display Order of `2`.

> **Note:** Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.