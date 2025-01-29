import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PaginationService } from 'src/common/services/pagination.service';

@Module({
  controllers: [AttendanceController],
  providers: [AttendanceService, PaginationService],
  imports: [DatabaseModule]
})
export class AttendanceModule {}
