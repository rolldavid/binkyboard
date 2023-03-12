/*
  Warnings:

  - You are about to drop the column `boardId` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_boardId_fkey";

-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "registry" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "boardId";

-- CreateTable
CREATE TABLE "_allowList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_allowList_AB_unique" ON "_allowList"("A", "B");

-- CreateIndex
CREATE INDEX "_allowList_B_index" ON "_allowList"("B");

-- AddForeignKey
ALTER TABLE "_allowList" ADD CONSTRAINT "_allowList_A_fkey" FOREIGN KEY ("A") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_allowList" ADD CONSTRAINT "_allowList_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
