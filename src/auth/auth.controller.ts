import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RefreshDto } from './dto/refresh.dto';
import { CurrentUser } from 'src/users/decorator/user.decorator';
import type { IReqUser } from 'src/users/decorator/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create new user account' })
  @ApiResponse({
    status: 201,
    description: 'User account created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 409, description: 'User already exists.' })
  register(@Body() register: RegisterDto) {
    return this.authService.register(register);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user account' })
  @ApiResponse({ status: 200, description: 'Login success.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 401, description: 'Invalid email or password.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Access token refreshed successfully.',
  })
  @ApiResponse({ status: 401, description: 'Invalid refresh token.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  refresh(@CurrentUser() user: IReqUser, @Body() refreshDto: RefreshDto) {
    return this.authService.refresh(user, refreshDto);
  }
}
