# Customer / Ship-To Information

## Metadata
Feature: Customer Ship-To Update Synchronization  
Business Area: Customer Management  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central → Store (unconfirmed, see note)  
Release: MVP 1.1  
Priority: High  

---

# Scenario: Customer Ship-To Update Synchronization to Store

## Preconditions
- Central Manager is installed and operational.
- Central Server and Central Client synchronization services are running.
- The test user has a Central Manager role with the Customer privilege enabled.
- The customer record exists in both Central Manager and the target store.
- The target store database is accessible and the store is online.

## Required Test Data
- Customer record in Central Manager (with unique identifier, e.g., Customer ID)
- Updated Ship-To information (e.g., address, city, state, postal code, country)
- Store where the customer record exists

## Navigation Path
Central Manager → Customers → Edit Customer → Ship-To tab

## Execution Steps
1. Open Central Manager.
2. Navigate to Customers.
3. Locate and open the existing customer record.
4. Go to the Ship-To tab.
5. Edit the Ship-To information as required (e.g., update address, city, state, postal code, country).
6. Save the changes.
7. In the target store, open POS.
8. Tap Customers → Lookup Customer.
9. Enter the customer's name or identifier and tap Lookup Online.
10. Select the customer record from the search results and tap Select.
11. Confirm that the updated Ship-To information is now present in the store's database.

## Expected Results
- The updated Ship-To information from Central Manager is available in the store after performing POS Lookup Online.  
  **Note:** This behavior is not confirmed in documentation.

## Validation Checks
- The customer record in the store reflects the updated Ship-To information from Central Manager.
- The update is only present in stores where POS Lookup Online was performed.
- The customer record remains unchanged in stores where Lookup Online was not performed.

---

**Note:**  
There is **no explicit documentation** confirming that Ship-To changes made in Central Manager are synchronized to stores, even via POS Lookup Online. This test case is based on the expected business intent, but actual system behavior may differ. If future RMH releases support this workflow, update the test case accordingly.