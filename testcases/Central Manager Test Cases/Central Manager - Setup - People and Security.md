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

## Business Entity
Store User

## Business Purpose
Ensure that Store Users created or updated in Central Manager synchronize correctly to the selected Store Groups so that authorized personnel can access POS and store systems with consistent permissions.

## Trigger
A user creates or updates a Store User in Central Manager.

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

## Pass Criteria
- Store User appears in the store and can authenticate successfully.

## Fail Criteria
- User missing in store configuration.
- Authentication fails or permissions mismatch.

## Risks / Assumptions
- User authentication systems must be synchronized with POS configuration.

## Known Issues / Notes
- Actual Result observed: Pass insert/update

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

## Business Entity
Store User

## Business Purpose
Ensure that Store Users created or updated in Central Manager synchronize correctly to the selected Store Groups so that authorized personnel can access POS and store systems with consistent permissions.

## Trigger
A user creates or updates a Store User in Central Manager.

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

## Pass Criteria
- Store User appears in the store and can authenticate successfully.

## Fail Criteria
- User missing in store configuration.
- Authentication fails or permissions mismatch.

## Risks / Assumptions
- User authentication systems must be synchronized with POS configuration.

## Known Issues / Notes
- Actual Result observed: Pass insert/update

---

# Scenario: Sales Representative Synchronization to Selected Stores

## Business Entity
Sales Representative

## Business Purpose
Ensure that Sales Representatives configured in Central Manager synchronize correctly to the selected Store Groups so that sales attribution and commission calculations function consistently across stores.

## Trigger
A user creates or updates a Sales Representative in Central Manager.

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

## Pass Criteria
- Sales Representative appears and can be used in POS transactions.

## Fail Criteria
- Representative missing or data mismatch.

## Risks / Assumptions
- Sales representatives may depend on user configuration.

## Known Issues / Notes
- Actual Result observed: Pass insert/update

---

# Scenario: POS User Roles Synchronization to Stores

## Business Entity
POS User Roles

## Business Purpose
Ensure that POS User Roles synchronize correctly to stores so that user permission structures remain consistent across systems.

## Trigger
POS roles are configured or updated in Central Manager.

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

## Pass Criteria
- Roles appear correctly in store configuration.

## Fail Criteria
- Roles missing or permissions incorrect.

## Risks / Assumptions
- Roles synchronize as dependencies of Store Users.

## Known Issues / Notes
- Actual Result observed: Pass insert/update

---

# Scenario: Manager User Roles Synchronization to Stores

## Business Entity
Manager User Roles

## Business Purpose
Ensure that Manager User Roles synchronize correctly so that managerial permissions and access controls remain consistent across the organization.

## Trigger
Manager roles are configured or updated in Central Manager.

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

## Pass Criteria
- Manager roles appear correctly in stores.

## Fail Criteria
- Roles missing or incorrect permissions.

## Risks / Assumptions
- Roles synchronize as dependencies of Store Users.

## Known Issues / Notes
- Actual Result observed: Pass insert/update