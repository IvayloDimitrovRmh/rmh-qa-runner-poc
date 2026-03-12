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

# Scenario: Time Clock > Punch IN - Punch Out

## Business Entity

Time clock entry (Punch IN / Punch OUT)

## Business Purpose

Record employee punches and synchronize them to Central to maintain accurate and centralized time tracking for labor management and payroll reporting.

## Trigger

User performs a Punch IN or Punch OUT action in POS Time Clock.

## Preconditions

- A valid POS user (cashier) exists in the system
- User has valid User ID and Password credentials
- User is able to access Time Clock function in POS (Operations | Time Clock)
- Manager has Time Clock privilege enabled in Store Manager (Setup | People & Security | Manager User Roles)
- Store is in online mode with connectivity to Central database for synchronization

## Action

**To Punch IN:**
1. Tap **Operations | Time Clock** in POS
2. Enter your User ID and Password and press Enter
3. Tap **Punch In**
4. The system automatically records the start time

**To Punch OUT:**
1. Tap **Operations | Time Clock** in POS
2. Enter your User ID and Password and press Enter
3. Tap **Punch Out**
4. The system automatically records the end time

## Expected Synchronization Behavior

- Insert: Punch IN and Punch OUT entries created in POS Store database should sync and be inserted into Central database
- Update: Time entries can be manually edited in Store Manager (Setup | People & Security | Time Clock) and changes sync to Central
- Delete: Not applicable (time entries are typically not deleted, only edited)
- Matching key: Cashier ID, Punch timestamp (date and time)

## Expected Result in Source System

- Punch IN is recorded/visible in POS with cashier name, date, and time
- Punch OUT is recorded/visible in POS with cashier name, date, and time
- Time entries are visible in Store Manager under Setup | People & Security | Time Clock
- Cashier Time Clock reports show actual punch in/out times

## Expected Result in Target System

- Punch IN is recorded/visible in Central database after sync
- Punch OUT is recorded/visible in Central database after sync
- Time clock entries are available for Central Manager reporting
- Cashier Time Clock reports in Central show actual punch in/out times matching Store data

## Validation Points

- Verify Punch IN and Punch OUT exist in POS (Operations | Time Clock)
- Verify Punch IN and Punch OUT exist in Store Manager (Setup | People & Security | Time Clock)
- Verify Punch IN and Punch OUT exist in Central after sync
- Verify mapping of cashier name, date, and time fields between Store and Central
- Verify actual punch times match between POS, Store Manager, and Central
- Duplicate prevention: No duplicate punches in Central for the same cashier and timestamp

## Negative / Edge Case Coverage

- Punch OUT without a prior Punch IN: System behavior per RMH configuration (may allow or prompt for missing Punch IN)
- Punch IN exists but Punch OUT missing (partial shift): Manager can manually add Punch OUT in Store Manager
- Forgotten Punch OUT: Manager can edit time entry in Store Manager to add missing Punch OUT time
- Offline punches then later sync: Time entries created locally in Store database sync to Central when connectivity is restored
- Sync retry behavior and idempotency: Consistency Checker can synchronize time clock and time card entries if sync fails (available since release 3.50.5)
- Rapid consecutive punches: System should record each punch with timestamp to prevent duplicates
- Multiple Punch IN without Punch OUT: Handling depends on store policy and RMH configuration

## Known Issues / Notes

- Video link: https://somup.com/cOnl2yWY4E
- Reference: RMH POS documentation - [Entering your work hours](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/admin-time-clock.md)
- Reference: RMH Store Manager documentation - [Adding or editing time entries](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_UG_Topics/adding-editing-time-entries.md)
- Starting with release 3.10.3, Cashier Time Clock reports show actual punch in/out times
- Starting with release 3.50.5, the Consistency Checker can synchronize time clock and time card entries between Store and Central
- Managers can manually add or edit time entries in Store Manager if cashiers forget to punch in or out