import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body, ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
  }

  @Post('signup')
  async createUserByEmailAndPassword(
    @Request() req,
    @Body() createUserDto: UserDto,
  ) {
    return await this.usersService.save(req, createUserDto);
  }

  @Post('login')
  async login(@Request() req, @Body() user: UserDto) {
    try {
      return await this.authService.login(user);
    } catch (e) {
      console.log(e);
      throw new ForbiddenException(e);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('refresh')
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
