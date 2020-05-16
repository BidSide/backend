import * as mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },
  message: String,
  seen: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});
