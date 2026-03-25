# Setup / Merchandising — Reason Codes

## Metadata
Feature: Reason Codes  
Business Area: Setup > Merchandising > Reason Codes  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP 1.1  
Priority: High  

---

# Scenario: Update an existing reason code in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- A reason code with Code `RC-001` and description `TEST-RC-001 No Sale` already exists in Central Manager, configured with Type `No Sale` and no Start or End Date.
- The target store Store001 is operational and already has the `RC-001` reason code from the prior Insert scenario.
- The logged-in user has a role with permissions to manage Reason Codes under **Setup > Merchandising**.

## Required Test Data
- Reason Code (existing): RC-001
- Description (existing): TEST-RC-001 No Sale
- Type (existing): No Sale
- Field to update: Description
- Updated Description: TEST-RC-001 No Sale Updated
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Merchandising → Reason Codes

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the top navigation bar, click **Setup**.
3. In the **Setup** menu, expand **Merchandising**.
4. Click **Reason Codes** to open the Reason Codes list.
5. In the Reason Codes list, locate the row where the **Code** column shows `RC-001` and click on that row to select it.
6. Verify the current values before making changes:
   - **Code:** `RC-001`
   - **Description:** `TEST-RC-001 No Sale`
   - **Type:** `No Sale`
7. Click **Edit** to open the **RC-001** record for editing.
8. In the **Description** field, clear the existing value `TEST-RC-001 No Sale`.
9. Enter the updated value: `TEST-RC-001 No Sale Updated`.
10. Leave the **Code**, **Type**, **Start Date**, and **End Date** fields unchanged.
11. Click **Save And Close** to save the changes and return to the Reason Codes list.
12. In the Reason Codes list, confirm the row for `RC-001` is still present.
13. Allow time for the synchronization cycle to complete between Central Server and Store001, or trigger a manual sync if required by your environment.
14. Open Store Manager on Store001.
15. In Store Manager, navigate to **Setup → Merchandising → Reason Codes**.
16. In the Reason Codes list, locate the reason code with Code `RC-001` and confirm the **Description** column shows `TEST-RC-001 No Sale Updated`.

---

## Expected Results
- The reason code RC-001 is updated successfully in Central Manager with the new description `TEST-RC-001 No Sale Updated`.
- The updated reason code data is synchronized to the target store Store001.
- The **Code** and **Type** remain unchanged after the update.

## Validation Checks
- Verify the updated **Description** value in Central Manager → Setup → Merchandising → Reason Codes by selecting the **RC-001** record, clicking **Edit**, and confirming the **Description** field displays `TEST-RC-001 No Sale Updated`.
- Verify the **Code** is unchanged in Central Manager → Setup → Merchandising → Reason Codes by reopening the **RC-001** record and confirming the **Code** field still displays `RC-001`.
- Verify the **Type** is unchanged in Central Manager → Setup → Merchandising → Reason Codes by reopening the **RC-001** record and confirming the **Type** field still shows `No Sale`.
- Verify the updated reason code is present in the target store in Store001 → Setup → Merchandising → Reason Codes by locating the **RC-001** record in the store's Reason Codes list after synchronization has completed and confirming the **Description** shows `TEST-RC-001 No Sale Updated`.

> **Note:** Actual result has been observed as Pass insert/update in the current implementation. This test case confirms the expected update behavior is in place and that the updated Description synchronizes correctly to the store.