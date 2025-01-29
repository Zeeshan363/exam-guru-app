import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, Query } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) { }

  @UseGuards(AuthGuard)
  @Post("create")
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key needed to access the endpoints',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'Institution created successfully.' })
  @ApiResponse({ status: 400, description: 'Institution creation failed.' })
  async create(@Body(ValidationPipe) createInstitutionDto: CreateInstitutionDto) {
    try {
      const res = await this.institutionService.create(createInstitutionDto)
      if (res) {
        return {
          success: true,
          message: "Institution created successfully"
        }
      }
    } catch (error) {
      return {
        success: false,
        message: "Institution creation failed" + error
      }
    }
  }

  @ApiResponse({ status: 200, description: 'Institutions fetched successfully.' })
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.institutionService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.institutionService.findOne(+id);
  }
}
