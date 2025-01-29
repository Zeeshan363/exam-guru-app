import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateGateDto {
    @ApiProperty()
    @IsString()
    no: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsInt()
    institutionId: number;
}