import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerDto: RegisterDto, hashedPassword: string) {
    return await this.prisma.users.upsert({
      where: { email: registerDto.email },
      update: {
        passwordHash: hashedPassword,
      },
      create: {
        username: registerDto.username,
        email: registerDto.email,
        passwordHash: hashedPassword,
      },
    });
  }

  async login(loginDto: LoginDto) {
    return this.prisma.users.findUnique({
      where: { email: loginDto.email },
    });
  }
}
