# Setup / People and Security

## Metadata
Feature: User and Security Configuration Synchronization  
Business Area: Setup > People and Security  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: Unknown  
Priority: Unknown  

---

# Scenario: Store Users Synchronization to Selected Stores

## Preconditions
- Central and Store synchronization services are active.
- At least one Store Group exists.
- Store belongs to the assigned Store Group.
- User has permission to manage store users.

## Required Test Data
- Login ID
- User Name
- Assigned Roles
- Assigned Store Group

## Navigation Path
Central Manager → Setup → People and Security → Store Users

## Execution Steps
1. Open Central Manager and navigate to Setup → People and Security → Store Users.
2. Create or update a Store User.
3. Assign required user roles.
4. Assign the user to a Store Group.
5. Save the configuration.
6. Allow synchronization to occur.
7. Verify the user appears in the assigned store(s).

## Expected Results
- Store User is inserted or updated in the selected store(s).

## Validation Checks
- User exists in store configuration.
- Login ID and username match Central.
- Assigned roles are applied correctly.

# Setup / People and Security

## Metadata
Feature: User and Security Configuration Synchronization  
Business Area: Setup > People and Security  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: Unknown  
Priority: Unknown  

---

# Scenario: Store Users Synchronization to Selected Stores

## Preconditions
- Central and Store synchronization services are active.
- At least one Store Group exists.
- Store belongs to the assigned Store Group.
- User has permission to manage store users.

## Required Test Data
- Login ID
- User Name
- Assigned Roles
- Assigned Store Group

## Navigation Path
Central Manager → Setup → People and Security → Store Users

## Execution Steps
1. Open Central Manager and navigate to Setup → People and Security → Store Users.
2. Create or update a Store User.
3. Assign required user roles.
4. Assign the user to a Store Group.
5. Save the configuration.
6. Allow synchronization to occur.
7. Verify the user appears in the assigned store(s).

## Expected Results
- Store User is inserted or updated in the selected store(s).

## Validation Checks
- User exists in store configuration.
- Login ID and username match Central.
- Assigned roles are applied correctly.

---

# Scenario: Sales Representative Synchronization to Selected Stores

## Preconditions
- Central and Store synchronization services are active.
- Store belongs to the assigned Store Group.

## Required Test Data
- Sales Representative Name
- Sales Representative ID
- Commission configuration
- Assigned Store Group

## Navigation Path
Central Manager → Setup → People and Security → Sales Representatives

## Execution Steps
1. Open Central Manager and navigate to Setup → People and Security → Sales Representatives.
2. Create or update a Sales Representative.
3. Assign the representative to a Store Group.
4. Save the configuration.
5. Allow synchronization to occur.
6. Verify the representative appears in the assigned store(s).

## Expected Results
- Sales Representative is inserted or updated in the selected store(s).

## Validation Checks
- Sales Representative exists in store configuration.
- Name and ID match Central configuration.

---

# Scenario: POS User Roles Synchronization to Stores

## Preconditions
- Central and Store synchronization services are active.
- Store Users exist since roles synchronize as dependencies.

## Required Test Data
- POS Role Name
- Role Permissions

## Navigation Path
Central Manager → Setup → People and Security → POS User Roles

## Execution Steps
1. Open Central Manager and navigate to POS User Roles.
2. Create or update role permissions.
3. Save configuration.
4. Allow synchronization to occur.
5. Verify roles exist in store configuration.

## Expected Results
- POS roles are inserted or updated in store(s).

## Validation Checks
- Role names and permissions match Central configuration.

---

# Scenario: Manager User Roles Synchronization to Stores

## Preconditions
- Central and Store synchronization services are active.
- Store Users exist since roles synchronize as dependencies.

## Required Test Data
- Manager Role Name
- Role Permissions

## Navigation Path
Central Manager → Setup → People and Security → Manager User Roles

## Execution Steps
1. Open Central Manager and navigate to Manager User Roles.
2. Create or update role configuration.
3. Save configuration.
4. Allow synchronization to occur.
5. Verify roles appear in store configuration.

## Expected Results
- Manager roles are inserted or updated in store(s).

## Validation Checks
- Role names and permissions match Central.