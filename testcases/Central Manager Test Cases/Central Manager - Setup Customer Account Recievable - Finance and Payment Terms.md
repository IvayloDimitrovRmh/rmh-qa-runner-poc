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

# Scenario: Finance Charges Synchronization to Stores

## Business Entity
Finance Charges

## Business Purpose
Ensure that Finance Charge configurations defined in Central Manager synchronize to all active stores so overdue account balances and interest calculations are applied consistently across all store locations.

## Trigger
A user creates or updates Finance Charge configuration in Central Manager.

## Preconditions
- Central and Store synchronization services are operational.
- Active stores exist in the `Store` table.
- User has permission to configure Accounts Receivable settings.

## Required Test Data
- Finance Charge configuration
- Active store records in the Store table

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Finance Charges

## Execution Steps
1. Open Central Manager and navigate to **Setup → Customer → Accounts Receivable → Finance Charges**.
2. Create or modify a Finance Charge configuration.
3. Save the configuration.
4. Allow synchronization to run or trigger synchronization manually.
5. Verify that the Finance Charge configuration is inserted or updated in active store(s).

## Expected Results
- Finance Charge configuration is inserted or updated in store(s).
- Store systems reflect the configuration defined in Central.

## Validation Checks
- Finance Charge configuration exists in store systems.
- Values match those configured in Central.
- No duplicate configuration records are created.

## Pass Criteria
- Finance Charge configuration successfully appears in all active store(s).

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

# Scenario: Payment Terms Synchronization to Stores

## Business Entity
Payment Terms

## Business Purpose
Ensure that Payment Term configurations created or modified in Central Manager synchronize to all active stores so payment schedules and credit conditions remain consistent across store locations.

## Trigger
A user creates or updates Payment Term configuration in Central Manager.

## Preconditions
- Central and Store synchronization services are operational.
- Active stores exist in the `Store` table.
- User has permission to configure Accounts Receivable settings.

## Required Test Data
- Payment Terms configuration
- Active store records in the Store table

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Payment Terms

## Execution Steps
1. Open Central Manager and navigate to **Setup → Customer → Accounts Receivable → Payment Terms**.
2. Create or modify a Payment Terms configuration.
3. Save the configuration.
4. Allow synchronization to run or trigger synchronization manually.
5. Verify that the Payment Terms configuration is inserted or updated in active store(s).

## Expected Results
- Payment Terms configuration is inserted or updated in store(s).
- Store systems reflect the configuration defined in Central.

## Validation Checks
- Payment Terms records exist in store configuration.
- Data matches Central configuration.
- No duplicate configuration records are created.

## Pass Criteria
- Payment Terms configuration successfully appears in all active store(s).

## Fail Criteria
- Configuration does not appear in store(s).
- Data mismatch between Central and Store.
- Synchronization fails.

## Risks / Assumptions
- Synchronization depends on Central-to-Store synchronization services.
- Active stores are determined from the `Store` table.

## Known Issues / Notes
None documented.