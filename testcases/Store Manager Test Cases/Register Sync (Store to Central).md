# Register Configuration Synchronization

## Metadata
Feature: Hardware Configuration Synchronization  
Business Area: Setup → Hardware  
Source System: Store Manager  
Target System: Central Manager  
Sync Direction: Store → Central  
Release: [Specify Release]  
Priority: [Specify Priority]

---

# Scenario: Register Configuration Sync from Store Manager to Central Manager

## Preconditions
- Store Manager is connected to Central Manager.
- User has access to modify register configurations in Store Manager.

## Required Test Data
- Register Number
- Default Price Level
- POS Task Pad
- POS Profile
- Default Carrier
- Default Service
- Printer Type
- Device Name
- Receipt Format
- Scale configuration (if applicable)
- Scanner configuration (if applicable)
- Cash Drawer configuration (if applicable)

## Navigation Path
Store Manager → Setup → Hardware → Register List

## Execution Steps
1. Open Store Manager and navigate to Setup → Hardware → Register List.
2. Create a new register or select an existing register to update.
3. Populate or modify all available register fields, including:
   - General information (Register Number, Description, Default Price Level, POS Task Pad, POS Profile)
   - Default Shipping Information (Default Carrier, Default Service)
   - Receipt Printer settings (Printer Type, Device Name, Receipt Format, etc.)
   - Scale, Scanner, and Cash Drawer configurations as applicable
4. Save the register configuration in Store Manager.
5. Ensure Store Manager is connected to Central Manager and trigger synchronization (manual or automatic, as per system setup).
6. In Central Manager, verify that the register configuration appears and all updated fields match the values entered in Store Manager.

## Expected Results
- Register configuration changes in Store Manager are synchronized to Central Manager.
- All register fields are transferred and reflected correctly in Central Manager.

## Validation Checks
- Each register field value in Central Manager matches the value set in Store Manager.
- Register identifier is consistent between Store Manager and Central Manager.
- No register fields are missing or incorrectly mapped after sync.
- If Bug 204266 is present, document any fields that fail to synchronize and reference the bug for follow-up.

---

**Note:**  
Bug 204266 – Store → Register List: Not all register values correctly synchronize to Central Manager. If any discrepancies are found, record the affected fields and reference this bug for escalation. Field-level sync behavior is inferred from available documentation; not all fields are explicitly confirmed to sync correctly.
