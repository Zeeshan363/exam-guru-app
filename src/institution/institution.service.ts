import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { DatabaseService } from 'src/database/database.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationService } from 'src/common/services/pagination.service';

@Injectable()
export class InstitutionService {
  constructor(
    private prisma: DatabaseService, 
    private paginationService: PaginationService
  ) { }
  
  async create(createInstitutionDto: CreateInstitutionDto) {
    try {
      const { name, address } = createInstitutionDto;
      const result = await this.prisma.institution.create({
        data: {
          name,
          address
        }
      })
      return {
        id: result.id,
        success: true,
        message: "Institution created successfully"
      }
    } catch (error) {
      return {
        success: false,
        message: "Institution creation failed" + error
      }
    }

  }

  async findAll(paginationDto: PaginationDto) {
    try {
      // const result = await this.prisma.institution.findMany()
      // return {
      //   success: true,
      //   message: "Institutions fetched successfully",
      //   data: result
      // }
      const result = await this.paginationService.paginate(
        this.prisma.institution,
        paginationDto,
        {},
        {}
      );

      return result; 
    } catch (error) {
      throw new BadRequestException("Institutions not found")
    }
  }
}