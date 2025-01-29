import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { DatabaseService } from 'src/database/database.service';
import { PaginationService } from 'src/common/services/pagination.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class AttendanceService {
  constructor(
    private prisma: DatabaseService, 
    private paginationService: PaginationService
  ){}

  async create(createAttendanceDto: CreateAttendanceDto) {
    try {
      const result = await this.prisma.attendance.create({
        data: {
          arrivalTime: createAttendanceDto.arrivalTime,
          departureTime: createAttendanceDto.departureTime,
          gateId: createAttendanceDto.gateId,
          studentId: createAttendanceDto.studentId,
          examId: createAttendanceDto.examId
        }
      })
      return {
        id: result.id,
        success: true,
        message: "Attendance created successfully"
      }
    } catch (error) {
      return {
        success: false,
        message: "Attendance creation failed" + error
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
      const result = await this.prisma.attendance.findUnique({
        where: {
          id
        }
      })
      if (!result) {
        throw new BadRequestException("Attendance not found")
      }
      return {
        success: true,
        message: "Attendance fetched successfully",
        data: result
      }
    } catch (error) {
      return {
        success: false,
        message: "Attendance fetch failed" + error
      }
    }
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  async remove(id: number) {
    try{
      const result = await this.prisma.attendance.delete({
        where: {
          id
        }
      })
      return {
        success: true,
        message: "attendance deleted successfully",
        data: result
      }
    }catch(error){
      throw new BadGatewayException("Internal server error")
    }
  }
}
