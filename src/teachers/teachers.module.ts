import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService,JwtService],
  imports:[DatabaseModule]
})
export class TeachersModule {}
