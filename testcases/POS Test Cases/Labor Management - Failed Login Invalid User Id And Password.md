# Login and Time Card entries

## Metadata

Feature: Login and Time Card entries  
Business Area: Labor Management / Time & Attendance  
Source System: POS  
Target System: Central  
Sync Direction: Store -> Central (N/A for failed login - no data created)  
Release: TBD  
Priority: 1

---

# Scenario: Failed Login (Invalid User ID and Password)

## Preconditions

- POS is available and displaying the Login screen
- User enters an invalid User ID and/or password (user does not exist in the system, or password is incorrect)
- No connectivity requirement (authentication is local to POS/Store database)

## Action

**Attempt to log in to POS with invalid credentials:**
1. POS displays the Login screen
2. Enter an invalid User ID in the User ID field
3. Press Enter (cursor moves to the Password field)
4. Enter an invalid password in the Password field
5. Tap Login or press Enter
6. POS validates credentials against Store database

## Validation Points

- Verify validation/error message is displayed on POS Login screen
- Verify user is not logged into POS (Login screen remains visible)
- Verify no timecard record exists in Store database after the failed login attempt
- Verify no timeclock record exists in Store database after the failed login attempt
- Verify no timecard record exists in Store Manager (Setup | People & Security | Time Clock)
- Verify Central has no newly created corresponding timecard or timeclock record