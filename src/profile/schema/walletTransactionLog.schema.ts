import * as mongoose from 'mongoose';

export const WalletTransactionLogSchema = new mongoose.Schema({
  amount: Number,
  prefix: Boolean,
  reason: {
    type: String,
    required: false,
    default: '',
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }

}, {
  timestamps: true,
});
