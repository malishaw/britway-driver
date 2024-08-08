/*
  Warnings:

  - Made the column `displayName` on table `DriverGeneralData` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DriverGeneralData" ALTER COLUMN "displayName" SET NOT NULL;
