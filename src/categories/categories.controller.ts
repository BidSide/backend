import { Controller, Get, Req} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryInterface } from './interfaces/category.interface';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories(@Req() req): Promise<CategoryInterface[]> {
    return await this.categoriesService.getAll();
  }
}
