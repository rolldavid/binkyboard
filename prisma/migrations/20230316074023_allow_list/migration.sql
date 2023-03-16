/*
  Warnings:

  - You are about to drop the column `pinned` on the `Board` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "pinned",
ADD COLUMN     "allowedList" TEXT;

-- DropEnum
DROP TYPE "ReactionType";
