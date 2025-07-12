/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `posts` table. All the data in the column will be lost.
  - Added the required column `mediaUrl` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `posts` DROP COLUMN `imageUrl`,
    ADD COLUMN `mediaUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `photoProfileUrl` VARCHAR(191) NOT NULL DEFAULT '${env(''URL'')}/images/default_profile_img.svg';
