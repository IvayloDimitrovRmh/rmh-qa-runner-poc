# Setup / People and Security — Manager User Roles

## Metadata
Feature: Manager User Roles  
Business Area: Setup > People and Security > Manager User Roles  
Source System: Central Manager  
Target System: Store(s)  
Sync Direction: Central Manager → Store  
Release: MVP 1.1  
Priority: High  

---

# Scenario: Insert a new manager user role in Central Manager

## Preconditions
- Central Manager is installed, configured, and accessible via login.
- Central Server and Central Client synchronization services are running.
- At least one store group (Store Group 01) exists with at least one store assigned (Store001).
- The logged-in user has a role with permissions to manage Manager User Roles under **Setup > People and Security**.
- No existing Manager User Role with Code `MGR-ROLE-001` exists in Central Manager (to avoid duplicates).
- The target store Store001 is operational and able to receive synchronization from Central Manager.

## Required Test Data
- Role Code: MGR-ROLE-001
- Role Name: TEST Store Manager
- Privileges to enable:
  - Merchandising > Items: Yes
  - Merchandising > Departments: Yes
  - Merchandising > Discounts: Yes
  - Inventory/Purchasing > Purchase Orders: Yes
  - Reports > Active Reports: Yes
- Target Store: Store001

## Navigation Path
Central Manager → Setup → People and Security → Manager User Roles

---

## Execution Steps

1. Log in to Central Manager with valid credentials.
2. In the top navigation bar, click **Setup**.
3. In the **Setup** menu, expand **People and Security**.
4. Click **Manager User Roles** to open the Manager User Roles list.
5. Click **New** to create a new Manager User Role. The role detail form opens.
6. In the **Code** field, enter `MGR-ROLE-001`.
7. In the **Name** field, enter `TEST Store Manager`.
8. Expand the **Privileges** section to view the privilege groups.
9. Under the **Merchandising** privilege group, enable the following privileges:
   - Select **Items**
   - Select **Departments**
   - Select **Discounts**
10. Under the **Inventory/Purchasing** privilege group, enable the following privilege:
    - Select **Purchase Orders**
11. Under the **Reports** privilege group, enable the following privilege:
    - Select **Active Reports**
12. Click **Save And Close** to save the new Manager User Role and return to the Manager User Roles list.
    > **Note:** The role is automatically synchronized to the applicable store groups on save.
13. In the Manager User Roles list, confirm the row with Code `MGR-ROLE-001` is present.
14. Allow time for the synchronization cycle to complete between Central Server and Store001, or trigger a manual sync if required by your environment.
15. Open Store Manager on Store001.
16. In Store Manager, navigate to **Setup → People and Security → Manager User Roles**.
17. In the Manager User Roles list, confirm the role with Code `MGR-ROLE-001` is present.

---

## Expected Results
- The new Manager User Role `TEST Store Manager` with Code `MGR-ROLE-001` is created and saved successfully in Central Manager.
- The role is synchronized to and visible in the target store Store001.
- The role is available as an assignable manager role when creating or updating store users in Store001.

## Validation Checks
- Verify the new Manager User Role is present in Central Manager → Setup → People and Security → Manager User Roles by locating `MGR-ROLE-001` in the Manager User Roles list immediately after saving.
- Verify the **Code** and **Name** values in Central Manager → Setup → People and Security → Manager User Roles by reopening the **MGR-ROLE-001** record and confirming **Code** displays `MGR-ROLE-001` and **Name** displays `TEST Store Manager`.
- Verify the **Merchandising** privileges are enabled in Central Manager → Setup → People and Security → Manager User Roles by reopening the **MGR-ROLE-001** record and confirming **Items**, **Departments**, and **Discounts** are selected under the **Merchandising** privilege group.
- Verify the **Inventory/Purchasing** privilege is enabled in Central Manager → Setup → People and Security → Manager User Roles by reopening the **MGR-ROLE-001** record and confirming **Purchase Orders** is selected under the **Inventory/Purchasing** privilege group.
- Verify the **Reports** privilege is enabled in Central Manager → Setup → People and Security → Manager User Roles by reopening the **MGR-ROLE-001** record and confirming **Active Reports** is selected under the **Reports** privilege group.
- Verify the Manager User Role is present in the target store in Store001 → Setup → People and Security → Manager User Roles by locating `MGR-ROLE-001` in the store's Manager User Roles list after synchronization has completed.

> **Note:** Manager User Roles are a prerequisite dependency for Store Users with manager access. Roles must be created and synchronized before store users can be assigned a manager role.

> **Actual Result:** Pass insert/update observed in the current implementation.