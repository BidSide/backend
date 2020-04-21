import { UserInterface } from '../../users/interfaces/user.interface';
import { Document } from 'mongoose';
import { CategoryInterface } from '../../categories/interfaces/category.interface';
import { BidInterface } from './bid.interface';

export interface ProductInterface extends Document {
  sold: boolean,
  name: string,
  description: string,
  buyoutPrice: number,
  starterPrice: number,
  currentPrice: BidInterface,
  profile: UserInterface,
  category: CategoryInterface
}
