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

# Scenario: Insert a new reason code in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store is operational and able to receive synchronization (e.g., Store001).
- The logged-in user has a role with permissions to manage Reason Codes under **Setup > Merchandising**.
- No existing reason code with Code `RC-001` exists in Central Manager (to avoid duplicates).

## Required Test Data
- Reason Code: RC-001
- Description: TEST-RC-001 No Sale
- Type: No Sale
- Start Date: *(leave blank — reason code is active immediately)*
- End Date: *(leave blank — no end date)*
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Merchandising → Reason Codes

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the top navigation bar, click **Setup**.
3. In the **Setup** menu, expand **Merchandising**.
4. Click **Reason Codes** to open the Reason Codes list.
5. Click **New** to create a new reason code. The reason code detail form opens.
6. In the **Code** field, enter `RC-001`.
7. In the **Description** field, enter `TEST-RC-001 No Sale`.
8. In the **Type** field, select or enter `No Sale`.
9. Leave the **Start Date** field blank so the reason code becomes active immediately.
10. Leave the **End Date** field blank so the reason code has no expiry.
11. Click **Save And Close** to save the new reason code and return to the Reason Codes list.
12. In the Reason Codes list, confirm the row with Code `RC-001` is present.
13. Allow time for the synchronization cycle to complete between Central Server and Store001, or trigger a manual sync if required by your environment.
14. Open Store Manager on Store001.
15. In Store Manager, navigate to **Setup → Merchandising → Reason Codes**.
16. In the Reason Codes list, confirm the reason code with Code `RC-001` is present.

---

## Expected Results
- The new reason code RC-001 with description `TEST-RC-001 No Sale` is created and saved successfully in Central Manager.
- The reason code is synchronized to and visible in the target store Store001.

## Validation Checks
- Verify the new reason code is present in Central Manager → Setup → Merchandising → Reason Codes by locating `RC-001` in the Reason Codes list immediately after saving.
- Verify the **Code** value in Central Manager → Setup → Merchandising → Reason Codes by reopening the **RC-001** record and confirming the **Code** field displays `RC-001`.
- Verify the **Description** value in Central Manager → Setup → Merchandising → Reason Codes by reopening the **RC-001** record and confirming the **Description** field displays `TEST-RC-001 No Sale`.
- Verify the **Type** value in Central Manager → Setup → Merchandising → Reason Codes by reopening the **RC-001** record and confirming the **Type** field shows `No Sale`.
- Verify the reason code is present in the target store in Store001 → Setup → Merchandising → Reason Codes by locating `RC-001` in the store's Reason Codes list after synchronization has completed.
- Verify the **Description** matches in the store in Store001 → Setup → Merchandising → Reason Codes by confirming the **RC-001** record displays description `TEST-RC-001 No Sale` in the store.

> **Note:** The Reason Codes setup screen does not include a Store Groups tab per available documentation. Synchronization scope (whether reason codes sync to all active stores or require a separate assignment mechanism) should be confirmed against the target environment. If a Store Groups or store assignment step exists in your build, document it and update this test case accordingly.