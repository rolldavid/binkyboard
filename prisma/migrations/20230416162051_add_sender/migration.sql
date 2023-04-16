/*
  Warnings:

  - Made the column `sender` on table `NotificationActive` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "NotificationActive" ALTER COLUMN "sender" SET NOT NULL;
