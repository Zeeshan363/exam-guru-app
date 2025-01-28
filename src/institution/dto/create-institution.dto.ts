import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class CreateInstitutionDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    address: string;
}

