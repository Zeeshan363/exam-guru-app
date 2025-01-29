import { Module } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';
import { PaginationService } from 'src/common/services/pagination.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [ClassroomController],
  providers: [ClassroomService, PaginationService],
  imports: [DatabaseModule]
})
export class ClassroomModule {}
