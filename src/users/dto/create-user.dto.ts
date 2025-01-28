import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsNotEmpty, IsEnum, IsEmail } from 'class-validator';
import { Role } from '@prisma/client';
import * as XLSX from 'xlsx';


export class CreateUserDto {
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    


    @ApiProperty({ enum: Role })
    @IsEnum(Role)
    role: Role;

    @ApiProperty({ required: true})
    @IsString()
    @IsNotEmpty()
    profilePicture: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    contact: string;

    @ApiProperty()
    @IsInt()
    institutionId: number;

    @ApiProperty()
    @IsInt()
    @IsOptional()
    classroomId?: number;
}



export class CreateUserBulkDto {
    @ApiProperty({ type: [CreateUserDto] })
    users: CreateUserDto[];
    
    static fromExcel(filePath: string): CreateUserBulkDto {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);

        const users = json.map((row: any) => {
            const user = new CreateUserDto();
            user.name = row['name'];
            user.role = row['role'];
            user.profilePicture = row['profilePicture'];
            user.password = row['password'];
            user.contact = row['contact'];
            user.institutionId = row['institutionId'];
            user.classroomId = row['classroomId'];
            return user;
        });

        const bulkDto = new CreateUserBulkDto();
        bulkDto.users = users;
        return bulkDto;
    }
}