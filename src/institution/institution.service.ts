import { Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class InstitutionService {
  constructor(private prisma: DatabaseService) { }
  
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
}