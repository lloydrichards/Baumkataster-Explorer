-- CreateTable
CREATE TABLE "Tree" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "address" TEXT,
    "quarter" TEXT NOT NULL,
    "species" TEXT,
    "genus" TEXT NOT NULL,
    "name_lat" TEXT NOT NULL,
    "name_german" TEXT NOT NULL,
    "tree_number" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "type" INTEGER,
    "year" INTEGER,
    "source" TEXT,
    "crown" INTEGER NOT NULL,
    "geo_lat" REAL NOT NULL,
    "geo_long" REAL NOT NULL
);
