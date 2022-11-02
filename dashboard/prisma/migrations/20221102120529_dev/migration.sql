/*
  Warnings:

  - You are about to drop the column `geo_lat` on the `Tree` table. All the data in the column will be lost.
  - You are about to drop the column `geo_long` on the `Tree` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tree" (
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
    "crown" INTEGER NOT NULL
);
INSERT INTO "new_Tree" ("address", "category", "crown", "genus", "id", "name_german", "name_lat", "quarter", "source", "species", "status", "tree_number", "type", "year") SELECT "address", "category", "crown", "genus", "id", "name_german", "name_lat", "quarter", "source", "species", "status", "tree_number", "type", "year" FROM "Tree";
DROP TABLE "Tree";
ALTER TABLE "new_Tree" RENAME TO "Tree";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
