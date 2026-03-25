# Setup / Miscellaneous — Random Weight EAN

## Metadata
Feature: Random Weight EAN
Business Area: Setup > Miscellaneous > Random Weight EAN
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Update the Random Weight EAN13 Format in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- The Random Weight EAN13 setting in Central Manager is currently set to a non-None EAN-13 formatting option and has been previously synchronized to `Store001`. To confirm, navigate to **Central Manager → Setup → Miscellaneous → Random Weight EAN** and verify that the **Random Weight EAN13** drop-down does not show `None`. If it shows `None`, execute the **Random Weight EAN - Configure New** test case first to set a non-None value.
- The user is logged into Central Manager with a role that has permissions to access Setup > Miscellaneous > Random Weight EAN.

## Required Test Data
- Current Random Weight EAN13 setting (before update): the non-None EAN-13 formatting option set during the Configure New test case
- Updated Random Weight EAN13 setting (after update): None
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Miscellaneous → Random Weight EAN

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Miscellaneous**.
4. Click **Random Weight EAN**. The Random Weight EAN configuration screen opens.
5. Locate the **Random Weight EAN13** drop-down field.
6. Confirm the drop-down currently shows a non-None EAN-13 formatting option. Note the exact current value — this is the value you are changing away from.
   - `None` supports item prices up to $999.99. Returning to `None` disables the custom EAN-13 format for prices above $999.99.
7. Click the **Random Weight EAN13** drop-down and select: `None`
8. Click **Save And Close** to save the updated configuration and return to the Setup menu.
9. Reopen the Random Weight EAN screen by navigating back to **Setup → Miscellaneous → Random Weight EAN**.
10. Confirm the **Random Weight EAN13** drop-down now displays `None`.
11. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
12. Open Store Manager on `Store001`.
13. In Store Manager, navigate to **Setup → Miscellaneous → Random Weight EAN**.
14. Confirm the **Random Weight EAN13** drop-down in Store Manager on `Store001` displays `None`.

## Expected Results
- The Random Weight EAN13 configuration in Central Manager is updated to `None`.
- The updated configuration is synchronized to the active target store `Store001`.
- Store Manager on `Store001` reflects the same `None` setting as Central Manager.

## Validation Checks
- Verify **Random Weight EAN13 setting updated to None** in **Central Manager > Setup > Miscellaneous > Random Weight EAN** by reopening the Random Weight EAN screen after saving and confirming the **Random Weight EAN13** drop-down displays `None`.
- Verify **updated Random Weight EAN13 setting is synchronized to target store** in **Store001 > Setup > Miscellaneous > Random Weight EAN** by opening the Random Weight EAN screen in Store Manager on `Store001` after synchronization and confirming the **Random Weight EAN13** drop-down displays `None`.

> **Note:** The custom EAN-13 format is intended for use in countries that do not support standard random weight barcodes. Returning the setting to `None` restores standard random weight EAN-13 barcode support for item prices up to $999.99. Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass update in the current implementation.