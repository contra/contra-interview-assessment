/*
  Warnings:

  - You are about to drop the column `value` on the `UserFlag` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Variant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserFlag" DROP COLUMN "value",
ADD COLUMN     "isOn" BOOLEAN;

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "value";
