import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductInterface } from './interfaces/product.interface';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductInterface>,
    private readonly categoryService: CategoriesService

  ) {
  }

  async getAllProduct(searchForCategory?:string) {

    if(searchForCategory){
      const categoryInDatabase = await this.categoryService.findByName(searchForCategory);
      return this.productModel.find({
        category: categoryInDatabase._id
      }).populate('category');
    }

    return this.productModel.find()
      .populate('category');
  }

  async createProduct(req, productDto: ProductDto) {
    const product = new this.productModel(productDto);
    product.profile = req.user;

    return await product.save();
  }

  async getProductById(_id: string) {
    return this.productModel.findById(_id).populate('category');
  }

  async updateProduct(req, _id: string, productDto: ProductDto) {
    const productInDatabase = await this.getProductById(_id);

    if (productInDatabase.profile._id !== req.user._id) {
      throw new BadRequestException();
    }

    Object.assign(productInDatabase, productDto);

    return await productInDatabase.save();

  }

  async deleteProduct(req, _id: string) {

    const productInDatabase = await this.getProductById(_id);

    if (productInDatabase.profile._id !== req.user._id) {
      throw new BadRequestException();
    }

    return productInDatabase.remove();
  }
}
