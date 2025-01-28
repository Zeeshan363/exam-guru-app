import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DatabaseService } from 'src/database/database.service';
import hash from "bcrypt"

@Injectable()
export class StudentsService {
  constructor(private prisma: DatabaseService) { }

  async create(createStudentDto: CreateStudentDto) {
    try {
      const { name, rollNo, contactNo, parentContactNo, parentWhatsappNo, whatsappNo, email, gender, password, sectionId, classroomId, institutionId, branchId,profilePicture } = createStudentDto;
      // create user in user table
      const hashedPassword = await hash.hash(password, 10)
      const user = await this.prisma.user.create({
        data: {
          name,
          contact: contactNo,
          role: "student",
          password: hashedPassword,
          institutionId,
          profilePicture
        }
      })
      // create student in student table
      await this.prisma.student.create({
        data: {
          name,
          rollNo,
          contactNo,
          whatsappNo,
          gender,
          email,
          institutionId,
          parentContactNo,
          parentWhatsappNo,
          classroomId,
          sectionId,
          branchId,
          password: hashedPassword,
          userId: user.id,
          profilePicture
        }
      })
    } catch (error) {
      return {
        success: false,
        message: "Student creation failed" + error
      }
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.student.findMany()
      return {
        success: true,
        message: "Students fetched successfully",
        data: result
      }
    } catch (error) {
      throw new BadRequestException("Students not found")
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.student.findUnique({
        where: {
          id
        }
      })
      return {
        success: true,
        message: "Student fetched successfully",
        data: result
      }
    } catch (error) {
      throw new BadRequestException("Student not found")
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      const { name, rollNo, contactNo, parentContactNo, parentWhatsappNo, whatsappNo, email, gender, password, sectionId, classroomId, institutionId, branchId,profilePicture } = updateStudentDto;
      // update user in user table
      const hashedPassword = await hash.hash(password, 10)
      const user = await this.prisma.user.update({
        where: {
          id
        },
        data: {
          name,
          contact: contactNo,
          password: hashedPassword,
          profilePicture,
        }
      })

      // update student in student table
      const result = await this.prisma.student.update({
        where: {
          id
        },
        data: {
          name,
          rollNo,
          contactNo,
          whatsappNo,
          gender,
          email,
          institutionId,
          parentContactNo,
          parentWhatsappNo,
          classroomId,
          sectionId,
          branchId,
          profilePicture,
          password: hashedPassword,
          userId: user.id
        }
      })
      return {
        success: true,
        message: "Student updated successfully",
        data: result
      }
    } catch (error) {
      return {
        success: false,
        message: "Student updation failed" + error
      }
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.user.delete({
        where: {
          id: (await this.prisma.student.findUnique({ where: { id } })).userId
        }
      })
      const result = await this.prisma.student.delete({
        where: {
          id
        }
      })
      return {
        success: true,
        message: "Student deleted successfully",
        data: result
      }
    } catch (error) {
      return {
        success: false,
        message: "Student deletion failed" + error
      }
    }
  }
}
