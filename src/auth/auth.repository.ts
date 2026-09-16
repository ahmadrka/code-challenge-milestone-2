import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }

  async findUserById(id: number) {
    return this.prisma.users.findUnique({
      where: { id },
    });
  }

  async register(registerDto: RegisterDto, hashedPassword: string) {
    return await this.prisma.users.create({
      data: {
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

  async findSession(refreshToken: string) {
    return await this.prisma.session.findFirst({
      where: { refreshToken },
    });
  }

  async createSession(userId: number, refreshToken: string) {
    return await this.prisma.session.create({
      data: { userId, refreshToken },
    });
  }

  async deleteSession(refreshToken: string) {
    return await this.prisma.session.deleteMany({
      where: { refreshToken },
    });
  }
}
