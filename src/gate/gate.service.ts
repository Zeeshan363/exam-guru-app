import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGateDto } from './dto/create-gate.dto';
import { UpdateGateDto } from './dto/update-gate.dto';
import { DatabaseService } from 'src/database/database.service';
import { PaginationService } from 'src/common/services/pagination.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class GateService {
    constructor(
        private prisma: DatabaseService, 
        private paginationService: PaginationService
    ){}

    async create(CreateGateDto: CreateGateDto) {
        try {
            const result = await this.prisma.gate.create({
              data: {
                no: CreateGateDto.no,
                password: CreateGateDto.password,
                institutionId: CreateGateDto.institutionId
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
        return `This action returns a #${id} section`;
    }

    update(id: number, updateGateDto: UpdateGateDto) {
        return `This action updates a #${id} section`;
    }

    remove(id: number) {
        return `This action removes a #${id} section`;
    }
}
