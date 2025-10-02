/*
  Warnings:

  - Made the column `color` on table `Goal` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Goal_name_key";

-- AlterTable
ALTER TABLE "Goal" ALTER COLUMN "color" SET NOT NULL;
