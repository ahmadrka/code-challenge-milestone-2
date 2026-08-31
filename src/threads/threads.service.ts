import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { ThreadsRepository } from './threads.repository';
import { ReplyThreadDto } from './dto/reply-thread.dto';

@Injectable()
export class ThreadsService {
  constructor(private readonly threadsRepository: ThreadsRepository) {}

  async create(createThreadDto: CreateThreadDto, userId: number) {
    const thread = await this.threadsRepository.create(createThreadDto, userId);

    return thread;
  }

  async findAll() {
    const threads = await this.threadsRepository.findAll();
    return threads;
  }

  async findOne(id: number) {
    const thread = await this.threadsRepository.findOne(id);

    if (!thread) {
      throw new NotFoundException('Thread not found');
    }

    return thread;
  }

  async update(id: number, userId: number, updateThreadDto: UpdateThreadDto) {
    const thread = await this.threadsRepository.findOne(id);

    if (!thread) {
      throw new NotFoundException('Thread not found');
    }

    if (thread.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this thread',
      );
    }

    return this.threadsRepository.update(id, updateThreadDto);
  }

  async reply(id: number, userId: number, replyThreadDto: ReplyThreadDto) {
    const thread = await this.threadsRepository.findOne(id);

    if (!thread) {
      throw new NotFoundException('Thread not found');
    }

    return this.threadsRepository.reply(id, userId, replyThreadDto);
  }

  async remove(id: number, userId: number) {
    const thread = await this.threadsRepository.findOne(id);

    if (!thread) {
      throw new NotFoundException('Thread not found');
    }

    if (thread.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this thread',
      );
    }

    await this.threadsRepository.remove(id);

    return {
      message: 'Thread deleted successfully',
    };
  }

  async findMyThreads(userId: number) {
    const myThreads = await this.threadsRepository.findMyThreads(userId);

    return myThreads;
  }
}
