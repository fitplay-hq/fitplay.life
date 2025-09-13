/*
  Warnings:

  - The values [Stationery,Accessories,FunAndStickers,Drinkware,Apparel,TravelAndTech,Books,WelcomeKit] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `subCategory` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."SubCategory" AS ENUM ('Cardio_Equipment', 'Probiotics_And_Supplements', 'Wearable_Health_Technology', 'Standing_Desks_And_Accessories', 'Onsite_Fitness_Classes_And_Workshops');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."Category_new" AS ENUM ('Fitness_And_Gym_Equipment', 'Nutrition_And_Health', 'Diagnostics_And_Prevention', 'Ergonomics_And_Workspace_Comfort', 'Health_And_Wellness_Services');
ALTER TABLE "public"."Product" ALTER COLUMN "category" TYPE "public"."Category_new" USING ("category"::text::"public"."Category_new");
ALTER TYPE "public"."Category" RENAME TO "Category_old";
ALTER TYPE "public"."Category_new" RENAME TO "Category";
DROP TYPE "public"."Category_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "subCategory" "public"."SubCategory" NOT NULL;

-- CreateTable
CREATE TABLE "public"."Variant" (
    "id" TEXT NOT NULL,
    "variantCategory" VARCHAR(50) NOT NULL,
    "variantValue" VARCHAR(100) NOT NULL,
    "mrp" INTEGER NOT NULL,
    "credits" TEXT,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Variant" ADD CONSTRAINT "Variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
