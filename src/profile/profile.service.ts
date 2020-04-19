import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProfileInterface } from './interfaces/profile.interface';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {

  constructor(
    @InjectModel('Profile') private readonly profileModel: Model<ProfileInterface>,
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

  async topup(req, topupDto: { amount: number }) {
    const profile = await this.findProfile(req);

    profile.wallet += topupDto.amount;

    return profile.save();

  }

  async lockdown(profileId, amount) {
    const profile = await this.profileModel.findById(profileId);

    if (0 > profile.wallet - amount) {
      throw new BadRequestException({
        number: '0000',
        severity: 3,
        message: 'BID_ERROR.not_enough_credit',
      });
    }

    profile.wallet -= amount;

    return profile.save();

  }

  async me(req: any) {
    const profile = await this.findProfile(req);

    return {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      wallet: profile.wallet
    }
  }
}
