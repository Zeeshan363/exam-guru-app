import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateTeacherDto {
    @ApiProperty({ description: 'Teacher name' })
    @IsString()
    @IsNotEmpty()
    name: string;
 
    @ApiProperty({ description: 'Profile picture URL' })
    @IsString()
    @IsNotEmpty()
    profilePicture: string;

    @ApiProperty({ description: 'Contact number' })
    @IsString()
    @IsNotEmpty()
    contactNo: string;

    @ApiProperty({ description: 'WhatsApp number' })
    @IsString()
    @IsNotEmpty()
    whatsappNo: string;

    @ApiProperty({ description: 'Gender' })
    @IsString()
    @IsNotEmpty()
    gender: string;

    @ApiProperty({ description: 'Email address' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Password' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ description: 'Branch ID' })
    @IsInt()
    branchId: number;

    @ApiProperty({ description: 'Institution ID' })
    @IsInt()
    institutionId: number;

    @ApiProperty({ description: 'User ID' })
    @IsInt()
    userId: number;
}