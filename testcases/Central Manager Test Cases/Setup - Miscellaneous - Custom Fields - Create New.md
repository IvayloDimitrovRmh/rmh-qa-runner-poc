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

# Scenario: Insert New Custom Field Labels in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- The user is logged into Central Manager with a role that has permissions to access Setup > Miscellaneous > Custom Fields.
- The Customer tab Custom Text field 1 label is currently blank in Central Manager. To confirm, navigate to **Central Manager → Setup → Miscellaneous → Custom Fields**, click the **Customer** tab, and verify that the first Custom Text field label is empty.

## Required Test Data
- Tab: Customer
- Custom Text field 1 label: Vehicle Make
- Custom Text field 2 label: Vehicle Model
- Custom Number field 1 label: Number of Vehicles
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Miscellaneous → Custom Fields

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Miscellaneous**.
4. Click **Custom Fields**. The Custom Fields configuration screen opens.
5. Click the **Customer** tab. The Customer tab displays up to five Custom Text fields and up to five Custom Number fields, each with an editable label.
6. Locate the first **Custom Text** field label (position 1). Click inside it and type: `Vehicle Make`
   - This label will appear as a field name on the Customer record in Store Manager and POS.
7. Locate the second **Custom Text** field label (position 2). Click inside it and type: `Vehicle Model`
8. Locate the first **Custom Number** field label (position 1). Click inside it and type: `Number of Vehicles`
   - Custom Number fields store numeric values only.
9. Leave all remaining Custom Text and Custom Number field labels (positions 3–5) blank — no additional labels are required for this test.
10. Do not modify the **Supplier** tab or the **Item** tab for this test.
11. Click **Save And Close** to save the custom field labels and return to the Setup menu.
12. Reopen the Custom Fields screen by navigating back to **Setup → Miscellaneous → Custom Fields** and click the **Customer** tab. Confirm the following labels are saved:
    - Custom Text field 1: `Vehicle Make`
    - Custom Text field 2: `Vehicle Model`
    - Custom Number field 1: `Number of Vehicles`
13. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
14. Open Store Manager on `Store001`.
15. In Store Manager, navigate to **Setup → Miscellaneous → Custom Fields**.
16. Click the **Customer** tab and confirm the following labels are present:
    - Custom Text field 1: `Vehicle Make`
    - Custom Text field 2: `Vehicle Model`
    - Custom Number field 1: `Number of Vehicles`

## Expected Results
- The custom field labels are saved in Central Manager on the Customer tab: Custom Text 1 `Vehicle Make`, Custom Text 2 `Vehicle Model`, Custom Number 1 `Number of Vehicles`.
- The custom field labels are inserted into the active target store `Store001` via synchronization.
- The labels appear on the Customer record in Store Manager at `Store001`, ready for data entry.

## Validation Checks
- Verify **custom field labels are saved in Central Manager** in **Central Manager > Setup > Miscellaneous > Custom Fields > Customer tab** by reopening the Custom Fields screen after saving and confirming Custom Text field 1 shows `Vehicle Make`, Custom Text field 2 shows `Vehicle Model`, and Custom Number field 1 shows `Number of Vehicles`.
- Verify **custom field labels are synchronized to target store** in **Store001 > Setup > Miscellaneous > Custom Fields > Customer tab** by opening the Custom Fields screen in Store Manager on `Store001` after synchronization and confirming Custom Text field 1 shows `Vehicle Make`, Custom Text field 2 shows `Vehicle Model`, and Custom Number field 1 shows `Number of Vehicles`.

> **Note:** Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.