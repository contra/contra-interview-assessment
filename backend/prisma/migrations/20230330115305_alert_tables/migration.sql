/*
  Warnings:

  - Added the required column `value` to the `UserFlag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserFlag" ADD COLUMN     "value" BOOLEAN NOT NULL;
