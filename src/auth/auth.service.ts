import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const data = await this.authRepository.register(
      registerDto,
      hashedPassword,
    );

    if (!data) {
      throw new Error('Registration failed');
    }

    return data;
  }

  async login(loginDto: LoginDto) {
    const data = await this.authRepository.login(loginDto);
    if (!data) {
      throw new Error('Login failed: User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      data.passwordHash,
    );

    if (!isPasswordValid) {
      throw new Error('Login failed: Invalid password');
    }

    return data;
  }
}
