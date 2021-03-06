import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CategoriesModule } from './categories/categories.module';
import { ProductModule } from './product/product.module';
import { ProfileModule } from './profile/profile.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'www'),
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.mongodbUser}:${process.env.mongodbPswd}@cluster0-klz9d.mongodb.net/rendszerf`,
      //`mongodb+srv://${process.env.mongodbUser}:${process.env.mongodbPswd}@cluster0-klz9d.mongodb.net/rendszerf`,
      //`mongodb://bidside:bidside@database:27017/bidside`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    AuthModule,
    UsersModule,
    CategoriesModule,
    ProductModule,
    ProfileModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
