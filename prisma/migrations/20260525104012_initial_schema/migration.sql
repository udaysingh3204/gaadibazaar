-- CreateTable
CREATE TABLE "Dealer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "address" TEXT,
    "gstNumber" TEXT,
    "plan" TEXT NOT NULL DEFAULT 'TRIAL',
    "subscriptionEnd" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "totalListings" INTEGER NOT NULL DEFAULT 0,
    "totalLeads" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "DealerUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'manager',
    "dealerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DealerUser_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "Dealer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Car" (
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
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "dealerId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Car_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "Dealer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_email_key" ON "Dealer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DealerUser_email_dealerId_key" ON "DealerUser"("email", "dealerId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
