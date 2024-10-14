/*
  Warnings:

  - You are about to drop the column `createdAT` on the `review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `review` DROP COLUMN `createdAT`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
