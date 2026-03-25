# Worksheets / Worksheets

## Metadata
Feature: Worksheets — TC-501  
Business Area: Worksheets > Worksheets  
Source System: Store(s)  
Target System: Central Manager  
Sync Direction: Store → Central Manager  
Release: MVP V1  
Priority: High  

---

# Scenario: Request Full Inventory Count from Selected Store and Reconcile Inventory in Central Manager Using Worksheet 501 and Task 190

## Preconditions
- Central Manager is installed and accessible.
- The logged-in user has permission to create, modify, and approve worksheets in Central Manager, and to run inventory wizards.
- At least one store with **Active** status exists with inventory data that can be pulled into Central Manager (e.g., `Store001`). Confirm with your system administrator that `Store001` is active and has items with inventory quantities before running this test.
- Central-to-store synchronization services are running.
- The **RMH Worksheet Process** service is running. To verify: click **Start**, type `Services`, open the Services window, scroll to **RMH Worksheet Process**, and confirm the status is **Running**.
- **Important:** Approving Worksheet 501 locks item management functions in Central Manager until the worksheet has finished processing. This process can take several hours depending on the size of the inventory. Best practice is to process one store at a time and to schedule the process while the store is closed.

## Required Test Data
- Worksheet Title: QA Full Inventory Count 501 - March 2026
- Effective Date/Time: 2026-03-26 22:00:00
- Target Store: Store001

## Navigation Path
Central Manager → Worksheets → Worksheets → 501: Request Full Inventory Count

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the left navigation panel, click **Worksheets**.
3. Expand **Worksheets** to reveal the list of worksheet types.
4. Click **501: Request Full Inventory Count** to launch the wizard.
5. From the store list, select `Store001`. You may also click **All** to include all available stores.
6. Click **Next**.
7. In the **Worksheet Title** field, enter `QA Full Inventory Count 501 - March 2026`.
8. In the **Effective date / time** field, enter `2026-03-26 22:00:00`.
   > **Tip:** The best practice is to process the worksheet while the store is closed or after store business hours.
9. Click **Next**.
10. Click **Finish**.
11. Click **OK** to confirm the worksheet has been created.
12. Double-click the worksheet titled `QA Full Inventory Count 501 - March 2026` to open its properties.
13. On the **General** tab, confirm the **Effective date / time** is set to `2026-03-26 22:00:00`. Add notes if desired.
14. Click **Approve**.
    > **Warning:** A warning message will appear indicating that processing Worksheet 501 locks down item management functions in Central Manager until the worksheet is processed. Do not approve this worksheet unless the store is closed or item management activity is not expected during processing.
15. Click **Yes** to confirm that you want to process the worksheet. The worksheet is approved and queued for processing.
16. To monitor processing status, click **Worksheets** in the left navigation panel, expand **Worksheets Status**, and click **501: Request Full Inventory Count**. Wait until the status shows the worksheet has completed processing before proceeding.
    > **Note:** Worksheet processing time depends on the size of the inventory. If you think the worksheet is taking too long to process, check that the **RMH Worksheet Process** service is running. Click **Start**, type `Services`, scroll to **RMH Worksheet Process**, and click **Start Service** if it is not running.
17. After the worksheet has completed processing, click **Wizards** in the left navigation panel.
18. Click **Task 190 - Reconcile Inventory**.
19. In the **Store** field, select `Store001`.
20. Select **Show Quantity Difference Only** if you only want Task 190 to display items where the store quantity differs from the Central Manager quantity.
21. Click **OK**. Task 190 loads and displays inventory quantities for `Store001`. Items with differences are shown in the **New Central Qty.** column.
22. Review the item quantities listed in the **New Central Qty.** column. Edit any quantities in the **New Central Qty.** column as required to reflect the correct reconciled values.
23. Click **Commit**. The Central Manager database is updated with the item quantities from the **New Central Qty.** column.
24. Click **OK** to confirm the changes to the database.

---

## Expected Results
- Worksheet 501 is approved and store inventory quantities from `Store001` are pulled into the Central Manager database.
- Task 190 displays the quantity differences between `Store001` and the Central Manager database in the **New Central Qty.** column.
- After committing Task 190, the Central Manager database is updated with the reconciled item quantities from `Store001`.

## Validation Checks
- Verify worksheet 501 processing status in Central Manager → Worksheets → Worksheets Status → **501: Request Full Inventory Count** by confirming the status shows a completed processed state and is no longer **In Process**.
- Verify the Central Manager database reflects the updated inventory quantities for `Store001` by re-running **Task 190 - Reconcile Inventory** for `Store001` with **Show Quantity Difference Only** selected and confirming that no quantity differences remain in the **New Central Qty.** column after the commit.
- Verify no processing errors exist for the worksheet in Central Manager → Worksheets → Worksheets Status → **501: Request Full Inventory Count** by confirming no error messages appear in the worksheet status screen.