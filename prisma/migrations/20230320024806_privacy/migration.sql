/*
  Warnings:

  - You are about to drop the column `public` on the `Board` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PrivacyLevel" AS ENUM ('ONE', 'TWO', 'THREE');

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "public",
ADD COLUMN     "privacy" "PrivacyLevel" NOT NULL DEFAULT 'ONE';
