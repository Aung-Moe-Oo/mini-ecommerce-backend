import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './user.service';
import { LoginDto, RegisterDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth/user')
@ApiTags('User')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'User Register' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
