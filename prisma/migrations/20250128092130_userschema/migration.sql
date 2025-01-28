/*
  Warnings:

  - You are about to drop the column `permissions` on the `user` table. All the data in the column will be lost.
  - Added the required column `contact` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `permissions`,
    ADD COLUMN `classroomId` INTEGER NULL,
    ADD COLUMN `contact` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_classroomId_fkey` FOREIGN KEY (`classroomId`) REFERENCES `Classroom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
