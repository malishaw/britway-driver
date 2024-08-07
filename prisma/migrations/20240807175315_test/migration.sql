-- CreateTable
CREATE TABLE "DriverData" (
    "id" TEXT NOT NULL,
    "isDeleted" BOOLEAN,

    CONSTRAINT "DriverData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverGeneralData" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "fleetOperator" TEXT NOT NULL,
    "driverDataId" TEXT,

    CONSTRAINT "DriverGeneralData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverOtherData" (
    "id" TEXT NOT NULL,
    "nationalInsuranceNumber" TEXT,
    "bankAccountDetails" TEXT,
    "insurance" TEXT,
    "insuranceExpiryDate" TEXT,
    "drivingLicence" TEXT,
    "drivingLicenceExpiryDate" TEXT,
    "PCOLicence" TEXT,
    "PCOLicenceExpiryDate" TEXT,
    "PHVLicence" TEXT,
    "PHVLicenceExpiryDate" TEXT,
    "driverActivityStatus" TEXT,
    "additionalFiles" TEXT,
    "file" TEXT,
    "driverDataId" TEXT,

    CONSTRAINT "DriverOtherData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverPersonalData" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "dateOfBirth" TEXT,
    "mobileNumber" TEXT,
    "telephoneNumber" TEXT,
    "emergencyNumber" TEXT,
    "address" TEXT,
    "city" TEXT,
    "postCode" TEXT,
    "county" TEXT,
    "country" TEXT,
    "companyName" TEXT,
    "companyNumber" TEXT,
    "companyVatNumber" TEXT,
    "note" TEXT,
    "driverDataId" TEXT,

    CONSTRAINT "DriverPersonalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "journeyDate" TEXT NOT NULL,
    "refId" TEXT NOT NULL,
    "driver" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "driverIncome" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "payments" TEXT NOT NULL,
    "vehicle" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "totalNet" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "passengerName" TEXT NOT NULL,
    "flightNumber" TEXT NOT NULL,
    "flightLandingTime" TEXT NOT NULL,
    "arrivingFrom" TEXT NOT NULL,
    "flightDepartureNumber" TEXT NOT NULL,
    "serviceDuration" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "flightDepartureTime" TEXT NOT NULL,
    "flightDepartureTo" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "pickup" TEXT NOT NULL,
    "dropoff" TEXT NOT NULL,
    "via" TEXT NOT NULL,
    "passengers" TEXT NOT NULL,
    "suitcases" TEXT NOT NULL,
    "carryOn" TEXT NOT NULL,
    "childSeats" TEXT NOT NULL,
    "boosterSeats" TEXT NOT NULL,
    "infantSeats" TEXT NOT NULL,
    "wheelchairs" TEXT NOT NULL,
    "waitingTime" TEXT NOT NULL,
    "meetGreet" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "departments" TEXT NOT NULL,
    "leadName" TEXT NOT NULL,
    "leadEmail" TEXT NOT NULL,
    "leadPhoneNumber" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "trackingHistory" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DriverGeneralData_driverDataId_key" ON "DriverGeneralData"("driverDataId");

-- CreateIndex
CREATE UNIQUE INDEX "DriverOtherData_driverDataId_key" ON "DriverOtherData"("driverDataId");

-- CreateIndex
CREATE UNIQUE INDEX "DriverPersonalData_driverDataId_key" ON "DriverPersonalData"("driverDataId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_email_key" ON "Booking"("email");

-- AddForeignKey
ALTER TABLE "DriverGeneralData" ADD CONSTRAINT "DriverGeneralData_driverDataId_fkey" FOREIGN KEY ("driverDataId") REFERENCES "DriverData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverOtherData" ADD CONSTRAINT "DriverOtherData_driverDataId_fkey" FOREIGN KEY ("driverDataId") REFERENCES "DriverData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverPersonalData" ADD CONSTRAINT "DriverPersonalData_driverDataId_fkey" FOREIGN KEY ("driverDataId") REFERENCES "DriverData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
