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

## Business Entity

User authentication / Timecard / Timeclock entry

## Business Purpose

Prevent unauthorized POS access and prevent incorrect labor tracking records by validating user credentials before allowing login.

## Trigger

User attempts to log in with invalid credentials (invalid User ID and/or invalid Password).

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

## Expected Synchronization Behavior

- Insert: No timecard or timeclock entry should be created in POS; no corresponding record should be created in Central
- Update: Not applicable (no login event occurred)
- Delete: Not applicable (no record created)
- Matching key: Not applicable (authentication failed; no record created)

## Expected Result in Source System

- POS displays a validation error message or prompt indicating login failure
- Login is blocked; user is not authenticated
- POS remains on the Login screen
- No timecard entry is created in Store database
- No timeclock entry is created in Store database
- User session is not started

## Expected Result in Target System

- No timecard entry is created in Central database
- No timeclock entry is created in Central database
- No login event is recorded in Central

## Validation Points

- Verify validation/error message is displayed on POS Login screen
- Verify user is not logged into POS (Login screen remains visible)
- Verify no timecard record exists in Store database after the failed login attempt
- Verify no timeclock record exists in Store database after the failed login attempt
- Verify no timecard record exists in Store Manager (Setup | People & Security | Time Clock)
- Verify Central has no newly created corresponding timecard or timeclock record

## Negative / Edge Case Coverage

- **Multiple consecutive failed login attempts:** RMH POS does not have built-in account lockout by default; user can retry login indefinitely (store security policy may require configuration via customization or external system)
- **Invalid User ID + valid password (for different user):** Login fails; no entry created
- **Valid User ID + invalid password:** Login fails; no entry created
- **Blank User ID or blank password:** Login fails; validation error displayed
- **Case sensitivity:** User ID and password validation is case-sensitive; incorrect case causes login failure
- **Sync retry does not create records when nothing should be created:** No sync occurs because no record was created in Store database
- **Cashier override attempt with invalid credentials:** If invalid credentials are entered during cashier override (Operations | Secure | Cashier Override), the override fails and no temporary session is created
- **Time Clock punch with invalid credentials:** If invalid credentials are entered in Time Clock (Operations | Time Clock), the punch is rejected and no punch entry is created

## Known Issues / Notes

- No video link provided in Excel row
- Reference: RMH POS documentation - [Changing your password](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/admin-password.md) (shows Login screen)
- Reference: RMH Store Manager documentation - [Setting up a user](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-user-account.md)
- Starting with release 3.11.7, on the Login screen, if you type your User ID and press Enter, the cursor moves to the Password field (usability improvement to increase login success rate)
- RMH POS does not implement automatic account lockout after multiple failed login attempts by default; security policies requiring lockout must be implemented via customization or external authentication systems
- Failed login attempts are not typically logged to Central for security auditing; consider implementing custom logging if required for compliance
- User accounts are managed in Store Manager (Setup | People & Security | Users) or Central Manager (Setup | People and Security | Store Users for global cashiers)
- Passwords are optional but recommended for user accounts in RMH POS
- Time card entries are created only upon successful login; time clock entries (punch IN/OUT) require explicit action via Operations | Time Clock