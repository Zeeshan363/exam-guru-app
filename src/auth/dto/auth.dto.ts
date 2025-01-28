import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAuthDto {}
export class SignInDto {
  
   
    @ApiProperty({ description: 'The institution ID' })
    @IsNotEmpty()
    @IsNumber()
    institutionId: number;

    @ApiProperty({ description: 'The phone number of the user' })
    @IsNotEmpty()
    @IsEmail()
    phoneNumber: string;

    @ApiProperty({ description: 'The password of the user' })
    @IsNotEmpty()
    @IsString()
    password: string;
}


export class SignUpDto {
    @ApiProperty({ description: 'The profile picture' })
    @IsNotEmpty()
    @IsString()
    profilePicture: string;
    
    @ApiProperty({ description: 'The name of the user' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'The contact number of the user' })
    @IsNotEmpty()
    @IsString()
    contact: string;

    @ApiProperty({ description: 'The classroom of the user', required: false })
    @IsString()
    classroom?: number;

    @ApiProperty({ description: 'The password of the user' })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ description: 'The role of the user', enum: ['admin', 'teacher', 'student', 'staff'], default: 'student' })
    @IsNotEmpty()
    @IsString()
    role: 'admin' | 'teacher' | 'student' | 'staff' = 'student';
}