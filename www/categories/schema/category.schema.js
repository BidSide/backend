"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.CategorySchema = new mongoose.Schema({
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
//# sourceMappingURL=category.schema.js.map