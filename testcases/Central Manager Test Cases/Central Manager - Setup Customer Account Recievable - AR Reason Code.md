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

# Scenario: AR Reason Codes Synchronization to Stores

## Business Entity
AR Reason Codes

## Business Purpose
Ensure that Accounts Receivable Reason Codes configured in Central Manager synchronize to all active stores so that financial adjustments, write-offs, and account transaction reasons remain consistent across all store locations.

## Trigger
A user creates or updates an AR Reason Code in Central Manager.

## Preconditions
- Central and Store synchronization services are active.
- Active stores exist in the `Store` table.
- User has permission to configure Accounts Receivable settings.

## Required Test Data
- AR Reason Code configuration
- Active store records in the Store table

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → AR Reason Codes

## Execution Steps
1. Open Central Manager and navigate to **Setup → Customer → Accounts Receivable → AR Reason Codes**.
2. Create a new AR Reason Code or modify an existing one.
3. Save the configuration.
4. Allow synchronization to run or manually trigger synchronization.
5. Verify that the AR Reason Code configuration is inserted or updated in active store(s).

## Expected Results
- AR Reason Code configuration is inserted or updated in store(s).
- Store systems reflect the same configuration defined in Central.

## Validation Checks
- AR Reason Code records exist in store configuration.
- Data values match those defined in Central.
- No duplicate configuration records are created.

## Pass Criteria
- AR Reason Code configuration successfully appears in all active store(s).

## Fail Criteria
- Configuration does not appear in store(s).
- Data mismatch between Central and Store.
- Synchronization fails or does not execute.

## Risks / Assumptions
- Synchronization relies on active Central-to-Store synchronization services.
- Active stores are determined from the `Store` table.

## Known Issues / Notes
None documented.