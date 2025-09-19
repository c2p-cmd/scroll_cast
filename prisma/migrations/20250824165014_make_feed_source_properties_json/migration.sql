/*
  Warnings:

  - You are about to alter the column `properties` on the `FeedSource` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.

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
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_FeedSource" ("createdAt", "id", "link", "name", "properties", "updatedAt") SELECT "createdAt", "id", "link", "name", "properties", "updatedAt" FROM "FeedSource";
DROP TABLE "FeedSource";
ALTER TABLE "new_FeedSource" RENAME TO "FeedSource";
CREATE UNIQUE INDEX "FeedSource_link_key" ON "FeedSource"("link");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
