import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DatabaseService } from 'src/database/database.service';
import { PaginationService } from 'src/common/services/pagination.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CoursesService {
  constructor(
      private prisma: DatabaseService, 
      private paginationService: PaginationService
  ){}
  
  async create(createCourseDto: CreateCourseDto) {
    try {
      const result = await this.prisma.course.create({
        data: {
          name: createCourseDto.name,
          institutionId: createCourseDto.institutionId
        }
      })
      return {
        id: result.id,
        success: true,
        message: "Gate created successfully"
      }
    } catch (error) {
      return {
        success: false,
        message: "Gate creation failed" + error
      }
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const result = await this.paginationService.paginate(
      this.prisma.exam,
      paginationDto,
      {},
      {}
      );

      return result; 
    } catch (error) {
      throw new BadRequestException("Exams not found")
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
