# Setup / Inventory-Purchasing

## Metadata
Feature: Order Settings  
Business Area: Setup > Inventory/Purchasing  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP 1.1  
Priority: High  

---

# Scenario: Update existing order settings and synchronize to active stores

## Preconditions
- Order Settings have been previously configured in Central Manager with the following state:
  - **Auto release order:** Enabled *(checkbox selected)*
  - **Disable order number editing:** Disabled *(checkbox unselected)*

  To verify: navigate to **Central Manager → Setup → Inventory/Purchasing → Order Settings** and confirm the checkbox states match the above.
  > **If the state does not match**, complete the *Configure Order Settings* scenario first.
- The logged-in user has permission to manage Inventory/Purchasing configuration in Central Manager.
- Central-to-store synchronization services are running.

## Required Test Data
- Auto Release Order: Enabled *(checkbox selected — unchanged)*
- Disable Order Number Editing: Enabled *(checkbox selected — changed from unselected to selected)*

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Order Settings

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Under **Setup**, expand the **Inventory/Purchasing** section.
4. Click **Order Settings**. The Order Settings configuration screen opens.
5. Confirm that the **Auto release order** checkbox is currently selected. Do not change it.
6. Locate the **Disable order number editing** checkbox on the settings screen.
7. Select the **Disable order number editing** checkbox so that it is enabled (checked).
8. Click **Save And Close**. The configuration screen closes.
9. Allow synchronization to complete between Central Manager and the active stores.

---

## Expected Results
- The updated Order Settings are saved successfully in Central Manager.
- The **Disable order number editing** setting is now enabled.
- The **Auto release order** setting remains enabled and unchanged.
- The updated configuration is synchronized to all active stores.

## Validation Checks
- Verify the **Disable order number editing** setting in Central Manager → Setup → Inventory/Purchasing → Order Settings by reopening the Order Settings screen and confirming the **Disable order number editing** checkbox is now selected (checked).
- Verify the **Auto release order** setting is unchanged in Central Manager → Setup → Inventory/Purchasing → Order Settings by reopening the Order Settings screen and confirming the **Auto release order** checkbox remains selected (checked).