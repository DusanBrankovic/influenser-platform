/*
  Warnings:

  - You are about to drop the column `conatactMail` on the `Influencer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Influencer" DROP COLUMN "conatactMail",
ADD COLUMN     "contactMail" TEXT[];
