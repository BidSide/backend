import * as mongoose from 'mongoose';

export const BidSchema = new mongoose.Schema({
  amount: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});
