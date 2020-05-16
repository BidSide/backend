import * as mongoose from 'mongoose';

export const BidSchema = new mongoose.Schema({
  amount: Number,
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },
}, {
  timestamps: true,
});
