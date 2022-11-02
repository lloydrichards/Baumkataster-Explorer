/*
  Warnings:

  - Added the required column `geometry` to the `Tree` table without a default value. This is not possible if the table is not empty.

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
    "crown" INTEGER NOT NULL,
    "geometry" TEXT NOT NULL
);
INSERT INTO "new_Tree" ("address", "category", "crown", "genus", "id", "name_german", "name_lat", "quarter", "source", "species", "status", "tree_number", "type", "year") SELECT "address", "category", "crown", "genus", "id", "name_german", "name_lat", "quarter", "source", "species", "status", "tree_number", "type", "year" FROM "Tree";
DROP TABLE "Tree";
ALTER TABLE "new_Tree" RENAME TO "Tree";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
