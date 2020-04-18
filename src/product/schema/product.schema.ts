import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  buyoutPrice: Number,
  starterPrice: Number,
  currentPrice: {
    type: Number,
    default: 0,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});
