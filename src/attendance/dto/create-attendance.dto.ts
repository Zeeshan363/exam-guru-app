import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt } from "class-validator";

export class CreateAttendanceDto {
    @ApiProperty({ 
        description: 'Arrival time of the student',
        example: '2025-02-01T09:00:00Z'
    })
    @IsDateString()
    arrivalTime: string;

    @ApiProperty({ 
        description: 'Departure time of the student',
        example: '2025-02-01T17:00:00Z'
    })
    @IsDateString()
    departureTime: string;

    @ApiProperty()
    @IsInt()
    gateId: number;
    
    @ApiProperty()
    @IsInt()
    studentId: number;
    
    @ApiProperty()
    @IsInt()
    examId: number;
}