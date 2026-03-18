# Inventory/Purchasing / Supplier

## Metadata
Feature: Supplier Insert/Update Synchronization  
Business Area: Inventory/Purchasing  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central → Store (inferred)  
Release: MVP 1.1  
Priority: High  

---

# Scenario: Supplier Insert Synchronization to Selected Stores

## Preconditions
- Central Manager is installed and operational.
- Central Server and Central Client synchronization services are running.
- At least one Store Group exists with one or more stores assigned.
- The test user has a Central Manager role with the Suppliers privilege enabled under Inventory/Purchasing.
- The target store database is accessible and the store is online.

## Required Test Data
- Supplier Name (e.g., Test Supplier Insert)
- Supplier Code or Identifier (if applicable)
- Store Group (an existing group containing the target store(s))

## Navigation Path
Central Manager → Inventory/Purchasing → Suppliers

## Execution Steps
1. Open Central Manager.
2. Click Inventory/Purchasing.
3. Click Suppliers.
4. Click New to create a new supplier.
5. Enter the required supplier information (e.g., Name, Code, Address, Contact).
6. On the Store Groups tab, select the store group that contains the target store(s).
7. Click Save And Close.
8. Wait for the synchronization cycle to complete between Central Server and the target store(s).
9. Open Store Manager on the target store.
10. Navigate to Inventory/Purchasing → Suppliers.
11. Verify that the newly created supplier appears in the supplier list.

## Expected Results
- The supplier created in Central Manager is synchronized and visible in the target store's supplier list.

## Validation Checks
- The supplier record exists in the target store's Suppliers list.
- The supplier information in the store matches the data entered in Central Manager.
- The supplier does not appear in stores that are outside the assigned Store Group.

---

# Scenario: Supplier Update Synchronization to Selected Stores

## Preconditions
- Central Manager is installed and operational.
- Central Server and Central Client synchronization services are running.
- A supplier already exists in Central Manager and has been synchronized to the target store(s).
- The test user has a Central Manager role with the Suppliers privilege enabled under Inventory/Purchasing.
- The target store database is accessible and the store is online.

## Required Test Data
- Existing Supplier Name or Code (e.g., Test Supplier Insert)
- Updated supplier information (e.g., address, contact)
- Store Group (the same group from the insert scenario)

## Navigation Path
Central Manager → Inventory/Purchasing → Suppliers

## Execution Steps
1. Open Central Manager.
2. Click Inventory/Purchasing.
3. Click Suppliers.
4. Select the existing supplier from the list and open it for editing.
5. Update the supplier information as required (e.g., address, contact).
6. Click Save And Close.
7. Wait for the synchronization cycle to complete between Central Server and the target store(s).
8. Open Store Manager on the target store.
9. Navigate to Inventory/Purchasing → Suppliers.
10. Locate the supplier by its Name or Code and verify the updated information.

## Expected Results
- The supplier update made in Central Manager is synchronized and reflected in the target store's supplier list.

## Validation Checks
- The supplier record in the target store shows the updated information.
- The update is reflected only in stores within the assigned Store Group.
- Stores outside the assigned Store Group are unaffected by the update.

---

**Note:**  
There is **no explicit documentation** confirming the supplier sync workflow from Central Manager to stores. This test case is based on the expected business pattern for master data entities. If future RMH documentation confirms or changes this workflow, update the test case accordingly.