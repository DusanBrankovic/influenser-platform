-- CreateEnum
CREATE TYPE "Industry" AS ENUM ('Fitness', 'Fashion', 'Beauty', 'Lifestyle', 'Travel', 'FoodAndCooking', 'ParentingAndFamily', 'Gaming', 'Tech', 'BusinessAndFinance');

-- CreateEnum
CREATE TYPE "Value" AS ENUM ('Authenticity', 'Transparency', 'Creativity', 'Inclusivity', 'BodyPositivity', 'MentalHealthAwareness');

-- AlterTable
ALTER TABLE "Influencer" ADD COLUMN     "industries" "Industry"[],
ADD COLUMN     "values" "Value"[];
