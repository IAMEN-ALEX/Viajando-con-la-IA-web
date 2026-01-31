const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUser() {
    try {
        const email = 'menaresalexis34@gmail.com';
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (user) {
            console.log(`✅ User found: ${user.name} (${user.email})`);
        } else {
            console.log(`❌ User NOT found: ${email}`);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

checkUser();
