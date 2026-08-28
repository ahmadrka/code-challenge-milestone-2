import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { ThreadsRepository } from './threads.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ThreadsController],
  providers: [ThreadsService, ThreadsRepository, PrismaService],
})
export class ThreadsModule {}
