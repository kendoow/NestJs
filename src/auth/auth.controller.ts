import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  singup(@Body() dto: AuthDto) {
    this.authService.signup(dto);
  }

  @Post('signin')
  signin() {
    this.authService.signin();
  }
}
