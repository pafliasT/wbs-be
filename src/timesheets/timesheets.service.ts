/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { TimesheetEntry } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class TimesheetsService {
  constructor(private readonly prisma: PrismaService) { }

  findAll(): Promise<TimesheetEntry[]> {
    return this.prisma.timesheetEntry.findMany({
      orderBy: { date: 'desc' },
      include: { project: true }, // helpful context; remove if you prefer lean payloads
    });
  }

  async findOne(id: string): Promise<TimesheetEntry> {
    const row = await this.prisma.timesheetEntry.findUnique({ where: { id } });
    if (!row) throw new NotFoundException('Timesheet entry not found');
    return row;
  }

  create(data: { date: string; hours: string; type: any; projectId: string; note?: string; }): Promise<TimesheetEntry> {
    return this.prisma.timesheetEntry.create({
      data: {
        date: new Date(data.date),
        hours: new Prisma.Decimal(data.hours),   // precise decimal
        type: data.type,
        projectId: data.projectId,
        note: data.note,
      },
    });
  }

  async update(id: string, data: { date?: string; hours?: string; type?: any; projectId?: string; note?: string; }): Promise<TimesheetEntry> {
    // pre-process transforms only if provided
    const transformed: any = { ...data };
    if (data.date) transformed.date = new Date(data.date);
    if (data.hours) transformed.hours = new Prisma.Decimal(data.hours);

    try {
      return await this.prisma.timesheetEntry.update({ where: { id }, data: transformed });
    } catch (e: any) {
      if (e?.code === 'P2025') throw new NotFoundException('Timesheet entry not found');
      throw e;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.timesheetEntry.delete({ where: { id } });
    } catch (e: any) {
      if (e?.code === 'P2025') throw new NotFoundException('Timesheet entry not found');
      throw e;
    }
  }
}
