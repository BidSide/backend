import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${process.env.mongodbUser}:${process.env.mongodbPswd}@cluster0-klz9d.mongodb.net/rendszerf`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
