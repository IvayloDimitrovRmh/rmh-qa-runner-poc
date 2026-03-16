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

# Scenario: Accounting Defaults Synchronization to Stores

## Preconditions
- Central and Store synchronization services are operational.
- Active stores exist in the `Store` table.
- User has permission to configure Accounts Receivable settings.

## Required Test Data
- Accounting Default configuration
- Active store records in the Store table

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Accounting Defaults

## Execution Steps
1. Open Central Manager and navigate to **Setup → Customer → Accounts Receivable → Accounting Defaults**.
2. Create or modify Accounting Default configuration.
3. Save the configuration.
4. Allow synchronization to run or trigger synchronization manually.
5. Verify that the Accounting Default configuration is inserted or updated in active store(s).

## Expected Results
- Accounting Default configuration is inserted or updated in store(s).
- Store systems reflect the accounting configuration defined in Central.

## Validation Checks
- Accounting Default records exist in store configuration.
- Data values match those defined in Central.
- No duplicate configuration records are created.

---

# Scenario: Email Message Synchronization to Stores

## Preconditions
- Central and Store synchronization services are operational.
- Active stores exist in the `Store` table.
- User has permission to configure Accounts Receivable settings.

## Required Test Data
- Email Message template configuration
- Active store records in the Store table

## Navigation Path
Central Manager → Setup → Customer → Accounts Receivable → Email Message

## Execution Steps
1. Open Central Manager and navigate to **Setup → Customer → Accounts Receivable → Email Message**.
2. Create or modify an Email Message template.
3. Save the configuration.
4. Allow synchronization to run or manually trigger synchronization.
5. Verify that the Email Message configuration is inserted or updated in active store(s).

## Expected Results
- Email Message configuration is inserted or updated in store(s).
- Store systems reflect the configuration defined in Central.

## Validation Checks
- Email Message records exist in store configuration.
- Data values match those defined in Central.
- No duplicate configuration records are created.