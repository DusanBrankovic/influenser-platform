/*
  Warnings:

  - A unique constraint covering the columns `[nametag]` on the table `Influencer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Influencer_nametag_key" ON "Influencer"("nametag");
