import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { DatabaseService } from 'src/database/database.service';
import hash from "bcrypt"

@Injectable()
export class TeachersService {
  constructor(private prisma: DatabaseService) { }

  async create(createTeacherDto: CreateTeacherDto) {
    try {
      const { profilePicture, whatsappNo, contactNo, email, gender, name, password, branchId, institutionId } = createTeacherDto;
      const hashedPassword = await hash.hash(password, 10)
      // create the user in the database
      const user = await this.prisma.user.create({
        data: {
          contact: contactNo,
          role: "teacher",
          password: hashedPassword,
          institutionId,
          profilePicture,
          name
        }
      })
      // create the teacher in the database
      await this.prisma.teacher.create({
        data: {
          name,
          contactNo,
          password: hashedPassword,
          whatsappNo,
          email,
          profilePicture,
          gender,
          branchId,
          institutionId,
          userId: user.id
        }
      })
    } catch (error) {
      throw new BadRequestException("Internal server error")

    }
  }

  async findAll() {
    try {
      const result = await this.prisma.teacher.findMany()
      return {
        success: true,
        message: "Teachers fetched successfully",
        data: result
      }
    } catch (error) {
      return {
        success: false,
        message: "Teachers fetch failed" + error
      }
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.teacher.findUnique({
        where: {
          id
        }
      })
      if (!result) {
        throw new BadRequestException("Teacher not found")
      }
      return {
        success: true,
        message: "Teacher fetched successfully",
        data: result
      }
    } catch (error) {
      return {
        success: false,
        message: "Teacher fetch failed" + error
      }
    }
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    try {
      const { profilePicture, whatsappNo, contactNo, email, gender, name, password, branchId, institutionId } = updateTeacherDto;
      const hashedPassword = await hash.hash(password, 10)
      // update user in user table
    const user=  await this.prisma.user.update({
        where: {
          id
        },
        data: {
          contact: contactNo,
          password: hashedPassword,
          profilePicture,
          name
        }
      })
      const result=await this.prisma.teacher.update({
        where: {
          id
        },
        data: {
          name,
          contactNo,
          password: hashedPassword,
          whatsappNo,
          email,
          profilePicture,
          gender,
          branchId,
          institutionId,
          userId: user.id
      }})
      return {
        success: true,
        message: "Teacher updated successfully",
        data: result
      }
    } catch (error) { 
      return {
        success: false,
        message: "Teacher update failed" + error
      }
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.user.delete({
        where: {
          id: (await this.prisma.teacher.findUnique({ where: { id } })).userId
        }
      })
      const result = await this.prisma.teacher.delete({
        where: {
          id
        }
      })
      return {
        success: true,
        message: "Teacher deleted successfully",
        data: result
      }
    } catch (error) {
      throw new BadRequestException("Internal server error")
    }
  }
}
