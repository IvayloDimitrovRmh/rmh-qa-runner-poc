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

# Scenario: Configure the Random Weight EAN13 Format in Central Manager (Initial Setup)

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- The user is logged into Central Manager with a role that has permissions to access Setup > Miscellaneous > Random Weight EAN.
- The Random Weight EAN13 setting is currently set to `None` in Central Manager. To confirm, navigate to **Central Manager → Setup → Miscellaneous → Random Weight EAN** and verify that the **Random Weight EAN13** drop-down shows `None` before proceeding.
- This test is intended for stores where item prices may exceed $999.99 and a custom EAN-13 format is required. Do not apply a non-None EAN-13 format to stores in the U.S., Canada, Europe, Australia, New Zealand, or other developed countries without consulting your RMH partner first.

## Required Test Data
- Current Random Weight EAN13 setting (before change): None
- New Random Weight EAN13 setting (after change): first available non-None EAN-13 formatting option shown in the drop-down
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Miscellaneous → Random Weight EAN

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Miscellaneous**.
4. Click **Random Weight EAN**. The Random Weight EAN configuration screen opens.
5. Locate the **Random Weight EAN13** drop-down field.
6. Confirm the drop-down currently shows `None`.
   - `None` is the default setting and supports item prices up to $999.99. Selecting a non-None option enables custom EAN-13 format support for item prices greater than $999.99.
7. Click the **Random Weight EAN13** drop-down and review the available options.
8. Select the first available non-None EAN-13 formatting option shown in the drop-down list.
   - Note the exact option name selected — you will need it for validation.
9. Click **Save And Close** to save the configuration and return to the Setup menu.
10. Reopen the Random Weight EAN screen by navigating back to **Setup → Miscellaneous → Random Weight EAN**.
11. Confirm the **Random Weight EAN13** drop-down now displays the option selected in step 8, and no longer shows `None`.
12. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
13. Open Store Manager on `Store001`.
14. In Store Manager, navigate to **Setup → Miscellaneous → Random Weight EAN**.
15. Confirm the **Random Weight EAN13** drop-down in Store Manager on `Store001` displays the same option that was selected in step 8.

## Expected Results
- The Random Weight EAN13 configuration in Central Manager is changed from `None` to the selected EAN-13 formatting option.
- The updated configuration is synchronized to the active target store `Store001`.
- Store Manager on `Store001` reflects the same Random Weight EAN13 format setting as Central Manager.

## Validation Checks
- Verify **Random Weight EAN13 setting updated from None** in **Central Manager > Setup > Miscellaneous > Random Weight EAN** by reopening the Random Weight EAN screen after saving and confirming the **Random Weight EAN13** drop-down no longer shows `None` and instead displays the selected EAN-13 formatting option.
- Verify **updated Random Weight EAN13 setting is synchronized to target store** in **Store001 > Setup > Miscellaneous > Random Weight EAN** by opening the Random Weight EAN screen in Store Manager on `Store001` after synchronization and confirming the **Random Weight EAN13** drop-down displays the same option as set in Central Manager.

> **Note:** The custom EAN-13 format is intended for use in countries that do not support standard random weight barcodes. It should not be applied to stores in developed countries without RMH partner guidance. Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass update in the current implementation.