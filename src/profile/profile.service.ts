import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProfileInterface } from './interfaces/profile.interface';
import { Model } from 'mongoose';
import { WalletTransactionLogInterface } from './interfaces/walletTransactionLog.interface';

@Injectable()
export class ProfileService {

  constructor(
    @InjectModel('Profile') private readonly profileModel: Model<ProfileInterface>,
    @InjectModel('WalletTransactionLog') private readonly transactionLog: Model<WalletTransactionLogInterface>,
  ) {
  }


  async findProfile(req) {

    const profile = await this.profileModel.findOne({
      user: req.user._id,
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

  async topup(req, topupDto: { amount: number, reason?: string }) {

    const profile = await this.findProfile(req);

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

  async me(req: any) {
    const profile = await this.findProfile(req);

    const transactionLogs = await this.transactionLog.find({
      profile: profile._id,
    });

    return {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      wallet: profile.wallet,
      transactionLogs
    };
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

    return profiles.map(p => {
      return {
        firstName: p.user.firstName ? p.user.firstName : 'Anonimus',
        lastName: p.user.lastName ? p.user.lastName : 'Alpaka',
        _id: p._id,
      };
    });
  }

  async findById(_id) {
    return this.profileModel.findById(_id);
  }

  private async LogTransaction(profileId, log: { amount: number; prefix: boolean; reason?: string }) {
    const transactionLog = new this.transactionLog({
      amount: log.amount,
      reason: log.reason,
      profile: profileId,
    });

    return await transactionLog.save();

  }
}
