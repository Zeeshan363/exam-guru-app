import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
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

    async findOne(id: number) {
      try {
        const result = await this.prisma.gate.findUnique({
          where: {
            id
          }
        })
        if (!result) {
          throw new BadRequestException("Gate not found")
        }
        return {
          success: true,
          message: "Gate fetched successfully",
          data: result
        }
      } catch (error) {
        return {
          success: false,
          message: "Gate fetch failed" + error
        }
      }
    }

    async update(id: number, updateGateDto: UpdateGateDto) {
      try {
        const result = await this.prisma.gate.update({
          where: {
            id: id
          },
          data: {
            no: updateGateDto.no,
            password: updateGateDto.password,
            institutionId: updateGateDto.institutionId
          }
        });
  
        return {
          id: result.id,
          success: true,
          message: "Gate updated successfully"
        };
      } catch (error) {
        return {
          success: false,
          message: "Gate update failed: " + error
        };
      }
    }

    async remove(id: number) {
      try{
        const result = await this.prisma.gate.delete({
          where: {
            id
          }
        })
        return {
          success: true,
          message: "gate deleted successfully",
          data: result
        }
      }catch(error){
        throw new BadGatewayException("Internal server error")
      }
    }
}
