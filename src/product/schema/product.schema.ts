import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  sold: {
    type: Boolean,
    default: false,
  },
  name: String,
  description: String,
  buyoutPrice: Number,
  starterPrice: Number,
  currentPrice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bid',
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});
