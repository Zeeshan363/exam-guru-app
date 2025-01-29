import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateCourseDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsInt()
    institutionId: number;
}
