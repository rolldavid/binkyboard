/*
  Warnings:

  - You are about to drop the column `allowedList` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `customHeader` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `headerURL` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the `_allowList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_allowList" DROP CONSTRAINT "_allowList_A_fkey";

-- DropForeignKey
ALTER TABLE "_allowList" DROP CONSTRAINT "_allowList_B_fkey";

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "allowedList",
DROP COLUMN "customHeader",
DROP COLUMN "headerURL",
ADD COLUMN     "allowList" TEXT,
ADD COLUMN     "headerUrl" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "_allowList";
