import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '@nestjs/passport';
import { CategoryInterface } from './interfaces/category.interface';

@Controller('categories')
export class CategoriesController {

  constructor(
    private readonly categoriesService: CategoriesService,
  ) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCategories(): Promise<CategoryInterface[]> {
    return await this.categoriesService.getAll();
  }

}
