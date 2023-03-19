import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  singup(@Body() dto: AuthDto) {
    this.authService.signup(dto);
  }

  @HttpCode(200)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    this.authService.signin(dto);
  }
}
