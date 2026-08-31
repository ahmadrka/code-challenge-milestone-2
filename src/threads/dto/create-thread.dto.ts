import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateThreadDto {
  @ApiProperty({
    example: 'My First Thread',
    description: 'Title of the thread',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'This is the content of my first thread.',
    description: 'Content of the thread',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
