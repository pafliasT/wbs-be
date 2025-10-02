import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [PrismaModule, ProjectsModule],
  controllers: [HealthController],
})
export class AppModule {}
