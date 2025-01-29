import { BadRequestException, Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} classroom`;
  }

  update(id: number, updateClassroomDto: UpdateClassroomDto) {
    return `This action updates a #${id} classroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} classroom`;
  }
}
