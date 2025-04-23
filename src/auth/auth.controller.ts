import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'The user ID to simulate login, defaults to 1 if omitted',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    type: LoginResponseDto,
    description: 'Returns a signed JWT token',
  })
  login(@Query('userId') userId: number) {
    return this.authService.login(userId || 1);
  }
}
