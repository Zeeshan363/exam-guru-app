import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiResponse } from '@nestjs/swagger';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}
 
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key needed to access the endpoints',
    required: false,
  }) // Add the header here
  @ApiResponse({ status: 201, description: 'Student created successfully.' })
  @Post()
  create(@Body(ValidationPipe) createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key needed to access the endpoints',
    required: false,
  }) // Add the header here
  @ApiResponse({ status: 200, description: 'Students fetched successfully.' })
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key needed to access the endpoints',
    required: false,
  }) // Add the header here
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key needed to access the endpoints',
    required: false,
  }) // Add the header here
  @ApiResponse({ status: 201, description: 'Student Updated successfully.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key needed to access the endpoints',
    required: false,
  }) // Add the header here
  @ApiResponse({ status: 201, description: 'Student Deleted successfully.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
