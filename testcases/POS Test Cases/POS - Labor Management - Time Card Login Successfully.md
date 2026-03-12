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

## Business Entity

Time card entry

## Business Purpose

Create and synchronize time card entries so employee time tracking is available centrally for reporting and payroll-related processes.

## Trigger

User logs in successfully to POS.

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

## Expected Synchronization Behavior

- Insert: Create a time card entry in POS (Store database) and sync/insert the corresponding time card entry into Central database
- Update: Time card entries can be edited manually in Store Manager (Setup | People & Security | Time Clock) if corrections are needed; changes sync to Central
- Delete: Not applicable (time card entries are typically not deleted, only edited)
- Matching key: Cashier ID (User ID), Login timestamp (date and time)

## Expected Result in Source System

- Login succeeds and POS session starts
- A time card entry is created/visible in Store database with cashier name, login date, and login time
- Time card entry is visible in Store Manager under Setup | People & Security | Time Clock

## Expected Result in Target System

- The time card entry is created/visible in Central database after synchronization
- Time card entry includes cashier name, login date, and login time matching Store data
- Time card data is available for Central Manager reporting (e.g., Cashier Time Clock reports)

## Validation Points

- Verify successful login in POS (POS session starts)
- Verify time card entry exists in Store database after login
- Verify time card entry is visible in Store Manager (Setup | People & Security | Time Clock)
- Verify time card entry exists in Central database after sync
- Verify mapping of cashier name (User Name), Login ID, login date, and login time between Store and Central
- Duplicate prevention: No unintended duplicate time card entries in Central for the same cashier and login timestamp

## Negative / Edge Case Coverage

- POS offline at login: Time card entry created locally in Store database, then synced to Central when connectivity is restored
- Sync failure then retry: Consistency Checker can synchronize time card entries if sync fails (feature available since release 3.50.5)
- Re-login behavior: If cashier logs out and logs back in, a new time card entry should be created (not update existing entry)
- Force logon each sale enabled: If "Force logon each sale" option is enabled (File | Configuration | Store Rules | POS Options), cashier must log in for each transaction; verify each login creates appropriate time card entry or follows configured behavior
- Idle logoff timeout: If POS profile has "Idle logoff timeout" configured (Setup | Hardware | POS Profiles), verify time card handling when cashier is auto-logged out
- Duplicate prevention across repeated sync attempts: Verify sync retry does not create duplicate time card entries in Central
- Global cashier password change: If global cashier (created in Central Manager) changes password, verify login still creates time card entry correctly (password sync feature available since release 3.11.1)

## Known Issues / Notes

- Video link: https://somup.com/cOnl2OWYyN
- Reference: RMH POS documentation - [Setting up a user](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-user-account.md)
- Reference: RMH Store Manager documentation - [Viewing time entries](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_UG_Topics/viewing-employee-time.md)
- Starting with release 3.11.7, on the Login screen, if you type your User ID and press Enter, the cursor automatically moves to the Password field
- Starting with release 3.50.5, the Consistency Checker can synchronize time card entries between Store and Central
- Starting with release 3.50.1, if "Force logon each sale" is enabled and a cashier is logged in, the Cancel button on the Login screen is disabled to prevent accidental POS closure
- Global cashiers (created in Central Manager) have password changes synchronized across all assigned stores (feature available since release 3.11.1)
- Time card entries differ from time clock punch entries; time card is created on login, while time clock requires explicit Punch IN/OUT actions (Operations | Time Clock)