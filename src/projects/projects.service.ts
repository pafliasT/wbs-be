import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Project } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) { }

  findAll(): Promise<Project[]> {
    return this.prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string): Promise<Project> {
    const row = await this.prisma.project.findUnique({ where: { id } });
    if (!row) throw new NotFoundException('Project not found');
    return row;
  }

  async create(data: { code: string; name: string }): Promise<Project> {
    try {
      return await this.prisma.project.create({ data });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException('Project code already exists');
      }
      throw e;
    }
  }

  async update(id: string, data: { code?: string; name?: string }): Promise<Project> {
    try {
      return await this.prisma.project.update({ where: { id }, data });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') throw new ConflictException('Project code already exists');
        if (e.code === 'P2025') throw new NotFoundException('Project not found');
      }
      throw e;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.project.delete({ where: { id } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('Project not found');
      }
      throw e;
    }
  }
}
