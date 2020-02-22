import { Controller, Get, Logger, Req, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '@nestjs/passport';
import { CategoryInterface } from './interfaces/category.interface';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('categories')
export class CategoriesController {

  constructor(
    private readonly categoriesService: CategoriesService,
  ) {
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  @Get()
  async getCategories(@Req() req): Promise<CategoryInterface[]> {

    Logger.log(req.user);

    return await this.categoriesService.getAll();
  }

}
