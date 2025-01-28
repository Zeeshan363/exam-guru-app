import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserBulkDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBody, ApiConsumes, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(AuthGuard)
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key needed to access the endpoints',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key needed to access the endpoints',
    required: true,
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('bulk')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // Indicates file upload,
          description: 'Excel file containing user data E.g name, role, profilePicture, password, contact, institutionId, classroomId',

        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Users created successfully.' })
  async createBulkUsers(
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    // Process the uploaded file
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet);

    // Map the JSON rows to CreateUserDto[]
    const users = json.map((row: any) => ({
      name: row['name'],
      role: row['role'],
      profilePicture: row['profilePicture'],
      password: row['password'],
      contact: row['contact'],
      institutionId: row['institutionId'],
      classroomId: row['classroomId'],
    }));

    // Convert to CreateUserBulkDto
    const createUserBulkDto = new CreateUserBulkDto();
    createUserBulkDto.users = users;

    // Pass the DTO to the service
    return this.usersService.createBulkUsers(createUserBulkDto);
  }

  @UseGuards(AuthGuard)
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key needed to access the endpoints',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Users fetched successfully.' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  
  @UseGuards(AuthGuard)
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key needed to access the endpoints',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'User fetched successfully.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key needed to access the endpoints',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'User Updated successfully.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  
  @UseGuards(AuthGuard)
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key needed to access the endpoints',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'User Deleted successfully.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
