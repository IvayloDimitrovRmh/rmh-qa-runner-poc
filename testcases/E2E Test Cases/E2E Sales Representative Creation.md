# Sales Representative Synchronization

## Metadata
Feature: Sales Representative Synchronization  
Business Area: Setup > People and Security  
Priority: Unknown  
Test Type: Functional / Synchronization  
Automation Candidate: Yes  

---

# Test Case: Create Sales Representative from Central Manager

## Preconditions
- Central Manager and POS are operational.
- Store Group `QA01` exists.
- Item `AutoLCode01` exists in POS.

## Test Steps
1. In **Central Manager**, navigate to **Setup > People and Security > Sales Representatives**.
2. Create a new Sales Representative with:
   - Name
   - ID
   - Fixed Amount
   - Sales %
   - Profit %
3. Assign the Sales Representative to **Store Group QA01**.
4. Save the Sales Representative.
5. Open **POS** and search for item `AutoLCode01`.
6. Open **Actions (F6) > Sales Rep**.
7. Search for the created **Sales Representative ID** and select it.

## Validation Points
- Sales Representative ID matches between Central and POS.
- Sales Representative Name matches the created record.
- Sales Representative can be selected and attached to the item transaction.

---

# Test Case: Create Sales Representative from Store Manager

## Preconditions
- Store Manager and POS are operational.
- Item `AutoLCode01` exists in POS.

## Test Steps
1. In **Store Manager**, navigate to **Setup > People and Security > Sales Representatives**.
2. Create a new Sales Representative with:
   - Name
   - ID Number
   - Fixed Amount
   - Sales %
   - Profit %
3. Save the Sales Representative.
4. Open **POS** and search for item `AutoLCode01`.
5. Open **Actions (F6) > Sales Rep**.
6. Search for the created **Sales Representative ID** and select it.

## Validation Points
- Sales Representative ID matches the created record.
- Sales Representative Name matches the created record.
- Sales Representative can be selected in POS.