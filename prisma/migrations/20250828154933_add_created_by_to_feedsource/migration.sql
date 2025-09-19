/*
  Warnings:

  - Added the required column `createdBy` to the `FeedSource` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FeedSource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "properties" JSONB NOT NULL DEFAULT [],
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdBy" INTEGER NOT NULL,
    CONSTRAINT "FeedSource_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FeedSource" ("createdAt", "id", "link", "name", "properties", "updatedAt") SELECT "createdAt", "id", "link", "name", "properties", "updatedAt" FROM "FeedSource";
DROP TABLE "FeedSource";
ALTER TABLE "new_FeedSource" RENAME TO "FeedSource";
CREATE UNIQUE INDEX "FeedSource_link_key" ON "FeedSource"("link");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
