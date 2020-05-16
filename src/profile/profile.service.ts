import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProfileInterface } from './interfaces/profile.interface';
import { Model } from 'mongoose';
import { WalletTransactionLogInterface } from './interfaces/walletTransactionLog.interface';
import { ProductInterfaceService } from '../product/productInterface.service';

@Injectable()
export class ProfileService {

  constructor(
    @InjectModel('Profile') private readonly profileModel: Model<ProfileInterface>,
    @InjectModel('WalletTransactionLog') private readonly transactionLog: Model<WalletTransactionLogInterface>,
    private readonly productInterfaceService: ProductInterfaceService,
  ) {
  }


  async findProfile(req) {

    const profile = await this.profileModel.findOne({
      user: req.user,
    }).exec();

    if (!profile) {
      const newProfile = new this.profileModel({
        wallet: 200,
        user: req.user._id,
      });

      return await newProfile.save();
    }

    return profile;
  }

  async me(req: any) {

    const transactionLogs = await this.transactionLog.find({
      profile: req.profile._id,
    });

    return {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      profile: req.profile,
      transactionLogs,
    };
  }

  async topup(req, topupDto: { amount: number, reason?: string }) {
    console.log(req.profile);

    const profile = await this.profileModel.findById(req.profile._id);

    await this.LogTransaction(profile._id, { amount: topupDto.amount, prefix: true, reason: topupDto.reason });

    profile.wallet += topupDto.amount;

    return profile.save();

  }

  async lockdown(profileId, amount, reason?: string) {

    const profile = await this.profileModel.findById(profileId);

    if (0 > profile.wallet - amount) {
      throw new BadRequestException({
        number: '0000',
        severity: 3,
        message: 'BID_ERROR.not_enough_credit',
      });
    }

    await this.LogTransaction(profileId, { amount, prefix: false, reason });

    profile.wallet -= amount;

    return profile.save();

  }


  async list(req: any) {

    let profiles = await this.profileModel.find()
      .populate({
        path: 'user',
        select: '-password -roles',
      })
      .select('-wallet');

    profiles = profiles.filter(p => {
      return p.user._id.toString() !== req.user._id.toString();
    });

    console.log(profiles);

    return profiles.map(p => {
      return {
        firstName: p.user.firstName ? p.user.firstName : 'Anonimus',
        lastName: p.user.lastName ? p.user.lastName : 'Alpaka',
        _id: p._id,
      };
    });
  }

  async findById(_id) {
    return this.profileModel.findById(_id)
      .populate({
        path: 'user',
        select: '-password -roles -passwordAgain',
      })
      .select('-wallet');
  }

  private async LogTransaction(profileId, log: { amount: number; prefix: boolean; reason?: string }) {
    const transactionLog = new this.transactionLog({
      amount: log.amount,
      reason: log.reason,
      profile: profileId,
    });

    return await transactionLog.save();

  }

  async findPublicById(_id: any) {
    return this.profileModel.findById(_id)
      .populate({
        path: 'user',
        select: '-password -roles -passwordAgain',
      })
      .select('-wallet -email');
  }

  async findProfileByUserId(_id: any) {
    console.log('GetProfileByIser_ID');
    console.log(_id);

    return this.findProfile({ user: { _id } });
  }

  async subscribe(req: any, id: any) {
    const profile = await this.profileModel.findById(req.profile._id);
    if (!profile.subscriptions.includes(id)) {
      profile.subscriptions.push(id);
    }
    return await profile.save();
  }

  async unSubscribe(req: any, id: any) {
    const profile = await this.profileModel.findById(req.profile._id);

    profile.subscriptions = profile.subscriptions.filter(s => {
      return s.toString() !== id.toString();
    });

    return await profile.save();
  }

  async subscriptions(req: any) {
    return await this.productInterfaceService.getProductsOfProfiles(req.profile.subscriptions);
  }
}
