# Transactions

## Metadata

Feature: Transactions  
Business Area: Transactions  
Source System: POS  
Target System: Central  
Sync Direction: Store -> Central  
Release: TBD  
Priority: 2

---

# Scenario: Sale by Splitting payment between two tender types

## Business Entity

Sale transaction (split tender)

## Business Purpose

Record a customer sale paid using two different tender types (e.g., cash and credit card) and ensure the complete tender breakdown is available in Central for reconciliation and reporting.

## Trigger

A cashier completes a sale and splits payment between two tender types.

## Preconditions

- POS is operational
- Items are added to the transaction
- At least two tender types are configured in Setup > Financial > Tender Types and assigned to the store group
- Store is in online mode with connectivity to Central database for synchronization

## Action

1. Tap **Transaction | Tender Sale** or press **F12** or **Enter**
2. On the Tender screen, enter the tender amount next to the first tender type (e.g., $50.00 for Cash)
3. Enter the tender amount next to the second tender type (e.g., $30.00 for Credit Card)
4. Tap **OK**
5. Complete payment processing for each tender type as required
6. Print receipt if requested

## Expected Synchronization Behavior

- Insert: Insert the sale transaction in Store database and sync/insert the corresponding transaction in Central database, including all tender line items (both tender types with amounts)
- Update: Not applicable for new sale transactions
- Delete: Not applicable for completed sales
- Matching key: Transaction number/ID from Store to Central

## Expected Result in Source System

- Sale transaction is created and visible in POS (Store database)
- Payment is recorded as split between two tender types with correct amounts for each tender type
- Transaction total matches the sum of both tender amounts
- Receipt displays both tender types and amounts

## Expected Result in Target System

- Sale transaction is created and visible in Central after sync
- Split tender breakdown is present in Central showing both tender types and amounts
- Transaction total in Central matches Store total
- Tender line-item details are preserved (tender type codes, descriptions, and amounts)

## Validation Points

- Verify sale transaction exists in Store database
- Verify sale transaction exists in Central database after sync
- Verify both tender components are represented in Central with correct amounts
- Verify tender type codes match between Store and Central (e.g., CA for Cash, VI for Visa)
- Verify transaction total equals sum of tender amounts in both Store and Central
- Mapping validation: Tender type descriptions and codes map correctly from Store to Central
- Duplicate prevention: No duplicate transaction records created in Central for the same transaction

## Negative / Edge Case Coverage

- POS offline at time of sale: Transaction created locally in Store, then synced to Central when connectivity is restored
- Sync failure then retry: Transaction sync retries automatically; verify no duplicate transactions created
- Split tender with amounts not summing to transaction total: POS should prevent completion until amounts match total
- Partial tender failure: Second tender payment declined (e.g., credit card declined); cashier must select alternative tender type
- Void/refund of split-tender transaction: Both tender types should be voided/refunded proportionally or per store policy
- More than two tender types: Verify POS supports and syncs all tender line items (not just two)
- Sequential tendering mode: If enabled, verify each tender is processed and confirmed before moving to next tender type

## Known Issues / Notes

- Video link: https://somup.com/cOnDD01WOvi
- Reference: RMH POS documentation - [Tendering a sale](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/transactions-tendering-sale.md)
- RMH POS allows accepting more than one tender type per transaction; customers may split payment using combinations such as cash and credit card
- Tender types must be set up in Central Manager or Store Manager under Setup > Financial > Tender Types
- Sequential tendering (if enabled) processes each tender type separately with individual confirmations before moving to the next tender