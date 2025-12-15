-- CreateEnum
CREATE TYPE "Role" AS ENUM ('INFLUENCER', 'BUSINESS', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Influencer" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "headline" TEXT,
    "experience" INTEGER,

    CONSTRAINT "Influencer_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Influencer" ADD CONSTRAINT "Influencer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
