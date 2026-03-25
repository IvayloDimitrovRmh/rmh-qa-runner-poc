# Setup / Miscellaneous — Item Properties

## Metadata
Feature: Item Properties
Business Area: Setup > Miscellaneous > Item Properties
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store
Release: MVP 1.1
Priority: High

---

# Scenario: Update an Existing Item Property Field Definition in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- An item property field named `Origin Country` already exists in Central Manager and has been previously synchronized to `Store001`. To confirm, navigate to **Central Manager → Setup → Miscellaneous → Item Properties** and verify that `Origin Country` appears in the list. If it does not exist, execute the **Item Properties - Create New** test case first.
- The user is logged into Central Manager with a role that has permissions to access Setup > Miscellaneous > Item Properties.
- An item record exists in Central Manager and `Store001` with the `Origin Country` field visible on its Extended Properties tab.

## Required Test Data
- Item property field to update: Origin Country
- Current field name (before update): Origin Country
- Updated field name (after update): Country of Origin
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Miscellaneous → Item Properties

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Miscellaneous**.
4. Click **Item Properties**. The Item Properties configuration screen opens showing the existing field definitions.
5. In the list of defined item property fields, locate the field named `Origin Country`.
6. Open the `Origin Country` field definition for editing using the available controls on the Item Properties screen.
7. Clear the existing field name `Origin Country` and type the updated name: `Country of Origin`
8. Save the updated field definition using the available save control on the Item Properties screen.
9. Reopen the Item Properties screen by navigating back to **Setup → Miscellaneous → Item Properties** and confirm:
   - `Origin Country` no longer appears in the list.
   - `Country of Origin` now appears in the list.
10. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
11. Open Store Manager on `Store001`.
12. In Store Manager, navigate to **Setup → Miscellaneous → Item Properties**.
13. Confirm that `Country of Origin` appears in the Item Properties list and that `Origin Country` no longer appears.

## Expected Results
- The item property field definition in Central Manager is updated: the field name now shows `Country of Origin` instead of `Origin Country`.
- The updated field definition is synchronized to the active target store `Store001`.
- The **Extended Properties** tab on item records in Store Manager on `Store001` now shows `Country of Origin` where `Origin Country` previously appeared.

## Validation Checks
- Verify **field name updated to Country of Origin in Central Manager** in **Central Manager > Setup > Miscellaneous > Item Properties** by reopening the Item Properties screen after saving and confirming `Country of Origin` appears in the list and `Origin Country` no longer appears.
- Verify **updated field definition is synchronized to target store** in **Store001 > Setup > Miscellaneous > Item Properties** by opening the Item Properties configuration screen in Store Manager on `Store001` after synchronization and confirming `Country of Origin` appears in the list and `Origin Country` no longer appears.
- Verify **updated field name appears on item records** in **Store001 > Merchandising > Items > Extended Properties tab** by opening an existing item record in Store Manager on `Store001`, navigating to the **Extended Properties** tab, and confirming the field label shows `Country of Origin` instead of `Origin Country`.

> **Note:** For stores managed by Central Manager, item property fields and their values are set in Central Manager and synchronized to stores. Store Manager users cannot edit item property field values on the Extended Properties tab — values are managed from Central Manager only. Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.
