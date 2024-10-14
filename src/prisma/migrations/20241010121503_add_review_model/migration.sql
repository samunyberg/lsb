-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stars` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `text` VARCHAR(1000) NOT NULL,
    `status` ENUM('PENDING', 'APPROVED') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
