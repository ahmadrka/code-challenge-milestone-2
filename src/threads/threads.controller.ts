import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Post,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';

@Controller('api/threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  create(@Body() createThreadDto: CreateThreadDto, userId: number) {
    return this.threadsService.create(createThreadDto, userId);
  }

  @Get()
  findAll() {
    return this.threadsService.findAll();
  }

  @Get('my-threads')
  findMyThreads(userId: number) {
    return this.threadsService.findMyThreads(userId);
  }

  @Get(':id')
  findOne(id: number) {
    return this.threadsService.findOne(id);
  }

  @Put(':id')
  update(id: number, @Body() updateThreadDto: UpdateThreadDto) {
    return this.threadsService.update(id, 1, updateThreadDto);
  }

  @Delete(':id')
  remove(id: number) {
    return this.threadsService.remove(id, 1);
  }
}
