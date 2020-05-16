import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('profile')
export class ProfileController {

  constructor(
    private profileService: ProfileService,
  ) {
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  @Get()
  async getProfile(@Req() req) {
    console.log('me');
    return await this.profileService.me(req);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  @Get('subscriptions')
  async getSubscriptions(@Req() req) {
    return await this.profileService.subscriptions(req);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  @Get('list')
  async getProfiles(@Req() req) {
    return await this.profileService.list(req);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  @Get(':id')
  async getProfileById(@Req() req, @Param('id') id) {
    return await this.profileService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  @Post('topup')
  async topupWallet(@Req() req, @Body() topupDto: { amount: number, reason?: string }) {
    topupDto.reason = 'WALLET_TOPUP';
    return await this.profileService.topup(req, topupDto);
  }

  @Get('public/:_id')
  async getPublicProfileById(@Req() req, @Param('_id') _id) {
    return await this.profileService.findPublicById(_id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  @Post('subscribe/:id')
  async subscibeToProfile(@Req() req, @Param('id') id) {
    return await this.profileService.subscribe(req, id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  @Delete('subscribe/:id')
  async unSubscibeFromProfile(@Req() req, @Param('id') id) {
    return await this.profileService.unSubscribe(req, id);
  }


}
