# Cashier User Synchronization

## Metadata
Feature: User Synchronization  
Business Area: Setup > People and Security  
Priority: Unknown  
Test Type: Functional / Synchronization  
Automation Candidate: Yes  

---

# Test Case: Create Cashier from Central Manager

## Preconditions
- Central Manager and POS are operational.
- Store Group `QA01` exists.
- Manager Role `AutoCashierCentralName` exists.
- POS User Roles are configured.

## Test Steps
1. In **Central Manager**, navigate to **Setup > People and Security > Store Users**.
2. Create a new user with:
   - Login ID
   - User Name
   - Telephone
   - Manager Role `AutoCashierCentralName`
   - All **POS User Roles** set to Allowed.
3. Assign the user to **Store Group QA01**.
4. Save the user.
5. Open **POS** and log in using the newly created user credentials.

## Validation Points
- Login ID and User Name are consistent across systems.
- POS login authentication succeeds.
- Assigned POS roles allow access.

---

# Test Case: Create Cashier from Store Manager

## Preconditions
- Store Manager and POS are operational.
- Manager Role `AutoCashierName` exists.
- POS User Roles are configured.

## Test Steps
1. In **Store Manager**, navigate to **Setup > People and Security > Users**.
2. Create a new user with:
   - Login ID
   - User Name
   - Telephone
   - Manager Role `AutoCashierName`
   - All **POS User Roles** set to Allowed.
3. Save the user.
4. Open **POS** and log in using the newly created user credentials.

## Validation Points
- Login ID and User Name are correctly saved.
- POS login authentication succeeds.
- POS roles grant appropriate permissions.