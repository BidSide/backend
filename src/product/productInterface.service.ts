import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductInterface } from './interfaces/product.interface';

export class ProductInterfaceService {

  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductInterface>,
  ) {
  }

  async getProductsOfProfiles(profiles: any[]) {
    return this.productModel.find({
      sold: false,
      profile: { $in: profiles },
    })
      .populate({
        path: 'profile',
        select: '-wallet -__v',
        populate: {
          'path': 'user',
          'select': '-password -passwordAgain -roles -subscriptions -__v'
        },
      })
      .populate({
        path: 'category',
        select: '-parentCategory -childCategories -_id -__v'
      })
      .select('-__v')
      .sort('createdAt')
      .exec();
  }
}
