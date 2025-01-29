import { Module } from '@nestjs/common';
import { GateController } from './gate.controller';
import { GateService } from './gate.service';
import { DatabaseModule } from 'src/database/database.module';
import { PaginationService } from 'src/common/services/pagination.service';

@Module({
  controllers: [GateController],
  providers: [GateService, PaginationService],
  imports: [DatabaseModule]
})
export class GateModule {}
