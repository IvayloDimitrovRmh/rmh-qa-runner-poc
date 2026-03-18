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

## Validation Points

- Verify Punch IN and Punch OUT exist in POS (Operations | Time Clock)
- Verify Punch IN and Punch OUT exist in Store Manager (Setup | People & Security | Time Clock)
- Verify Punch IN and Punch OUT exist in Central after sync
- Verify mapping of cashier name, date, and time fields between Store and Central
- Verify actual punch times match between POS, Store Manager, and Central
- Duplicate prevention: No duplicate punches in Central for the same cashier and timestamp