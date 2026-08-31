import { PartialType } from '@nestjs/mapped-types';
import { CreateThreadDto } from './create-thread.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateThreadDto extends PartialType(CreateThreadDto) {
  @ApiProperty({
    example: 'My Updated Thread',
    description: 'Updated title of the thread',
  })
  title?: string | undefined;

  @ApiProperty({
    example: 'This is the updated content of my thread.',
    description: 'Updated content of the thread',
  })
  content?: string | undefined;
}
