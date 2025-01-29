import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PaginationService } from 'src/common/services/pagination.service';

@Module({
  controllers: [BranchController],
  providers: [BranchService, PaginationService],
  imports: [DatabaseModule]
})
export class BranchModule {}
