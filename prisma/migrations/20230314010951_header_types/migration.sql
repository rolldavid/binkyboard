/*
  Warnings:

  - Made the column `headerURL` on table `Board` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "headerURL" SET NOT NULL,
ALTER COLUMN "headerURL" SET DEFAULT '';
