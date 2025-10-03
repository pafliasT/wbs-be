/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { PrismaClient, Prisma, EntryType as EntryTypeEnum } from '@prisma/client';
const prisma = new PrismaClient();


async function main() {
    await prisma.project.createMany({
        data: [
            { code: 'WBS-1001', name: 'Internal Tools' },
            { code: 'WBS-1002', name: 'Client A – Onboarding' },
        ],
        skipDuplicates: true,
    });

    const p1 = await prisma.project.findUnique({ where: { code: 'WBS-1001' } });
    const p2 = await prisma.project.findUnique({ where: { code: 'WBS-1002' } });

    if (p1 && p2) {
        await prisma.timesheetEntry.createMany({
            data: [
                {
                    date: new Date(),
                    hours: new Prisma.Decimal('2.50'),  // or just 2.5 if you prefer
                    type: EntryTypeEnum.BILLABLE,
                    projectId: p1.id,
                    note: 'Kickoff',
                },
                {
                    date: new Date(),
                    hours: new Prisma.Decimal('1.25'),
                    type: EntryTypeEnum.OVERTIME,
                    projectId: p2.id,
                    note: 'Hotfix',
                },
            ],
            skipDuplicates: true,
        });
    }
}


main().finally(() => prisma.$disconnect());
