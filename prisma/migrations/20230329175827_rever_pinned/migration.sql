/*
  Warnings:

  - You are about to drop the column `pinnedBoardId` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pinnedPostId]` on the table `Board` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_pinnedBoardId_fkey";

-- DropIndex
DROP INDEX "Post_pinnedBoardId_key";

-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "pinnedPostId" INTEGER;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "pinnedBoardId";

-- CreateIndex
CREATE UNIQUE INDEX "Board_pinnedPostId_key" ON "Board"("pinnedPostId");

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_pinnedPostId_fkey" FOREIGN KEY ("pinnedPostId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
