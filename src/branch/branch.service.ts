import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { DatabaseService } from 'src/database/database.service';
import { PaginationService } from 'src/common/services/pagination.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class BranchService {
  constructor(
    private prisma: DatabaseService,
    private paginationService: PaginationService
  ){}
  async create(createBranchDto: CreateBranchDto) {
    try {
      const { name, address, institutionId } = createBranchDto;
      const result = await this.prisma.branch.create({
        data: {
          name,
          address,
          institutionId
        }
      })
      return {
        id: result.id,
        success: true,
        message: "Branch created successfully"
      }
    } catch (error) {
      return {
        success: false,
        message: "Branch creation failed" + error
      }
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const result = await this.paginationService.paginate(
        this.prisma.branch,
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
      const result = await this.prisma.branch.findUnique({
        where: {
          id
        }
      })
      if (!result) {
        throw new BadRequestException("Branch not found")
      }
      return {
        success: true,
        message: "Branch fetched successfully",
        data: result
      }
    } catch (error) {
      return {
        success: false,
        message: "Branch fetch failed" + error
      }
    }
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    return `This action updates a #${id} branch`;
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }
}
