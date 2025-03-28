/*
  Warnings:

  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `job` VARCHAR(255) NULL,
    MODIFY `name` VARCHAR(100) NULL;
