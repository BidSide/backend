import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
    required: false,
  },
  childCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
      required: false,
    },
  ],
});
