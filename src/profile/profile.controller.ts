import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('profile')
export class ProfileController {

  constructor(
    private profileService: ProfileService
  ) {
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  @Get()
  async getProfile(@Req() req) {
    return await this.profileService.me(req);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  @Get('list')
  async getProfiles(@Req() req) {
    return await this.profileService.list(req);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  @Get(':_id')
  async getProfileById(@Req() req, @Param(':_id') _id) {
    return await this.profileService.findById(_id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  @Post('topup')
  async topupWallet(@Req() req, @Body() topupDto: { amount: number, reason?:string }) {
    topupDto.reason = 'WALLET_TOPUP';
    return await this.profileService.topup(req, topupDto);
  }

}
