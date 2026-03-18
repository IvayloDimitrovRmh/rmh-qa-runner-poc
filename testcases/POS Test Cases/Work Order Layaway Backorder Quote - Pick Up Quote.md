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

# Scenario: Pick up Quote

## Preconditions

- POS is operational and cashier is logged in
- Quote exists in Store database (previously created)
- Quote is in "open" status (not yet processed or expired)
- Quote may have:
  - Customer information associated
  - Items with pricing
  - Expiration date
- Items are available in inventory (in stock)
- User has permission to recall and process quotes (no specific quote permission documented; controlled by general POS order permissions)
- Store is in online mode with connectivity to Central database for synchronization (or offline mode with later sync capability)

## Action

**Pick up quote (convert quote to sale) in POS:**

**Step 1: Recall the quote**
1. (Optional but recommended) Look up customer first to filter quotes:
   - Tap **Customers | Lookup Customer** or press **F7**
   - Search for customer by name, phone, or customer ID
   - Select customer
   - Customer information displays in Customer pane
   - **Benefit:** When customer is selected, POS displays only quotes belonging to that customer
2. **Recall the quote:**
   - Tap **Orders | Recalls | Recall a Quote**
   - **Recall Quote screen displays** showing:
     - **If customer selected:** Only quotes for selected customer
     - **If no customer selected:** All open quotes (must search manually)
     - Quote list shows:
       - Quote number
       - Customer name (if associated)
       - Quote date
       - Total amount
       - Expiration date
3. **Select the customer's quote:**
   - Tap quote once and tap **Add**; OR
   - Tap quote twice (double-tap)
4. **Quote recalls to transaction screen** showing:
   - All items from quote
   - Quote number
   - Total amount (including tax)
   - Quoted prices (with any discounts/price changes from quote)
   - Expiration date

**Step 2: Pick up quote (convert to sale)**
5. Tap **Transaction | Tender Sale** or press **F12**
6. **Select Order Action screen displays** with options:
   - **Pick up Entire:** Convert quote to sale; customer buys all items
   - **Convert to Work Order:** Convert quote to work order (different scenario)
7. Tap **Pick up Entire**
8. **POS proceeds to tender screen:**
   - **Total amount displays** (quote total including tax)
   - Customer must pay full amount
   - Unlike quote creation (where Total Due was $0), customer now pays quoted price
9. Enter payment amount next to appropriate tender type:
   - Enter full quote amount
   - Customer pays with Cash, Credit Card, or other tender types
10. Tap **OK** to complete payment
11. Tap **Yes** to print receipt showing:
    - Items purchased
    - Prices (from quote)
    - Payment received
    - Quote number converted to sale
    - Date
12. **Quote converts to sale:**
    - Quote status changes to "completed/converted"
    - Sale transaction created
    - **Inventory adjusted:** Items subtracted from On-Hand quantity
13. Sale transaction is recorded in Store database and queued for sync to Central
14. Customer takes items

**Alternative: Use POS command**
- Can use `Quote_RecallCommand` to invoke Recall Quote dialog (no parameters)

## Validation Points

- Verify quote recalls successfully in POS
- Verify customer filtering works (if customer selected, only their quotes display)
- Verify quote details correct when recalled (items, prices, total)
- Verify order action selection displays (Pick up Entire vs. Convert to Work Order)
- Verify **Pick up Entire** converts quote to sale
- Verify **Total amount matches quoted price** (including tax)
- Verify payment is required and processed
- Verify sale transaction created in POS
- Verify quote status updated in Store Manager (completed/converted)
- Verify quote status update syncs to Central
- Verify **inventory adjusted** (On-Hand decreased by sold quantities)
- Verify receipt shows sale details and quote reference
- Verify payment recorded in batch totals
- Mapping validation: Quote conversion, sale details, inventory updates map correctly from Store to Central
- Duplicate prevention: No duplicate sale transactions in Central