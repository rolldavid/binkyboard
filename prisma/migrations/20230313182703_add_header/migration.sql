-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "customHeader" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "headerURL" TEXT;
