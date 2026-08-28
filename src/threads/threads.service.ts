import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { ThreadsRepository } from './threads.repository';

@Injectable()
export class ThreadsService {
  constructor(private readonly threadsRepository: ThreadsRepository) {}

  async create(createThreadDto: CreateThreadDto, userId: number) {
    return this.threadsRepository.create(createThreadDto, userId);
  }

  async findAll() {
    return this.threadsRepository.findAll();
  }

  async findOne(id: number) {
    return this.threadsRepository.findOne(id);
  }

  async update(id: number, userId: number, updateThreadDto: UpdateThreadDto) {
    return this.threadsRepository.update(id, userId, updateThreadDto);
  }

  async remove(id: number, userId: number) {
    return this.threadsRepository.remove(id, userId);
  }

  async findMyThreads(userId: number) {
    return this.threadsRepository.findMyThreads(userId);
  }
}
