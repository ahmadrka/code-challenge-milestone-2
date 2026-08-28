import { IsNotEmpty, IsString } from 'class-validator';

export class CreateThreadDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
