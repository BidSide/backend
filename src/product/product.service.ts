import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductInterface } from './interfaces/product.interface';
import { CategoriesService } from '../categories/categories.service';
import { ProfileService } from '../profile/profile.service';
import { ProfileInterface } from '../profile/interfaces/profile.interface';
import { BidInterface } from './interfaces/bid.interface';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductInterface>,
    @InjectModel('Bid') private readonly bidModel: Model<BidInterface>,
    private readonly categoryService: CategoriesService,
    private readonly profileService: ProfileService,
  ) {
  }

  async getAllProduct(searchForCategory?: string, searchForProduct?: string, profileId?: string) {

    const query: any = {};

    if (searchForCategory) {
      const categoryInDatabase = await this.categoryService.findByName(searchForCategory);
      query.category = categoryInDatabase._id;
    }

    if (searchForProduct) {
      const regex = new RegExp(searchForProduct);
      query.name = { $regex: regex, $options: 'i' };
    }

    if (profileId) {
      const profile = await this.profileService.findById(profileId);
      query.user = profile.user._id;
    }

    return await this.productModel.find(query)
      .populate([
        {
          path: 'category',
          select: '-_id -__v -parentCategory -childCategories',
        },
        {
          path: 'profile',
          select: '-roles -email -password -passwordAgain -__v',
        },
        {
          path: 'currentPrice',
          select: '-_id -updatedAt -__v',
          populate: {
            path: 'user',
            select: 'firstName lastName',
          },
        },
      ])
      .select('-__v')
      .exec();

  }

  async createProduct(req, productDto: ProductDto) {
    const product = new this.productModel(productDto);
    product.profile = req.user;

    return await product.save();
  }

  async getProductById(_id: string) {
    return this.productModel.findById(_id)
      .populate([
        {
          path: 'category',
          select: '-_id -__v -parentCategory -childCategories',
        },
        {
          path: 'profile',
          select: '-roles -email -password -passwordAgain -__v',
        },
        {
          path: 'currentPrice',
          select: '-_id -updatedAt -__v',
          populate: {
            path: 'user',
            select: 'firstName lastName',
          },
        },
      ])
      .select('-__v');
  }

  async updateProduct(req, _id: string, productDto: ProductDto) {
    const productInDatabase = await this.getProductById(_id);

    if (productInDatabase.profile._id.toString() !== req.user._id.toString()) {
      throw new BadRequestException({
        number: '0000',
        severity: 4,
        message: 'PRODUCT_ERROR.not_yours',
      });
    }

    if(productInDatabase.currentPrice){
      throw new BadRequestException({
        number: '0000',
        severity: 1,
        message: 'PRODUCT_ERROR.has_bid',
      })
    }

    Object.assign(productInDatabase, productDto);

    return await productInDatabase.save();

  }

  async deleteProduct(req, _id: string) {

    const productInDatabase = await this.getProductById(_id);

    if (productInDatabase.profile._id.toString() !== req.user._id.toString()) {
      throw new BadRequestException({
        number: '0000',
        severity: 4,
        message: 'PRODUCT_ERROR.not_yours',
      });
    }

    if (productInDatabase.currentPrice) {

      const oldProfile = await this.profileService.findProfile({ user: { _id: productInDatabase.currentPrice.user._id } });

      await this.profileService.topup(
        {
          user:
            {
              _id: oldProfile.user._id,
            },
        },
        {
          amount: productInDatabase.currentPrice.amount,
          reason: 'DELETE_PRODUCT_CREDITING'
        },

      );

    }


    return productInDatabase.remove();
  }

  async placeBid(req, _id, bidDto) {

    const product: ProductInterface = await this.productModel.findById(_id)
      .populate({
        path: 'currentPrice',
        populate: {
          path: 'user',
        },
      })
      .exec();

    if (product.profile._id.toString() === req.user._id.toString()) {
      throw new BadRequestException({
        number: '0000',
        severity: 4,
        message: 'PRODUCT_ERROR.its_yours',
      });
    }

    if (!!product.currentPrice && product.currentPrice.amount > bidDto.amount) {
      throw new BadRequestException({
        number: '0000',
        severity: 0,
        message: 'BID_ERROR.no_less_than_actual',
      });
    }

    const newProfile: ProfileInterface = await this.profileService.findProfile(req);

    if (bidDto.amount > newProfile.wallet) {
      throw new BadRequestException({
        number: '0000',
        severity: 2,
        message: 'BID_ERROR.not_enough_credit',
      });
    }

    if (product.currentPrice) {

      const oldProfile = await this.profileService.findProfile({ user: { _id: product.currentPrice.user._id } });

      await this.profileService.topup(
        {
          user:
            {
              _id: oldProfile.user._id,
            },
        },
        {
          amount: product.currentPrice.amount,
          reason: 'OUTBID_CREDITING'
        },

      );

    }

    await this.profileService.lockdown(newProfile._id, bidDto.amount, 'BID_LOCKDOWN');

    const newBid = new this.bidModel({
      amount: bidDto.amount,
      user: req.user._id,
    });

    await newBid.save();

    product.currentPrice = newBid;

    return await product.save();

  }
}
