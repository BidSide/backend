import { UserInterface } from '../../users/interfaces/user.interface';
import { Document } from 'mongoose';
import { CategoryInterface } from '../../categories/interfaces/category.interface';

export interface ProductInterface extends Document {
  name: string,
  description: string,
  buyoutPrice: number,
  starterPrice: number,
  currentPrice: number,
  profile: UserInterface,
  category: CategoryInterface
}
