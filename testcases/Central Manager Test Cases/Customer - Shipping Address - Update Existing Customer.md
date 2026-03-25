# Customer / Customer Accounts

## Metadata
Feature: Customer Accounts — Shipping Address
Business Area: Customer
Source System: Central Manager
Target System: Store(s)
Sync Direction: Central Manager → Store (via POS Lookup Online)
Release: MVP 1.1
Priority: High

---

# Scenario: Update the Shipping Address of an Existing Customer

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- A customer record with First Name `John`, Last Name `TEST-CUST-001` already exists in Central Manager.
- The customer `John TEST-CUST-001` has at least one shipping address already on file on the **Shipping Address** tab.
- The user is logged into Central Manager with a role that has the Customer privilege enabled.
- The target store `Store001` is operational, online, and has POS running.
- The POS operator at `Store001` has access to the Customers function in POS.

## Required Test Data
- Customer First Name (existing): John
- Customer Last Name (existing): TEST-CUST-001
- Action: Add a new shipping address
- New Shipping Address — Street: 456 Updated Street
- New Shipping Address — City: Springfield
- New Shipping Address — State: IL
- New Shipping Address — Zip Code: 62704
- New Shipping Address — Country: USA
- Set as primary shipping address: Yes
- Target Store: Store001

## Navigation Path
Central Manager → Customer → Customers

## Execution Steps
1. Log into Central Manager using your assigned credentials.
2. On the Central Manager main screen, locate the top navigation bar and click **Customer**.
3. In the Customer menu, click **Customers**. The Customers list screen opens, displaying all existing customer records.
4. In the Customers list, locate the row for `John TEST-CUST-001`. Click on that row to select it and open the customer record.
5. The customer detail form opens. Click the **Shipping Address** tab to view the existing shipping addresses on file.
6. On the **Shipping Address** tab, click **New** to add a new shipping address. A prompt appears asking: "Do you want to use the existing Billing Information address?"
7. Click **No** to enter a different shipping address manually.
8. In the shipping address form, enter the following values:
   - **Address**: `456 Updated Street`
   - **City**: `Springfield`
   - **State**: `IL`
   - **Zip Code**: `62704`
   - **Country**: `USA`
9. Select the checkbox **This is the primary shipping address for this customer** to mark this new address as the primary.
10. Click **OK** to confirm the new shipping address entry and return to the **Shipping Address** tab. The new address `456 Updated Street, Springfield, IL 62704` should now appear in the shipping address list and be marked as the primary address.
11. Click **Save And Close** to save the customer record and return to the Customers list.
12. Reopen the `John TEST-CUST-001` customer record, navigate to the **Shipping Address** tab, and confirm the new address is listed and flagged as the primary shipping address.
13. At the target store `Store001`, open POS.
14. In POS, tap **Customers**, then tap **Lookup Customer**. The customer lookup screen opens.
15. In the lookup field, type `TEST-CUST-001` to search for the customer.
16. Tap **Lookup Online**. The system queries the Central database for matching customer records.
17. In the search results, locate `John TEST-CUST-001`. Tap the record once to select it, then tap **Select** (or tap the record twice). The customer record is synchronized from the Central database to the `Store001` database.
18. Confirm the customer record is now loaded in POS and inspect the shipping address details to verify the updated information is present.

## Expected Results
- The customer record `John TEST-CUST-001` is successfully updated in Central Manager with the new primary shipping address `456 Updated Street, Springfield, IL 62704`.
- The updated customer record, including the new shipping address, is synchronized to `Store001` via POS Lookup Online.

## Validation Checks
- Verify **new shipping address is present on Shipping Address tab** in **Central Manager > Customer > Customers** by reopening the `John TEST-CUST-001` record after saving and confirming `456 Updated Street, Springfield, IL 62704` appears in the shipping address list on the **Shipping Address** tab.
- Verify **new address is set as primary** in **Central Manager > Customer > Customers** by confirming the `456 Updated Street` entry is flagged as the primary shipping address on the **Shipping Address** tab.
- Verify **customer record is synchronized to store** in **Store001 POS** by confirming the Lookup Online result for `TEST-CUST-001` returns the record and allows selection without error.
- Verify **updated shipping address in store** in **Store001 POS** by confirming the customer record loaded after Lookup Online displays the shipping address as `456 Updated Street, Springfield, IL 62704`.
- Verify **stores where Lookup Online was not performed are unaffected** by confirming that other stores not targeted by this test still show the previous customer shipping address data or do not have the record at all.