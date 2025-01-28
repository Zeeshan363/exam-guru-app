import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserBulkDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private prisma: DatabaseService) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { name, contact, classroomId, password, role,profilePicture } = createUserDto;
      const result = await this.prisma.user.create({
        data: {
          name,
          role,
          classroomId,
          password,
          profilePicture,
          contact,
          institutionId: 1,

        }
      })
      return {
        success: true,
        message: "User created successfully",
        data: result.id
      }
    } catch (error) {
      throw new BadGatewayException("Internal server error")
    }
  }

  async createBulkUsers(createUserDto: CreateUserBulkDto) {
    try {
      const { users } = createUserDto;
      const result = await this.prisma.user.createMany({
        data: users
      })
      return {
        success: true,
        message: "Users created successfully",
        data: result.count
      }
    } catch (error) {
      throw new BadGatewayException("Internal server error")
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.user.findMany()
      return {
        success: true,
        message: "Users fetched successfully",
        data: result
      }
    } catch (error) {
      return {
        success: false,
        message: "Users not found"
      }
    }
  }

  async findOne(id: number) {
    try{
      const result = await this.prisma.user.findUnique({
        where: {
          id
        }
      })
      if(!result){
        throw new BadRequestException("User not found")
      }
      return {
        success: true,
        message: "User fetched successfully",
        data: result
      }
    }catch(error){
      return {
        success: false,
        message: "User not found"
      }
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try{
      const { name, contact, classroomId, password, role } = updateUserDto;
      const result = await this.prisma.user.update({
        where: {
          id
        },
        data: {
          name,
          role,
          classroomId,
          password,
          contact
        }
      })
      return {
        success: true,
        message: "User updated successfully",
        data: result
      }
    }catch(error){
      throw new BadGatewayException("Internal server")
  }
  }
  async remove(id: number) {
    try{
      const result = await this.prisma.user.delete({
        where: {
          id
        }
      })
      return {
        success: true,
        message: "User deleted successfully",
        data: result
      }
    }catch(error){
      throw new BadGatewayException("Internal server error")
    }
  }
}
