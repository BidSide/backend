import { Document } from "mongoose";
import { UserInterface } from '../../users/interfaces/user.interface';

export interface BidInterface extends Document {
  amount: number;
  profile: UserInterface
}
