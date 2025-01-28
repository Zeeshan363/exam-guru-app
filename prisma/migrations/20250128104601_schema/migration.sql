/*
  Warnings:

  - You are about to drop the column `branchName` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the column `gateNo` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the column `attendanceId` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `gateId` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `gateId` on the `teacher` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `teacher` table. All the data in the column will be lost.
  - You are about to drop the column `parentContactNo` on the `teacher` table. All the data in the column will be lost.
  - You are about to drop the column `parentWhatsappNo` on the `teacher` table. All the data in the column will be lost.
  - You are about to drop the column `classroomId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `_attendancetoexam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_classroomtosection` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gateId` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classroomId` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_attendancetoexam` DROP FOREIGN KEY `_AttendanceToExam_A_fkey`;

-- DropForeignKey
ALTER TABLE `_attendancetoexam` DROP FOREIGN KEY `_AttendanceToExam_B_fkey`;

-- DropForeignKey
ALTER TABLE `_classroomtosection` DROP FOREIGN KEY `_ClassroomToSection_A_fkey`;

-- DropForeignKey
ALTER TABLE `_classroomtosection` DROP FOREIGN KEY `_ClassroomToSection_B_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_attendanceId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_gateId_fkey`;

-- DropForeignKey
ALTER TABLE `teacher` DROP FOREIGN KEY `Teacher_gateId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_classroomId_fkey`;

-- DropIndex
DROP INDEX `Student_attendanceId_fkey` ON `student`;

-- DropIndex
DROP INDEX `Student_gateId_fkey` ON `student`;

-- DropIndex
DROP INDEX `Teacher_gateId_fkey` ON `teacher`;

-- DropIndex
DROP INDEX `User_classroomId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `attendance` DROP COLUMN `branchName`,
    DROP COLUMN `gateNo`,
    DROP COLUMN `name`,
    DROP COLUMN `role`,
    ADD COLUMN `examId` INTEGER NULL,
    ADD COLUMN `gateId` INTEGER NOT NULL,
    ADD COLUMN `studentId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `section` ADD COLUMN `classroomId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `attendanceId`,
    DROP COLUMN `gateId`,
    DROP COLUMN `name`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `teacher` DROP COLUMN `gateId`,
    DROP COLUMN `name`,
    DROP COLUMN `parentContactNo`,
    DROP COLUMN `parentWhatsappNo`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `classroomId`;

-- DropTable
DROP TABLE `_attendancetoexam`;

-- DropTable
DROP TABLE `_classroomtosection`;

-- CreateTable
CREATE TABLE `_GateToStudent` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GateToStudent_AB_unique`(`A`, `B`),
    INDEX `_GateToStudent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Student_userId_key` ON `Student`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Teacher_userId_key` ON `Teacher`(`userId`);

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_gateId_fkey` FOREIGN KEY (`gateId`) REFERENCES `Gate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `Exam`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_classroomId_fkey` FOREIGN KEY (`classroomId`) REFERENCES `Classroom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GateToStudent` ADD CONSTRAINT `_GateToStudent_A_fkey` FOREIGN KEY (`A`) REFERENCES `Gate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GateToStudent` ADD CONSTRAINT `_GateToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
