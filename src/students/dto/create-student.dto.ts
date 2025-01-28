import { IsInt, IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
    @ApiProperty()
    @IsString()
    profilePicture: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    rollNo: string;

    @ApiProperty()
    @IsString()
    contactNo: string;

    @ApiProperty()
    @IsString()
    whatsappNo: string;

    @ApiProperty()
    @IsString()
    parentContactNo: string;

    @ApiProperty()
    @IsString()
    parentWhatsappNo: string;

    @ApiProperty()
    @IsString()
    gender: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty()
    @IsInt()
    classroomId: number;

    @ApiProperty()
    @IsInt()
    sectionId: number;

    @ApiProperty()
    @IsInt()
    branchId: number;

    @ApiProperty()
    @IsInt()
    institutionId: number;

    @ApiProperty()
    @IsInt()
    userId: number;

   
}
