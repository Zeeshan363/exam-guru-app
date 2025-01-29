import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateClassroomDto {
    @ApiProperty()
    @IsString()
    name: string;
}
