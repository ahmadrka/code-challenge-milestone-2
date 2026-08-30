import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty({
    example: 'b2c3a1xxxxxx',
    description: 'Refresh Token',
    required: true,
  })
  @IsString()
  refreshToken: string;
}
