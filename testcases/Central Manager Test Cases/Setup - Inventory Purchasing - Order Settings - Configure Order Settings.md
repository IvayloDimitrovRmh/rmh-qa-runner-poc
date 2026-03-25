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

# Scenario: Configure order settings and synchronize to active stores

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to manage Inventory/Purchasing configuration in Central Manager.
- At least one active store exists in the system. To verify: navigate to the store or location management section of Central Manager and confirm at least one store record has an **Active** status.
- Central-to-store synchronization services are running.

## Required Test Data
- Auto Release Order: Enabled *(checkbox selected)*
- Disable Order Number Editing: Disabled *(checkbox unselected)*

## Navigation Path
Central Manager → Setup → Inventory/Purchasing → Order Settings

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Setup**.
3. Under **Setup**, expand the **Inventory/Purchasing** section.
4. Click **Order Settings**. The Order Settings configuration screen opens.
5. Locate the **Auto release order** checkbox on the settings screen.
6. Select the **Auto release order** checkbox so that it is enabled (checked).
7. Confirm that the **Disable order number editing** checkbox is unselected (unchecked). If it is selected, unselect it.
8. Click **Save And Close**. The configuration screen closes.
9. Allow synchronization to complete between Central Manager and the active stores.

---

## Expected Results
- Order Settings are saved successfully in Central Manager.
- The **Auto release order** setting is enabled and the **Disable order number editing** setting is disabled.
- The saved configuration is synchronized to all active stores.

## Validation Checks
- Verify the **Auto release order** setting in Central Manager → Setup → Inventory/Purchasing → Order Settings by reopening the Order Settings screen and confirming the **Auto release order** checkbox is selected (checked).
- Verify the **Disable order number editing** setting in Central Manager → Setup → Inventory/Purchasing → Order Settings by reopening the Order Settings screen and confirming the **Disable order number editing** checkbox is unselected (unchecked).