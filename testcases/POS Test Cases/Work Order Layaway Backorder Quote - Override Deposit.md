# Work Order/Layaway/BackOrder/Quote

## Metadata

Feature: Work Order/Layaway/BackOrder/Quote  
Business Area: Work Order/Layaway/BackOrder/Quote  
Source System: POS  
Target System: Central  
Sync Direction: Store -> Central  
Release: TBD  
Priority: 5

---

# Scenario: Override Deposit

## Preconditions

- POS is operational and cashier is logged in
- Order type is in progress (work order, layaway, back order, or quote mode)
- Default deposit configuration exists in Store Manager:
  - **Work orders:** File | Configuration | Ordering rules | Work Order | Deposit (percentage)
  - **Layaways:** File | Configuration | Ordering rules | Layaway | Deposit (percentage)
  - **Back orders:** File | Configuration | Ordering rules | Back Order | Deposit (percentage)
  - **Quotes:** File | Configuration | Ordering rules | Quote | Deposit (percentage)
- Items have been added to the order
- Default deposit amount calculated and displayed in "Addl. deposit" field
- User has permission to override deposits (no specific deposit override permission documented; controlled by general POS order permissions)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Override deposit amount for an order:**

**Method 1: Override deposit amount (dollar amount)**
1. Create order (work order, layaway, back order, or quote):
   - Tap **Orders | Work Order** (or Layaway, Back Order, Quote)
   - (Optional) Select customer
   - Add items to order
2. **POS displays default deposit** in "Addl. deposit" field:
   - Calculated as configured percentage of order total
   - Example: 20% deposit on $500 order = $100 default deposit
3. Before tendering, tap **Orders | Order Details | Order Deposit Override**
4. On the deposit override screen, select **Override by Amount**
5. Enter **new deposit amount** (dollar amount):
   - Example: Enter $150 instead of default $100
   - Can enter amount greater than or less than default
   - Can enter $0 (no deposit) if store policy allows
   - Can enter full order amount (full payment)
6. Tap **OK** to confirm override
7. **POS updates "Addl. deposit" field** with new amount
8. Proceed with tendering:
   - Tap **Transaction | Tender Sale** or press **F12**
   - Enter overridden deposit amount next to tender type
   - Tap **OK**
9. Receipt prints showing overridden deposit amount

**Method 2: Override deposit percentage**
1. Create order and add items (same as Method 1)
2. Before tendering, tap **Orders | Order Details | Order Deposit Override**
3. On the deposit override screen, select **Override by Percentage**
4. Enter **new deposit percentage**:
   - Example: Enter 30% instead of default 20%
   - Can enter percentage greater than or less than default
   - Can enter 0% (no deposit) if store policy allows
   - Can enter 100% (full payment)
5. Tap **OK** to confirm override
6. **POS recalculates deposit amount** based on new percentage:
   - Example: 30% of $500 = $150
   - "Addl. deposit" field updates
7. Proceed with tendering

**Method 3: Using POS commands (advanced)**
- **Override by amount:** Use command `Order_OverrideDepositAmounCommand "100"` (overrides deposit to $100)
- **Override by percentage:** Use command `Order_OverrideDepositPercentageCommand "10"` (overrides deposit to 10% of order total)

**Method 4: Override at tender screen (alternate)**
1. Create order and add items
2. Tap **Transaction | Tender Sale** or press **F12**
3. Tap **Orders | Order Details | Order Deposit Override** from tender screen
4. Follow steps above to override by amount or percentage
5. Return to tender screen with updated deposit amount

## Validation Points

- Verify default deposit calculated correctly before override
- Verify deposit override screen accessible (Orders | Order Details | Order Deposit Override)
- Verify override by amount: New amount replaces default
- Verify override by percentage: POS recalculates deposit based on new percentage
- Verify "Addl. deposit" field updates with overridden amount
- Verify order exists in POS with overridden deposit
- Verify order exists in Store Manager with overridden deposit
- Verify order exists in Central after sync
- Verify **overridden deposit amount matches** between POS, Store Manager, and Central
- Verify balance owing calculated correctly (total - overridden deposit)
- Verify receipt shows overridden deposit amount
- Mapping validation: Overridden deposit amount maps correctly from Store to Central
- Duplicate prevention: No duplicate order in Central for the same order number