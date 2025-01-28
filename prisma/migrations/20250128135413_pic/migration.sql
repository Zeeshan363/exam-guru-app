/*
  Warnings:

  - Added the required column `profilePicture` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicture` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Made the column `profilePicture` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `student` ADD COLUMN `profilePicture` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `teacher` ADD COLUMN `profilePicture` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `profilePicture` VARCHAR(191) NOT NULL;
