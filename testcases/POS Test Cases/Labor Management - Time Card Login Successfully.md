# Login and Time Card entries

## Metadata

Feature: Login and Time Card entries  
Business Area: Labor Management / Time & Attendance  
Source System: POS  
Target System: Central  
Sync Direction: Store -> Central  
Release: TBD  
Priority: 1

---

# Scenario: Time Card > Login Successfully

## Preconditions

- A valid POS user (cashier) exists in the system with valid User ID and Password
- User has a POS Role assigned (Setup | People & Security | Users)
- User can successfully authenticate in POS using Login ID and Password
- Store is in online mode with connectivity to Central database for synchronization

## Action

**To log in successfully into POS:**
1. POS displays the Login screen
2. Enter your User ID (Login ID) in the User ID field
3. Press Enter (cursor moves to the Password field - feature available since release 3.11.7)
4. Enter your Password in the Password field
5. Tap Login or press Enter
6. POS creates a time card entry upon successful login

## Validation Points

- Verify successful login in POS (POS session starts)
- Verify time card entry exists in Store database after login
- Verify time card entry is visible in Store Manager (Setup | People & Security | Time Clock)
- Verify time card entry exists in Central database after sync
- Verify mapping of cashier name (User Name), Login ID, login date, and login time between Store and Central
- Duplicate prevention: No unintended duplicate time card entries in Central for the same cashier and login timestamp