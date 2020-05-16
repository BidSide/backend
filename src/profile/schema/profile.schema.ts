import * as mongoose from 'mongoose';

export const ProfileSchema = new mongoose.Schema({
  wallet: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  subscriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }]
});
