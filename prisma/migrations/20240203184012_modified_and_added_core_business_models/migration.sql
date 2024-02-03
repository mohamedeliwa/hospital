/*
  Warnings:

  - The primary key for the `Patient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `national_id` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `nationalId` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Decision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serialNumber" INTEGER NOT NULL,
    "patientId" TEXT NOT NULL,
    "issuedAt" DATETIME NOT NULL,
    "expirationDate" DATETIME NOT NULL,
    CONSTRAINT "Decision_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" INTEGER NOT NULL,
    "decisionId" TEXT NOT NULL,
    "usedAt" DATETIME,
    CONSTRAINT "Token_decisionId_fkey" FOREIGN KEY ("decisionId") REFERENCES "Decision" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nationalId" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);
INSERT INTO "new_Patient" ("id", "name", "phone") SELECT "id", "name", "phone" FROM "Patient";
DROP TABLE "Patient";
ALTER TABLE "new_Patient" RENAME TO "Patient";
CREATE UNIQUE INDEX "Patient_nationalId_key" ON "Patient"("nationalId");
CREATE UNIQUE INDEX "Patient_phone_key" ON "Patient"("phone");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
