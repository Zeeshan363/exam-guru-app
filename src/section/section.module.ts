import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { PaginationService } from 'src/common/services/pagination.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [SectionController],
  providers: [SectionService, PaginationService],
  imports: [DatabaseModule]
})
export class SectionModule {}
