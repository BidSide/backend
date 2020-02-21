import { Document } from 'mongoose';

export interface UserInterface extends Document {
  email: string;
  roles: string[];
  password: string;
  passwordAgain: string;

  checkPassword(password, cb);
}
