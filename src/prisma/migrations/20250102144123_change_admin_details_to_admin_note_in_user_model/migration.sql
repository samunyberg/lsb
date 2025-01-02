/*
  Warnings:

  - You are about to drop the column `adminDetails` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `adminDetails`,
    ADD COLUMN `adminNote` VARCHAR(500) NULL;
