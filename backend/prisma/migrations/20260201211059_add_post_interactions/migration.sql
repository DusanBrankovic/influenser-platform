-- CreateEnum
CREATE TYPE "PostAction" AS ENUM ('LIKE', 'SAVE');

-- CreateTable
CREATE TABLE "PostInteraction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "action" "PostAction" NOT NULL,

    CONSTRAINT "PostInteraction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostInteraction" ADD CONSTRAINT "PostInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Influencer"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostInteraction" ADD CONSTRAINT "PostInteraction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
