import { Document } from 'mongoose';
import { UserInterface } from '../../users/interfaces/user.interface';

export interface ProfileInterface extends Document {
  wallet: number,
  user: UserInterface,
  subscriptions: any[]
}
