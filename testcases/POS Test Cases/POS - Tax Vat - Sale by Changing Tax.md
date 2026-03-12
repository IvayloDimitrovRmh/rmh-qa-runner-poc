# TAX/VAT

## Metadata

Feature: TAX/VAT  
Business Area: TAX/VAT  
Source System: POS  
Target System: Central  
Sync Direction: Store -> Central  
Release: TBD  
Priority: 8

---

# Scenario: Sale by changing TAX

## Business Entity

Sale transaction (with tax change/modification)

## Business Purpose

Process sales where the cashier changes or modifies the tax schedule during the transaction (e.g., changing from local tax to out-of-state tax, or applying different tax rate) and ensure the transaction with modified tax calculation is synchronized to Central for accurate reporting and compliance.

## Trigger

User completes a sale in POS where tax is changed/modified from the default tax schedule for specific items or the entire transaction.

## Preconditions

- POS is operational and cashier is logged in
- Items are available to sell and have been added to transaction
- Tax schedules are configured in Store Manager (File | Configuration | Sales Tax)
- Items have default tax schedule assigned (Item | General tab | Item tax field)
- User has permission to change tax: **"Allowed to change tax status"** permission enabled (Setup | People & Security | Users | General tab | POS User Roles)
- Reason codes for tax changes may be configured (optional, set in Store Manager under File | Configuration | Store Rules | Reason Code Options)
- Multiple tax schedules are available (e.g., local tax, out-of-state tax, international tax, etc.)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Complete a sale in POS by changing tax for specific items or entire transaction:**

**Scenario A: Changing tax for specific item**
1. Add items to transaction (scan or enter Item Lookup Codes)
2. Items display with default tax schedule applied
3. Select item to change tax:
   - Tap the item once to select it
4. Do one of the following to access tax change:
   - Tap **Action** button beside the item, then on Item Action screen tap **Tax**
   - Tap **Taxes | Current Item Tax | Set Current Item Tax**
   - **Note:** If "Do not allow to access the Action button" is selected in user profile, Action button method is not available
5. On the Select Tax screen, **select the new tax schedule** that applies to the item:
   - Example: Change from "Local Tax 8%" to "Out of State Tax 5%"
   - Different tax schedules may be available depending on configuration
6. If prompted for reason code, on the Select Reason Code screen, select appropriate reason (e.g., "Shipping to another tax jurisdiction", "International customer") and tap **OK**
   - **Note:** Reason codes are optional and may not be configured for your store
7. If reason code selected, it displays below the item description
8. Tax is changed for the selected item:
   - Item shows new tax schedule
   - Transaction tax total recalculates
9. Repeat for additional items if needed
10. Tap **Transaction | Tender Sale** or press **F12**
11. On the Tender screen, verify tax amount reflects changed tax schedule
12. Enter payment amount and complete tender
13. Receipt prints showing items with modified tax

**Scenario B: Changing tax for entire transaction**
1. Add all items to transaction
2. Items display with default tax schedules applied
3. Tap **Taxes | Transaction Tax | Set Transaction Tax**
4. On the Select Tax screen, **select the new tax schedule** that applies to entire transaction:
   - Example: Change entire transaction from "Local Tax 8%" to "Wholesale Tax 0%"
5. If prompted for reason code, select appropriate reason and tap **OK**
6. If reason code selected, it displays below transaction details
7. Tax is changed for **all items** in transaction:
   - All items now use new tax schedule
   - Transaction tax total recalculates
8. Tap **Transaction | Tender Sale** or press **F12**
9. On the Tender screen, verify tax amount reflects changed tax schedule
10. Enter payment amount and complete tender
11. Receipt prints showing modified tax for entire transaction

## Expected Synchronization Behavior

- Insert: Insert the sale transaction in Store database and sync/insert the corresponding transaction in Central database
- Update: Not applicable (sale creates new transaction; not updated)
- Delete: Not applicable (sales are not deleted; voids create reversing transactions)
- Matching key: Transaction number (unique identifier from Store to Central); Store ID + Transaction number

## Expected Result in Source System

- Sale transaction is created/visible in POS (Store database)
- **Modified tax schedule is applied** and visible:
  - Item(s) show changed tax schedule (not default tax)
  - Tax amount calculated using modified tax schedule
  - Reason code (if provided) displays below item or transaction
- Transaction appears in Journal (Transaction | Receipt | Journal) with modified tax details
- Transaction is visible in Store Manager (Journal | Transactions) showing:
  - Line items with tax schedules
  - Modified tax information
  - Reason code (if provided)
- Receipt shows:
  - Items with quantities
  - Tax breakdown (may show which tax schedule was applied)
  - Total amount
  - Reason code (if configured in receipt template)
- Inventory is adjusted (items subtracted from on-hand quantity)
- Tender amounts are recorded (customer pays total including modified tax)

## Expected Result in Target System

- Sale transaction is created/visible in Central database after sync
- **Modified tax details are reflected in Central:**
  - Transaction includes tax schedule changes
  - Tax amount calculated using modified tax schedule
  - Reason code preserved
- Transaction syncs automatically via Central Client
- Transaction is available for Central Manager reporting
- Tax compliance reports show transaction with correct tax schedule (not default)
- Tax remittance reports use modified tax amounts

## Validation Points

- Verify sale transaction exists in POS with changed tax
- Verify tax change was applied correctly:
  - Specific item(s) or entire transaction
  - Tax amount calculated using new tax schedule (not default)
- Verify reason code (if provided) is captured
- Verify sale transaction exists in Store Manager (Journal | Transactions)
- Verify sale transaction exists in Central after sync
- Verify **tax schedule and amount match** between POS, Store Manager, and Central
- Verify reason code preserved in Central
- Mapping validation: Tax change fields (modified tax schedule ID, tax amount, reason code) map correctly from Store to Central
- Duplicate prevention: No duplicate sale in Central for the same Transaction number

## Negative / Edge Case Coverage

- **Tax change without permission:** If user does not have "Allowed to change tax status" permission, POS prevents tax change; verify permission enforcement
- **Tax change without reason code:** If reason code is required (File | Configuration | Store Rules | Reason Code Options), cashier must select reason before tax change completes
- **Invalid tax schedule selected:** If cashier selects invalid or inactive tax schedule, POS may show error or prevent selection; verify tax schedule validation
- **Change tax after discount applied:** If item has discount applied, then tax is changed, POS recalculates tax on discounted price; verify correct calculation order
- **Change tax multiple times:** Cashier can change tax multiple times for same item; latest change is applied; verify only final tax change is recorded
- **Mix of default and changed tax:** Transaction can have some items with default tax and some with changed tax; POS calculates each item separately; verify correct per-item tax calculation
- **Change tax then void transaction:** If transaction with changed tax is voided, tax change is reversed; verify void processing handles tax change correctly
- **Tax-exempt customer with tax change:** If tax-exempt customer is selected, tax change may not apply (customer is exempt regardless of tax schedule); verify tax-exempt status takes precedence
- **Destination tax vs. manual tax change:** If destination tax is enabled (release 3.50.11) and shipping address is selected, manual tax change may override destination tax; verify precedence
- **Tax change for non-taxable item:** If item is marked "Item is not taxable," tax change may not apply; verify non-taxable items remain non-taxable
- **POS offline then sync later:** Sale with changed tax created locally in Store database, then synced to Central when connectivity is restored; tax change details preserved
- **Sync failure then retry:** Central Client automatically retries failed sync jobs; verify sale with changed tax appears in Central after retry (check Central Client Dashboard for failed jobs)
- **Duplicate prevention across repeated sync attempts:** Sale sync is idempotent; repeated sync does not create duplicates in Central
- **Tax compliance reporting:** Transactions with changed tax must be accurately reported for tax remittance; verify tax reports use modified tax amounts, not default
- **Audit trail:** Tax change with reason code provides audit trail for compliance; verify reason codes are captured for reporting
- **Consistency Checker:** If sale transaction with changed tax fails to sync, run Consistency Checker to synchronize missing sale records to Central

## Known Issues / Notes

- Video link: https://somup.com/cOnZtWHBG
- Reference: RMH documentation - [Working with taxes](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/transactions-working-with-taxes.md)
- Reference: RMH documentation - [Setting up sales tax rules](https://github.com/rmhpos/gitbook-repo/blob/main/docs/SM_GSG_Topics/setting-up-sales-tax-rules.md)
- Reference: RMH documentation - [Transaction policies](https://github.com/rmhpos/gitbook-repo/blob/main/docs/POS_UG_Topics/policies-transactions.md)
- **Permission required:** "Allowed to change tax status" (Setup | People & Security | Users | General tab | POS User Roles)
- **Two methods for changing tax:**
  1. **Specific item:** Taxes | Current Item Tax | Set Current Item Tax
  2. **Entire transaction:** Taxes | Transaction Tax | Set Transaction Tax
- **Action button alternative:** Can use Action button beside item to access Tax change (if enabled)
- **Reason codes optional:** Store can configure reason codes for tax changes (File | Configuration | Store Rules | Reason Code Options)
- **Common tax change scenarios:**
  - **Out-of-state shipping:** Change from local tax to destination state tax
  - **International shipping:** Change to international tax or no tax
  - **Wholesale transaction:** Change from retail tax to wholesale tax (lower rate or exempt)
  - **Government purchase:** Change to tax-exempt schedule
  - **Different jurisdiction:** Change tax when item ships to different tax jurisdiction
- **Tax schedule configuration:** Multiple tax schedules can be configured in Store Manager (File | Configuration | Sales Tax) for different jurisdictions, rates, or purposes
- **Destination tax feature:** Starting with release 3.50.11, POS can automatically apply destination tax based on shipping address; manual tax change can override this
- **Tax change vs. tax removal:** 
  - **Tax change:** Switch from one tax schedule to another (different rate)
  - **Tax removal:** Remove tax entirely (set to no tax/0%)
- **Tax vs. tax-exempt customer:**
  - **Tax change:** Manual modification of tax schedule for transaction
  - **Tax-exempt customer:** Customer profile marked exempt; automatic exemption
- **Audit and compliance:** Tax changes with reason codes provide audit trail for tax compliance and reporting
- **Receipt display:** Receipt can show reason code for tax change (if configured in receipt template)
- **POS commands available:**
  - `ItemTax_SetForCurrentItemCommand` - Invoke Select Tax dialog for current item
  - `ItemTax_SetForTransactionCommand` - Invoke Select Tax dialog for transaction
  - `ItemTax_ToggleForItemCommand` - Toggle item tax on/off for selected item
  - `ItemTax_ToggleForTransactionCommand` - Toggle transaction tax on/off
  - `ItemTax_SetDestinationTaxCommand` - Apply destination tax based on shipping address
  - `ItemTax_SetNoItemTaxForTransactionCommand` - Make transaction tax-free
