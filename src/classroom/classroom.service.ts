import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { DatabaseService } from 'src/database/database.service';
import { PaginationService } from 'src/common/services/pagination.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ClassroomService {
  constructor(
    private prisma: DatabaseService, 
    private paginationService: PaginationService
  ){}
  async create(createClassroomDto: CreateClassroomDto) {
    try {
      const { name } = createClassroomDto;
      const result = await this.prisma.classroom.create({
        data: {
          name
        }
      })
      return {
        id: result.id,
        success: true,
        message: "Classroom created successfully"
      }
    } catch (error) {
      return {
        success: false,
        message: "Classroom creation failed" + error
      }
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const result = await this.paginationService.paginate(
        this.prisma.classroom,
        paginationDto,
        {},
        {}
      );

      return result; 
    } catch (error) {
      throw new BadRequestException("Classrooms not found")
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.classroom.findUnique({
        where: {
          id
        }
      })
      if (!result) {
        throw new BadRequestException("Classroom not found")
      }
      return {
        success: true,
        message: "Classroom fetched successfully",
        data: result
      }
    } catch (error) {
      return {
        success: false,
        message: "Classroom fetch failed" + error
      }
    }
  }

  update(id: number, updateClassroomDto: UpdateClassroomDto) {
    return `This action updates a #${id} classroom`;
  }

  async remove(id: number) {
    try{
      const result = await this.prisma.classroom.delete({
        where: {
          id
        }
      })
      return {
        success: true,
        message: "classroom deleted successfully",
        data: result
      }
    }catch(error){
      throw new BadGatewayException("Internal server error")
    }
  }
}
