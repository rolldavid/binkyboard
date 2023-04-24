/*
  Warnings:

  - You are about to drop the column `collaboratorId` on the `Board` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_collaboratorId_fkey";

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "collaboratorId";
