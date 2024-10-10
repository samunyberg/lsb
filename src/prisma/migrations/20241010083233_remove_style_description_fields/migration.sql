/*
  Warnings:

  - You are about to drop the column `description_en` on the `style` table. All the data in the column will be lost.
  - You are about to drop the column `description_fi` on the `style` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `style` DROP COLUMN `description_en`,
    DROP COLUMN `description_fi`;
