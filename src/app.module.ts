import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { InstitutionModule } from './institution/institution.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { CoursesModule } from './courses/courses.module';
import { AttendanceModule } from './attendance/attendance.module';
import { ExamsModule } from './exams/exams.module';
import { BranchModule } from './branch/branch.module';
import { ClassroomModule } from './classroom/classroom.module';
import { SectionModule } from './section/section.module';
import { GateModule } from './gate/gate.module';

@Module({
  imports: [DatabaseModule, AuthModule, InstitutionModule, UsersModule, StudentsModule, TeachersModule, CoursesModule, AttendanceModule, ExamsModule, BranchModule, ClassroomModule, SectionModule, GateModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
