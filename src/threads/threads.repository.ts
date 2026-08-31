import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { ReplyThreadDto } from './dto/reply-thread.dto';

@Injectable()
export class ThreadsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createThreadDto: CreateThreadDto, userId: number) {
    return this.prisma.threads.create({
      data: {
        title: createThreadDto.title,
        content: createThreadDto.content,
        userId,
      },
    });
  }

  async findAll() {
    return this.prisma.threads.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.threads.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
  }

  async update(id: number, updateThreadDto: UpdateThreadDto) {
    return this.prisma.threads.update({
      where: { id },
      data: {
        title: updateThreadDto.title,
        content: updateThreadDto.content,
      },
    });
  }

  async reply(id: number, userId: number, replyThreadDto: ReplyThreadDto) {
    return this.prisma.threads.create({
      data: {
        userId,
        parentId: id,
        title: '',
        content: replyThreadDto.content,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.threads.delete({
      where: { id },
    });
  }

  async findMyThreads(userId: number) {
    return this.prisma.threads.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
  }
}
