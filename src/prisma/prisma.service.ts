import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const url =
      process.env.TURSO_DATABASE_URL ||
      process.env.DATABASE_URL ||
      'file:dev.db';
    const authToken = process.env.TURSO_AUTH_TOKEN;
    const adapter = new PrismaLibSql({
      url,
      ...(authToken ? { authToken } : {}),
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
