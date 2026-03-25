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

# Scenario: Update an existing tare in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- A tare with label `TEST-TARE-001 Clamshell Container` already exists in Central Manager, configured as type `Fixed` with a value of `0.05`.
- The target store Store001 is active, operational, and already has the `TEST-TARE-001 Clamshell Container` tare from the prior Insert scenario.
- The logged-in user has a role with permissions to manage Tares under **Setup > Merchandising**.

## Required Test Data
- Tare Label (existing): TEST-TARE-001 Clamshell Container
- Tare Type (existing): Fixed
- Current Fixed value: 0.05
- Field to update: Fixed weight value
- Updated Fixed value: 0.08
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Merchandising → Tares

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the top navigation bar, click **Setup**.
3. In the **Setup** menu, expand **Merchandising**.
4. Click **Tares** to open the Tares list.
5. In the Tares list, locate the row where the **Label** column shows `TEST-TARE-001 Clamshell Container` and click on that row to open the tare record for editing.
6. Verify the current values before making changes:
   - **Label:** `TEST-TARE-001 Clamshell Container`
   - **Type:** `Fixed`
   - **Fixed value:** `0.05`
7. In the **Fixed** value field, clear the existing value `0.05`.
8. Enter the updated value: `0.08`.
9. Leave the **Label** field unchanged.
10. Click **Save And Close** to save the changes and return to the Tares list.
11. In the Tares list, confirm the row for `TEST-TARE-001 Clamshell Container` is still present.
12. Allow time for the synchronization cycle to complete between Central Server and Store001, or trigger a manual sync if required by your environment.
13. Open Store Manager on Store001.
14. In Store Manager, navigate to **Setup → Merchandising → Tares**.
15. In the Tares list, locate the tare with label `TEST-TARE-001 Clamshell Container` and open the record.
16. Confirm the **Fixed** value shows the updated value `0.08`.

---

## Expected Results
- The tare record `TEST-TARE-001 Clamshell Container` is updated successfully in Central Manager with the new Fixed weight value of `0.08`.
- The updated tare data is synchronized to the active target store Store001.
- The **Label** and tare type remain unchanged after the update.

## Validation Checks
- Verify the updated **Fixed** value in Central Manager → Setup → Merchandising → Tares by reopening the `TEST-TARE-001 Clamshell Container` record and confirming the **Fixed** field displays `0.08`.
- Verify the **Label** is unchanged in Central Manager → Setup → Merchandising → Tares by reopening the `TEST-TARE-001 Clamshell Container` record and confirming the **Label** field still displays `TEST-TARE-001 Clamshell Container`.
- Verify the tare type is unchanged in Central Manager → Setup → Merchandising → Tares by reopening the `TEST-TARE-001 Clamshell Container` record and confirming the tare type remains `Fixed` (not `Percent`).
- Verify the updated tare data is present in the target store in Store001 → Setup → Merchandising → Tares by opening the `TEST-TARE-001 Clamshell Container` record in Store Manager after synchronization has completed and confirming the **Fixed** value displays `0.08`.

> **Note:** Synchronization targets only stores with **Active** status in the Store table. Stores with **Inactive** status will not receive this update.

> **Actual Result:** Pass insert/update observed in the current implementation.