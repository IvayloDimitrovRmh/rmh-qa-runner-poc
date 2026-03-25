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

# Scenario: Insert New Item Property Field Definitions in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store with Active status exists (e.g., `Store001`) and is able to receive synchronization.
- The user is logged into Central Manager with a role that has permissions to access Setup > Miscellaneous > Item Properties.
- An item record already exists in Central Manager that can be used to verify the Extended Properties tab after setup. Note the item's lookup code for use in the validation steps.
- No item property field named `Origin Country` currently exists in Central Manager. To confirm, navigate to **Central Manager → Setup → Miscellaneous → Item Properties** and verify that `Origin Country` is not listed.

## Required Test Data
- Item property field name: Origin Country
- Item to verify against (for Extended Properties tab validation): any existing item in Central Manager (note the Item Lookup Code before executing)
- Target Store: Store001

## Navigation Path
Central Manager → Setup → Miscellaneous → Item Properties

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Setup**.
3. In the Setup menu, expand **Miscellaneous**.
4. Click **Item Properties**. The Item Properties configuration screen opens.
5. Add a new item property field definition with the name: `Origin Country`
   - Use the available controls on the Item Properties screen to define the new field.
6. Save the configuration using the available save control on the Item Properties screen.
7. Reopen the Item Properties screen by navigating back to **Setup → Miscellaneous → Item Properties** and confirm that `Origin Country` appears in the list of defined item property fields.
8. Allow time for the synchronization cycle to complete between Central Server and `Store001`, or trigger a manual sync if required by your environment.
9. Open Store Manager on `Store001`.
10. In Store Manager, navigate to **Setup → Miscellaneous → Item Properties**.
11. Confirm that `Origin Country` appears in the Item Properties list in Store Manager on `Store001`.

## Expected Results
- The item property field `Origin Country` is saved in Central Manager and appears in the Item Properties configuration list.
- The field definition is synchronized to the active target store `Store001`.
- The `Origin Country` field is available on the **Extended Properties** tab of item records in Store Manager on `Store001`.

## Validation Checks
- Verify **item property field Origin Country exists in Central Manager** in **Central Manager > Setup > Miscellaneous > Item Properties** by reopening the Item Properties screen after saving and confirming `Origin Country` appears in the list of defined fields.
- Verify **item property field is synchronized to target store** in **Store001 > Setup > Miscellaneous > Item Properties** by opening the Item Properties configuration screen in Store Manager on `Store001` after synchronization and confirming `Origin Country` appears in the list.
- Verify **Origin Country field is available on item records** in **Store001 > Merchandising > Items > Extended Properties tab** by opening an existing item record in Store Manager on `Store001`, navigating to the **Extended Properties** tab, and confirming the `Origin Country` field is visible on that tab.

> **Note:** For stores managed by Central Manager, item property fields and their values are set in Central Manager and synchronized to stores. Store Manager users cannot edit item property field values on the Extended Properties tab — values are managed from Central Manager only. Synchronization targets only stores with Active status in the Store table. Actual result has been observed as Pass insert/update in the current implementation.