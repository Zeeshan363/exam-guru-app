import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService,JwtService],
  imports:[DatabaseModule]
})
export class StudentsModule {}
