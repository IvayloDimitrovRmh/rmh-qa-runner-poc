# Customer / Edit Customer

## Metadata
Feature: Customer Update Synchronization  
Business Area: Customer Management  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central → Store (via POS Lookup Online)  
Release: MVP 1.1  
Priority: High  

---

# Scenario: Customer Update Synchronization to Store via POS Lookup Online

## Preconditions
- Central Manager is installed and operational.
- Central Server and Central Client synchronization services are running.
- The test user has a Central Manager role with the Customer privilege enabled.
- The customer record exists in both Central Manager and the target store.
- The target store database is accessible and the store is online.

## Required Test Data
- Customer record in Central Manager (with unique identifier, e.g., Customer ID)
- Updated customer information (e.g., address, phone, email)
- Store where the customer record exists

## Navigation Path
Central Manager → Customers → Edit Customer

## Execution Steps
1. Open Central Manager.
2. Navigate to Customers.
3. Locate and open the existing customer record.
4. Edit the customer information as required (e.g., update address, phone, or email).
5. Save the changes.
6. In the target store, open POS.
7. Tap Customers → Lookup Customer.
8. Enter the customer's name or identifier and tap Lookup Online.
9. Select the customer record from the search results and tap Select.
10. Confirm that the updated customer information is now present in the store's database.

## Expected Results
- The updated customer information from Central Manager is available in the store after performing POS Lookup Online.

## Validation Checks
- The customer record in the store reflects the updated information from Central Manager.
- The update is only present in stores where POS Lookup Online was performed.
- The customer record remains unchanged in stores where Lookup Online was not performed.

---

**Note:**  
Automatic synchronization of customer updates from Central Manager to stores is **not confirmed in documentation**. The only documented method for updating customer records in stores from Central is via POS Lookup Online. If future RMH releases support automatic customer update sync, this test case should be updated accordingly.