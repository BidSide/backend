import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {
  }

  async findOne(email): Promise<UserInterface | undefined> {
    return this.userModel.findOne({
      email,
    });
  }

  async save(req: any, createUserDto: any) {
    const user = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();

    if (user) {
      throw new BadRequestException();
    }

    return await new this.userModel(createUserDto).save();
  }

  async validateUser(email: string){
    return this.userModel.findOne({
      email,
    })
      .select("-password -passwordAgain")
      ;
  }
}
