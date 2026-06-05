-- CreateTable
CREATE TABLE "PrivateSeller" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "whatsapp" TEXT,
    "city" TEXT NOT NULL,
    "otpVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "OtpRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "carId" TEXT NOT NULL,
    "dealerId" TEXT,
    "buyerName" TEXT NOT NULL,
    "buyerPhone" TEXT NOT NULL,
    "buyerEmail" TEXT,
    "message" TEXT,
    "source" TEXT NOT NULL DEFAULT 'PLATFORM',
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Lead_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Lead_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "Dealer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "variant" TEXT,
    "yearOfManufacture" INTEGER NOT NULL,
    "registrationYear" INTEGER NOT NULL,
    "fuelType" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "engineCC" INTEGER NOT NULL,
    "mileageKmpl" REAL,
    "kmDriven" INTEGER NOT NULL,
    "numberOfOwners" TEXT NOT NULL,
    "bodyType" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "insuranceValid" DATETIME,
    "city" TEXT NOT NULL,
    "askingPrice" INTEGER NOT NULL,
    "sellerName" TEXT NOT NULL,
    "sellerPhone" TEXT NOT NULL,
    "highlights" JSONB NOT NULL,
    "images" JSONB NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "listingType" TEXT NOT NULL DEFAULT 'DEALER',
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "dealerId" TEXT,
    "sellerId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Car_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "Dealer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Car_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "PrivateSeller" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Car" ("askingPrice", "bodyType", "brand", "city", "color", "createdAt", "dealerId", "engineCC", "fuelType", "highlights", "id", "images", "insuranceValid", "isFeatured", "isVerified", "kmDriven", "mileageKmpl", "model", "numberOfOwners", "registrationYear", "sellerName", "sellerPhone", "status", "transmission", "updatedAt", "variant", "viewCount", "yearOfManufacture") SELECT "askingPrice", "bodyType", "brand", "city", "color", "createdAt", "dealerId", "engineCC", "fuelType", "highlights", "id", "images", "insuranceValid", "isFeatured", "isVerified", "kmDriven", "mileageKmpl", "model", "numberOfOwners", "registrationYear", "sellerName", "sellerPhone", "status", "transmission", "updatedAt", "variant", "viewCount", "yearOfManufacture" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
