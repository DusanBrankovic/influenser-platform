/*
  Warnings:

  - The values [Fitness,Fashion,Beauty,Travel,FoodAndCooking,ParentingAndFamily,Gaming,Tech,BusinessAndFinance] on the enum `Industry` will be removed. If these variants are still used in the database, this will fail.
  - The values [BodyPositivity,MentalHealthAwareness] on the enum `Value` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Industry_new" AS ENUM ('Beauty_And_Personal_Care', 'Fashion_And_Style', 'Health_And_Wellness', 'Lifestyle', 'Food_And_Drink', 'Travel_And_Hospitality', 'Parenting_And_Family', 'Tech_And_Digital', 'Education_And_Knowledge', 'Business_And_Entrepreneurship', 'Finance_And_Investing', 'Gaming_And_Esports', 'Entertainment_And_Media', 'Art_And_Creativity', 'Sports', 'Sustainability_And_Ethics', 'Pets_And_Animals', 'Automotive_And_Mobility', 'Home_And_Real_Estate', 'Other');
ALTER TABLE "Influencer" ALTER COLUMN "industries" TYPE "Industry_new"[] USING ("industries"::text::"Industry_new"[]);
ALTER TYPE "Industry" RENAME TO "Industry_old";
ALTER TYPE "Industry_new" RENAME TO "Industry";
DROP TYPE "public"."Industry_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Value_new" AS ENUM ('Authenticity', 'Transparency', 'Quality', 'Honest', 'Professionalism', 'Creativity', 'Education', 'Knowledge_sharing', 'Sustainability', 'Ethics', 'Responsibility', 'Mental_health_and_balance', 'Self_confidence', 'Personal_growth', 'Inclusivity', 'Diversity', 'Body_positivity', 'Natural_beauty', 'Innovation', 'Long_term_partnerships', 'Community', 'Support', 'Commitment', 'Consistency', 'Social_responsibility', 'Work_life_balance', 'Premium_standards', 'Accessibility', 'Supporting_local_brands', 'Empathy', 'Other');
ALTER TABLE "Influencer" ALTER COLUMN "values" TYPE "Value_new"[] USING ("values"::text::"Value_new"[]);
ALTER TYPE "Value" RENAME TO "Value_old";
ALTER TYPE "Value_new" RENAME TO "Value";
DROP TYPE "public"."Value_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_userId_fkey";

-- DropForeignKey
ALTER TABLE "Influencer" DROP CONSTRAINT "Influencer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- AddForeignKey
ALTER TABLE "Influencer" ADD CONSTRAINT "Influencer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Influencer"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
