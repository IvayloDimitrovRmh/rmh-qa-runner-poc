# Setup / Merchandising — Tares

## Metadata
Feature: Tares  
Business Area: Setup > Merchandising > Tares  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP 1.1  
Priority: High  

---

# Scenario: Insert a new tare in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., Store001) and is able to receive synchronization.
- The logged-in user has a role with permissions to manage Tares under **Setup > Merchandising**.
- No existing tare with label `TEST-TARE-001 Clamshell Container` exists in Central Manager (to avoid duplicates).

## Required Test Data
- Tare Label: TEST-TARE-001 Clamshell Container
- Tare Type: Fixed
- Fixed Weight Value: 0.05
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Merchandising → Tares

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the top navigation bar, click **Setup**.
3. In the **Setup** menu, expand **Merchandising**.
4. Click **Tares** to open the Tares list.
5. Click **New** to create a new tare. The tare detail form opens.
6. In the **Label** field, enter `TEST-TARE-001 Clamshell Container`.
7. Select **Fixed** as the tare type to specify a fixed weight value to subtract from the item's measured weight.
8. In the **Fixed** value field, enter `0.05`.
9. Click **Save And Close** to save the new tare and return to the Tares list.
10. In the Tares list, confirm the row with label `TEST-TARE-001 Clamshell Container` is present.
11. Allow time for the synchronization cycle to complete between Central Server and Store001, or trigger a manual sync if required by your environment.
12. Open Store Manager on Store001.
13. In Store Manager, navigate to **Setup → Merchandising → Tares**.
14. In the Tares list, confirm the tare with label `TEST-TARE-001 Clamshell Container` is present.

---

## Expected Results
- The new tare `TEST-TARE-001 Clamshell Container` is created and saved successfully in Central Manager.
- The tare is synchronized to and visible in the active target store Store001.

## Validation Checks
- Verify the new tare is present in Central Manager → Setup → Merchandising → Tares by locating `TEST-TARE-001 Clamshell Container` in the Tares list immediately after saving.
- Verify the **Label** value in Central Manager → Setup → Merchandising → Tares by reopening the `TEST-TARE-001 Clamshell Container` record and confirming the **Label** field displays `TEST-TARE-001 Clamshell Container`.
- Verify the **Fixed** weight value in Central Manager → Setup → Merchandising → Tares by reopening the `TEST-TARE-001 Clamshell Container` record and confirming the **Fixed** field shows `0.05`.
- Verify the tare is present in the target store in Store001 → Setup → Merchandising → Tares by locating the tare with label `TEST-TARE-001 Clamshell Container` in the store's Tares list after synchronization has completed.

> **Note:** The Tares setup screen fields confirmed in documentation are **Label** and either **Fixed** or **Percent** — there is no Code field documented. No Store Groups tab is documented for Tares; synchronization targets all active stores based on the Store table. If a store assignment mechanism exists in your build, document it and update this test case accordingly.

> **Actual Result:** Pass insert/update observed in the current implementation.