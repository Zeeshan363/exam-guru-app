import { Module } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { InstitutionController } from './institution.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [InstitutionController],
  providers: [InstitutionService,JwtService],
  imports:[DatabaseModule]
})
export class InstitutionModule {}
