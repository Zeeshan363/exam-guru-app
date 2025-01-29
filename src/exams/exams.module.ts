import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PaginationService } from 'src/common/services/pagination.service';

@Module({
  controllers: [ExamsController],
  providers: [ExamsService, PaginationService],
  imports: [DatabaseModule]
})
export class ExamsModule {}
