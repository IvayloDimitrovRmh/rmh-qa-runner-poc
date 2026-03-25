# Setup / Miscellaneous — Custom Fields

## Metadata
Feature: Custom Fields
Business Area: Setup > Miscellaneous > Custom Fields
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Update Existing Custom Field Labels in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- The following custom field labels already exist in Central Manager on the Customer tab and have been previously synchronized to `Store001`:
  - Custom Text field 1: `Vehicle Make`
  - Custom Text field 2: `Vehicle Model`
  - Custom Number field 1: `Number of Vehicles`
- To confirm, navigate to **Central Manager → Setup → Miscellaneous → Custom Fields**, click the **Customer** tab, and verify the above labels are present. If they do not exist, execute the **Custom Fields - Create New** test case first.
- The user is logged into Central Manager with a role that has permissions to access Setup > Miscellaneous > Custom Fields.

## Required Test Data
- Tab: Customer
- Field position to update: Custom Text field 2
- Current label (before update): Vehicle Model
- Updated label (after update): Vehicle Model Year
- All other field labels remain unchanged
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Miscellaneous → Custom Fields

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Miscellaneous**.
4. Click **Custom Fields**. The Custom Fields configuration screen opens.
5. Click the **Customer** tab.
6. Confirm the following labels are currently present before making any changes:
   - Custom Text field 1: `Vehicle Make`
   - Custom Text field 2: `Vehicle Model`
   - Custom Number field 1: `Number of Vehicles`
7. Locate the second **Custom Text** field label (position 2), which currently shows `Vehicle Model`. This is the field you will update.
8. Click inside the Custom Text field 2 label, clear the existing value `Vehicle Model`, and type: `Vehicle Model Year`
9. Do not modify any other field labels:
   - Custom Text field 1 must remain: `Vehicle Make`
   - Custom Number field 1 must remain: `Number of Vehicles`
   - All other field labels must remain blank.
10. Do not modify the **Supplier** tab or the **Item** tab.
11. Click **Save And Close** to save the updated custom field labels and return to the Setup menu.
12. Reopen the Custom Fields screen by navigating back to **Setup → Miscellaneous → Custom Fields** and click the **Customer** tab. Confirm:
    - Custom Text field 1 still shows: `Vehicle Make`
    - Custom Text field 2 now shows: `Vehicle Model Year`
    - Custom Number field 1 still shows: `Number of Vehicles`
13. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
14. Open Store Manager on `Store001`.
15. In Store Manager, navigate to **Setup → Miscellaneous → Custom Fields**.
16. Click the **Customer** tab and confirm:
    - Custom Text field 1 shows: `Vehicle Make`
    - Custom Text field 2 shows: `Vehicle Model Year`
    - Custom Number field 1 shows: `Number of Vehicles`

## Expected Results
- The custom field label on the Customer tab is updated in Central Manager: Custom Text field 2 now shows `Vehicle Model Year` instead of `Vehicle Model`.
- All other custom field labels remain unchanged.
- The updated custom field label is synchronized to the active target store `Store001`.

## Validation Checks
- Verify **Custom Text field 2 updated to Vehicle Model Year** in **Central Manager > Setup > Miscellaneous > Custom Fields > Customer tab** by reopening the Custom Fields screen after saving and confirming the second Custom Text field label displays `Vehicle Model Year`.
- Verify **no unintended field label changes** in **Central Manager > Setup > Miscellaneous > Custom Fields > Customer tab** by confirming Custom Text field 1 still shows `Vehicle Make` and Custom Number field 1 still shows `Number of Vehicles`.
- Verify **updated custom field label is synchronized to target store** in **Store001 > Setup > Miscellaneous > Custom Fields > Customer tab** by opening the Custom Fields screen in Store Manager on `Store001` after synchronization and confirming Custom Text field 2 displays `Vehicle Model Year`, Custom Text field 1 displays `Vehicle Make`, and Custom Number field 1 displays `Number of Vehicles`.

> **Note:** Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.