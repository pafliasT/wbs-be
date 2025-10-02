import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await prisma.project.createMany({
        data: [
            { code: 'WBS-1001', name: 'Internal Tools' },
            { code: 'WBS-1002', name: 'Client A – Onboarding' },
        ],
        skipDuplicates: true,
    });
}

main().finally(() => prisma.$disconnect());
