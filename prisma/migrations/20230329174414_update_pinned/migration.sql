/*
  Warnings:

  - You are about to drop the column `pinnedPostId` on the `Board` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pinnedBoardId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_pinnedPostId_fkey";

-- DropIndex
DROP INDEX "Board_pinnedPostId_key";

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "pinnedPostId";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "pinnedBoardId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Post_pinnedBoardId_key" ON "Post"("pinnedBoardId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_pinnedBoardId_fkey" FOREIGN KEY ("pinnedBoardId") REFERENCES "Board"("id") ON DELETE SET NULL ON UPDATE CASCADE;
