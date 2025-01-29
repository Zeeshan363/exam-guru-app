import { BadRequestException, Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
