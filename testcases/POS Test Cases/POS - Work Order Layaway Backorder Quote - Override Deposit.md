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

## Business Entity

Order transaction (work order, layaway, back order, or quote) with overridden deposit amount

## Business Purpose

Allow cashiers to override the default deposit amount for orders (work orders, layaways, back orders, quotes) based on customer needs or store policies, providing flexibility while maintaining deposit requirements for order management.

## Trigger

User creates an order (work order, layaway, back order, or quote) in POS and overrides the default deposit amount or percentage.

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

## Expected Synchronization Behavior

- Insert: Insert the order transaction with overridden deposit amount in Store database and sync/insert the corresponding order record in Central database
- Update: When order is processed/picked up, order status and deposit information are updated in Store and synced to Central
- Delete: Orders are not deleted; if cancelled, status is updated
- Matching key: Order number (unique identifier from Store to Central); Store ID + Order number

## Expected Result in Source System

- Order transaction is created/visible in POS (Store database)
- **Overridden deposit amount is captured** (not default deposit)
- Order details include:
  - Line items and total
  - **Overridden deposit amount** (amount or percentage)
  - Indication that deposit was overridden (if tracked)
  - Balance owing (total - overridden deposit)
- Order appears in Journal (Transaction | Receipt | Journal)
- Order is visible in Store Manager with overridden deposit
- Receipt prints showing:
  - Order total
  - **Overridden deposit amount** (not default)
  - Balance owing
- Deposit payment recorded in batch totals

## Expected Result in Target System

- Order record is created/visible in Central database after sync
- **Overridden deposit amount is preserved** in Central (matches Store)
- Order syncs automatically via Central Client
- Order is available for Central Manager reporting with correct deposit amount
- Deposit override information tracked (if applicable)

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

## Negative / Edge Case Coverage

- **Override to zero deposit:** Cashier overrides deposit to $0 (no deposit); verify order creates with zero deposit and full balance owing
- **Override to full payment:** Cashier overrides deposit to full order amount (100%); verify balance owing is $0
- **Override to amount greater than order total:** If cashier enters deposit > order total, POS should prevent or warn; verify validation
- **Override to negative amount:** POS should prevent negative deposit amounts; verify validation
- **Override to invalid percentage:** If percentage > 100% or < 0%, POS should prevent; verify validation
- **Multiple overrides:** Cashier can override deposit multiple times before tendering; latest override applies; verify only final override is captured
- **Override then change order items:** If cashier overrides deposit, then adds/removes items (order total changes), deposit override may need recalculation; verify POS behavior
- **Override without permission:** If store has permission control for deposit overrides (not documented), verify enforcement
- **Default deposit is zero:** If store configures 0% default deposit, override may still be used to require deposit; verify override works with zero default
- **Override at different order stages:** Verify override works before and during tendering (if accessible from tender screen)
- **Order type differences:** Verify override works for all order types (work orders, layaways, back orders, quotes)
- **POS offline then sync later:** Order with overridden deposit created locally in Store database, then synced to Central when connectivity is restored
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify order with overridden deposit appears in Central after retry
- **Duplicate prevention across repeated sync attempts:** Order sync is idempotent; repeated sync does not create duplicates in Central
- **Override reason tracking:** RMH does not document reason code for deposit override; override is permitted without explanation
- **Consistency Checker:** If order with overridden deposit fails to sync, run Consistency Checker to synchronize missing order records to Central

## Known Issues / Notes

- Video link: https://somup.com/cOefXkWLRY
- Reference: RMH documentation - [POS command reference - Order commands](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/reference-commands.md)
- Reference: RMH documentation - [Creating work orders](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/work-orders-creating.md)
- Reference: RMH documentation - [Setting up work orders](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_UG_Topics/setting-up-work-orders.md)
- **Deposit override methods:** Two methods available:
  1. **Override by Amount:** Specify exact dollar amount (e.g., $150)
  2. **Override by Percentage:** Specify percentage of order total (e.g., 30%)
- **Override access:** Tap **Orders | Order Details | Order Deposit Override** before or during tendering
- **POS commands available:**
  - `Order_OverrideDepositAmounCommand "100"` - Override deposit to $100
  - `Order_OverrideDepositPercentageCommand "10"` - Override deposit to 10% of order total
- **Default deposit configuration:**
  - Work orders: File | Configuration | Ordering rules | Work Order | Deposit
  - Layaways: File | Configuration | Ordering rules | Layaway | Deposit
  - Back orders: File | Configuration | Ordering rules | Back Order | Deposit
  - Quotes: File | Configuration | Ordering rules | Quote | Deposit
- **Deposit override use cases:**
  - **Reduce deposit:** Customer cannot afford default deposit; reduce to accommodate
  - **Increase deposit:** Customer wants to pay more upfront to reduce balance
  - **Waive deposit:** Special customer or situation; override to $0
  - **Full payment:** Customer pays full amount at order creation; override to 100%
- **"Addl. deposit" field:** Displays required deposit amount in order screen; updates when override applied
- **No permission documented:** RMH documentation does not mention specific permission to override deposits; controlled by general order permissions
- **No reason code required:** Deposit override does not require reason code (not documented)
- **Balance owing calculation:** Balance = Order Total - Deposit Paid (using overridden deposit)
- **Receipt display:** Receipt shows actual deposit paid (overridden amount), not default deposit
- **Applies to all order types:** Deposit override works for work orders, layaways, back orders, and quotes
- **Override persistence:** Once overridden, deposit amount is saved with order; does not revert to default
- **Store policy:** Store should establish policy for when deposit overrides are permitted and acceptable ranges
