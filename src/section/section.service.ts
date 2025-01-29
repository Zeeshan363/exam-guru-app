import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { DatabaseService } from 'src/database/database.service';
import { PaginationService } from 'src/common/services/pagination.service';

@Injectable()
export class SectionService {
  constructor(
    private prisma: DatabaseService, 
    private paginationService: PaginationService
  ){}

  create(createSectionDto: CreateSectionDto) {
    return 'This action adds a new section';
  }

  findAll() {
    return `This action returns all section`;
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.section.findUnique({
        where: {
          id
        }
      })
      if (!result) {
        throw new BadRequestException("Section not found")
      }
      return {
        success: true,
        message: "Section fetched successfully",
        data: result
      }
    } catch (error) {
      return {
        success: false,
        message: "Section fetch failed" + error
      }
    }
  }

  update(id: number, updateSectionDto: UpdateSectionDto) {
    return `This action updates a #${id} section`;
  }

  async remove(id: number) {
    try{
      const result = await this.prisma.section.delete({
        where: {
          id
        }
      })
      return {
        success: true,
        message: "section deleted successfully",
        data: result
      }
    }catch(error){
      throw new BadGatewayException("Internal server error")
    }
  }
}
