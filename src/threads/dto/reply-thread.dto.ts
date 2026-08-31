import { PickType } from '@nestjs/swagger';
import { CreateThreadDto } from './create-thread.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ReplyThreadDto extends PickType(CreateThreadDto, [
  'content',
] as const) {
  @ApiProperty({
    example: 'This is my reply to the thread.',
    description: 'Content of the reply',
  })
  content: string;
}
