import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './schema/notification.schema';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports:[
    AuthModule,
    MongooseModule.forFeature([
        {
          name: 'Notification', schema: NotificationSchema,
        },
      ]
    )
  ],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
