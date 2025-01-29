import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PaginationService } from 'src/common/services/pagination.service';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, PaginationService],
  imports: [DatabaseModule]
})
export class CoursesModule {}
