import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsString, IsDateString } from "class-validator";

export class CreateExamDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ 
        description: 'Exam start time',
        example: '2025-02-01T10:00:00Z' 
    })
    @IsDateString()
    startTime: string;

    @ApiProperty({ 
        description: 'Exam end time',
        example: '2025-02-01T12:00:00Z'
    })
    @IsDateString()
    endTime: string;  

    @ApiProperty({ 
        description: 'Duration in minutes',
        example: 120
    })
    @IsInt()
    duration: number;
    
    @ApiProperty({ 
        description: 'Show result after exam completion',
        default: false
    })
    @IsBoolean()
    showResultAfter: boolean;

    @ApiProperty({ 
        description: 'Send result to student',
        default: false
    })
    @IsBoolean()
    sendResult: boolean;

    @ApiProperty({ 
        description: 'Institution ID',
        example: 1
    })
    @IsInt()
    institutionId: number;
}