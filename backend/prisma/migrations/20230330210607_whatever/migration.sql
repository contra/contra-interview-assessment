/*
  Warnings:

  - You are about to drop the column `isOn` on the `UserFlag` table. All the data in the column will be lost.
  - You are about to drop the column `variantId` on the `UserFlag` table. All the data in the column will be lost.
  - You are about to drop the `Variant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_account` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `value` to the `UserFlag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserFlag" DROP CONSTRAINT "UserFlag_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserFlag" DROP CONSTRAINT "UserFlag_variantId_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_featureFlagId_fkey";

-- AlterTable
ALTER TABLE "UserFlag" DROP COLUMN "isOn",
DROP COLUMN "variantId",
ADD COLUMN     "value" TEXT NOT NULL;

-- DropTable
DROP TABLE "Variant";

-- DropTable
DROP TABLE "user_account";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "given_name" VARCHAR(255) NOT NULL,
    "family_name" VARCHAR(255) NOT NULL,
    "email_address" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_address_key" ON "User"("email_address");

-- AddForeignKey
ALTER TABLE "UserFlag" ADD CONSTRAINT "UserFlag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
