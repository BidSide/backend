import { forwardRef, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schema/product.schema';
import { AuthModule } from '../auth/auth.module';
import { CategoriesModule } from '../categories/categories.module';
import { ProfileModule } from '../profile/profile.module';
import { BidSchema } from './schema/bid.schema';
import { ProductInterfaceService } from './productInterface.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    AuthModule,
    CategoriesModule,
    ProfileModule,
    MongooseModule.forFeature([
      {
        name: 'Product', schema: ProductSchema,
      },
      {
        name: 'Bid', schema: BidSchema,
      },
    ]),
    NotificationModule,
  ],

  exports: [ProductService, ProductInterfaceService],
  controllers: [ProductController],
  providers: [ProductService, ProductInterfaceService],
})
export class ProductModule {
}
