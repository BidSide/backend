import { forwardRef, Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from './schema/profile.schema';
import { AuthModule } from '../auth/auth.module';
import { WalletTransactionLogSchema } from './schema/walletTransactionLog.schema';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
        {
          name: 'Profile',
          schema: ProfileSchema,
        },
        {
          name: 'WalletTransactionLog',
          schema: WalletTransactionLogSchema,
        },
      ],
    ),
    forwardRef(() => ProductModule)
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {
}
