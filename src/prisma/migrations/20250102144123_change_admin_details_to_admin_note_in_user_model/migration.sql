-- AlterTable
ALTER TABLE `user` DROP COLUMN `adminDetails`,
    ADD COLUMN `adminNote` VARCHAR(500) NULL;