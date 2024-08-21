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
    additionalFiles: string
    file: string
  }
  