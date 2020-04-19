import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('product')
export class ProductController {

  constructor(private productService: ProductService) {
  }

  @Get()
  async getAllProduct(@Query('category') searchForCategory?: string) {
    return await this.productService.getAllProduct(searchForCategory);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  @Post()
  async createProduct(@Req() req, @Body() productDto: ProductDto) {
    return await this.productService.createProduct(req, productDto);
  }

  @Get(':_id')
  async getProductById(@Param('_id') _id: string) {
    return await this.productService.getProductById(_id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  @Put(':_id')
  async updateProduct(@Req() req, @Param('_id') _id: string, @Body() productDto: ProductDto) {
    return await this.productService.updateProduct(req, _id, productDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  @Delete(':_id')
  async deleteProduct(@Req() req, @Param('_id') _id: string) {
    return await this.productService.deleteProduct(req, _id);
  }

}
