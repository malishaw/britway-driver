export interface IDriverOtherData {
    nationalInsuranceNumber: string
    bankAccountDetails: string
    insurance: string
    insuranceExpiryDate: string
    drivingLicence: string
    drivingLicenceExpiryDate: string
    PCOLicence: string
    PCOLicenceExpiryDate: string
    MOTLicenceExpiryDate: string
    MOTLicence: string
    PHVLicence: string
    PHVLicenceExpiryDate: string
    driverActivityStatus?: "Available" | "Unavailable";
    driveAddressStatus?: "Verified" | "Not Verified";
    bgsStatus?: "Checked" | "Unchecked";
    lastCheckedDate: string
    additionalFiles: string
    file: string
  }
  