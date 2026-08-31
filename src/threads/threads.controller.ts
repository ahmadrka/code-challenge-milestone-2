import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Post,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { CurrentUser } from 'src/users/decorator/user.decorator';
import type { IReqUser } from 'src/users/decorator/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ReplyThreadDto } from './dto/reply-thread.dto';

@Controller('api/threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create a new thread' })
  @ApiResponse({ status: 201, description: 'Thread created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(
    @Body() createThreadDto: CreateThreadDto,
    @CurrentUser() user: IReqUser,
  ) {
    return this.threadsService.create(createThreadDto, user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Find all threads' })
  @ApiResponse({ status: 200, description: 'Threads found successfully.' })
  findAll() {
    return this.threadsService.findAll();
  }

  @Get('my-threads')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Find all threads of logged in user' })
  @ApiResponse({ status: 200, description: 'Threads found successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findMyThreads(@CurrentUser() user: IReqUser) {
    return this.threadsService.findMyThreads(user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find thread by ID' })
  @ApiResponse({ status: 200, description: 'Thread found successfully.' })
  @ApiResponse({ status: 404, description: 'Thread not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.threadsService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update thread' })
  @ApiResponse({ status: 200, description: 'Thread updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: IReqUser,
    @Body() updateThreadDto: UpdateThreadDto,
  ) {
    return this.threadsService.update(id, user.userId, updateThreadDto);
  }

  @Post(':id/replies')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Reply to thread' })
  @ApiResponse({ status: 201, description: 'Reply created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  reply(
    @Param('id', ParseIntPipe) id: number,
    @Body() replyThreadDto: ReplyThreadDto,
    @CurrentUser() user: IReqUser,
  ) {
    return this.threadsService.reply(id, user.userId, replyThreadDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete thread' })
  @ApiResponse({ status: 200, description: 'Thread deleted successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Thread not found.' })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: IReqUser) {
    return this.threadsService.remove(id, user.userId);
  }
}
