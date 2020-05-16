import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { NotificationInterface } from './interface/notification.interface';

@Injectable()
export class NotificationService {

  constructor(
    @Inject('Notification') private readonly notificationModel: Model<NotificationInterface>
  ) {
  }

  async getNotificationCount(req){
    return this.notificationModel.find({
      seen: false,
      profile: req.profile._id
    }).countDocuments();
  }

  async getNotifications(req){
    return await this.notificationModel.find({
      seen: false,
      profile: req.profile._id
    }).exec();
  }

  async getNotification(req, id){
    const notif = await this.notificationModel.findOne({
      seen: false,
      profile: req.profile._id,
      _id: id
    }).exec();
    notif.seen = true;
    return await notif.save()
  }
}
