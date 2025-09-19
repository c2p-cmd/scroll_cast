-- CreateTable
CREATE TABLE "_UserFavourites" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UserFavourites_A_fkey" FOREIGN KEY ("A") REFERENCES "FeedSource" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserFavourites_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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
    "createdBy" INTEGER NOT NULL
);
INSERT INTO "new_FeedSource" ("createdAt", "createdBy", "id", "link", "name", "properties", "updatedAt") SELECT "createdAt", "createdBy", "id", "link", "name", "properties", "updatedAt" FROM "FeedSource";
DROP TABLE "FeedSource";
ALTER TABLE "new_FeedSource" RENAME TO "FeedSource";
CREATE UNIQUE INDEX "FeedSource_link_key" ON "FeedSource"("link");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_UserFavourites_AB_unique" ON "_UserFavourites"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFavourites_B_index" ON "_UserFavourites"("B");
