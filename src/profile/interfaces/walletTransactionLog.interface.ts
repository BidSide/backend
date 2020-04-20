import { Document } from 'mongoose';
import { ProfileInterface } from './profile.interface';

export interface WalletTransactionLogInterface extends Document{
  amount: number
  prefix: boolean
  reason?: string
  profile: ProfileInterface
}
