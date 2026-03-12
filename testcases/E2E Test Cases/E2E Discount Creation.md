# Discount Synchronization

## Metadata
Feature: Discount Synchronization  
Business Area: Merchandising > Discounts  
Priority: Unknown  
Test Type: Functional / Synchronization  
Automation Candidate: Yes  

---

# Test Case: Create Mix and Match Unit Price Discount and Assign to Item

## Business Entity
Discounts

## Test Objective
Validate that a Mix and Match Unit Price discount created in Central and assigned to an item is applied correctly in POS.

## Preconditions
- Central Manager and POS are operational.
- Store Group `QA01` exists.
- Item `AutoLCode04` exists.

## Test Steps
1. In **Central Manager**, navigate to **Merchandising > Discounts**.
2. Create a **Mix and Match: Unit Price** discount with:
   - Description
   - Quantity required for the discount
   - Discounted unit price.
3. Assign the discount to **Store Group QA01**.
4. Save the discount.
5. Open item `AutoLCode04` in **Merchandising > Items** and assign the created **Mix and Match discount scheme**.
6. Open **POS** and add the item `AutoLCode04` to the cart the required number of times.

## Expected Result
- Discount is synchronized to the store.
- POS applies the discounted unit price when the required quantity is reached.

## Validation Points
- Discount scheme appears in the item configuration.
- Discounted price matches the configured **Reg. Price** value.
- Discount is applied only when the required quantity threshold is met.

## Negative / Edge Case Coverage
- Adding fewer items than the required quantity should not trigger the discount.
- Adding additional items beyond the required quantity should stop the discount if rules are exceeded

---

# Test Case: Create Mix and Match Percent Off Discount and Assign to Item

## Business Entity
Discounts

## Test Objective
Validate that a Mix and Match Percent Off discount created in Central and assigned to an item is applied correctly in POS.

## Preconditions
- Central Manager and POS are operational.
- Store Group `QA01` exists.
- Item `AutoLCode04` exists.

## Test Steps
1. In **Central Manager**, create a **Mix and Match: Percent Off** discount with:
   - Description
   - Quantity required for discount
   - Discount percentage.
2. Assign the discount to **Store Group QA01**.
3. Assign the discount scheme to item `AutoLCode04`.
4. In **POS**, add item `AutoLCode04` the required number of times.

## Expected Result
- Discount is synchronized to the store.
- POS applies the configured **percent discount** once the quantity threshold is met.

## Validation Points
- Discount percentage applied correctly.
- Discount appears only when required quantity is reached.

## Negative / Edge Case Coverage
- Discount not applied below threshold quantity.
- Additional items may stop the discount depending on rule configuration.

---

# Test Case: Create Buy X Get Y for Z Unit Price Discount and Assign to Item

## Business Entity
Discounts

## Test Objective
Validate that a Buy X Get Y for Z Unit Price discount created in Central applies correctly to items in POS.

## Preconditions
- Central Manager and POS are operational.
- Store Group `QA01` exists.
- Item `AutoLCode04` exists.

## Test Steps
1. In **Central Manager**, create a **Buy X and Get Y for Z: Unit Price** discount with:
   - Quantity to Buy
   - Quantity to Get
   - Discount price.
2. Assign the discount to **Store Group QA01**.
3. Assign the discount scheme to item `AutoLCode04`.
4. In **POS**, add the item the total quantity equal to **Buy + Get**.

## Expected Result
- Discount scheme is synchronized to the store.
- POS applies the **discount price** to the discounted items.

## Validation Points
- Correct number of items receive the discount.
- Discount price matches the configured value.

## Negative / Edge Case Coverage
- Discount not applied when quantity requirements are not met.
- Additional items follow normal pricing rules.

---

# Test Case: Create Buy X Get Y for Z Percent Off Discount and Assign to Item

## Business Entity
Discounts

## Test Objective
Validate that a Buy X Get Y for Z Percent Off discount created in Central applies correctly in POS.

## Preconditions
- Central Manager and POS are operational.
- Store Group `QA01` exists.
- Item `AutoLCode04` exists.

## Test Steps
1. In **Central Manager**, create a **Buy X and Get Y for Z: Percent Off** discount with:
   - Quantity to Buy
   - Quantity to Get
   - Discount percentage.
2. Assign the discount to **Store Group QA01**.
3. Assign the discount scheme to item `AutoLCode04`.
4. In **POS**, add the item the total quantity equal to **Buy + Get**.

## Expected Result
- Discount is synchronized to the store.
- POS applies the configured **percentage discount** to the appropriate items.

## Validation Points
- Correct items receive the percentage discount.
- Discount percentage matches configuration.

## Negative / Edge Case Coverage
- Discount not applied if quantity conditions are not met.
- Discount stops applying when rule limits are exceeded.