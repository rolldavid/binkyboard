/*
  Warnings:

  - Made the column `sender` on table `NotificationComplete` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "NotificationComplete" ALTER COLUMN "sender" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "boardOrder" TEXT[];
