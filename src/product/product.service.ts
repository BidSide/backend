import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductInterface } from './interfaces/product.interface';
import { CategoriesService } from '../categories/categories.service';
import { ProfileService } from '../profile/profile.service';
import { ProfileInterface } from '../profile/interfaces/profile.interface';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductInterface>,
    private readonly categoryService: CategoriesService,
    private readonly profileService: ProfileService
  ) {
  }

  async getAllProduct(searchForCategory?: string, searchForProduct?: string) {

    const query: any = {};

    if (searchForCategory) {
      const categoryInDatabase = await this.categoryService.findByName(searchForCategory);
      query.category = categoryInDatabase._id;
    }
    if (searchForProduct) {
      const regex = new RegExp(searchForProduct);
      query.name = { $regex: regex, $options: 'i' };
    }

    return this.productModel.find(query)
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

  async placeBid(req, _id, bidDto) {

    const product: ProductInterface = await this.productModel.findById(_id).exec();

    if (product.currentPrice > bidDto.amount) {
      throw new BadRequestException({
        number: '0000',
        severity: 0,
        message: 'BID_ERROR.no_less_than_actual',
      });
    }

    const profile: ProfileInterface = await this.profileService.findProfile(req);

    if(bidDto.amount > profile.wallet){
      throw new BadRequestException({
        number: '0000',
        severity: 2,
        message: 'BID_ERROR.not_enough_credit',
      });
    }


    // TODO ha volt korábbi licit, azt feloldani

    product.currentPrice = bidDto.amount;

    return await product.save();

  }
}
