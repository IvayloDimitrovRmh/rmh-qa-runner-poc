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

## Validation Points

- Verify sale transaction exists in Store database
- Verify sale transaction exists in Central database after sync
- Verify both tender components are represented in Central with correct amounts
- Verify tender type codes match between Store and Central (e.g., CA for Cash, VI for Visa)
- Verify transaction total equals sum of tender amounts in both Store and Central
- Mapping validation: Tender type descriptions and codes map correctly from Store to Central
- Duplicate prevention: No duplicate transaction records created in Central for the same transaction