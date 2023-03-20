import { JwtGuard } from './../auth/guard/jwt.guard';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser() userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
