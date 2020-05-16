import {Document} from 'mongoose';

export interface NotificationInterface extends Document{
  profile: any,
  message: string
  seen: boolean
}
