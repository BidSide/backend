import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {

  constructor(private readonly notificationService: NotificationService) {
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  async getNotificationCount(@Req() req){
    return await this.notificationService.getNotificationCount(req);
  }

  @Get('list')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  async getNotifications(@Req() req){
    return await this.notificationService.getNotifications(req);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  async getNotification(@Req() req, @Param('id') id){
    return await this.notificationService.getNotification(req, id);
  }
}
