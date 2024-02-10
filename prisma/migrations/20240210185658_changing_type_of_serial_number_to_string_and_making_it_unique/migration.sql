-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Decision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serialNumber" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "issuedAt" DATETIME NOT NULL,
    "expirationDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Decision_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Decision" ("createdAt", "expirationDate", "id", "issuedAt", "patientId", "serialNumber", "updatedAt") SELECT "createdAt", "expirationDate", "id", "issuedAt", "patientId", "serialNumber", "updatedAt" FROM "Decision";
DROP TABLE "Decision";
ALTER TABLE "new_Decision" RENAME TO "Decision";
CREATE UNIQUE INDEX "Decision_serialNumber_key" ON "Decision"("serialNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
