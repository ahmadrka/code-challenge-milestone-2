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

  // User Seeding
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

  // Threads Seeding
  const thread1 = await prisma.threads.create({
    data: {
      userId: user1.id,
      title: 'How do I set up environment variables in Node.js?',
      content:
        'I am new to backend development and confused about how to hide my API keys. Could someone explain how to use dotenv?',
    },
  });

  const thread2 = await prisma.threads.create({
    data: {
      userId: user2.id,
      title: 'When should I use PostgreSQL vs MongoDB?',
      content:
        'For a medium-scale e-commerce project, which database is more recommended and why?',
    },
  });

  const thread3 = await prisma.threads.create({
    data: {
      userId: user1.id,
      title: 'Getting a CORS error when hitting the API from React',
      content:
        "I keep getting an 'Access-Control-Allow-Origin' error. How do I handle this on the Express.js side?",
    },
  });

  console.log({ user1, user2, thread1, thread2, thread3 });
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
