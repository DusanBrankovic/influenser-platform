/*
  Warnings:

  - The values [Beauty_And_Personal_Care,Fashion_And_Style,Health_And_Wellness,Food_And_Drink,Travel_And_Hospitality,Parenting_And_Family,Tech_And_Digital,Education_And_Knowledge,Business_And_Entrepreneurship,Finance_And_Investing,Gaming_And_Esports,Entertainment_And_Media,Art_And_Creativity,Sports,Sustainability_And_Ethics,Pets_And_Animals,Automotive_And_Mobility,Home_And_Real_Estate,Other] on the enum `Industry` will be removed. If these variants are still used in the database, this will fail.
  - The values [Quality,Honest,Professionalism,Education,Knowledge_sharing,Sustainability,Ethics,Responsibility,Mental_health_and_balance,Self_confidence,Personal_growth,Diversity,Body_positivity,Natural_beauty,Innovation,Long_term_partnerships,Community,Support,Commitment,Consistency,Social_responsibility,Work_life_balance,Premium_standards,Accessibility,Supporting_local_brands,Empathy,Other] on the enum `Value` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Industry_new" AS ENUM ('Fitness', 'Tech', 'Fashion', 'Beauty', 'Lifestyle', 'Travel', 'FoodAndCooking', 'Gaming', 'ParentingAndFamily', 'BusinessAndFinance');
ALTER TABLE "Influencer" ALTER COLUMN "industries" TYPE "Industry_new"[] USING ("industries"::text::"Industry_new"[]);
ALTER TYPE "Industry" RENAME TO "Industry_old";
ALTER TYPE "Industry_new" RENAME TO "Industry";
DROP TYPE "public"."Industry_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Value_new" AS ENUM ('Authenticity', 'Transparency', 'Creativity', 'Inclusivity', 'BodyPositivity', 'MentalHealthAwareness');
ALTER TABLE "Influencer" ALTER COLUMN "values" TYPE "Value_new"[] USING ("values"::text::"Value_new"[]);
ALTER TYPE "Value" RENAME TO "Value_old";
ALTER TYPE "Value_new" RENAME TO "Value";
DROP TYPE "public"."Value_old";
COMMIT;
