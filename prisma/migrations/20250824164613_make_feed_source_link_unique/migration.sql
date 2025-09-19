/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `FeedSource` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FeedSource_link_key" ON "FeedSource"("link");
