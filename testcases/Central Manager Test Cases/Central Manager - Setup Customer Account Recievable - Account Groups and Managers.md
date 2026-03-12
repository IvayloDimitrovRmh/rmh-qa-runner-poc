# Accounts Receivable Configuration Synchronization

## Metadata
Feature: Accounts Receivable Configuration Synchronization  
Business Area: Setup > Customer > Accounts Receivable  
Source System: Central  
Target System: Store(s)  
Sync Direction: Central -> Store  
Release: MVP V2  
Priority: Unknown  

---

# Scenario: Account Groups Synchronization to Stores

## Business Entity
Account Groups

## Business Purpose
Ensure that Account Group configurations defined in Central are synchronized to all active stores so accounts receivable transactions use consistent account grouping rules across locations.

## Trigger
A user creates or updates an Account Group configuration in Central Manager.

## Preconditions
- Central and Store synchronization services are operational.
- Active stores exist in the `Store` table.
- User has permission to modify Accounts Receivable configuration.

## Required Test Data
- Account Group configuration
- Active store records in the Store table

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Account Groups

## Execution Steps
1. Open Central Manager and navigate to **Setup → Customer → Accounts Receivable → Account Groups**.
2. Create or modify an Account Group configuration.
3. Save the configuration.
4. Allow synchronization to run or trigger synchronization manually.
5. Verify that the Account Group configuration is inserted or updated in active store(s).

## Expected Results
- Account Group configuration is inserted or updated in store(s).
- Store systems reflect the configuration defined in Central.

## Validation Checks
- Account Group records exist in the store configuration.
- Data values match those configured in Central.
- No duplicate configuration records are created.

## Pass Criteria
- Account Group configuration successfully appears in all active store(s).

## Fail Criteria
- Configuration does not appear in store(s).
- Data mismatch between Central and Store.
- Synchronization fails.

## Risks / Assumptions
- Synchronization depends on active Central-to-Store synchronization services.
- Active stores are determined from the `Store` table.

## Known Issues / Notes
None documented.

---

# Scenario: Account Managers Synchronization to Stores

## Business Entity
Account Managers

## Business Purpose
Ensure that Account Manager configurations defined in Central are synchronized to all active stores so receivable account management and responsibility assignments remain consistent across the organization.

## Trigger
A user creates or updates an Account Manager configuration in Central Manager.

## Preconditions
- Central and Store synchronization services are active.
- Active stores exist in the `Store` table.
- User has permission to modify Accounts Receivable configuration.

## Required Test Data
- Account Manager configuration
- Active store records

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Account Managers

## Execution Steps
1. Open Central Manager and navigate to **Setup → Customer → Accounts Receivable → Account Managers**.
2. Create or modify an Account Manager record.
3. Save the configuration.
4. Allow synchronization to run or trigger synchronization manually.
5. Verify that the Account Manager configuration is inserted or updated in active store(s).

## Expected Results
- Account Manager configuration is inserted or updated in store(s).
- Store systems reflect the configuration defined in Central.

## Validation Checks
- Account Manager records exist in store configuration.
- Data matches Central configuration.
- No duplicate configuration records are created.

## Pass Criteria
- Account Manager configuration successfully appears in all active store(s).

## Fail Criteria
- Configuration does not appear in store(s).
- Data mismatch between Central and Store.
- Synchronization fails.

## Risks / Assumptions
- Synchronization relies on Central-to-Store synchronization services.
- Active stores are identified from the `Store` table.

## Known Issues / Notes
None documented.