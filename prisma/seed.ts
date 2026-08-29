import { PrismaLibSql } from '@prisma/adapter-libsql';
import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '../src/generated/prisma/client';

const url =
  process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || 'file:dev.db';
const authToken = process.env.TURSO_AUTH_TOKEN;
const adapter = new PrismaLibSql({
  url,
  ...(authToken ? { authToken } : {}),
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...');

  const user1 = await prisma.users.upsert({
    where: { email: 'johndoe@example.com' },
    update: {},
    create: {
      username: 'johndoe',
      email: 'johndoe@example.com',
      passwordHash: bcrypt.hashSync('secret123', 10),
    },
  });

  const user2 = await prisma.users.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      username: 'janedoe',
      email: 'jane@example.com',
      passwordHash: bcrypt.hashSync('secret123', 10),
    },
  });

  console.log({ user1, user2 });
  console.log('✅ Seeding completed successfully.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  });
