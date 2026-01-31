import { prisma } from '@/lib/prisma';

async function main() {
    try {
        const userCount = await prisma.user.count();
        console.log(`Successfully connected to database. User count: ${userCount}`);
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
