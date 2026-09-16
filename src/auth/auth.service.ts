import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { RefreshDto } from './dto/refresh.dto';
import { JwtService } from '@nestjs/jwt';
import { IReqUser } from 'src/users/decorator/user.decorator';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  // Generate Access & Refresh Token
  async tokenSession(userId: number, currentRefreshToken?: string) {
    const data = await this.authRepository.findUserById(userId);
    if (!data) {
      throw new NotFoundException('Token session failed: User not found');
    }

    const payload = {
      sub: userId,
      username: data.username,
      email: data.email,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'secret',
      expiresIn: '1h',
    });

    const bytes = crypto.getRandomValues(new Uint8Array(32));
    const refreshToken = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    await this.authRepository.createSession(userId, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  // Register
  async register(registerDto: RegisterDto) {
    if (!registerDto) {
      throw new BadRequestException('Registration failed: Missing input data');
    }

    const checkData = await this.authRepository.findUserByEmail(
      registerDto.email,
    );
    if (checkData) {
      throw new ConflictException('Registration failed: User already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const data = await this.authRepository.register(
      registerDto,
      hashedPassword,
    );

    const token = await this.tokenSession(data.id);

    return {
      id: data.id,
      username: data.username,
      email: data.email,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    };
  }

  // Login
  async login(loginDto: LoginDto) {
    if (!loginDto) {
      throw new BadRequestException('Login failed: Missing input data');
    }

    const data = await this.authRepository.login(loginDto);
    if (!data) {
      throw new NotFoundException('Login failed: User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      data.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Login failed: Invalid password');
    }

    return this.tokenSession(data.id);
  }

  // Refresh Token
  async refresh(refreshDto: RefreshDto) {
    if (!refreshDto) {
      throw new BadRequestException('Refresh failed: Missing input data');
    }

    const data = await this.authRepository.findSession(refreshDto.refreshToken);

    if (!data) {
      throw new UnauthorizedException('Refresh failed: Invalid refresh token');
    }

    // const expiresAt = data.createdAt.getTime() + 19 * 24 * 60 * 60 * 1000; // 19 days
    // if (expiresAt < Date.now()) {
    //   await this.authRepository.deleteSession(
    //     data.userId,
    //     refreshDto.refreshToken,
    //   );
    //   throw new UnauthorizedException('Refresh failed: Invalid refresh token');
    // }

    await this.authRepository.deleteSession(refreshDto.refreshToken);

    return this.tokenSession(data.userId);
  }
}
