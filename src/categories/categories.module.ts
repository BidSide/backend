import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schema/category.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])],
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
