import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { DatabaseService } from 'src/database/database.service';
import { PaginationService } from 'src/common/services/pagination.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ExamsService {
  constructor(
    private prisma: DatabaseService, 
    private paginationService: PaginationService
  ){}

  async create(createExamDto: CreateExamDto) {
    try {
      const { name, startTime, endTime, duration, showResultAfter, sendResult, institutionId } = createExamDto;
      const result = await this.prisma.exam.create({
        data: {
          name,
          startTime, 
          endTime, 
          duration, 
          showResultAfter, 
          sendResult, 
          institutionId
        }
      })
      return {
        id: result.id,
        success: true,
        message: "Exam created successfully"
      }
    } catch (error) {
      return {
        success: false,
        message: "Exam creation failed" + error
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

  async findOne(id: number) {
    try {
      const result = await this.prisma.exam.findUnique({
        where: {
          id
        }
      })
      if (!result) {
        throw new BadRequestException("Exam not found")
      }
      return {
        success: true,
        message: "Exam fetched successfully",
        data: result
      }
    } catch (error) {
      return {
        success: false,
        message: "Exam fetch failed" + error
      }
    }
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    return `This action updates a #${id} exam`;
  }

  async remove(id: number) {
    try{
      const result = await this.prisma.exam.delete({
        where: {
          id
        }
      })
      return {
        success: true,
        message: "exam deleted successfully",
        data: result
      }
    }catch(error){
      throw new BadGatewayException("Internal server error")
    }
  }
}
