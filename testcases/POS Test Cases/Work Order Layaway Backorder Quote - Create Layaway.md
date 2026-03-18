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

# Scenario: Create Layaway

## Preconditions

- POS is operational and cashier is logged in
- Layaways are configured in Store Manager:
  - Expiration period configured (File | Configuration | Ordering rules | Layaway | Expiration days)
  - Minimum deposit amount configured (File | Configuration | Ordering rules | Layaway | Deposit percentage)
  - Layaway receipt format configured (Setup | Hardware | Receipt Formats)
- Items are available to sell and can be added to layaway
- Customer exists (customer selection required for layaways)
- User has permission to create layaways (no specific layaway permission documented; controlled by general POS permissions)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Create a layaway order in POS:**
1. Tap **Orders | Layaway**
2. **POS enters layaway mode:**
   - Layaway icon displays in top right corner of POS screen
   - Transaction screen indicates layaway mode
3. **Look up and select customer (required for layaways):**
   - Tap **Customers | Lookup Customer** or press **F7**
   - Search for customer by name, phone, or customer ID
   - Select customer:
     - Tap customer once and tap **Select**; OR
     - Tap customer twice (double-tap)
   - Customer information displays in Customer pane at top of POS screen
4. Add items to layaway order (scan or enter Item Lookup Codes)
   - Items display on transaction screen
   - Layaway total calculates (including tax)
5. **POS displays minimum deposit amount** in "Addl. deposit" field:
   - Deposit calculated as percentage of layaway total (configured in File | Configuration | Ordering rules | Layaway | Deposit)
   - Example: If deposit is 20% and layaway total is $500, minimum deposit is $100
   - **Customer can pay more than minimum deposit**
6. (Optional) Override deposit amount:
   - Tap **Orders | Order Details | Order Deposit Override**
   - Enter new deposit amount or percentage
   - Customer can pay more than minimum; store policy may allow less
7. (Optional) Override expiration date:
   - Tap **Orders | Order Details | Order Due**
   - Change expiration date (default is configured days from current date)
8. (Optional) Add comment to layaway:
   - Tap **Orders | Order Details | Order Comment**
   - Enter reference number (optional) and comment
   - Tap **OK**
9. Tap **Transaction | Tender Sale** or press **F12**
10. On the Tender screen, enter deposit amount next to appropriate tender type:
    - **Store policy:** Many stores only accept **cash, direct deposit, or check** for layaway deposits (to avoid transaction fees)
    - Minimum deposit amount shown in "Addl. deposit" field
    - Customer can pay more than minimum
11. Tap **OK** to complete deposit payment
12. Tap **Yes** to print layaway receipt showing:
    - Layaway order number
    - Items on layaway
    - Total layaway amount (including tax)
    - Deposit amount paid
    - **Balance owing** (layaway total - deposit)
    - **Expiration date** (date by which balance must be paid)
13. Layaway order is saved in Store database and queued for sync to Central
14. **Items are marked as "Committed" inventory:**
    - Items removed from available inventory
    - Items shown as "Committed" on Inventory tab in Store Manager
    - Items held in back office/storage area until layaway is paid off
15. Customer receives layaway receipt with expiration date and balance owing

## Validation Points

- Verify layaway is created in POS with correct details
- Verify layaway icon displays in POS during layaway creation
- Verify customer selection is required (cannot create layaway without customer)
- Verify minimum deposit amount calculated correctly (percentage of total)
- Verify expiration date calculated correctly (configured days from current date)
- Verify layaway exists in Store Manager (Journal | Transactions or Orders)
- Verify layaway exists in Central after sync
- Verify layaway details match between POS, Store Manager, and Central:
  - Items, quantities, prices
  - Total amount, deposit amount, balance owing
  - Expiration date
  - Customer information
  - Comment (if added)
- Verify inventory marked as "Committed" in Store Manager (Inventory tab)
- Verify inventory commitment syncs to Central
- Mapping validation: Layaway fields map correctly from Store to Central
- Duplicate prevention: No duplicate layaway in Central for the same layaway order number