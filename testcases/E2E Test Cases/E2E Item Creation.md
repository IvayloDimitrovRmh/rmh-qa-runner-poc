# Standard Item Synchronization

## Metadata
Feature: Item Synchronization  
Business Area: Merchandising > Items  
Priority: Unknown  
Test Type: Functional / Synchronization  
Automation Candidate: Yes  

---

# Test Case: Create Standard Item with VAT Tax (No Sale Pricing, Discount, or Commission)

## Preconditions
- Central Manager and POS are operational.
- Department `AutoDepartmentName01` exists.
- Category `AutoCategoryName01` exists.
- Store Group `QA01` exists.
- VAT Sales Tax configured for Store 1.

## Test Steps
1. In **Central Manager**, create a **Standard Item** in *Merchandising > Items* with:
   - Lookup Code
   - Description
   - Department `AutoDepartmentName01`
   - Category `AutoCategoryName01`
   - Price and Cost
2. Assign the item to **Store Group QA01**.
3. Configure **VAT Sales Tax for Store 1**.
4. Save the item.
5. In **POS**, search the item using the **Lookup Code**.

## Validation Checks
- Lookup Code matches between Central and POS.
- Department and Category are correct.
- Price and Cost values are correct.
- VAT tax is applied.

---

# Test Case: Edit Standard Item with VAT Tax

## Preconditions
- Item `AutoLCode03` already exists.
- Department `AutoDepartmentName02` exists.
- Category `AutoCategoryName02` exists.

## Test Steps
1. In **Central Manager**, locate item `AutoLCode03` in *Merchandising > Items*.
2. Update:
   - Lookup Code
   - Description
   - Department `AutoDepartmentName02`
   - Category `AutoCategoryName02`
   - Price and Cost
3. Save the item.
4. In **POS**, search using the **updated Lookup Code**.

## Validation Checks
- Updated Lookup Code is searchable in POS.
- Updated description, department, category, price and cost are correct.