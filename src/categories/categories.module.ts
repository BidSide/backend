import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schema/category.schema';
import { CategoriesController } from './categories.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    AuthModule,
  ],
  providers: [CategoriesService],
  exports: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {
}
