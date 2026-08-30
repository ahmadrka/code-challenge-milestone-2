import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'johndoe',
    description: 'Username',
    minimum: 3,
  })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Email',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'secret123',
    description: 'Password',
    minimum: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;
}
