/*
  Warnings:

  - A unique constraint covering the columns `[pinnedPostId]` on the table `Board` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'EARLY';

-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "pinnedPostId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Board_pinnedPostId_key" ON "Board"("pinnedPostId");

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_pinnedPostId_fkey" FOREIGN KEY ("pinnedPostId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
