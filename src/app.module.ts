import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { HealthController } from './health/health.controller';
import { TimesheetsModule } from './timesheets/timesheets.module';

@Module({
  imports: [PrismaModule, ProjectsModule, TimesheetsModule],
  controllers: [HealthController],
})
export class AppModule {}
