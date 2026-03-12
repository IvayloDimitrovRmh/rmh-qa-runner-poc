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

# Scenario: Statement Types Synchronization to Stores

## Business Entity
Statement Types

## Business Purpose
Ensure that Statement Type configurations defined in Central Manager synchronize to all active stores so customer account statements are generated using consistent formats and rules across all store locations.

## Trigger
A user creates or updates a Statement Type configuration in Central Manager.

## Preconditions
- Central and Store synchronization services are active.
- Active stores exist in the `Store` table.
- User has permission to configure Accounts Receivable settings.

## Required Test Data
- Statement Type configuration
- Active store records in the Store table

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Statement Types

## Execution Steps
1. Open Central Manager and navigate to **Setup → Customer → Accounts Receivable → Statement Types**.
2. Create a new Statement Type or modify an existing one.
3. Save the configuration.
4. Allow synchronization to run or trigger synchronization manually.
5. Verify that the Statement Type configuration is inserted or updated in active store(s).

## Expected Results
- Statement Type configuration is inserted or updated in store(s).
- Store systems reflect the configuration defined in Central.

## Validation Checks
- Statement Type records exist in store configuration.
- Data values match those defined in Central.
- No duplicate configuration records are created.

## Pass Criteria
- Statement Type configuration successfully appears in all active store(s).

## Fail Criteria
- Configuration does not appear in store(s).
- Data mismatch between Central and Store.
- Synchronization fails.

## Risks / Assumptions
- Synchronization relies on Central-to-Store synchronization services.
- Active stores are determined from the `Store` table.

## Known Issues / Notes
None documented.

---

# Scenario: Number Series Synchronization to Stores

## Business Entity
Number Series

## Business Purpose
Ensure that Number Series configurations defined in Central Manager synchronize to all active stores so document numbering (such as invoices, credit notes, and AR transactions) remains consistent across the system.

## Trigger
A user creates or updates a Number Series configuration in Central Manager.

## Preconditions
- Central and Store synchronization services are active.
- Active stores exist in the `Store` table.
- User has permission to configure Accounts Receivable settings.

## Required Test Data
- Number Series configuration
- Active store records in the Store table

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Number Series

## Execution Steps
1. Open Central Manager and navigate to **Setup → Customer → Accounts Receivable → Number Series**.
2. Create or modify a Number Series configuration.
3. Save the configuration.
4. Allow synchronization to run or manually trigger synchronization.
5. Verify that the Number Series configuration is inserted or updated in active store(s).

## Expected Results
- Number Series configuration is inserted or updated in store(s).
- Store systems reflect the configuration defined in Central.

## Validation Checks
- Number Series records exist in store configuration.
- Data matches Central configuration.
- No duplicate configuration records are created.

## Pass Criteria
- Number Series configuration successfully appears in all active store(s).

## Fail Criteria
- Configuration does not appear in store(s).
- Data mismatch between Central and Store.
- Synchronization fails.

## Risks / Assumptions
- Synchronization depends on Central-to-Store synchronization services.
- Active stores are determined from the `Store` table.

## Known Issues / Notes
None documented.