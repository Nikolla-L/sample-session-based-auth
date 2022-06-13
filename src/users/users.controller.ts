import { Controller, Post, Body, Get, Query, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenicated.guard';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body('password') userPassword: string,
    @Body('username') userName: string
  ) {
    const saltOrRounds = 10;
    const hashedPassowrd = await bcrypt.hash(userPassword, saltOrRounds);
    const result = await this.usersService.insertUser(userName, hashedPassowrd);
    return {
      message: 'User successfully registered',
      userId: result.id,
      userName: result.username
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): any {
    return {
      User: req.user,
      message: 'User logged in'
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  getUser(@Query() userName: string) {
    return this.usersService.getUser(userName);
  }

  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return {
      message: 'The user session ended'
    }
  }
  
}
